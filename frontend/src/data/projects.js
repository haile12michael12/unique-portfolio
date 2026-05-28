export const projectsData = [
  {
    id: 'P001',
    title: 'AI-Powered Analytics Dashboard',
    description: 'Real-time data visualization platform with predictive analytics and custom reporting',
    image: '/assets/projects/analytics-dashboard.jpg',
    imageAlt: 'Analytics Dashboard Interface',
    problem: 'Teams struggled with scattered data sources and lack of actionable insights for decision-making',
    solution: 'Built an integrated dashboard combining multiple data sources with ML-powered forecasting and intuitive UI',
    vitals: [
      { label: 'Impact', value: '45%' },
      { label: 'Users', value: '2.5K+' },
      { label: 'Timeline', value: '4 months' }
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'TensorFlow'],
    category: 'Web Application',
    status: 'completed'
  },
  {
    id: 'P002',
    title: 'Mobile-First E-Commerce Platform',
    description: 'Full-stack marketplace with inventory management, payment processing, and real-time notifications',
    image: '/assets/projects/ecommerce-platform.jpg',
    imageAlt: 'E-Commerce Platform',
    problem: 'Existing platform had poor mobile experience and couldn\'t handle peak traffic volumes',
    solution: 'Redesigned with mobile-first approach, implemented serverless architecture for scalability',
    vitals: [
      { label: 'Traffic', value: '100K+' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Growth', value: '3x YoY' }
    ],
    stack: ['Next.js', 'Stripe API', 'AWS Lambda', 'MongoDB', 'React Native'],
    category: 'E-Commerce',
    status: 'completed'
  },
  {
    id: 'P003',
    title: 'Enterprise Content Management System',
    description: 'Headless CMS with multi-language support, version control, and granular permissions',
    image: '/assets/projects/cms-system.jpg',
    imageAlt: 'CMS Dashboard',
    problem: 'Marketing teams needed better content workflow management with approval processes',
    solution: 'Developed flexible CMS with workflow automation, real-time collaboration, and API-first design',
    vitals: [
      { label: 'Content', value: '50K+' },
      { label: 'Languages', value: '12' },
      { label: 'Teams', value: '150+' }
    ],
    stack: ['GraphQL', 'Node.js', 'Vue.js', 'PostgreSQL', 'Elasticsearch'],
    category: 'Backend',
    status: 'completed'
  },
  {
    id: 'P004',
    title: 'AI Chat Assistant Integration',
    description: 'Intelligent conversational AI with context awareness and multi-platform deployment',
    image: '/assets/projects/ai-chat.jpg',
    imageAlt: 'Chat Assistant Interface',
    problem: 'Customer support volume was overwhelming existing team capacity',
    solution: 'Implemented AI chatbot with NLP capabilities, seamless handoff to human agents',
    vitals: [
      { label: 'Queries/Day', value: '10K' },
      { label: 'Resolution', value: '78%' },
      { label: 'Saved', value: '$500K' }
    ],
    stack: ['OpenAI API', 'React', 'Python', 'Firebase', 'Webhook'],
    category: 'AI/ML',
    status: 'completed'
  },
  {
    id: 'P005',
    title: 'Real-Time Collaboration Tool',
    description: 'Web-based workspace for teams with live editing, comments, and activity tracking',
    image: '/assets/projects/collab-tool.jpg',
    imageAlt: 'Collaboration Tool',
    problem: 'Remote teams needed better synchronous collaboration capabilities',
    solution: 'Built real-time sync engine with WebSocket, operational transform for conflict resolution',
    vitals: [
      { label: 'Latency', value: '<100ms' },
      { label: 'Concurrent', value: '1M+' },
      { label: 'Scale', value: 'Global' }
    ],
    stack: ['WebSocket', 'React', 'Node.js', 'Redis', 'DynamoDB'],
    category: 'Web Application',
    status: 'completed'
  },
  {
    id: 'P006',
    title: 'Data Pipeline & ETL System',
    description: 'Scalable data processing system for ingesting, transforming, and analyzing large datasets',
    image: '/assets/projects/data-pipeline.jpg',
    imageAlt: 'Data Pipeline Architecture',
    problem: 'Manual data processing was time-consuming and error-prone',
    solution: 'Engineered automated ETL pipeline with monitoring, alerting, and error recovery',
    vitals: [
      { label: 'Records/Day', value: '100M' },
      { label: 'Uptime', value: '99.99%' },
      { label: 'Latency', value: '<5s' }
    ],
    stack: ['Apache Airflow', 'PySpark', 'Kafka', 'PostgreSQL', 'Python'],
    category: 'Data Engineering',
    status: 'completed'
  }
];

export const projectCategories = [
  'Web Application',
  'E-Commerce',
  'Backend',
  'AI/ML',
  'Data Engineering',
  'Mobile'
];

export const projectStack = [
  'React',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Vue.js',
  'Python',
  'GraphQL',
  'Next.js',
  'AWS',
  'MongoDB',
  'Firebase',
  'Docker',
  'Kubernetes'
];
