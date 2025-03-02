import { mockJobs} from './mockData';
import { Job } from '../types';

// Enhanced job descriptions with more detailed content for the modal view
const enhancedJobDescriptions: Record<string, string> = {
  '1': `
Nous recherchons un développeur Frontend React expérimenté pour rejoindre notre équipe. Vous serez responsable du développement d'applications web interactives pour nos clients. Vous travaillerez en collaboration avec notre équipe de designers UX et nos développeurs backend pour créer des expériences utilisateur exceptionnelles.

Vos principales missions seront :
- Développer des interfaces utilisateur réactives et intuitives en utilisant React et TypeScript
- Participer à la conception et à l'architecture des applications Frontend
- Assurer la qualité du code à travers des tests unitaires et d'intégration
- Collaborer avec les designers UX/UI pour implémenter des interfaces utilisateur attrayantes
- Optimiser les performances des applications
- Assurer la maintenance et l'évolution des applications existantes

Nous offrons un environnement de travail stimulant, des projets variés et innovants, ainsi qu'une équipe passionnée par les nouvelles technologies.
`,
  
  '2': `
Rejoignez notre équipe d'analyse de données pour travailler sur des projets innovants. Vous serez chargé de concevoir et mettre en œuvre des modèles de machine learning, d'analyser les données pour en extraire des insights pertinents, et de présenter vos résultats à différentes parties prenantes.

En tant que Data Scientist, vous serez responsable de :
- Analyser et interpréter des données complexes pour en extraire des insights actionnables
- Concevoir, développer et déployer des modèles prédictifs et d'apprentissage automatique
- Collaborer avec les équipes produit et business pour comprendre leurs besoins et leur fournir des analyses pertinentes
- Présenter des résultats d'analyse de manière claire et convaincante
- Participer à l'amélioration continue de nos méthodologies d'analyse
- Rester à jour sur les dernières avancées en matière de data science et de machine learning

Notre environnement encourage l'innovation et l'apprentissage continu, avec des possibilités de formation et de développement professionnel.
`,
  
  '3': `
Nous recherchons un développeur Backend Node.js pour renforcer notre équipe technique. Vous serez responsable du développement et de la maintenance de notre infrastructure serveur, de l'optimisation des performances et de l'implémentation de nouvelles fonctionnalités.

Vos responsabilités incluront :
- Concevoir et développer des API RESTful avec Node.js et Express
- Implémenter et optimiser des solutions de base de données (MongoDB, PostgreSQL)
- Participer à la conception et à l'évolution de l'architecture backend
- Assurer la qualité du code via des tests unitaires et d'intégration
- Collaborer avec l'équipe frontend pour intégrer les services backend
- Participer aux revues de code et aux sessions de pair programming
- Résoudre les problèmes techniques et optimiser les performances

Vous rejoindrez une équipe dynamique qui valorise la collaboration, l'innovation et le développement personnel, avec des opportunités d'évolution significatives.
`
};

// Enhanced job requirements with more detailed content
const enhancedJobRequirements: Record<string, string[]> = {
  '1': [
    'Expérience de 3 ans minimum avec React et TypeScript',
    'Maîtrise de HTML5, CSS3 et JavaScript ES6+',
    'Expérience avec les outils de gestion de version comme Git',
    "Connaissance de Redux ou Context API pour la gestion d'état",
    'Expérience avec les tests unitaires (Jest, React Testing Library)',
    'Connaissance des méthodologies Agile',
    'Capacité à travailler en équipe et à communiquer efficacement',
    'Souci du détail et engagement envers la qualité du code',
    'Veille technologique active et curiosité pour les nouvelles technologies'
  ],
  
  '2': [
    'Master ou PhD en statistiques, mathématiques ou informatique',
    'Expérience pratique en machine learning et en data mining',
    'Maîtrise de Python et des bibliothèques de data science (Pandas, NumPy, Scikit-learn)',
    'Expérience avec les frameworks de deep learning (TensorFlow, PyTorch)',
    'Connaissance approfondie des bases de données SQL et NoSQL',
    'Solides compétences en statistiques et en modélisation',
    'Expérience dans la visualisation de données (Matplotlib, Seaborn, Tableau)',
    'Excellentes capacités d\'analyse et de communication',
    'Capacité à vulgariser des concepts complexes pour des publics non techniques'
  ],
  
  '3': [
    'Expérience significative avec Node.js et frameworks comme Express ou NestJS',
    'Maîtrise des bases de données MongoDB et des requêtes complexes',
    'Connaissance approfondie de Git et des workflows de développement',
    'Expérience dans la conception et l\'implémentation d\'API RESTful',
    'Familiarité avec les technologies de containerisation (Docker, Kubernetes)',
    'Connaissance des principes de sécurité des applications web',
    'Expérience avec les architectures microservices',
    'Capacité à travailler de manière autonome et à résoudre des problèmes complexes',
    'Bonnes compétences en communication et en collaboration d\'équipe'
  ]
};

// Enhanced company descriptions
const enhancedCompanyDescriptions: Record<string, string> = {
  '1': `
TechCorp est une entreprise innovante spécialisée dans le développement de solutions web et mobiles pour des clients de tous secteurs. Depuis notre création en 2015, nous avons réalisé plus de 200 projets pour des startups comme pour des grands groupes.

Notre mission est de transformer les idées de nos clients en produits numériques performants et intuitifs. Nous mettons l'accent sur la qualité du code, l'expérience utilisateur et l'innovation technologique.

Chez TechCorp, nous valorisons :
- L'excellence technique
- L'innovation continue
- La collaboration et le travail d'équipe
- L'équilibre vie professionnelle-vie personnelle
- Le développement des compétences de nos collaborateurs

Rejoindre TechCorp, c'est intégrer une équipe passionnée et en constante évolution, dans un environnement de travail stimulant et bienveillant.
`,
  
  '2': `
DataInsight est leader dans l'analyse de données et l'intelligence artificielle. Nous développons des algorithmes prédictifs pour aider les entreprises à prendre de meilleures décisions basées sur les données.

Fondée en 2017 par des experts en data science, DataInsight a connu une croissance rapide et compte aujourd'hui plus de 80 collaborateurs répartis dans 3 pays. Nous travaillons pour des clients dans les secteurs de la finance, de la santé, du retail et de l'industrie.

Notre culture d'entreprise est basée sur :
- L'innovation et la recherche
- Le partage des connaissances
- L'impact concret de nos solutions
- La diversité et l'inclusion
- L'apprentissage continu

Nous offrons un environnement de travail flexible, des projets stimulants et des opportunités de développement professionnel à travers des formations et conférences.
`
};

// Enhance the mock jobs with additional details
export const getEnhancedJobs = (): Job[] => {
  return mockJobs.map(job => {
    const jobId = job.id;
    return {
      ...job,
      description: enhancedJobDescriptions[jobId] || job.description,
      requirements: enhancedJobRequirements[jobId] || job.requirements,
      company: {
        ...job.company,
        description: enhancedCompanyDescriptions[job.company.id] || job.company.description
      }
    };
  });
};

export const enhancedMockJobs = getEnhancedJobs();