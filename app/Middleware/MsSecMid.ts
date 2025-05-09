import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class MsSecMid {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const theRequest = request.toJSON()
    console.log('Request recibido:', theRequest)

    // Verificar si existe el header de autorización
    if (!theRequest.headers.authorization) {
      console.log('Falta el token de autorización')
      return response.status(401).json({ message: 'Unauthorized: Missing token' })
    }

    const token = theRequest.headers.authorization.replace('Bearer ', '')
    const normalizedUrl = theRequest.url.replace(/\/\d+(?=\/|$)/g, '/:id')

    const thePermission = {
      url: normalizedUrl,
      method: theRequest.method,
    }

    try {
      const { data } = await axios.post(
        `${Env.get('MS_SECURITY')}/api/public/security/permissions-validation`,
        thePermission,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log('Respuesta completa de ms-security:', data)

      if (data === true || data?.success === true) {
        await next()
      } else {
        console.log('Acceso denegado por ms-security')
        return response.status(403).json({ message: 'Forbidden: Access denied' })
      }
    } catch (error) {
      console.error('Error al validar con ms-security:', error.message)
      console.error('Detalles:', error.response?.data ?? error)
      return response.status(500).json({ message: 'Internal Server Error: Validation failed' })
    }
  }
}
