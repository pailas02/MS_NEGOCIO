import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MaquinaCombo from 'App/Models/MaquinaCombo'
import MaquinaComboValidator from 'App/Validators/MaquinaComboValidator'

export default class MaquinaCombosController {
  public async index() {
    return await MaquinaCombo.all()
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(MaquinaComboValidator)
    const mc = await MaquinaCombo.create(data)
    return response.created(mc)
  }

  public async show({ params, response }: HttpContextContract) {
    const mc = await MaquinaCombo.find(params.id)
    if (!mc) return response.notFound({ message: 'No encontrado' })
    return mc
  }

  public async destroy({ params, response }: HttpContextContract) {
    const mc = await MaquinaCombo.find(params.id)
    if (!mc) return response.notFound({ message: 'No encontrado' })
    await mc.delete()
    return response.ok({ message: 'Eliminado' })
  }
}
