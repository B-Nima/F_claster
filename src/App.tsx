import { useState } from 'react';
import { farms, clusters, clusterDistribution, riskByDistrict, monthlyOutbreaks } from './data/farmData';
import Dashboard from './components/Dashboard';
import ClusterMap from './components/ClusterMap';
import FarmTable from './components/FarmTable';
import Methodology from './components/Methodology';
import Charts from './components/Charts';
import { BarChart3, Map, Table2, BookOpen, Activity } from 'lucide-react';

type TabType = 'dashboard' | 'map' | 'table' | 'charts' | 'methodology';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Дашборд', icon: BarChart3 },
    { id: 'map' as TabType, label: 'Карта кластеров', icon: Map },
    { id: 'table' as TabType, label: 'Реестр ферм', icon: Table2 },
    { id: 'charts' as TabType, label: 'Аналитика', icon: Activity },
    { id: 'methodology' as TabType, label: 'Методология', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                Кластеризация ферм по группам риска
              </h1>
              <p className="text-emerald-100 text-sm">
                Управление ветеринарии Республики Бурятия • Эпизоотический мониторинг
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-emerald-600 text-emerald-700 bg-emerald-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'dashboard' && (
          <Dashboard farms={farms} clusters={clusters} clusterDistribution={clusterDistribution} />
        )}
        {activeTab === 'map' && <ClusterMap farms={farms} clusters={clusters} />}
        {activeTab === 'table' && <FarmTable farms={farms} clusters={clusters} />}
        {activeTab === 'charts' && (
          <Charts
            farms={farms}
            clusters={clusters}
            riskByDistrict={riskByDistrict}
            monthlyOutbreaks={monthlyOutbreaks}
          />
        )}
        {activeTab === 'methodology' && <Methodology />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-sm py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2024 Управление ветеринарии Республики Бурятия • Система эпизоотического мониторинга</p>
          <p className="mt-1">Технологии: Python (Scikit-learn) • PostgreSQL • K-Means / DBSCAN кластеризация</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
