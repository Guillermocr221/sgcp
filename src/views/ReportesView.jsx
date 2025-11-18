import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Datos simulados para reportes
const reportesData = [
  {
    id: 1,
    nombre: "Contenedores por Cliente",
    descripcion: "Distribución de contenedores por empresa cliente",
    data: [
      { nombre: "Importaciones Chile", value: 350 },
      { nombre: "Exportadora del Sur", value: 280 },
      { nombre: "Puerto Logística", value: 200 },
      { nombre: "Marine Services", value: 220 },
    ],
    tipo: "pie",
  },
  {
    id: 2,
    nombre: "Productos Más Transportados",
    descripcion: "Top 10 productos en cantidad de contenedores",
    data: [
      { producto: "Electrónica", cantidad: 450 },
      { producto: "Textiles", cantidad: 380 },
      { producto: "Alimentos", cantidad: 290 },
      { producto: "Químicos", cantidad: 210 },
      { producto: "Maquinaria", cantidad: 180 },
    ],
    tipo: "bar",
  },
  {
    id: 3,
    nombre: "Contenedores por Estado",
    descripcion: "Estado actual de todos los contenedores",
    data: [
      { estado: "Operativo", cantidad: 890 },
      { estado: "Dañado", cantidad: 45 },
      { estado: "Inspección", cantidad: 38 },
      { estado: "En tránsito", cantidad: 62 },
    ],
    tipo: "bar",
  },
  {
    id: 4,
    nombre: "Embarcaciones Activas",
    descripcion: "Flota activa en puerto y en tránsito",
    data: [
      { mes: "Oct", activas: 8, tránsito: 5 },
      { mes: "Nov", activas: 12, tránsito: 7 },
      { mes: "Dic", activas: 10, tránsito: 6 },
    ],
    tipo: "line",
  },
  {
    id: 5,
    nombre: "Movimientos Recientes",
    descripcion: "Últimos 30 días de actividad portuaria",
    data: [
      { fecha: "1-5 Nov", entradas: 125, salidas: 98, transferencias: 45 },
      { fecha: "6-10 Nov", entradas: 142, salidas: 112, transferencias: 52 },
      { fecha: "11-15 Nov", entradas: 138, salidas: 108, transferencias: 48 },
    ],
    tipo: "bar",
  },
  {
    id: 6,
    nombre: "Alertas Activas",
    descripcion: "Distribución de alertas por criticidad",
    data: [
      { criticidad: "Crítica", cantidad: 5 },
      { criticidad: "Advertencia", cantidad: 12 },
      { criticidad: "Información", cantidad: 28 },
    ],
    tipo: "pie",
  },
  {
    id: 7,
    nombre: "Clientes con Mayor Carga Total",
    descripcion: "Volumen en toneladas por cliente",
    data: [
      { cliente: "Importaciones Chile", toneladas: 5420 },
      { cliente: "Exportadora del Sur", toneladas: 4280 },
      { cliente: "Puerto Logística", toneladas: 3850 },
      { cliente: "Marine Services", toneladas: 2940 },
    ],
    tipo: "bar",
  },
  {
    id: 8,
    nombre: "Valor Total Estimado",
    descripcion: "Monto total de carga en terminal (USD)",
    data: [
      { semana: "Sem 44", valor: 2450000 },
      { semana: "Sem 45", valor: 2890000 },
      { semana: "Sem 46", valor: 2620000 },
    ],
    tipo: "line",
  },
  {
    id: 9,
    nombre: "Contenedores Dañados",
    descripcion: "Histórico de daños por mes",
    data: [
      { mes: "Septiembre", daños: 12 },
      { mes: "Octubre", daños: 18 },
      { mes: "Noviembre", daños: 15 },
    ],
    tipo: "bar",
  },
  {
    id: 10,
    nombre: "Log de Usuarios",
    descripcion: "Actividad de acceso de usuarios al sistema",
    data: [
      { usuario: "admin", accesos: 245, última: "2025-11-08 14:30" },
      { usuario: "operador1", accesos: 189, última: "2025-11-08 13:45" },
      { usuario: "operador2", accesos: 156, última: "2025-11-08 12:15" },
    ],
    tipo: "tabla",
  },
]

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"]

const IconComponents = {
  TrendingUp: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Eye: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  Download: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  FileText: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

function ReporteModal({ reporte, onClose }) {
  const renderChart = () => {
    switch (reporte.tipo) {
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reporte.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey={reporte.data[0]?.value ? "value" : "cantidad"}
              >
                {reporte.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reporte.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey={Object.keys(reporte.data[0])[0]} stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey={Object.keys(reporte.data[0])[1]} fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        )
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reporte.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey={Object.keys(reporte.data[0])[0]} stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              {Object.keys(reporte.data[0]).map(
                (key, idx) =>
                  key !== Object.keys(reporte.data[0])[0] && (
                    <Line
                      key={idx}
                      type="monotone"
                      dataKey={key}
                      stroke={COLORS[idx % COLORS.length]}
                      strokeWidth={2}
                    />
                  ),
              )}
            </LineChart>
          </ResponsiveContainer>
        )
      case "tabla":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200">
                <tr>
                  {Object.keys(reporte.data[0]).map((key) => (
                    <th key={key} className="text-left py-3 px-4 font-semibold text-gray-900">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reporte.data.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    {Object.values(row).map((val, vIdx) => (
                      <td key={vIdx} className="py-3 px-4 text-gray-700 text-xs">
                        {String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{reporte.nombre}</h3>
            <p className="text-sm text-gray-600 mt-1">{reporte.descripcion}</p>
          </div>
          <button onClick={onClose} className="text-2xl hover:opacity-50 text-gray-500">
            ×
          </button>
        </div>
        <div className="p-6">
          {renderChart()}
          <div className="mt-6 flex gap-3">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <IconComponents.Download />
              Descargar PDF
            </button>
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <IconComponents.FileText />
              Descargar Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ReportesView() {
  const [selectedReporte, setSelectedReporte] = useState(null)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportesData.map((reporte) => (
          <div
            key={reporte.id}
            className="border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer bg-white rounded-lg"
            onClick={() => setSelectedReporte(reporte)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{reporte.nombre}</h3>
                  <p className="text-xs text-gray-600 mt-2">{reporte.descripcion}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg ml-2">
                  <IconComponents.TrendingUp />
                </div>
              </div>
            </div>
            <div className="px-6 pb-6">
              <div className="flex gap-2 pt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedReporte(reporte)
                  }}
                  className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <IconComponents.Eye />
                  Ver
                </button>
                <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1">
                  <IconComponents.Download />
                  Exportar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedReporte && <ReporteModal reporte={selectedReporte} onClose={() => setSelectedReporte(null)} />}
    </div>
  )
}