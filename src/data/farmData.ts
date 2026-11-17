// Демо-данные на основе эпизоотического мониторинга Управления ветеринарии Республики Бурятия
export interface Farm {
  id: number;
  name: string;
  district: string;
  animalType: string;
  headCount: number;
  cluster: number;
  clusterName: string;
  riskScore: number;
  vaccinationsComplete: number;
  vaccinationsTotal: number;
  treatmentsComplete: number;
  treatmentsTotal: number;
  diseaseOutbreaks: number;
  lastInspection: string;
  violationsCount: number;
  x: number;
  y: number;
}

export interface ClusterInfo {
  id: number;
  name: string;
  color: string;
  description: string;
  farmsCount: number;
  avgRisk: number;
  icon: string;
}

export const clusters: ClusterInfo[] = [
  {
    id: 0,
    name: 'Низкий риск',
    color: '#10b981',
    description: 'Благополучные хозяйства с полным выполнением ветеринарных мероприятий',
    farmsCount: 0,
    avgRisk: 0,
    icon: '🟢',
  },
  {
    id: 1,
    name: 'Умеренный риск',
    color: '#f59e0b',
    description: 'Хозяйства с частичным выполнением требований, требуют контроля',
    farmsCount: 0,
    avgRisk: 0,
    icon: '🟡',
  },
  {
    id: 2,
    name: 'Повышенный риск',
    color: '#f97316',
    description: 'Хозяйства с нарушениями, неполными вакцинациями',
    farmsCount: 0,
    avgRisk: 0,
    icon: '🟠',
  },
  {
    id: 3,
    name: 'Высокий риск',
    color: '#ef4444',
    description: 'Критические хозяйства с вспышками заболеваний и нарушениями',
    farmsCount: 0,
    avgRisk: 0,
    icon: '🔴',
  },
];

const districts = [
  'Кабанский район',
  'Селенгинский район',
  'Тарбагатайский район',
  'Иволгинский район',
  'Кижингинский район',
  'Мухоршибирский район',
  'Бичурский район',
  'Заиграевский район',
  'Прибайкальский район',
  'Баргузинский район',
  'Курумканский район',
  'Баунтовский район',
];

const animalTypes = ['КРС', 'МРС', 'Свиньи', 'Птица', 'Лошади'];

const farmNames = [
  'ООО "Бурятмясопром"',
  'КФХ "Степное"',
  'СПК "Восток"',
  'ООО "Байкал-Агро"',
  'КФХ "Надежда"',
  'ООО "Селенга-Фарм"',
  'СПК "Колос"',
  'КФХ "Урал"',
  'ООО "Прибайкальское"',
  'СПК "Заря"',
  'КФХ "Мирный"',
  'ООО "Агро-Бурятия"',
  'СПК "Дружба"',
  'КФХ "Рассвет"',
  'ООО "Байкал-Молоко"',
  'СПК "Прогресс"',
  'КФХ "Сибирь"',
  'ООО "Мясная компания"',
  'СПК "Единство"',
  'КФХ "Горное"',
  'ООО "Селенгинское"',
  'СПК "Новый путь"',
  'КФХ "Таёжное"',
  'ООО "Бурят-Агро"',
  'СПК "Согласие"',
  'КФХ "Байкальское"',
  'ООО "Молоко-Бурятия"',
  'СПК "Урожай"',
  'КФХ "Кочевник"',
  'ООО "Ветеринар-Плюс"',
  'СПК "Светлый путь"',
  'КФХ "Степняк"',
  'ООО "Агро-Сибирь"',
  'СПК "Надежный"',
  'КФХ "Бурятское"',
  'ООО "Мясной двор"',
  'СПК "Байкальский"',
  'КФХ "Восход"',
  'ООО "Селенга-Молоко"',
  'СПК "Трудовик"',
];

