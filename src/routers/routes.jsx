import {HashRouter  as Router, Routes, Route} from 'react-router-dom'
import { Login } from '../pages/login'
// import { Dashboard } from '../pages/dashboard'
// import { Clientes } from '../pages/clientes'
// import { Contenedores } from '../pages/contenedores'
// import { Embarcaciones } from '../pages/embarcaciones'
import { Dashboard, Clientes, Contenedores, Embarcaciones, Movimientos, Usuarios, Alertas, Reportes } from '../pages/principal'

export default function MyRoutes() {

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login />} />    
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/contenedores" element={<Contenedores />} />
                <Route path="/embarcaciones" element={<Embarcaciones />} />
                <Route path="/movimientos" element={<Movimientos />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/alertas" element={<Alertas />} />
                <Route path="/reportes" element={<Reportes />} />
            </Routes>
        </Router>
    )
}