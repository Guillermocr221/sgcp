import { useState } from "react"

const initialEmbarcaciones = [
  {
    id: 1,
    nombre: "SH-BANGKOK",
    bandera: "Panamá",
    fechaArribo: "2025-11-08",
    fechaSalida: "2025-11-15",
    capitán: "Juan Rodríguez",
  },
  {
    id: 2,
    nombre: "MAERSK-121",
    bandera: "Dinamarca",
    fechaArribo: "2025-11-10",
    fechaSalida: "2025-11-18",
    capitán: "Lars Eriksen",
  },
  {
    id: 3,
    nombre: "CMA-CGM-ANTOINE",
    bandera: "Francia",
    fechaArribo: "2025-11-12",
    fechaSalida: "2025-11-20",
    capitán: "Pierre Dubois",
  },
]

const IconComponents = {
  Plus: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Edit2: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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

export default function EmbarcacionesView() {
  const [embarcaciones, setEmbarcaciones] = useState(initialEmbarcaciones)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    nombre: "",
    bandera: "",
    fechaArribo: "",
    fechaSalida: "",
    capitán: "",
  })

  const handleOpenModal = (embarcacion) => {
    if (embarcacion) {
      setFormData(embarcacion)
      setEditingId(embarcacion.id)
    } else {
      setFormData({ nombre: "", bandera: "", fechaArribo: "", fechaSalida: "", capitán: "" })
      setEditingId(null)
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      setEmbarcaciones(embarcaciones.map((e) => (e.id === editingId ? { ...e, ...formData } : e)))
    } else {
      setEmbarcaciones([...embarcaciones, { id: Math.max(...embarcaciones.map((e) => e.id), 0) + 1, ...formData }])
    }
    handleCloseModal()
  }

  const handleDelete = (id) => {
    if (confirm("¿Está seguro de que desea eliminar esta embarcación?")) {
      setEmbarcaciones(embarcaciones.filter((e) => e.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">Total de embarcaciones: {embarcaciones.length}</p>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <IconComponents.Plus />
          Nueva embarcación
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Flota de Embarcaciones</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Nombre</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Bandera</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Capitán</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Arribo</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Salida</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {embarcaciones.map((embarcacion) => (
                  <tr
                    key={embarcacion.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-900 font-medium">{embarcacion.nombre}</td>
                    <td className="py-3 px-4 text-gray-700">{embarcacion.bandera}</td>
                    <td className="py-3 px-4 text-gray-600">{embarcacion.capitán}</td>
                    <td className="py-3 px-4 text-gray-600 text-xs">{embarcacion.fechaArribo}</td>
                    <td className="py-3 px-4 text-gray-600 text-xs">{embarcacion.fechaSalida}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleOpenModal(embarcacion)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <IconComponents.Edit2 />
                        </button>
                        <button
                          onClick={() => handleDelete(embarcacion.id)}
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
              <h3 className="text-lg font-semibold text-gray-900">
                {editingId ? "Editar Embarcación" : "Nueva Embarcación"}
              </h3>
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
                  <label className="text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    required
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej: MAERSK-121"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Bandera</label>
                  <input
                    required
                    type="text"
                    value={formData.bandera}
                    onChange={(e) => setFormData({ ...formData, bandera: e.target.value })}
                    placeholder="Ej: Panamá"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Capitán</label>
                  <input
                    required
                    type="text"
                    value={formData.capitán}
                    onChange={(e) => setFormData({ ...formData, capitán: e.target.value })}
                    placeholder="Nombre del capitán"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Fecha Arribo</label>
                  <input
                    required
                    type="date"
                    value={formData.fechaArribo}
                    onChange={(e) => setFormData({ ...formData, fechaArribo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Fecha Salida</label>
                  <input
                    required
                    type="date"
                    value={formData.fechaSalida}
                    onChange={(e) => setFormData({ ...formData, fechaSalida: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    {editingId ? "Actualizar" : "Crear"}
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