function generateFarm(id: number): Farm {
  const district = districts[id % districts.length];
  const animalType = animalTypes[id % animalTypes.length];
  const name = farmNames[id % farmNames.length];
  
  // Генерируем данные для кластеризации
  const rand = Math.random();
  let cluster: number;
  let riskScore: number;
  let vaccinationsComplete: number;
  let vaccinationsTotal: number;
  let treatmentsComplete: number;
  let treatmentsTotal: number;
  let diseaseOutbreaks: number;
  let violationsCount: number;
  let headCount: number;

  if (rand < 0.3) {
    // Низкий риск
    cluster = 0;
    riskScore = Math.random() * 25;
    vaccinationsTotal = Math.floor(Math.random() * 200) + 50;
    vaccinationsComplete = vaccinationsTotal - Math.floor(Math.random() * 5);
    treatmentsTotal = Math.floor(Math.random() * 100) + 30;
    treatmentsComplete = treatmentsTotal - Math.floor(Math.random() * 3);
    diseaseOutbreaks = 0;
    violationsCount = Math.floor(Math.random() * 2);
    headCount = Math.floor(Math.random() * 500) + 100;
  } else if (rand < 0.55) {
    // Умеренный риск
    cluster = 1;
    riskScore = 25 + Math.random() * 25;
    vaccinationsTotal = Math.floor(Math.random() * 300) + 100;
    vaccinationsComplete = vaccinationsTotal - Math.floor(Math.random() * 40) - 10;
    treatmentsTotal = Math.floor(Math.random() * 150) + 50;
    treatmentsComplete = treatmentsTotal - Math.floor(Math.random() * 20) - 5;
    diseaseOutbreaks = Math.floor(Math.random() * 2);
    violationsCount = Math.floor(Math.random() * 3) + 1;
    headCount = Math.floor(Math.random() * 800) + 200;
  } else if (rand < 0.8) {
    // Повышенный риск
    cluster = 2;
    riskScore = 50 + Math.random() * 25;
    vaccinationsTotal = Math.floor(Math.random() * 400) + 100;
    vaccinationsComplete = vaccinationsTotal - Math.floor(Math.random() * 100) - 30;
    treatmentsTotal = Math.floor(Math.random() * 200) + 50;
    treatmentsComplete = treatmentsTotal - Math.floor(Math.random() * 60) - 15;
    diseaseOutbreaks = Math.floor(Math.random() * 3) + 1;
    violationsCount = Math.floor(Math.random() * 5) + 2;
    headCount = Math.floor(Math.random() * 1000) + 300;
  } else {
    // Высокий риск
    cluster = 3;
    riskScore = 75 + Math.random() * 25;
    vaccinationsTotal = Math.floor(Math.random() * 500) + 200;
    vaccinationsComplete = vaccinationsTotal - Math.floor(Math.random() * 200) - 50;
    treatmentsTotal = Math.floor(Math.random() * 300) + 100;
    treatmentsComplete = treatmentsTotal - Math.floor(Math.random() * 150) - 30;
    diseaseOutbreaks = Math.floor(Math.random() * 5) + 2;
    violationsCount = Math.floor(Math.random() * 8) + 4;
    headCount = Math.floor(Math.random() * 1500) + 500;
  }

  // Позиции для scatter plot (с небольшим разбросом внутри кластера)
  const clusterCenters = [
    { x: 20, y: 80 },
    { x: 40, y: 55 },
    { x: 65, y: 35 },
    { x: 85, y: 15 },
  ];
  const center = clusterCenters[cluster];
  const x = center.x + (Math.random() - 0.5) * 20;
  const y = center.y + (Math.random() - 0.5) * 20;

  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const lastInspection = `2024-${months[Math.floor(Math.random() * 12)]}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`;

  return {
    id: id + 1,
    name,
    district,
    animalType,
    headCount,
    cluster,
    clusterName: clusters[cluster].name,
    riskScore: Math.round(riskScore * 10) / 10,
    vaccinationsComplete,
    vaccinationsTotal,
    treatmentsComplete,
    treatmentsTotal,
    diseaseOutbreaks,
    lastInspection,
    violationsCount,
    x: Math.round(x * 10) / 10,
    y: Math.round(y * 10) / 10,
  };
}

// Генерируем 40 ферм
export const farms: Farm[] = Array.from({ length: 40 }, (_, i) => generateFarm(i));

// Обновляем статистику кластеров
clusters.forEach(c => {
  const clusterFarms = farms.filter(f => f.cluster === c.id);
  c.farmsCount = clusterFarms.length;
  c.avgRisk = clusterFarms.length > 0
    ? Math.round(clusterFarms.reduce((sum, f) => sum + f.riskScore, 0) / clusterFarms.length * 10) / 10
    : 0;
});

// Данные для графиков
export const clusterDistribution = clusters.map(c => ({
  name: c.name,
  value: c.farmsCount,
  color: c.color,
}));

export const riskByDistrict = districts.slice(0, 8).map(d => {
  const districtFarms = farms.filter(f => f.district === d);
  const avgRisk = districtFarms.length > 0
    ? Math.round(districtFarms.reduce((sum, f) => sum + f.riskScore, 0) / districtFarms.length * 10) / 10
    : 0;
  return {
    district: d.replace(' район', ''),
    avgRisk,
    farmsCount: districtFarms.length,
  };
});

export const vaccinationCoverage = farms.map(f => ({
  name: f.name.substring(0, 15),
  coverage: Math.round((f.vaccinationsComplete / f.vaccinationsTotal) * 100),
  cluster: f.cluster,
  color: clusters[f.cluster].color,
}));

export const monthlyOutbreaks = [
  { month: 'Янв', outbreaks: 2, vaccinations: 1200 },
  { month: 'Фев', outbreaks: 1, vaccinations: 980 },
  { month: 'Мар', outbreaks: 3, vaccinations: 1450 },
  { month: 'Апр', outbreaks: 4, vaccinations: 1680 },
  { month: 'Май', outbreaks: 2, vaccinations: 2100 },
  { month: 'Июн', outbreaks: 5, vaccinations: 1890 },
  { month: 'Июл', outbreaks: 3, vaccinations: 2340 },
  { month: 'Авг', outbreaks: 6, vaccinations: 2560 },
  { month: 'Сен', outbreaks: 4, vaccinations: 2100 },
  { month: 'Окт', outbreaks: 2, vaccinations: 1780 },
  { month: 'Ноя', outbreaks: 1, vaccinations: 1340 },
  { month: 'Дек', outbreaks: 1, vaccinations: 1100 },
];
