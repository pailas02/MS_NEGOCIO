import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EspecialidadMaquina from 'App/Models/EspecialidadMaquina'

export default class EspecialidadesMaquinaController {

  // Listar todas las relaciones
  public async index({ response }: HttpContextContract) {
    const especialidades = await EspecialidadMaquina.all()
    return response.ok(especialidades)
  }

  // Crear una nueva relación
  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['tipoServicioId', 'maquinaId'])
    const especialidad = await EspecialidadMaquina.create(data)
    return response.created(especialidad)
  }

  // Mostrar una relación específica
  public async show({ params, response }: HttpContextContract) {
    const especialidad = await EspecialidadMaquina.findOrFail(params.id)
    return response.ok(especialidad)
  }

  // Actualizar una relación específica
  public async update({ params, request, response }: HttpContextContract) {
    const especialidad = await EspecialidadMaquina.findOrFail(params.id)
    const data = request.only(['tipoServicioId', 'maquinaId'])

    especialidad.merge(data)
    await especialidad.save()

    return response.ok(especialidad)
  }

  // Eliminar una relación específica
  public async destroy({ params, response }: HttpContextContract) {
    const especialidad = await EspecialidadMaquina.findOrFail(params.id)
    await especialidad.delete()

    return response.noContent()
  }
}
