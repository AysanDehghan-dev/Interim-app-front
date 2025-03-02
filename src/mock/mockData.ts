import { User, Company, Job, JobType, Application, ApplicationStatus } from '../types';

// Utilisateurs mockés
export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    phone: '+33 6 12 34 56 78',
    address: '25 Rue de Paris',
    city: 'Lyon',
    country: 'France',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    skills: ['JavaScript', 'React', 'TypeScript', 'Node.js'],
    experience: [
      {
        id: '1',
        title: 'Développeur Frontend',
        company: 'TechCorp',
        location: 'Lyon',
        startDate: new Date('2020-01-01'),
        endDate: new Date('2022-12-31'),
        current: false,
        description: 'Développement d\'applications web avec React et TypeScript.'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'Université de Lyon',
        degree: 'Master',
        field: 'Informatique',
        startDate: new Date('2015-09-01'),
        endDate: new Date('2020-06-30'),
        current: false,
        description: 'Spécialisation en développement web et applications mobiles.'
      }
    ],
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: '2',
    firstName: 'Marie',
    lastName: 'Laurent',
    email: 'marie.laurent@example.com',
    phone: '+33 6 98 76 54 32',
    address: '10 Avenue Victor Hugo',
    city: 'Paris',
    country: 'France',
    profilePicture: 'https://randomuser.me/api/portraits/women/1.jpg',
    skills: ['Python', 'Data Analysis', 'SQL', 'Machine Learning'],
    experience: [
      {
        id: '1',
        title: 'Data Scientist',
        company: 'DataInsight',
        location: 'Paris',
        startDate: new Date('2019-03-01'),
        endDate: new Date('2023-02-28'),
        current: false,
        description: 'Analyse de données et création de modèles prédictifs.'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'École Polytechnique',
        degree: 'Ingénieur',
        field: 'Science des données',
        startDate: new Date('2014-09-01'),
        endDate: new Date('2019-06-30'),
        current: false,
        description: 'Spécialisation en data science et intelligence artificielle.'
      }
    ],
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-02-10')
  }
];

// Entreprises mockées
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'TechCorp',
    industry: 'Technologie',
    description: 'Entreprise spécialisée dans le développement de solutions web innovantes. TechCorp est reconnue pour sa culture d\'entreprise dynamique et ses avantages compétitifs.',
    logo: 'https://placehold.co/200x200?text=TechCorp',
    website: 'https://techcorp.example.com',
    email: 'contact@techcorp.example.com',
    phone: '+33 1 23 45 67 89',
    address: '50 Rue de l\'Innovation',
    city: 'Lyon',
    country: 'France',
    jobs: [],
    createdAt: new Date('2020-05-10'),
    updatedAt: new Date('2023-03-15')
  },
  {
    id: '2',
    name: 'DataInsight',
    industry: 'Analyse de données',
    description: 'Leader dans l\'analyse de données et l\'intelligence artificielle. DataInsight développe des algorithmes prédictifs pour aider les entreprises à prendre de meilleures décisions basées sur les données.',
    logo: 'https://placehold.co/200x200?text=DataInsight',
    website: 'https://datainsight.example.com',
    email: 'contact@datainsight.example.com',
    phone: '+33 1 98 76 54 32',
    address: '15 Avenue de l\'Intelligence',
    city: 'Paris',
    country: 'France',
    jobs: [],
    createdAt: new Date('2018-02-20'),
    updatedAt: new Date('2023-01-05')
  },
  {
    id: '3',
    name: 'MédiaSanté',
    industry: 'Santé',
    description: 'MédiaSanté est spécialisée dans le développement de solutions numériques pour le secteur médical et l\'amélioration des parcours de soins des patients.',
    logo: 'https://placehold.co/200x200?text=MédiaSanté',
    website: 'https://mediasante.example.com',
    email: 'recrutement@mediasante.example.com',
    phone: '+33 4 11 22 33 44',
    address: '27 Boulevard des Hôpitaux',
    city: 'Bordeaux',
    country: 'France',
    jobs: [],
    createdAt: new Date('2019-06-15'),
    updatedAt: new Date('2023-02-10')
  },
  {
    id: '4',
    name: 'EcoFinance',
    industry: 'Finance',
    description: 'Cabinet de conseil financier spécialisé dans les investissements durables et l\'accompagnement des entreprises dans leur transition écologique.',
    logo: 'https://placehold.co/200x200?text=EcoFinance',
    website: 'https://ecofinance.example.com',
    email: 'jobs@ecofinance.example.com',
    phone: '+33 1 44 55 66 77',
    address: '8 Rue de la Bourse',
    city: 'Paris',
    country: 'France',
    jobs: [],
    createdAt: new Date('2017-11-05'),
    updatedAt: new Date('2023-01-20')
  },
  {
    id: '5',
    name: 'InnovaLogistique',
    industry: 'Logistique',
    description: 'Entreprise de logistique nouvelle génération utilisant l\'IA et l\'optimisation des flux pour révolutionner la chaîne d\'approvisionnement.',
    logo: 'https://placehold.co/200x200?text=InnovaLog',
    website: 'https://innovalogistique.example.com',
    email: 'carrieres@innovalogistique.example.com',
    phone: '+33 3 88 99 00 11',
    address: '120 Zone Industrielle Est',
    city: 'Strasbourg',
    country: 'France',
    jobs: [],
    createdAt: new Date('2020-01-15'),
    updatedAt: new Date('2023-03-01')
  }
];

