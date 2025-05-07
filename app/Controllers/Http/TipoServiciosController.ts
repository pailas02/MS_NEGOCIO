import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TipoServicio from 'App/Models/TipoServicio'

export default class TipoServiciosController {
  public async find({ params, response }: HttpContextContract) {
    if (params.id) {
      const tipo = await TipoServicio.find(params.id)
      return tipo ? response.ok(tipo) : response.notFound({ message: 'No encontrado' })
    }
    const tipos = await TipoServicio.all()
    return response.ok(tipos)
  }

  public async create({ request, response }: HttpContextContract) {
    const data = request.only(['nombre', 'descripcion']) // ajusta según campos reales
    const tipo = await TipoServicio.create(data)
    return response.created(tipo)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const tipo = await TipoServicio.find(params.id)
    if (!tipo) return response.notFound({ message: 'No encontrado' })

    const data = request.only(['nombre', 'descripcion'])
    tipo.merge(data)
    await tipo.save()
    return response.ok(tipo)
  }

  public async delete({ params, response }: HttpContextContract) {
    const tipo = await TipoServicio.find(params.id)
    if (!tipo) return response.notFound({ message: 'No encontrado' })

    await tipo.delete()
    return response.ok({ message: 'Eliminado correctamente' })
  }
}
