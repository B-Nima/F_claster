import { Farm, ClusterInfo } from '../data/farmData';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { AlertTriangle, Shield, CheckCircle, TrendingUp, Users, MapPin } from 'lucide-react';

interface DashboardProps {
  farms: Farm[];
  clusters: ClusterInfo[];
  clusterDistribution: { name: string; value: number; color: string }[];
}

export default function Dashboard({ farms, clusters, clusterDistribution }: DashboardProps) {
  const totalFarms = farms.length;
  const totalAnimals = farms.reduce((sum, f) => sum + f.headCount, 0);
  const highRiskFarms = farms.filter(f => f.cluster === 3).length;
  const avgRisk = Math.round(farms.reduce((sum, f) => sum + f.riskScore, 0) / totalFarms * 10) / 10;
  const totalOutbreaks = farms.reduce((sum, f) => sum + f.diseaseOutbreaks, 0);
  const avgVaccination = Math.round(
    farms.reduce((sum, f) => sum + (f.vaccinationsComplete / f.vaccinationsTotal) * 100, 0) / totalFarms
  );

  const stats = [
    {
      label: 'Всего хозяйств',
      value: totalFarms,
      icon: MapPin,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      label: 'Поголовье (всего)',
      value: totalAnimals.toLocaleString(),
      icon: Users,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
    {
      label: 'Высокий риск',
      value: highRiskFarms,
      icon: AlertTriangle,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
    },
    {
      label: 'Средний балл риска',
      value: avgRisk,
      icon: TrendingUp,
      color: 'bg-amber-500',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
    },
    {
      label: 'Вспышки заболеваний',
      value: totalOutbreaks,
      icon: Shield,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
    },
    {
      label: 'Покрытие вакцинаций',
      value: `${avgVaccination}%`,
      icon: CheckCircle,
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`${stat.bgColor} rounded-xl p-4 border border-gray-100`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`${stat.color} p-1.5 rounded-lg`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Cluster Cards + Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cluster Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {clusters.map((cluster) => (
            <div
              key={cluster.id}
              className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: cluster.color }}
                />
                <h3 className="font-semibold text-gray-900">{cluster.name}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">{cluster.description}</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{cluster.farmsCount}</p>
                  <p className="text-xs text-gray-500">хозяйств</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold" style={{ color: cluster.color }}>
                    {cluster.avgRisk}
                  </p>
                  <p className="text-xs text-gray-500">ср. балл риска</p>
                </div>
              </div>
              <div className="mt-3 bg-gray-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${(cluster.farmsCount / totalFarms) * 100}%`,
                    backgroundColor: cluster.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Распределение по кластерам</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={clusterDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {clusterDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value} хозяйств`, name]}
              />
              <Legend
                layout="vertical"
                align="center"
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alert Section */}
      {highRiskFarms > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-800">Внимание: хозяйства высокого риска</h4>
              <p className="text-sm text-red-700 mt-1">
                Обнаружено {highRiskFarms} хозяйств с критическим уровнем риска. 
                Рекомендуется проведение внеплановых ветеринарных проверок и усиление контроля 
                за выполнением противоэпизоотических мероприятий.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {farms
                  .filter(f => f.cluster === 3)
                  .slice(0, 5)
                  .map(f => (
                    <span
                      key={f.id}
                      className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full"
                    >
                      {f.name}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
