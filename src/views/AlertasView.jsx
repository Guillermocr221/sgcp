import { useState } from "react"

const initialAlertas = [
  {
    id: 1,
    contenedor: "CNT-003",
    estado: "Crítica",
    fecha: "2025-11-08",
    mensaje: "Contenedor con daño significativo",
    atendida: false,
  },
  {
    id: 2,
    contenedor: "CNT-025",
    estado: "Advertencia",
    fecha: "2025-11-08",
    mensaje: "Retraso en descarga",
    atendida: false,
  },
  {
    id: 3,
    contenedor: "CNT-010",
    estado: "Crítica",
    fecha: "2025-11-07",
    mensaje: "Contenedor perdido en terminal",
    atendida: true,
  },
]

const IconComponents = {
  AlertTriangle: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ),
  CheckCircle: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Clock: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

export default function AlertasView() {
  const [alertas, setAlertas] = useState(initialAlertas)

  const marcarAtendida = (id) => {
    setAlertas(alertas.map((a) => (a.id === id ? { ...a, atendida: !a.atendida } : a)))
  }

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Crítica":
        return "bg-red-100 text-red-700 border-red-200"
      case "Advertencia":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Información":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getIcono = (estado) => {
    switch (estado) {
      case "Crítica":
        return <IconComponents.AlertTriangle className="w-5 h-5 text-red-700" />
      case "Advertencia":
        return <IconComponents.Clock className="w-5 h-5 text-yellow-700" />
      case "Información":
        return <IconComponents.CheckCircle className="w-5 h-5 text-blue-700" />
      default:
        return <IconComponents.AlertTriangle className="w-5 h-5" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de alertas</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{alertas.length}</p>
              </div>
              <IconComponents.AlertTriangle className="w-6 h-6 text-blue-600 opacity-50" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pendientes</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{alertas.filter((a) => !a.atendida).length}</p>
              </div>
              <IconComponents.Clock className="w-6 h-6 text-red-600 opacity-50" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Atendidas</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{alertas.filter((a) => a.atendida).length}</p>
              </div>
              <IconComponents.CheckCircle className="w-6 h-6 text-green-600 opacity-50" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Listado de Alertas</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {alertas.map((alerta) => (
              <div
                key={alerta.id}
                className={`p-4 border rounded-lg flex items-start justify-between ${getEstadoColor(alerta.estado)} ${alerta.atendida ? "opacity-60" : ""}`}
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">{getIcono(alerta.estado)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{alerta.contenedor}</p>
                      <span className="text-xs px-2 py-1 bg-white/30 rounded-full">{alerta.estado}</span>
                    </div>
                    <p className="text-sm mt-1">{alerta.mensaje}</p>
                    <p className="text-xs mt-2 opacity-75">{alerta.fecha}</p>
                  </div>
                </div>
                <button
                  onClick={() => marcarAtendida(alerta.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    alerta.atendida
                      ? "bg-white/30 hover:bg-white/40 text-gray-700"
                      : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                  }`}
                >
                  {alerta.atendida ? "Reabrir" : "Atender"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}