import type { Key } from "react";

export interface SectionItem {
  id?: string | number;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
  location?: string;
  skills?: string[];
  achievements?: string[];
  position?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  degree?: string;
  fieldOfStudy?: string;
  school?: string;
  content?: string;
}

export interface ResumeSection {
  id?: string | number;
  title: string;
  type?: string;
  items: SectionItem[];
}

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
    linkedin?: string;
    website?: string;
    github?: string;
    portfolio?: string;
  };
  sections: ResumeSection[];
  referees: Array<{
    id?: string | number;
    name: string;
    title: string;
    company: string;
    email: string;
    phone: string;
    relationship?: string;
  }>;
}

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  linkedin?: string;
  website?: string;
  github?: string;
  portfolio?: string;
}

export interface RefereeItem {
  id: Key | null | undefined;
  title: string | number | readonly string[] | undefined;
  relationship: string | number | readonly string[] | undefined;
  name: string;
  position: string;
  company: string;
  email: string;
  phone?: string;
}