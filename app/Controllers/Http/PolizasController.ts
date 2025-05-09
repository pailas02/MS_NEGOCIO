import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Poliza from 'App/Models/Poliza'
import PolizaValidator from 'App/Validators/PolizaValidator'

export default class PolizasController {
  // Listar todas las pólizas (con paginación opcional)
  public async index({ request }: HttpContextContract) {
    const data = request.all()
    if ('page' in data && 'per_page' in data) {
      const page = request.input('page', 1)
      const perPage = request.input('per_page', 20)
      return await Poliza.query().paginate(page, perPage)
    } else {
      return await Poliza.query()
    }
  }

  // Obtener póliza por ID
  public async show({ params }: HttpContextContract) {
    return await Poliza.findOrFail(params.id)
  }

  // Crear una nueva póliza (con validación XOR)
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(PolizaValidator)

    const tieneOperario = payload.idOperario !== undefined
    const tieneMaquina = payload.idMaquina !== undefined

    if (tieneOperario === tieneMaquina) {
      return response.badRequest({
        error: 'Debe asignar solo una máquina o un operario, no ambos ni ninguno.',
      })
    }

    const thePoliza = await Poliza.create(payload)
    return thePoliza
  }

  // Actualizar una póliza existente (con validación XOR)
  public async update({ params, request, response }: HttpContextContract) {
    const thePoliza = await Poliza.findOrFail(params.id)
    const payload = await request.validate(PolizaValidator)

    const tieneOperario = payload.idOperario !== undefined
    const tieneMaquina = payload.idMaquina !== undefined

    if (tieneOperario === tieneMaquina) {
      return response.badRequest({
        error: 'Debe asignar solo una máquina o un operario, no ambos ni ninguno.',
      })
    }

    thePoliza.idOperario = payload.idOperario
    thePoliza.idMaquina = payload.idMaquina
    thePoliza.idSeguro = payload.idSeguro
    thePoliza.fechaInicio = payload.fechaInicio
    thePoliza.fechaFin = payload.fechaFin
    thePoliza.estado = payload.estado ?? ''

    return await thePoliza.save()
  }

  // Eliminar una póliza
  public async destroy({ params, response }: HttpContextContract) {
    const thePoliza = await Poliza.findOrFail(params.id)
    await thePoliza.delete()
    response.status(204)
    return
  }
}
