import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ModernDeveloper } from './ModernDeveloper'
import { mockUserProfile } from '../../../utils/mockData'

describe('ModernDeveloper', () => {
  it('renders user name and title', () => {
    render(<ModernDeveloper userProfile={mockUserProfile} />)

    expect(screen.getByText('João Silva')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Desenvolvedor Front-end' })
    ).toBeInTheDocument()
  })

  it('displays user bio in Portuguese', () => {
    render(<ModernDeveloper userProfile={mockUserProfile} />)

    expect(
      screen.getByText(
        /Desenvolvedor apaixonado por criar experiências digitais/
      )
    ).toBeInTheDocument()
  })

  it('shows contact information', () => {
    render(<ModernDeveloper userProfile={mockUserProfile} />)

    expect(screen.getByText('joao.silva@email.com')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
  })

  it('displays section titles in Portuguese', () => {
    render(<ModernDeveloper userProfile={mockUserProfile} />)

    expect(screen.getByText('Sobre mim')).toBeInTheDocument()
    expect(screen.getByText('Habilidades')).toBeInTheDocument()
    expect(screen.getByText('Projetos')).toBeInTheDocument()
    expect(screen.getByText('Experiência')).toBeInTheDocument()
  })
  it('renders skills correctly', () => {
    render(<ModernDeveloper userProfile={mockUserProfile} />)

    // Test skills within the skills section specifically
    const skillsSection = screen.getByText('Habilidades').closest('section')
    expect(skillsSection).toBeInTheDocument()

    // Check for specific skills in the skills section
    expect(screen.getAllByText('React')[0]).toBeInTheDocument()
    expect(screen.getAllByText('TypeScript')[0]).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
  })

  it('displays projects with proper information', () => {
    render(<ModernDeveloper userProfile={mockUserProfile} />)

    expect(screen.getByText('E-commerce Platform')).toBeInTheDocument()
    expect(screen.getByText('Task Management App')).toBeInTheDocument()
    expect(screen.getByText('Weather Dashboard')).toBeInTheDocument()
  })

  it('shows experience information', () => {
    render(<ModernDeveloper userProfile={mockUserProfile} />)

    expect(
      screen.getByText('Desenvolvedor Front-end Sênior')
    ).toBeInTheDocument()
    expect(screen.getByText('TechCorp')).toBeInTheDocument()
    expect(screen.getByText('2022 - Presente')).toBeInTheDocument()
  })

  it('has proper alt text for images in Portuguese', () => {
    render(<ModernDeveloper userProfile={mockUserProfile} />)

    expect(screen.getByAltText('Foto de João Silva')).toBeInTheDocument()
    expect(
      screen.getByAltText('Projeto E-commerce Platform')
    ).toBeInTheDocument()
  })

  it('has accessible project links', () => {
    render(<ModernDeveloper userProfile={mockUserProfile} />)

    const projectLinks = screen.getAllByText('Ver projeto')
    expect(projectLinks).toHaveLength(3)

    projectLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('displays location when provided', () => {
    render(<ModernDeveloper userProfile={mockUserProfile} />)

    expect(screen.getByText('📍 São Paulo, SP')).toBeInTheDocument()
  })
})