// Jobs mockés
export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Développeur Frontend React',
    company: mockCompanies[0],
    companyId: '1',
    description: 'Nous recherchons un développeur Frontend React expérimenté pour rejoindre notre équipe. Vous serez responsable du développement d\'applications web interactives pour nos clients. Vous travaillerez en collaboration avec notre équipe de designers UX et nos développeurs backend pour créer des expériences utilisateur exceptionnelles.',
    requirements: [
      'Expérience de 2 ans minimum avec React et TypeScript',
      'Maîtrise de HTML, CSS et JavaScript',
      'Expérience avec les outils de gestion de version comme Git',
      'Connaissance des méthodologies Agile',
      'Capacité à travailler en équipe et à communiquer efficacement'
    ],
    location: 'Lyon, France',
    type: JobType.FULL_TIME,
    salary: {
      min: 40000,
      max: 55000,
      currency: 'EUR'
    },
    startDate: new Date('2023-05-01'),
    applications: [],
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-03-15')
  },
  {
    id: '2',
    title: 'Data Scientist',
    company: mockCompanies[1],
    companyId: '2',
    description: 'Rejoignez notre équipe d\'analyse de données pour travailler sur des projets innovants. Vous serez chargé de concevoir et mettre en œuvre des modèles de machine learning, d\'analyser les données pour en extraire des insights pertinents, et de présenter vos résultats à différentes parties prenantes.',
    requirements: [
      'Master ou PhD en statistiques, mathématiques ou informatique',
      'Expérience pratique en machine learning et en data mining',
      'Maîtrise de Python et des bibliothèques de data science (Pandas, NumPy, Scikit-learn)',
      'Connaissance approfondie des bases de données SQL et NoSQL',
      'Excellentes capacités d\'analyse et de communication'
    ],
    location: 'Paris, France',
    type: JobType.CONTRACT,
    salary: {
      min: 45000,
      max: 60000,
      currency: 'EUR'
    },
    startDate: new Date('2023-04-15'),
    applications: [],
    createdAt: new Date('2023-03-01'),
    updatedAt: new Date('2023-03-01')
  },
  {
    id: '3',
    title: 'Développeur Backend Node.js',
    company: mockCompanies[0],
    companyId: '1',
    description: 'Nous recherchons un développeur Backend Node.js pour renforcer notre équipe technique. Vous serez responsable du développement et de la maintenance de notre infrastructure serveur, de l\'optimisation des performances et de l\'implémentation de nouvelles fonctionnalités.',
    requirements: [
      'Expérience significative avec Node.js et frameworks comme Express ou NestJS',
      'Maîtrise des bases de données MongoDB et des requêtes complexes',
      'Connaissance approfondie de Git et des workflows de développement',
      'Expérience dans la conception et l\'implémentation d\'API RESTful',
      'Capacité à travailler de manière autonome et à résoudre des problèmes complexes'
    ],
    location: 'Lyon, France',
    type: JobType.FULL_TIME,
    salary: {
      min: 42000,
      max: 58000,
      currency: 'EUR'
    },
    startDate: new Date('2023-04-01'),
    applications: [],
    createdAt: new Date('2023-02-28'),
    updatedAt: new Date('2023-02-28')
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: mockCompanies[0],
    companyId: '1',
    description: 'Nous recherchons un ingénieur DevOps talentueux pour gérer notre infrastructure cloud et améliorer nos processus de déploiement continu. Vous serez responsable de l\'automatisation, de la sécurité et de la robustesse de nos systèmes de production.',
    requirements: [
      'Expérience avec les plateformes cloud (AWS, Azure, GCP)',
      'Maîtrise des outils d\'infrastructure as code (Terraform, CloudFormation)',
      'Expérience avec les conteneurs et Kubernetes',
      'Connaissance des outils CI/CD (Jenkins, GitLab CI, GitHub Actions)',
      'Solides compétences en scripting (Python, Bash)'
    ],
    location: 'Lyon, France',
    type: JobType.FULL_TIME,
    salary: {
      min: 45000,
      max: 65000,
      currency: 'EUR'
    },
    startDate: new Date('2023-05-15'),
    applications: [],
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-03-10')
  },
  {
    id: '5',
    title: 'UI/UX Designer',
    company: mockCompanies[1],
    companyId: '2',
    description: 'Nous recherchons un designer UI/UX créatif pour concevoir des interfaces utilisateur intuitives et esthétiques. Vous travaillerez en étroite collaboration avec notre équipe de développeurs pour donner vie à vos designs.',
    requirements: [
      'Portfolio démontrant d\'excellentes compétences en design d\'interface',
      'Maîtrise des outils de design (Figma, Adobe XD, Sketch)',
      'Expérience dans la conduite de recherches utilisateurs et de tests d\'utilisabilité',
      'Connaissance des principes d\'accessibilité et de responsive design',
      'Capacité à communiquer et défendre vos choix de design'
    ],
    location: 'Paris, France',
    type: JobType.PART_TIME,
    salary: {
      min: 30000,
      max: 40000,
      currency: 'EUR'
    },
    startDate: new Date('2023-04-20'),
    applications: [],
    createdAt: new Date('2023-03-05'),
    updatedAt: new Date('2023-03-05')
  },
  {
    id: '6',
    title: 'Développeur Mobile React Native',
    company: mockCompanies[2],
    companyId: '3',
    description: 'Vous développerez des applications mobiles innovantes dans le secteur de la santé en utilisant React Native. Vos créations aideront les professionnels de santé et les patients à bénéficier de meilleurs services.',
    requirements: [
      'Expérience confirmée en développement avec React Native',
      'Connaissance des spécificités iOS et Android',
      'Maîtrise de TypeScript et des patterns de conception mobile',
      'Intérêt pour le secteur de la santé et ses problématiques',
      'Sensibilité aux enjeux de confidentialité des données médicales'
    ],
    location: 'Bordeaux, France',
    type: JobType.TEMPORARY,
    salary: {
      min: 40000,
      max: 50000,
      currency: 'EUR'
    },
    startDate: new Date('2023-04-10'),
    endDate: new Date('2023-10-10'),
    applications: [],
    createdAt: new Date('2023-03-02'),
    updatedAt: new Date('2023-03-02')
  },
  {
    id: '7',
    title: 'Analyste Financier ESG',
    company: mockCompanies[3],
    companyId: '4',
    description: 'Vous serez chargé d\'analyser les performances ESG (Environnementales, Sociales et de Gouvernance) des entreprises pour guider nos stratégies d\'investissement responsable.',
    requirements: [
      'Formation supérieure en finance ou économie',
      'Expérience dans l\'analyse financière et la valorisation d\'entreprises',
      'Connaissance approfondie des critères ESG et des enjeux de la finance durable',
      'Maîtrise d\'Excel et des outils d\'analyse financière',
      'Capacité à rédiger des rapports d\'analyse détaillés et accessibles'
    ],
    location: 'Paris, France',
    type: JobType.FULL_TIME,
    salary: {
      min: 38000,
      max: 48000,
      currency: 'EUR'
    },
    startDate: new Date('2023-05-02'),
    applications: [],
    createdAt: new Date('2023-03-18'),
    updatedAt: new Date('2023-03-18')
  },
  {
    id: '8',
    title: 'Ingénieur Logistique Automatisation',
    company: mockCompanies[4],
    companyId: '5',
    description: 'Vous concevrez et optimiserez les systèmes d\'automatisation de nos entrepôts pour améliorer l\'efficacité de la chaîne logistique tout en réduisant les coûts opérationnels.',
    requirements: [
      'Diplôme d\'ingénieur en logistique, mécanique ou industriel',
      'Expérience dans l\'automatisation des processus logistiques',
      'Connaissance des technologies RFID, IoT et systèmes de gestion d\'entrepôt',
      'Compétences en modélisation et simulation de flux',
      'Capacité à gérer des projets d\'implémentation complexes'
    ],
    location: 'Strasbourg, France',
    type: JobType.CONTRACT,
    salary: {
      min: 42000,
      max: 55000,
      currency: 'EUR'
    },
    startDate: new Date('2023-04-05'),
    endDate: new Date('2024-04-04'),
    applications: [],
    createdAt: new Date('2023-02-25'),
    updatedAt: new Date('2023-02-25')
  },
  {
    id: '9',
    title: 'Stage Data Analyst',
    company: mockCompanies[1],
    companyId: '2',
    description: 'Stage de fin d\'études en analyse de données. Vous participerez à des projets concrets d\'analyse et de visualisation de données pour nos clients dans divers secteurs.',
    requirements: [
      'Formation en cours en data science, statistiques ou informatique',
      'Connaissances en SQL et Python',
      'Maîtrise des outils de visualisation de données (Tableau, Power BI)',
      'Capacité d\'apprentissage rapide et autonomie',
      'Intérêt marqué pour l\'analyse de données et le machine learning'
    ],
    location: 'Paris, France',
    type: JobType.INTERNSHIP,
    salary: {
      min: 1000,
      max: 1200,
      currency: 'EUR'
    },
    startDate: new Date('2023-06-01'),
    endDate: new Date('2023-12-01'),
    applications: [],
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2023-03-20')
  },
  {
    id: '10',
    title: 'Développeur Full Stack JavaScript',
    company: mockCompanies[0],
    companyId: '1',
    description: 'Nous recherchons un développeur full stack JavaScript pour travailler sur l\'ensemble de notre plateforme web. Vous serez impliqué dans le développement front-end et back-end, ainsi que dans la conception de l\'architecture.',
    requirements: [
      'Expertise en JavaScript/TypeScript sur l\'ensemble du stack',
      'Expérience avec React.js pour le front-end et Node.js pour le back-end',
      'Familiarité avec les bases de données SQL et NoSQL',
      'Connaissance des principes de sécurité web et de performance',
      'Capacité à écrire du code testable et à suivre les meilleures pratiques'
    ],
    location: 'Remote',
    type: JobType.FULL_TIME,
    salary: {
      min: 50000,
      max: 70000,
      currency: 'EUR'
    },
    startDate: new Date('2023-05-01'),
    applications: [],
    createdAt: new Date('2023-03-25'),
    updatedAt: new Date('2023-03-25')
  }
];

