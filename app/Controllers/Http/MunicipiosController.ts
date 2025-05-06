import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipio from 'App/Models/Municipio'
import Departamento from 'App/Models/Departamento'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class MunicipiosController {
  /**
   * GET /municipios
   * Lista los municipios desde la API externa, opcionalmente filtrados por departamento
   */
  public async index({ request, response }: HttpContextContract) {
    try {
      const apiUrl = Env.get('COLOMBIA_API_URL')
      const departamento = request.input('departamento')

      // Arma el endpoint con o sin filtro de departamento
      const endpoint = departamento
        ? `${apiUrl}/municipios?departamento=${departamento}`
        : `${apiUrl}/municipios`

      // Llama a la API externa
      const { data: municipios } = await axios.get(endpoint)

      if (!municipios || municipios.length === 0) {
        return response.notFound({ message: 'No se encontraron municipios en la API.' })
      }

      return response.ok({ data: municipios })
    } catch (error) {
      console.error('Error al obtener municipios:', error.message)
      return response.internalServerError({
        message: 'Error al obtener municipios desde la API de Colombia.',
        error: error.message,
      })
    }
  }

  /**
   * POST /municipios/sincronizar
   * Sincroniza los municipios desde la API a la base de datos local,
   * validando que el departamento correspondiente exista
   */
  public async sincronizar({ request, response }: HttpContextContract) {
    try {
      const apiUrl = Env.get('COLOMBIA_API_URL')
      const departamentoNombre = request.input('departamento')

      // Arma el endpoint con o sin filtro de departamento
      const endpoint = departamentoNombre
        ? `${apiUrl}/municipios?departamento=${departamentoNombre}`
        : `${apiUrl}/municipios`

      const { data: municipios } = await axios.get(endpoint)

      for (const municipio of municipios) {
        // Buscar el departamento por ID para asegurar integridad referencial
        const departamento = await Departamento.findBy('id', municipio.departamento_id)

        if (!departamento) {
          console.warn(`Departamento no encontrado para el municipio: ${municipio.nombre}`)
          continue // Omitir si el departamento no existe
        }

        // Insertar o actualizar municipio en la base de datos
        await Municipio.updateOrCreate(
          { id: municipio.id },
          {
            nombre: municipio.nombre,
            departamentoId: departamento.id,
          }
        )
      }

      return response.ok({ message: 'Municipios sincronizados correctamente.' })
    } catch (error) {
      console.error('Error al sincronizar municipios:', error.message)
      return response.internalServerError({
        message: 'Error al sincronizar municipios desde la API de Colombia.',
        error: error.message,
      })
    }
  }
}
