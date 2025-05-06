import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext' // Tipo para manejar contexto HTTP
import Cuota from 'App/Models/Cuota'; // Modelo Cuota
import CuotaValidator from 'App/Validators/CuotaValidator'; // Validador de datos para crear/actualizar cuotas
import PaymentService from 'App/Services/PaymentService'; // Servicio externo para procesar pagos
import axios from 'axios'; // Cliente HTTP (aunque no se usa en este archivo)
import Env from '@ioc:Adonis/Core/Env' // Acceso a variables de entorno (aunque no se usa aquí)

export default class CuotasController {
    // Método para obtener cuotas (una o todas, con paginación opcional)
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            // Si hay un ID en los parámetros, busca una cuota específica
            let theCuota: Cuota = await Cuota.findOrFail(params.id)
            return theCuota;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                // Si se incluyen paginación, retorna página específica
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Cuota.query().paginate(page, perPage)
            } else {
                // Retorna todas las cuotas
                return await Cuota.query()
            }
        }
    }

    // Método para crear una nueva cuota
    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(CuotaValidator); // Valida datos
        const theCuota: Cuota = await Cuota.create(payload); // Crea cuota
        return theCuota;
    }

    // Método para actualizar una cuota existente
    public async update({ params, request }: HttpContextContract) {
        const theCuota: Cuota = await Cuota.findOrFail(params.id); // Busca cuota
        const payload = await request.validate(CuotaValidator); // Valida datos
        theCuota.id_servicio = payload.id_servicio; // Actualiza campo específico
        return await theCuota.save(); // Guarda cambios
    }

    // Método para eliminar una cuota
    public async delete({ params, response }: HttpContextContract) {
        const theCuota: Cuota = await Cuota.findOrFail(params.id); // Busca cuota
        response.status(204); // Código de éxito sin contenido
        return await theCuota.delete(); // Elimina la cuota
    }

    // Método para procesar el pago de una cuota
    public async pay({ params, response, request }: HttpContextContract) {
        try {
            const theCuota: Cuota = await Cuota.findOrFail(params.id); // Busca cuota

            // Valida presencia de todos los campos requeridos para el pago
            const requiredFields = [
                'card_number',
                'card_exp_year',
                'card_exp_month',
                'card_cvc',
                'customer_name',
                'customer_last_name',
                'customer_email',
                'customer_phone',
                'customer_doc_number'
            ];

            for (const field of requiredFields) {
                if (!request.input(field)) {
                    return response.status(400).json({
                        error: `El campo ${field} es requerido`
                    });
                }
            }

            // Construye el objeto de datos para el pago
            const paymentData = {
                card: {
                    number: request.input('card_number'),
                    exp_year: request.input('card_exp_year'),
                    exp_month: request.input('card_exp_month'),
                    cvc: request.input('card_cvc')
                },
                customer: {
                    name: request.input('customer_name'),
                    last_name: request.input('customer_last_name'),
                    email: request.input('customer_email'),
                    phone: request.input('customer_phone'),
                    doc_number: request.input('customer_doc_number')
                },
                description: request.input('description', `Pago de cuota #${theCuota.id}`),
                tax: request.input('tax', '0'),
                tax_base: request.input('tax_base', theCuota.monto.toString()),
                dues: request.input('dues', '1')
            };

            // Llama al servicio externo para procesar el pago
            const result = await PaymentService.processPayment(theCuota, paymentData);

            if (result.success) {
                // Pago exitoso
                return response.status(200).json(result.data);
            }

            // Error en el pago
            return response.status(400).json({
                error: result.error?.message ?? 'Unknown error',
                details: result.error?.details ?? 'No additional details available'
            });

        } catch (error) {
            // Error inesperado en el servidor
            console.error('Error en CuotasController:', error);
            return response.status(500).json({
                error: "Error interno del servidor",
                details: error.message
            });
        }
    }
}
