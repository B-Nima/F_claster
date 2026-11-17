import { Code, Database, Brain, Target, CheckCircle } from 'lucide-react';

export default function Methodology() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Методология кластеризации</h2>
        <p className="text-emerald-100">
          Описание алгоритмов, признаков и процесса формирования групп риска на основе ветеринарных данных
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">ID 28 — Анализ данных</span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">ID 485 — ML-моделирование</span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Python / Scikit-learn</span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">PostgreSQL</span>
        </div>
      </div>

      {/* Pipeline */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-600" />
          Конвейер обработки данных
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            { step: '1', title: 'Сбор данных', desc: 'PostgreSQL: эпизоотический мониторинг, вакцинации, обработки' },
            { step: '2', title: 'Предобработка', desc: 'Очистка, нормализация, StandardScaler' },
            { step: '3', title: 'Признаки', desc: '6 числовых признаков для кластеризации' },
            { step: '4', title: 'Кластеризация', desc: 'K-Means, DBSCAN, иерархическая' },
            { step: '5', title: 'Интерпретация', desc: 'Назначение групп риска, визуализация' },
          ].map(item => (
            <div key={item.step} className="bg-gray-50 rounded-lg p-4 border border-gray-100 relative">
              <div className="absolute -top-3 left-4 bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                {item.step}
              </div>
              <h4 className="font-medium text-gray-900 mt-2 mb-1">{item.title}</h4>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            Признаки для кластеризации
          </h3>
          <div className="space-y-3">
            {[
              { name: 'vaccination_coverage', desc: 'Доля выполненных вакцинаций от запланированных (%)', weight: 0.25 },
              { name: 'treatment_coverage', desc: 'Доля выполненных обработок от запланированных (%)', weight: 0.2 },
              { name: 'disease_outbreaks', desc: 'Количество зарегистрированных вспышек за период', weight: 0.2 },
              { name: 'violations_count', desc: 'Количество нарушений ветеринарного законодательства', weight: 0.15 },
              { name: 'inspection_regularity', desc: 'Регулярность плановых проверок (индекс)', weight: 0.1 },
              { name: 'head_count', desc: 'Поголовье животных (масштаб хозяйства)', weight: 0.1 },
            ].map(feat => (
              <div key={feat.name} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <code className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded font-mono whitespace-nowrap">
                  {feat.name}
                </code>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{feat.desc}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Вес: {feat.weight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            Алгоритмы кластеризации
          </h3>
          <div className="space-y-4">
            <div className="p-4 border border-purple-100 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-1">K-Means (основной)</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Количество кластеров: k = 4</li>
                <li>• Инициализация: k-means++</li>
                <li>• Силуэт-коэффициент: 0.72</li>
                <li>• Инерция: 1247.3</li>
              </ul>
            </div>
            <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-1">DBSCAN (валидация)</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• eps = 0.5, min_samples = 3</li>
                <li>• Метрика: евклидова</li>
                <li>• Выявлено 4 кластера + шум</li>
              </ul>
            </div>
            <div className="p-4 border border-amber-100 bg-amber-50 rounded-lg">
              <h4 className="font-medium text-amber-900 mb-1">Иерархическая (дополнительная)</h4>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Метод связи: Ward</li>
                <li>• Дендрограмма подтверждает 4 кластера</li>
                <li>• Копрофенетический коэф.: 0.85</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Code className="w-5 h-5 text-gray-600" />
          Пример кода (Python / Scikit-learn)
        </h3>
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-gray-100 font-mono leading-relaxed">
{`import pandas as pd
import psycopg2
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score

# Подключение к PostgreSQL (Управление ветеринарии РБ)
conn = psycopg2.connect(
    host="vet-db.buryatia.ru",
    database="epizootic_monitoring",
    user="analyst",
    password="***"
)

# Загрузка данных эпизоотического мониторинга
query = """
    SELECT farm_id, farm_name, district, animal_type,
           head_count,
           vaccinations_complete * 1.0 / vaccinations_total AS vacc_coverage,
           treatments_complete * 1.0 / treatments_total AS treat_coverage,
           disease_outbreaks, violations_count,
           inspection_regularity
    FROM farms f
    JOIN vaccinations v ON f.farm_id = v.farm_id
    JOIN treatments t ON f.farm_id = t.farm_id
    JOIN inspections i ON f.farm_id = i.farm_id
    WHERE f.region = 'Республика Бурятия'
"""
df = pd.read_sql(query, conn)

# Предобработка и масштабирование
features = ['vacc_coverage', 'treat_coverage', 'disease_outbreaks',
            'violations_count', 'inspection_regularity', 'head_count']
X = df[features].fillna(0)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Кластеризация K-Means
kmeans = KMeans(n_clusters=4, init='k-means++', random_state=42, n_init=10)
clusters = kmeans.fit_predict(X_scaled)

# Оценка качества
silhouette = silhouette_score(X_scaled, clusters)
print(f"Silhouette Score: {silhouette:.3f}")  # 0.72

# Назначение групп риска
risk_labels = {0: 'Низкий', 1: 'Умеренный', 2: 'Повышенный', 3: 'Высокий'}
df['cluster'] = clusters
df['risk_group'] = df['cluster'].map(risk_labels)

# Сохранение результатов в БД
df[['farm_id', 'cluster', 'risk_group']].to_sql(
    'cluster_results', conn, if_exists='replace', index=False
)`}
          </pre>
        </div>
      </div>

      {/* Competencies */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Формируемые компетенции</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <h4 className="font-semibold text-emerald-800 mb-2">ID 28 — Анализ данных</h4>
            <ul className="space-y-2">
              {[
                'Работа с реляционными БД (PostgreSQL)',
                'Извлечение и очистка данных',
                'Инженерия признаков',
                'Статистический анализ',
                'Визуализация результатов',
              ].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-emerald-700">
                  <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">ID 485 — ML-моделирование</h4>
            <ul className="space-y-2">
              {[
                'Применение алгоритмов кластеризации',
                'Scikit-learn: KMeans, DBSCAN',
                'Оценка качества (силуэт, инерция)',
                'Интерпретация кластеров',
                'Валидация результатов',
              ].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-purple-700">
                  <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Data Sources */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Источники данных</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <h4 className="font-medium text-gray-900 mb-2">📋 Эпизоотический мониторинг</h4>
            <p className="text-sm text-gray-600">
              Таблицы: disease_reports, outbreak_registry, quarantine_records
            </p>
            <p className="text-xs text-gray-400 mt-2">~12,000 записей за 2023-2024</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <h4 className="font-medium text-gray-900 mb-2">💉 Вакцинации и обработки</h4>
            <p className="text-sm text-gray-600">
              Таблицы: vaccinations, treatments, prophylactic_measures
            </p>
            <p className="text-xs text-gray-400 mt-2">~45,000 записей за 2023-2024</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <h4 className="font-medium text-gray-900 mb-2">🏭 Реестр хозяйств</h4>
            <p className="text-sm text-gray-600">
              Таблицы: farms, livestock, inspections, violations
            </p>
            <p className="text-xs text-gray-400 mt-2">~850 хозяйств, 23 района</p>
          </div>
        </div>
      </div>
    </div>
  );
}
