import { useState } from "react"

// Datos simulados
const initialContenedores = [
  {
    id: 1,
    codigo: "CNT-001",
    tipo: "20ft",
    estado: "Operativo",
    peso: 2400,
    cliente: "Importaciones Chile",
    embarcacion: "SH-BANGKOK",
  },
  {
    id: 2,
    codigo: "CNT-002",
    tipo: "40ft",
    estado: "Operativo",
    peso: 4800,
    cliente: "Exportadora del Sur",
    embarcacion: "SH-BANGKOK",
  },
  {
    id: 3,
    codigo: "CNT-003",
    tipo: "20ft",
    estado: "Dañado",
    peso: 1200,
    cliente: "Puerto Logística",
    embarcacion: "MAERSK-121",
  },
  {
    id: 4,
    codigo: "CNT-004",
    tipo: "40ft",
    estado: "Inspección",
    peso: 3600,
    cliente: "Marine Services",
    embarcacion: "MAERSK-121",
  },
]

const estados = ["Operativo", "Dañado", "Inspección", "En tránsito"]
const tipos = ["20ft", "40ft", "Specialized"]

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

export default function ContenedoresView() {
  const [contenedores, setContenedores] = useState(initialContenedores)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [filtroEstado, setFiltroEstado] = useState("Todos")
  const [formData, setFormData] = useState({
    codigo: "",
    tipo: "20ft",
    estado: "Operativo",
    peso: 0,
    cliente: "",
    embarcacion: "",
  })

  const contenedoresFiltrados =
    filtroEstado === "Todos" ? contenedores : contenedores.filter((c) => c.estado === filtroEstado)

  const getEstadoBadge = (estado) => {
    const colors = {
      Operativo: "bg-green-100 text-green-700",
      Dañado: "bg-red-100 text-red-700",
      Inspección: "bg-yellow-100 text-yellow-700",
      "En tránsito": "bg-blue-100 text-blue-700",
    }
    return colors[estado] || "bg-gray-100 text-gray-700"
  }

  const handleOpenModal = (contenedor) => {
    if (contenedor) {
      setFormData(contenedor)
      setEditingId(contenedor.id)
    } else {
      setFormData({ codigo: "", tipo: "20ft", estado: "Operativo", peso: 0, cliente: "", embarcacion: "" })
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
      setContenedores(contenedores.map((c) => (c.id === editingId ? { ...c, ...formData } : c)))
    } else {
      setContenedores([...contenedores, { id: Math.max(...contenedores.map((c) => c.id), 0) + 1, ...formData }])
    }
    handleCloseModal()
  }

  const handleDelete = (id) => {
    if (confirm("¿Está seguro de que desea eliminar este contenedor?")) {
      setContenedores(contenedores.filter((c) => c.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <p className="text-sm text-gray-600">Total de contenedores: {contenedoresFiltrados.length}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="flex gap-1">
            <button
              onClick={() => setFiltroEstado("Todos")}
              className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                filtroEstado === "Todos"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              Todos
            </button>
            {estados.map((estado) => (
              <button
                key={estado}
                onClick={() => setFiltroEstado(estado)}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  filtroEstado === estado
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                {estado}
              </button>
            ))}
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <IconComponents.Plus />
            Nuevo
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Lista de Contenedores</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Código</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Tipo</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Estado</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Peso (kg)</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Cliente</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Embarcación</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {contenedoresFiltrados.map((contenedor) => (
                  <tr key={contenedor.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-gray-900 font-mono font-semibold">{contenedor.codigo}</td>
                    <td className="py-3 px-4 text-gray-700">{contenedor.tipo}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getEstadoBadge(contenedor.estado)}`}
                      >
                        {contenedor.estado}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{contenedor.peso.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-600 text-xs">{contenedor.cliente}</td>
                    <td className="py-3 px-4 text-gray-600 text-xs">{contenedor.embarcacion}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleOpenModal(contenedor)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <IconComponents.Edit2 />
                        </button>
                        <button
                          onClick={() => handleDelete(contenedor.id)}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingId ? "Editar Contenedor" : "Nuevo Contenedor"}
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
                  <label className="text-sm font-medium text-gray-700">Código</label>
                  <input
                    required
                    type="text"
                    value={formData.codigo}
                    onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                    placeholder="CNT-001"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Tipo</label>
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                  >
                    {tipos.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Estado</label>
                  <select
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                  >
                    {estados.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Peso (kg)</label>
                  <input
                    required
                    type="number"
                    value={formData.peso}
                    onChange={(e) => setFormData({ ...formData, peso: parseInt(e.target.value) })}
                    placeholder="2400"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Cliente</label>
                  <input
                    required
                    type="text"
                    value={formData.cliente}
                    onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                    placeholder="Nombre del cliente"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Embarcación</label>
                  <input
                    required
                    type="text"
                    value={formData.embarcacion}
                    onChange={(e) => setFormData({ ...formData, embarcacion: e.target.value })}
                    placeholder="Nombre de la embarcación"
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