import { useState } from "react"

const initialMovimientos = [
  {
    id: 1,
    contenedor: "CNT-001",
    tipoMovimiento: "Entrada",
    fecha: "2025-11-08 14:30",
    observaciones: "Ingreso normal sin novedad",
  },
  {
    id: 2,
    contenedor: "CNT-002",
    tipoMovimiento: "Carga",
    fecha: "2025-11-08 10:15",
    observaciones: "Cargado en MAERSK-121",
  },
  {
    id: 3,
    contenedor: "CNT-003",
    tipoMovimiento: "Inspección",
    fecha: "2025-11-07 16:45",
    observaciones: "Daño menor en puerta",
  },
]

const tiposMovimiento = ["Entrada", "Salida", "Carga", "Descarga", "Transferencia", "Inspección"]

const IconComponents = {
  Plus: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Trash2: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  X: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export default function MovimientosView() {
  const [movimientos, setMovimientos] = useState(initialMovimientos)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    contenedor: "",
    tipoMovimiento: "Entrada",
    fecha: "",
    observaciones: "",
  })

  const handleOpenModal = () => {
    setFormData({ contenedor: "", tipoMovimiento: "Entrada", fecha: "", observaciones: "" })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setMovimientos([...movimientos, { id: Math.max(...movimientos.map((m) => m.id), 0) + 1, ...formData }])
    handleCloseModal()
  }

  const handleDelete = (id) => {
    if (confirm("¿Eliminar este movimiento?")) {
      setMovimientos(movimientos.filter((m) => m.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">Total de movimientos: {movimientos.length}</p>
        <button 
          onClick={handleOpenModal} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <IconComponents.Plus />
          Registrar movimiento
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Registro de Movimientos</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Contenedor</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Tipo</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Fecha y Hora</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Observaciones</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {movimientos.map((movimiento) => (
                  <tr key={movimiento.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-gray-900 font-mono font-semibold">{movimiento.contenedor}</td>
                    <td className="py-3 px-4 text-gray-700">{movimiento.tipoMovimiento}</td>
                    <td className="py-3 px-4 text-gray-600 text-xs">{movimiento.fecha}</td>
                    <td className="py-3 px-4 text-gray-600 text-xs">{movimiento.observaciones}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleDelete(movimiento.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                          title="Eliminar"
                        >
                          <IconComponents.Trash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Registrar Movimiento</h3>
              <button 
                onClick={handleCloseModal} 
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <IconComponents.X />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Contenedor</label>
                  <input
                    required
                    type="text"
                    value={formData.contenedor}
                    onChange={(e) => setFormData({ ...formData, contenedor: e.target.value })}
                    placeholder="CNT-001"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Tipo Movimiento</label>
                  <select
                    value={formData.tipoMovimiento}
                    onChange={(e) => setFormData({ ...formData, tipoMovimiento: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                  >
                    {tiposMovimiento.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Fecha y Hora</label>
                  <input
                    required
                    type="datetime-local"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Observaciones</label>
                  <textarea
                    value={formData.observaciones}
                    onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                    placeholder="Notas sobre el movimiento"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Registrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}