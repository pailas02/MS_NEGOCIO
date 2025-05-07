import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipio from 'App/Models/Municipio'
import Departamento from 'App/Models/Departamento'
import axios from 'axios'

export default class MunicipiosController {
  // GET /municipios
  public async index({ response }: HttpContextContract) {
    const municipios = await Municipio.query().preload('departamento')

    if (!municipios.length) {
      return response.notFound({ message: 'No hay municipios registrados.' })
    }

    return response.ok({ data: municipios })
  }

  // GET /municipios/:id
  public async show({ params, response }: HttpContextContract) {
    const municipio = await Municipio.find(params.id)
    if (!municipio) {
      return response.notFound({ message: 'Municipio no encontrado.' })
    }
    return response.ok(municipio)
  }

  // POST /municipios
  public async create({ request, response }: HttpContextContract) {
    const data = request.only(['nombre', 'departamentoId'])
    const municipio = await Municipio.create(data)
    return response.created(municipio)
  }

  // PUT /municipios/:id
  public async update({ params, request, response }: HttpContextContract) {
    const municipio = await Municipio.find(params.id)
    if (!municipio) {
      return response.notFound({ message: 'Municipio no encontrado.' })
    }

    const data = request.only(['nombre', 'departamentoId'])
    municipio.merge(data)
    await municipio.save()

    return response.ok(municipio)
  }

  // DELETE /municipios/:id
  public async delete({ params, response }: HttpContextContract) {
    const municipio = await Municipio.find(params.id)
    if (!municipio) {
      return response.notFound({ message: 'Municipio no encontrado.' })
    }

    await municipio.delete()
    return response.noContent()
  }

  // POST /municipios/sincronizar-datosgov
  public async sincronizarDesdeDatosGov({ response }: HttpContextContract) {
    try {
      const { data: municipios } = await axios.get('https://www.datos.gov.co/resource/xdk5-pm3f.json')

      for (const item of municipios) {
        const nombreDepartamento = item.departamento?.trim()
        const nombreMunicipio = item.municipio?.trim()

        if (!nombreDepartamento || !nombreMunicipio) continue

        const departamento = await Departamento.findBy('nombre', nombreDepartamento)
        if (!departamento) {
          console.warn(`❌ Departamento no encontrado: ${nombreDepartamento}`)
          continue
        }

        await Municipio.updateOrCreate(
          { nombre: nombreMunicipio, departamentoId: departamento.id },
          {}
        )
      }

      return response.ok({ message: 'Municipios sincronizados correctamente desde datos.gov.co' })
    } catch (error) {
      console.error('❌ Error al sincronizar municipios:', error.message)
      return response.internalServerError({
        message: 'Error al sincronizar municipios.',
        error: error.message,
      })
    }
  }
}
