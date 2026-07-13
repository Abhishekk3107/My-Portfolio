import userImage from './assets/Abhi.jpeg'

import freewaystudyImage from './assets/freewaystudy.png'
import askAiImage from './assets/ask-ai.png'
import skillswapImage from './assets/skillswap.png'
import resumePDF from './assets/Abhishek-Kumar-10th-July.pdf'

export const portfolioData = {
  personal: {
    name: 'Abhishek Kumar',
    title: 'Full Stack Developer (MERN / Next.js / TypeScript)',
    location: 'Ghaziabad, India',
    email: 'abhishek3107kumar2004@gmail.com',
    phone: '+91-9990012844',
    image: userImage,
    resume: resumePDF,
    social: {
      linkedin: 'https://linkedin.com/in/abhishekkumar3107',
      github: 'https://github.com/Abhishekk3107',
    },
    intro:
      'Currently working at Stream Digital Services after an internship-to-full-time conversion, with hands-on experience across production React.js, Node.js, REST APIs, optimization, and modern frontend architecture.',
    summary:
      'My recent work spans performance-focused React.js optimization, secure REST API integration, production debugging, documentation with Swagger UI, and responsive frontend systems built with Next.js, Tailwind CSS, and CMS-backed workflows.',
  },
  seo: {
    title: 'Abhishek Kumar | Full Stack Developer (MERN / Next.js / TypeScript)',
    description:
      'Portfolio of Abhishek Kumar, a Full Stack Developer with experience in MERN, Next.js, TypeScript, REST APIs, and performance-focused web applications.',
    siteUrl: 'https://abhishekkumar.site',
  },
  highlights: [
    'Internship-to-full-time conversion at Stream Digital Services',
    'Built and shipped 4 production-grade projects independently',
    'Ranked 1st in semesters 1, 2, 3, and 6 of BCA',
  ],
  experience: [
    {
      company: 'Stream Digital Services',
      location: 'Noida, UP',
      overallPeriod: 'Feb 2026 - Present',
      roles: [
        {
          title: 'Junior Software Developer',
          period: 'May 2026 - Present',
          points: [
            'Debug and optimize production-level React.js and Node.js applications, including code-splitting and component lazy loading to reduce average page load latency.',
            'Design, develop, and integrate secure REST APIs for new multi-tenant feature modules under senior developer guidance using thin-controller and decoupled service layer architecture.',
            'Maintain version control hygiene with branching strategies, peer PR reviews, and conflict resolution inside an Agile sprint team of 6 engineers.',
          ],
        },
        {
          title: 'Software Development Intern',
          period: 'Feb 2026 - Apr 2026',
          points: [
            'Spearheaded documentation of internal legacy APIs using Swagger UI, improving developer onboarding velocity and reducing integration queries by 30%.',
            'Worked closely with project leads to resolve high-priority application bugs, map database requirements, and earn a full-time engineering conversion within 90 days.',
          ],
        },
      ],
    },
    {
      company: 'Glodias Tech',
      location: 'Remote',
      overallPeriod: 'Dec 2025 - Jan 2026',
      roles: [
        {
          title: 'Full Stack Developer Intern',
          period: 'Dec 2025 - Jan 2026',
          points: [
            'Built highly responsive, animation-rich web applications using Next.js and Sanity CMS, with optimized media assets and Server-Side Rendering for smoother performance.',
            'Integrated REST APIs and asynchronous data-fetching routines while applying optimized global state management patterns to prevent redundant component re-renders.',
            'Contributed to front-end performance audits, component unit testing, and collaborative code reviews across 2 Agile sprint cycles.',
          ],
        },
      ],
    },
  ],
  projects: [
    {
      title: 'Freeway Study',
      category: 'Ed-Tech Platform',
      stack: ['MERN Stack', 'JWT Auth', 'Role-Based Access'],
      image: freewaystudyImage,
      liveUrl: 'https://www.freewaystudy.tech/',
      githubUrl: '',
      summary:
        'Architected and deployed FreewayStudy.tech as a full-stack ed-tech platform with responsive design across all device breakpoints.',
      problem:
        'Students needed more accessible study content and a structured platform experience across notes, past papers, courses, and dashboards.',
      features: [
        'Notes, past papers, courses, and dashboard modules',
        'Reusable component-based architecture',
        'JWT-based authentication',
        'Role-based access for student and admin dashboards',
      ],
      impact: [
        'Reduced administrative overhead by 25%',
        'Scaled the platform to 500+ active students',
        'Improved content accessibility by 40% through intuitive UI/UX and optimized API response times',
      ],
    },
    {
      title: 'AskAI Chatbot',
      category: 'AI-Powered Chat Interface',
      stack: ['React', 'JavaScript', 'Groq API', 'Google Gemini API'],
      image: askAiImage,
      liveUrl: 'https://ask-ai-pi.vercel.app/',
      githubUrl: 'https://github.com/Abhishekk3107/ask-ai-public',
      summary:
        'Built an AI-powered conversational chatbot with REST API integration, optimized asynchronous state management, and real-time streaming responses.',
      problem:
        'Users needed a responsive AI chat experience that could handle multiple providers while staying fast and usable.',
      features: [
        'Groq and Gemini API integration',
        'Optimized asynchronous state handling',
        'Real-time streaming responses',
        'Debounced request handling',
      ],
      impact: ['Reduced average response latency through debounced request handling'],
    },
    {
      title: 'SkillSwap',
      category: 'Skill Exchange Platform',
      stack: ['React', 'Firebase', 'Vite', 'REST API'],
      image: skillswapImage,
      liveUrl: 'https://skillswap-skillplatform.vercel.app/',
      githubUrl: '',
      summary:
        'Created a scalable skill-exchange platform with profile creation, swipe-based peer discovery, real-time data sync, and Firebase authentication.',
      problem:
        'Peer skill exchange needed a lightweight, discoverable product flow that worked well on both desktop and mobile.',
      features: [
        'Profile creation',
        'Swipe-based peer discovery',
        'Real-time data sync',
        'Firebase authentication',
        'Responsive mobile and desktop UX',
      ],
      impact: ['Implemented responsive design for seamless mobile and desktop user experience'],
    },
  ],
  skills: [
    {
      category: 'Languages',
      items: ['JavaScript (ES6+)', 'TypeScript', 'C', 'C++'],
    },
    {
      category: 'Frontend',
      items: ['React.js', 'Next.js', 'Tailwind CSS', 'Responsive Design', 'State Management (Redux, Context API)'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express.js', 'REST API Design', 'JWT / OAuth'],
    },
    {
      category: 'Databases',
      items: ['MongoDB', 'MySQL', 'SQL Server (SSMS)', 'Firebase'],
    },
    {
      category: 'API Tools',
      items: ['Swagger/OpenAPI', 'Postman'],
    },
    {
      category: 'DevTools',
      items: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Render', 'Netlify', 'CI/CD pipelines'],
    },
    {
      category: 'CMS',
      items: ['Sanity CMS'],
    },
    {
      category: 'Core CS',
      items: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'OS', 'Software Engineering'],
    },
    {
      category: 'Soft Skills',
      items: ['Problem Solving', 'Agile/Scrum', 'Team Leadership', 'Self-Learning'],
    },
  ],
  education: [
    {
      degree: 'Master of Computer Applications (MCA)',
      institution: 'Galgotias University',
      details: 'Online',
      period: '2026 - 2028',
      score: 'Expected 2028',
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'IAMR Group of Institutions',
      details: '',
      period: '2023 - 2026',
      score: '81.83%',
    },
    {
      degree: 'Senior Secondary (XII)',
      institution: 'Shri Sanatan Dharm Inter College',
      details: '',
      period: '2022 - 2023',
      score: '78%',
    },
    {
      degree: 'Secondary (X)',
      institution: 'Shri Sanatan Dharm Inter College',
      details: '',
      period: '2021 - 2022',
      score: '86.83%',
    },
  ],
  credentials: {
    achievements: [
      'Ranked 1st in semesters 1, 2, 3, and 6 of BCA, maintaining scores above 80% throughout.',
      'Built and shipped 4 production-grade projects independently.',
    ],
    certifications: [
      'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    ],
  },
}
