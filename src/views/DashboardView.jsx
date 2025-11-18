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

const statsData = [
  { label: "Total Contenedores", value: 1243, icon: "Container" },
  { label: "Embarcaciones Activas", value: 12, icon: "TrendingUp" },
  { label: "Total Clientes", value: 89, icon: "Users" },
  { label: "Alertas Activas", value: 5, icon: "AlertTriangle" },
]

const chartData = [
  { mes: "Ene", operativos: 400, dañados: 50, inspección: 30 },
  { mes: "Feb", operativos: 420, dañados: 45, inspección: 35 },
  { mes: "Mar", operativos: 450, dañados: 55, inspección: 28 },
  { mes: "Abr", operativos: 480, dañados: 42, inspección: 32 },
  { mes: "May", operativos: 510, dañados: 48, inspección: 25 },
]

const pieData = [
  { name: "Operativo", value: 70 },
  { name: "Dañado", value: 15 },
  { name: "Inspección", value: 15 },
]

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"]

const IconComponents = {
  Container: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  TrendingUp: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Users: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  AlertTriangle: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
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

export default function DashboardView() {
  const [selectedReporte, setSelectedReporte] = useState(null)

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => {
          const IconComponent = IconComponents[stat.icon]
          return (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{stat.value}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <IconComponent />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Contenedores por Estado</h3>
            <p className="text-sm text-gray-600 mt-1">Últimos 5 meses</p>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mes" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="operativos" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="dañados" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="inspección" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Estado General</h3>
            <p className="text-sm text-gray-600 mt-1">Distribución actual</p>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
            <p className="text-sm text-gray-600 mt-1">Últimos movimientos registrados</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { container: "CNT-001", type: "Entrada", date: "Hoy 14:30", status: "completed" },
                { container: "CNT-025", type: "Salida", date: "Hoy 10:15", status: "completed" },
                { container: "CNT-043", type: "Inspección", date: "Ayer 16:45", status: "pending" },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{activity.container}</p>
                    <p className="text-sm text-gray-600">
                      {activity.type} - {activity.date}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      activity.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {activity.status === "completed" ? "Completado" : "Pendiente"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}