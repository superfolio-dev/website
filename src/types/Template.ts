export type TemplateCategory = 'Developer' | 'Designer' | 'Freelancer' | 'Business'

export interface Template {
  id: string
  name: string
  category: TemplateCategory
  thumbnail: string
  features: string[]
  customizable: {
    colors: boolean
    typography: boolean
    layout: boolean
  }
}

export interface UserProfile {
  personal: {
    name: string
    title: string
    bio: string
    avatar: string
    location?: string
  }
  contact: {
    email: string
    phone?: string
    website?: string
    linkedin?: string
    github?: string
    twitter?: string
  }
  skills: string[]
  experience: {
    company: string
    position: string
    period: string
    description: string
  }[]
  education: {
    institution: string
    degree: string
    period: string
  }[]
  projects: {
    name: string
    description: string
    technologies: string[]
    link?: string
    image?: string
  }[]
}
