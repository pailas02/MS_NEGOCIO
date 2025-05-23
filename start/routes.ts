import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

import './routes/Chats'
import './routes/Combos'
import './routes/Cuotas'
import './routes/Departamentos'
import './routes/Evidencias'
import './routes/Especialidad'
import './routes/EspecialidadMaquinarias'
import './routes/EspecialidadOperarios'
import './routes/Facturas'
import './routes/GPS'
import './routes/Gobernantes'
import './routes/GobernantesMunicipios'
import './routes/MaquinaCombos'
import './routes/Maquinas'
import './routes/Mantenimientos'
import './routes/Mensajes'
import './routes/Municipios'
import './routes/Novedad'
import './routes/Obras'
import './routes/ObrasMunicipios'
import './routes/Operarios'
import './routes/Polizas'
import './routes/ProcedimientoMantenimientos'
import './routes/Procedimientos'
import './routes/Seguros'
import './routes/Servicios'
import './routes/TipoServicios'
import './routes/Turnos'
import './routes/Usuarios'
