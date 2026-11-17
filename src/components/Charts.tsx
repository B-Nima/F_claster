import { Farm, ClusterInfo } from '../data/farmData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
  Area,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

interface ChartsProps {
  farms: Farm[];
  clusters: ClusterInfo[];
  riskByDistrict: { district: string; avgRisk: number; farmsCount: number }[];
  monthlyOutbreaks: { month: string; outbreaks: number; vaccinations: number }[];
}

export default function Charts({ farms, clusters, riskByDistrict, monthlyOutbreaks }: ChartsProps) {
  // Данные для radar chart по кластерам
  const radarData = [
    {
      subject: 'Вакцинация',
      ...Object.fromEntries(clusters.map(c => {
        const cf = farms.filter(f => f.cluster === c.id);
        const avg = cf.length > 0
          ? Math.round(cf.reduce((s, f) => s + (f.vaccinationsComplete / f.vaccinationsTotal) * 100, 0) / cf.length)
          : 0;
        return [c.name, avg];
      })),
    },
    {
      subject: 'Обработки',
      ...Object.fromEntries(clusters.map(c => {
        const cf = farms.filter(f => f.cluster === c.id);
        const avg = cf.length > 0
          ? Math.round(cf.reduce((s, f) => s + (f.treatmentsComplete / f.treatmentsTotal) * 100, 0) / cf.length)
          : 0;
        return [c.name, avg];
      })),
    },
    {
      subject: 'Без вспышек',
      ...Object.fromEntries(clusters.map(c => {
        const cf = farms.filter(f => f.cluster === c.id);
        const avg = cf.length > 0
          ? Math.round(100 - cf.reduce((s, f) => s + f.diseaseOutbreaks, 0) / cf.length * 15)
          : 0;
        return [c.name, Math.max(0, avg)];
      })),
    },
    {
      subject: 'Нет нарушений',
      ...Object.fromEntries(clusters.map(c => {
        const cf = farms.filter(f => f.cluster === c.id);
        const avg = cf.length > 0
          ? Math.round(100 - cf.reduce((s, f) => s + f.violationsCount, 0) / cf.length * 10)
          : 0;
        return [c.name, Math.max(0, avg)];
      })),
    },
    {
      subject: 'Регулярность проверок',
      ...Object.fromEntries(clusters.map(c => {
        const base = [95, 75, 55, 30];
        return [c.name, base[c.id]];
      })),
    },
  ];

  // Данные по типам животных
  const animalTypeData = ['КРС', 'МРС', 'Свиньи', 'Птица', 'Лошади'].map(type => {
    const typeFarms = farms.filter(f => f.animalType === type);
    return {
      type,
      farms: typeFarms.length,
      avgRisk: typeFarms.length > 0
        ? Math.round(typeFarms.reduce((s, f) => s + f.riskScore, 0) / typeFarms.length * 10) / 10
        : 0,
      totalHead: typeFarms.reduce((s, f) => s + f.headCount, 0),
    };
  });

  return (
    <div className="space-y-6">
      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk by District */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Средний балл риска по районам</h3>
          <p className="text-sm text-gray-500 mb-4">Рейтинг районов по уровню эпизоотического риска</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskByDistrict} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="district" tick={{ fontSize: 11 }} width={110} />
              <Tooltip
                formatter={(value: number, name: string) => [`${value}`, 'Ср. балл риска']}
                labelFormatter={(label) => `${label} район`}
              />
              <Bar dataKey="avgRisk" fill="#f97316" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Профили кластеров</h3>
          <p className="text-sm text-gray-500 mb-4">Сравнение показателей по кластерам</p>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9 }} />
              {clusters.map(c => (
                <Radar
                  key={c.id}
                  name={c.name}
                  dataKey={c.name}
                  stroke={c.color}
                  fill={c.color}
                  fillOpacity={0.15}
                />
              ))}
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Outbreaks */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Динамика вспышек и вакцинаций</h3>
          <p className="text-sm text-gray-500 mb-4">Ежемесячная статистика за 2024 год</p>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={monthlyOutbreaks}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="vaccinations"
                fill="#10b98120"
                stroke="#10b981"
                name="Вакцинаций"
              />
              <Bar yAxisId="left" dataKey="outbreaks" fill="#ef4444" radius={[4, 4, 0, 0]} name="Вспышки" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Animal Types */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Риск по видам животных</h3>
          <p className="text-sm text-gray-500 mb-4">Средний балл риска и количество хозяйств</p>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={animalTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="type" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar yAxisId="left" dataKey="farms" fill="#6366f1" radius={[4, 4, 0, 0]} name="Кол-во хозяйств" />
              <Line yAxisId="right" type="monotone" dataKey="avgRisk" stroke="#ef4444" strokeWidth={2} name="Ср. балл риска" dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Vaccination Coverage Chart */}
      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Покрытие вакцинациями по хозяйствам</h3>
        <p className="text-sm text-gray-500 mb-4">Процент выполненных вакцинаций от запланированных (цвет = кластер риска)</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={farms.map(f => ({
              name: f.name.substring(0, 12),
              coverage: Math.round((f.vaccinationsComplete / f.vaccinationsTotal) * 100),
              fill: clusters[f.cluster].color,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 8 }} angle={-45} textAnchor="end" height={80} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(value: number) => [`${value}%`, 'Покрытие']} />
            <Bar dataKey="coverage" radius={[4, 4, 0, 0]}>
              {farms.map((f, i) => (
                <rect key={i} fill={clusters[f.cluster].color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
