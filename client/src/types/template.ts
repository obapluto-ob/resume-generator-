export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  title: string;
  summary: string;
}

export interface SectionItem {
  id: number;
  content?: string;
  company?: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  school?: string;
  degree?: string;
  fieldOfStudy?: string;
}

export interface ResumeSection {
  id: number;
  type: 'custom' | 'education' | 'experience' | 'skills';
  title: string;
  items: SectionItem[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  sections: ResumeSection[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  free: boolean;
  category: 'modern' | 'classic' | 'professional' | 'creative';
  preview: string;
  features?: string[];
  color?: string;
}

export const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with modern styling',
    free: true,
    category: 'modern',
    preview: '/templates/modern-preview.png'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional professional resume format',
    free: true,
    category: 'classic',
    preview: '/templates/classic-preview.png'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Executive-level template with sophisticated layout',
    free: false,
    category: 'professional',
    preview: '/templates/professional-preview.png'
  }
];