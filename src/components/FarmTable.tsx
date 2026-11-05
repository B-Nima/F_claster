import { useState } from 'react';
import { Farm, ClusterInfo } from '../data/farmData';
import { Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface FarmTableProps {
  farms: Farm[];
  clusters: ClusterInfo[];
}

export default function FarmTable({ farms, clusters }: FarmTableProps) {
  const [search, setSearch] = useState('');
  const [clusterFilter, setClusterFilter] = useState<number | null>(null);
  const [sortField, setSortField] = useState<keyof Farm>('riskScore');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const filteredFarms = farms
    .filter(f => {
      const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.district.toLowerCase().includes(search.toLowerCase());
      const matchCluster = clusterFilter === null || f.cluster === clusterFilter;
      return matchSearch && matchCluster;
    })
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return sortDir === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

  const handleSort = (field: keyof Farm) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const SortIcon = ({ field }: { field: keyof Farm }) => {
    if (sortField !== field) return <ChevronDown className="w-3 h-3 text-gray-300" />;
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 text-emerald-600" />
      : <ChevronDown className="w-3 h-3 text-emerald-600" />;
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по названию или району..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={clusterFilter === null ? '' : clusterFilter}
              onChange={(e) => setClusterFilter(e.target.value === '' ? null : Number(e.target.value))}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Все кластеры</option>
              {clusters.map(c => (
                <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Найдено: {filteredFarms.length} из {farms.length} хозяйств
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left font-medium text-gray-600">№</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Хозяйство</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Район</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 cursor-pointer select-none"
                  onClick={() => handleSort('animalType')}>
                  <div className="flex items-center gap-1">
                    Тип <SortIcon field="animalType" />
                  </div>
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-600 cursor-pointer select-none"
                  onClick={() => handleSort('headCount')}>
                  <div className="flex items-center gap-1 justify-end">
                    Поголовье <SortIcon field="headCount" />
                  </div>
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-600 cursor-pointer select-none"
                  onClick={() => handleSort('riskScore')}>
                  <div className="flex items-center gap-1 justify-end">
                    Балл риска <SortIcon field="riskScore" />
                  </div>
                </th>
                <th className="px-4 py-3 text-center font-medium text-gray-600">Вакцинация</th>
                <th className="px-4 py-3 text-center font-medium text-gray-600">Кластер</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600 cursor-pointer select-none"
                  onClick={() => handleSort('diseaseOutbreaks')}>
                  <div className="flex items-center gap-1 justify-end">
                    Вспышки <SortIcon field="diseaseOutbreaks" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredFarms.map((farm, idx) => {
                const vaccPercent = Math.round((farm.vaccinationsComplete / farm.vaccinationsTotal) * 100);
                const cluster = clusters[farm.cluster];
                return (
                  <tr key={farm.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 truncate max-w-[180px]">{farm.name}</p>
                      <p className="text-xs text-gray-400">{farm.lastInspection}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{farm.district}</td>
                    <td className="px-4 py-3 text-gray-600">{farm.animalType}</td>
                    <td className="px-4 py-3 text-right text-gray-700 font-medium">{farm.headCount}</td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: cluster.color }}
                      >
                        {farm.riskScore}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-2 max-w-[80px]">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${vaccPercent}%`,
                              backgroundColor: vaccPercent > 90 ? '#10b981' : vaccPercent > 70 ? '#f59e0b' : '#ef4444',
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-8">{vaccPercent}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: `${cluster.color}15`,
                          color: cluster.color,
                        }}
                      >
                        {cluster.icon} {cluster.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-medium ${farm.diseaseOutbreaks > 2 ? 'text-red-600' : 'text-gray-600'}`}>
                        {farm.diseaseOutbreaks}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