// Mettre à jour les références des jobs dans les entreprises
mockCompanies[0].jobs = [mockJobs[0], mockJobs[2], mockJobs[3], mockJobs[9]];
mockCompanies[1].jobs = [mockJobs[1], mockJobs[4], mockJobs[8]];
mockCompanies[2].jobs = [mockJobs[5]];
mockCompanies[3].jobs = [mockJobs[6]];
mockCompanies[4].jobs = [mockJobs[7]];

// Applications mockées
export const mockApplications: Application[] = [
  {
    id: '1',
    jobId: '1',
    userId: '2',
    status: ApplicationStatus.PENDING,
    coverLetter: 'Je suis très intéressé par ce poste car...',
    createdAt: new Date('2023-03-16'),
    updatedAt: new Date('2023-03-16')
  },
  {
    id: '2',
    jobId: '2',
    userId: '1',
    status: ApplicationStatus.REVIEWING,
    coverLetter: 'Avec mon expérience en développement, je pense être un bon candidat pour...',
    createdAt: new Date('2023-03-05'),
    updatedAt: new Date('2023-03-10')
  }
];

// Mettre à jour les références des applications dans les jobs
mockJobs[0].applications = [mockApplications[0]];
mockJobs[1].applications = [mockApplications[1]];

// Fonction mock pour simuler l'authentification
export const mockLogin = (email: string, password: string, type: 'user' | 'company') => {
  // Simulation de délai d'authentification
  return new Promise<{ success: boolean; data?: User | Company; error?: string }>((resolve) => {
    setTimeout(() => {
      if (type === 'user') {
        const user = mockUsers.find(user => user.email === email);
        if (user && password === 'password') { // Mot de passe simple pour la démo
          resolve({ success: true, data: user });
        } else {
          resolve({ success: false, error: 'Email ou mot de passe incorrect' });
        }
      } else {
        const company = mockCompanies.find(company => company.email === email);
        if (company && password === 'password') { // Mot de passe simple pour la démo
          resolve({ success: true, data: company });
        } else {
          resolve({ success: false, error: 'Email ou mot de passe incorrect' });
        }
      }
    }, 1000);
  });
};