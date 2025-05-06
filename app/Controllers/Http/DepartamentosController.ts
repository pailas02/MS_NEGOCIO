import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Departamento from 'App/Models/Departamento'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class DepartamentosController {
  /**
   * GET /departamentos
   * Obtiene los departamentos directamente desde la API externa
   */
  public async index({ response }: HttpContextContract) {
    try {
      const apiUrl = Env.get('COLOMBIA_API_URL')

      // Llama a la API externa para obtener los departamentos
      const { data: departamentos } = await axios.get(`${apiUrl}/departamentos`)

      // Validación por si la API devuelve una lista vacía o nula
      if (!departamentos || departamentos.length === 0) {
        return response.notFound({ message: 'No se encontraron departamentos en la API.' })
      }

      return response.ok({ data: departamentos })
    } catch (error) {
      console.error('Error al obtener departamentos:', error.message)
      return response.internalServerError({
        message: 'Error al obtener departamentos desde la API de Colombia.',
        error: error.message,
      })
    }
  }

  /**
   * POST /departamentos/sincronizar
   * Sincroniza los departamentos desde la API y los guarda o actualiza en la base de datos local
   */
  public async sincronizar({ response }: HttpContextContract) {
    try {
      const apiUrl = Env.get('COLOMBIA_API_URL')

      // Obtener los departamentos desde la API
      const { data: departamentos } = await axios.get(`${apiUrl}/departamentos`)

      // Itera cada departamento y lo guarda o actualiza en la base de datos
      for (const departamento of departamentos) {
        await Departamento.updateOrCreate(
          { id: departamento.id }, // Condición de búsqueda
          { nombre: departamento.nombre } // Datos a insertar/actualizar
        )
      }

      return response.ok({ message: 'Departamentos sincronizados correctamente.' })
    } catch (error) {
      console.error('Error al sincronizar departamentos:', error.message)
      return response.internalServerError({
        message: 'Error al sincronizar departamentos desde la API de Colombia.',
        error: error.message,
      })
    }
  }
}
