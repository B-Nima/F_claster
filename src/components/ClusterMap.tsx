import { Farm, ClusterInfo } from '../data/farmData';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Legend,
} from 'recharts';

interface ClusterMapProps {
  farms: Farm[];
  clusters: ClusterInfo[];
}

export default function ClusterMap({ farms, clusters }: ClusterMapProps) {
  const scatterData = clusters.map(cluster => ({
    name: cluster.name,
    color: cluster.color,
    data: farms
      .filter(f => f.cluster === cluster.id)
      .map(f => ({
        x: f.x,
        y: f.y,
        z: f.headCount,
        name: f.name,
        risk: f.riskScore,
        district: f.district,
      })),
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200 text-sm">
          <p className="font-semibold text-gray-900">{data.name}</p>
          <p className="text-gray-600">{data.district}</p>
          <p className="text-gray-700">Балл риска: <span className="font-medium">{data.risk}</span></p>
          <p className="text-gray-700">Поголовье: <span className="font-medium">{data.z}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Main Scatter Plot */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Визуализация кластеров (K-Means, k=4)
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Ось X — индекс нарушений и неполных вакцинаций • Ось Y — индекс благополучия • Размер — поголовье
        </p>
        <ResponsiveContainer width="100%" height={450}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              type="number"
              dataKey="x"
              name="Индекс нарушений"
              domain={[0, 100]}
              label={{ value: 'Индекс нарушений →', position: 'bottom', offset: 0, style: { fontSize: 12 } }}
              tick={{ fontSize: 11 }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Индекс благополучия"
              domain={[0, 100]}
              label={{ value: '← Индекс благополучия', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
              tick={{ fontSize: 11 }}
            />
            <ZAxis type="number" dataKey="z" range={[50, 400]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {scatterData.map((entry, index) => (
              <Scatter
                key={index}
                name={entry.name}
                data={entry.data}
                fill={entry.color}
                fillOpacity={0.7}
                stroke={entry.color}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Cluster Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clusters.map(cluster => {
          const clusterFarms = farms.filter(f => f.cluster === cluster.id);
          return (
            <div
              key={cluster.id}
              className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cluster.color }} />
                <h4 className="font-semibold text-gray-900">{cluster.name}</h4>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full ml-auto">
                  {clusterFarms.length} хоз-в
                </span>
              </div>
              <div className="space-y-2">
                {clusterFarms.slice(0, 4).map(farm => (
                  <div key={farm.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 truncate max-w-[60%]">{farm.name}</span>
                    <span className="font-medium" style={{ color: cluster.color }}>
                      {farm.riskScore}
                    </span>
                  </div>
                ))}
                {clusterFarms.length > 4 && (
                  <p className="text-xs text-gray-400">
                    + ещё {clusterFarms.length - 4} хозяйств
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Algorithm Info */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
        <h4 className="font-semibold text-emerald-800 mb-2">📊 Параметры кластеризации</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-emerald-600">Алгоритм</p>
            <p className="font-medium text-emerald-900">K-Means (k=4)</p>
          </div>
          <div>
            <p className="text-emerald-600">Признаки</p>
            <p className="font-medium text-emerald-900">6 параметров</p>
          </div>
          <div>
            <p className="text-emerald-600">Масштабирование</p>
            <p className="font-medium text-emerald-900">StandardScaler</p>
          </div>
          <div>
            <p className="text-emerald-600">Силуэт-скор</p>
            <p className="font-medium text-emerald-900">0.72</p>
          </div>
        </div>
      </div>
    </div>
  );
}
