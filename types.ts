
export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  project?: string;
  description: string;
  bullets: string[];
  recognition?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  role: string;
  approach: string;
  impact: string;
  tech: string[];
  image: string;
  category: 'clinical' | 'enterprise' | 'infrastructure' | 'platform';
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Frontend' | 'UI Architecture' | 'Backend' | 'AI' | 'Testing' | 'Tools';
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface ResumeData {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    linkedin: string;
    location: string;
    summary: string;
  };
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  education: {
    degree: string;
    school: string;
    period: string;
    details: string;
  };
}
