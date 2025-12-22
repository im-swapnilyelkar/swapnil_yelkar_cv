
import { ResumeData } from '../types';

export const resumeData: ResumeData = {
  personal: {
    name: "Swapnil Yelkar",
    title: "Technical Lead Engineer | UI Architect",
    email: "im.swapnilyelkar@gmail.com",
    phone: "+1 (289)-400-9007",
    linkedin: "linkedin.com/in/im-swapnil/",
    location: "Oakville, Ontario, Canada",
    summary: "Senior Frontend Engineer with 14 years of experience building and scaling high-impact, consumer-facing web platforms. Strong focus on the back of the frontend including React architecture, API-driven systems, performance optimization, accessibility, and large shared codebases. Proven track record delivering mission-critical products in regulated, high-scale environments."
  },
  skills: [
    { name: "React.js", level: 95, category: "Frontend" },
    { name: "Angular", level: 90, category: "Frontend" },
    { name: "TypeScript", level: 95, category: "Frontend" },
    { name: "Next.js (SSR)", level: 90, category: "Frontend" },
    { name: "Micro-Frontends", level: 95, category: "UI Architecture" },
    { name: "Module Federation", level: 90, category: "UI Architecture" },
    { name: "Nx Monorepo", level: 90, category: "UI Architecture" },
    { name: "Design Systems", level: 85, category: "UI Architecture" },
    { name: "State Management (NgRx, Redux, Zustand)", level: 92, category: "UI Architecture" },
    { name: "Node.js", level: 88, category: "Backend" },
    { name: "Java / Spring Boot", level: 82, category: "Backend" },
    { name: "Python / FastAPI", level: 85, category: "Backend" },
    { name: "AWS / CI/CD", level: 75, category: "Backend" },
    { name: "OpenAI SDK / Gen AI", level: 88, category: "AI" },
    { name: "Agentic AI / MCP", level: 90, category: "AI" },
    { name: "GitHub Copilot", level: 95, category: "AI" },
    { name: "Jest / RTL", level: 90, category: "Testing" },
    { name: "Cypress / Playwright", level: 85, category: "Testing" },
    { name: "Figma (Design Collaboration)", level: 80, category: "Tools" },
    { name: "SonarQube / ESLint", level: 85, category: "Tools" },
  ],
  experience: [
    {
      company: "Roche (RIS)",
      role: "Technical Lead Engineer | UI Architect",
      period: "06/2022 - 10/2025",
      location: "Oakville, Ontario, Canada",
      project: "Navify Clinical Hub",
      description: "Large-scale clinical platform used by oncology teams to access consolidated patient data and support critical decision-making workflows.",
      bullets: [
        "Led frontend system architecture for a high-impact clinical platform used by global healthcare teams.",
        "Designed and maintained React and Angular-based frontend systems integrated with backend services and APIs.",
        "Delivered a production-ready AI Patient Chart proof-of-concept in under one month, securing stakeholder confidence and funding.",
        "Drove frontend modernization efforts, standardizing architecture, improving maintainability, and reducing technical debt.",
        "Acted as Engineering Excellence Lead, improving code quality, review standards, and frontend governance.",
        "Championed accessibility best practices (WCAG 2.2, ARIA) across shared UI components."
      ],
      recognition: "Rated 'Exceeds Expectations' for three consecutive years."
    },
    {
      company: "BMC Software",
      role: "Sr. Product Developer",
      period: "01/2018 - 06/2022",
      location: "Remote/On-site",
      project: "Helix Business Workflows",
      description: "Scalable SaaS case-management platform serving enterprise customers.",
      bullets: [
        "Built and scaled frontend systems for a high-traffic SaaS platform used across multiple business domains.",
        "Designed reusable Angular component libraries shared across teams.",
        "Integrated frontend applications with backend services and APIs.",
        "Supported CI/CD pipelines and Agile delivery for shared codebases."
      ]
    },
    {
      company: "Cognizant",
      role: "Associate Project",
      period: "09/2016 - 01/2018",
      location: "On-site at BMC Software",
      description: "UI Developer for enterprise-grade web applications.",
      bullets: [
        "Developed reusable frontend components for enterprise-grade web applications.",
        "Supported production systems and collaborated closely with client engineering teams."
      ]
    },
    {
      company: "Ebix Software India (Zinnia)",
      role: "System Analyst - II",
      period: "07/2011 - 08/2016",
      location: "Nagpur/Pune, India",
      project: "SmartOffice - CRM",
      description: "A large enterprise CRM platform specialized in Insurance and Investment domain.",
      bullets: [
        "Contributed to a massive enterprise CRM platform in the insurance and investment domain.",
        "Developed frontend components, conducted code reviews, and supported long-term product evolution.",
        "Optimized frontend performance and cross-browser compatibility for legacy-integrated systems."
      ]
    }
  ],
  projects: [
    {
      id: "clinical-hub",
      title: "Navify Clinical Hub",
      subtitle: "Healthcare Data Consolidation Platform",
      description: "A centralized platform for oncology teams to visualize and interact with patient data from multiple sources.",
      problem: "Doctors struggled with fragmented patient data across various legacy systems.",
      role: "Lead UI Architect",
      approach: "Implemented a micro-frontend architecture using Module Federation to allow independent teams to contribute to a unified workspace.",
      impact: "Reduced data retrieval time for oncology workflows by 40% and enabled rapid scaling of features.",
      tech: ["React", "Angular", "Module Federation", "Nx", "TypeScript"],
      image: "https://picsum.photos/seed/navify/800/600",
      category: "clinical"
    },
    {
      id: "ai-chart",
      title: "AI Patient Chart PoC",
      subtitle: "Generative AI in Healthcare",
      description: "A proof-of-concept demonstrating how AI can summarize dense clinical notes into actionable insights.",
      problem: "Clinical notes are often hundreds of pages long, making it hard to find key patient indicators quickly.",
      role: "Technical Lead",
      approach: "Utilized LLMs via specialized prompts to extract timeline events and risk factors from clinical text.",
      impact: "Secured full funding for the AI initiative by demonstrating 10x faster chart review during stakeholder demos.",
      tech: ["React", "OpenAI SDK", "Node.js", "Vector Databases"],
      image: "https://picsum.photos/seed/aichart/800/600",
      category: "clinical"
    }
  ],
  certifications: [
    {
      title: "Certified SAFe® 5 Practitioner",
      issuer: "Scaled Agile Inc",
      date: "07/2023"
    }
  ],
  education: {
    degree: "Bachelor's of Engineering (Information Technology)",
    school: "GuruNanak Institute of Engineering & Technology, Nagpur University",
    period: "09/2007 - 04/2011",
    details: "First Class Division"
  }
};
