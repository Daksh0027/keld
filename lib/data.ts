export type DistrictData = {
  name: string;
  code: string;
  desc: string;
  tags: string[];
  specs: Record<string, string>;
  connections: string[];
  pos: { x: number; y: number };
  details?: {
    title: string;
    subtitle?: string;
    date?: string;
    description?: string;
    link?: string;
  }[];
  links?: {
    label: string;
    url: string;
  }[];
  bullets?: string[];
};

export const DATA: Record<string, DistrictData> = {
  archives: {
    name: 'Education', code: 'ACADEMIC HISTORY',
    desc: 'Personnel file. A comprehensive timeline of foundational education and extracurricular operational capabilities.',
    tags: ['Education', 'Degree', 'Extracurricular'],
    specs: { area: '12,000 SQM', clearance: 'Lvl 2', power: 'Offline', status: 'ACTIVE', sec: 'LEVEL 3' },
    connections: ['D02', 'CORE'],
    pos: { x: 108, y: 362 },
    details: [
      {
        title: 'B.Tech, Information Technology',
        subtitle: 'Bhagwan Parshuram Institute of Technology',
        date: '2024 - 2028'
      },
      {
        title: 'Senior Secondary (XII), Science',
        subtitle: 'St. Josephs Academy (CBSE)',
        date: '2024',
        description: 'Percentage: 81.60%'
      },
      {
        title: 'Secondary (X)',
        subtitle: 'St. Josephs Academy (CBSE)',
        date: '2022',
        description: 'Percentage: 91.20%'
      },
      {
        title: 'Public Relations Associate',
        subtitle: 'College Society',
        description: 'Managed public relations and external communications for college society events.'
      }
    ]
  },
  load: {
    name: 'Tech Stack', code: 'CORE COMPETENCIES',
    desc: 'The foundational framework. A complete breakdown of languages, tools, and systems utilized to build and maintain the current infrastructure.',
    tags: ['C++', 'Python', 'React', 'Node.js', 'SQL'],
    specs: { area: '45,000 SQM', clearance: 'Lvl 4', power: 'Optimal', status: 'ACTIVE', cap: '847 UNITS' },
    connections: ['D01', 'D03', 'CORE'],
    pos: { x: 532, y: 74 },
    details: [
      {
        title: 'Languages',
        description: 'C++, C, C#, Python, JavaScript'
      },
      {
        title: 'Frontend',
        description: 'HTML, CSS, Tailwind CSS, React'
      },
      {
        title: 'Backend',
        description: 'Node.js, Django, Flask'
      },
      {
        title: 'Database',
        description: 'MySQL, PL/SQL'
      },
      {
        title: 'Tools & DevOps',
        description: 'GitHub, Vercel, Netlify'
      }
    ]
  },
  surface: {
    name: 'Experience', code: 'OPERATIONAL HISTORY',
    desc: 'Verified operational history. A chronological log of professional roles, responsibilities, and successful system integrations in the field.',
    tags: ['Frontend', 'Internship', 'Development'],
    specs: { area: '28,000 SQM', clearance: 'Lvl 1', power: 'Nominal', status: 'ACTIVE', node: 'PUBLIC' },
    connections: ['D02'],
    pos: { x: 320, y: 218 },
    details: [
      {
        title: 'Front End Development Intern',
        subtitle: 'SHREE JI FACILITY SERVICES, Delhi',
        date: 'May 2026 - Present'
      }
    ]
  },
  proving: {
    name: 'Projects', code: 'CLASSIFIED RESEARCH',
    desc: 'Live demonstrations and test zones. A curated catalog of built applications, experimental prototypes, and functional engineering solutions.',
    tags: ['React', 'Python', 'Fullstack', 'AI'],
    specs: { area: '15,000 SQM', clearance: 'Lvl 5', power: 'Fluctuating', status: 'ACTIVE', risk: 'HIGH' },
    connections: ['CORE'],
    pos: { x: 320, y: 74 },
    details: [
      {
        title: 'Movie Streaming Platform',
        date: 'Aug 2025 - Feb 2026',
        link: 'https://respectro.vercel.app/',
        description: 'ReSpectro - A responsive movie and TV series discovery web application built in React And Vite. Integrated with TMDB API to fetch real time data about movies/series. User authentication using clerk and leveraged Appwrite as backend to track personalization.'
      },
      {
        title: 'Library Management System',
        date: 'Jan 2024 - Feb 2024',
        description: 'A fully scalable library managament system in Python and its libraries like MySQL connector and MySQL to manage the inventory system as well as sales record for a store with an inbuilt CUI.'
      },
      {
        title: 'Gemini - Clone',
        date: 'Feb 2025 - Present',
        link: 'https://bot-clone.netlify.app/',
        description: "A frontend clone of the Gemini AI's WebPage with clean design and responsiveness Programmed in React with minimal CSS but a clean look Actually usable AI agent from Gemini's API."
      }
    ]
  },
  core: {
    name: 'Daksh Shastri', code: 'THE OPERATOR',
    desc: '',
    tags: ['Engineer', 'Developer', 'Student'],
    specs: { area: '100,000 SQM', clearance: 'Lvl 0 (Admin)', power: 'Maximum', status: 'OPTIMAL', auth: 'PRIMARY' },
    connections: ['D01', 'D02', 'D04', 'D05'],
    pos: { x: 108, y: 74 },
    details: [
      {
        title: 'Identity',
        description: 'Information Technology undergraduate at Bhagwan Parshuram Institute of Technology and an active competitive programmer based in Delhi.'
      },
      {
        title: 'Trajectory',
        description: 'Currently working as a Front-End Development intern at SHREE JI FACILITY SERVICES, bridging the gap between algorithmic problem-solving (Codeforces Specialist) and full-stack application architecture.'
      },
      {
        title: 'Objective',
        description: 'Seeking to apply a diverse skill set spanning React, Node.js, and C++ to solve complex technical challenges, contribute to impactful projects, and continually level up as a software engineer.'
      }
    ]
  },
  transmission: {
    name: 'Certifications', code: 'ISSUED CREDENTIALS',
    desc: 'Cryptographically verified credentials. Official documentation of specialized training, completed protocols, and recognized technical proficiencies.',
    tags: ['Courses', 'Achievements', 'Competitive'],
    specs: { area: '8,000 SQM', clearance: 'Lvl 1', power: 'Standby', status: 'ACTIVE', freq: '8.4 GHZ' },
    connections: ['CORE'],
    pos: { x: 320, y: 362 },
    details: [
      {
        title: 'Complete IP Addressing And Subnetting Course',
        subtitle: 'Geeks for geeks, Online',
        date: 'Jun 2025',
        link: '/bdaf8a32073c89456ece1fd6b2e6cab1.pdf'
      }
    ],
    bullets: [
      'Ranked 222 in LeetCode Weekly Contest 451.',
      'Global Rank 295 in CodeChef Starters 190.',
      'Ranked Specialist In Codeforces.',
      'Participated In SIH\'24 And Qualified Till The Mentor Round.',
      'Placed 13th In A Cyber Security CTF Event Held At MAIT.'
    ]
  },
  classified: {
    name: 'Contact', code: 'TRING-TRING',
    desc: 'Direct communication uplink. Secure channels for establishing connections, initiating inquiries, and proposing new operational contracts.',
    tags: ['Email', 'Delhi', 'Network'],
    specs: { area: '18,000 SQM', clearance: 'Lvl 6', power: 'Online', status: 'ACTIVE', auth: 'GRANTED' },
    connections: ['CORE'],
    pos: { x: 532, y: 362 },
    links: [
      { label: 'dakshshastri0627@gmail.com', url: 'mailto:dakshshastri0627@gmail.com' },
      { label: 'GitHub: Daksh0027', url: 'https://github.com/Daksh0027' },
      { label: 'LeetCode: Daksh0027', url: 'https://leetcode.com/u/Daksh0027' },
      { label: 'CodeChef: gam_pearl_90', url: 'https://www.codechef.com/users/gam_pearl_90' }
    ]
  }
};

export type DistrictID = keyof typeof DATA;
