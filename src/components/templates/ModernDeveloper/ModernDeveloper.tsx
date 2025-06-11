import type { UserProfile } from '../../../types/Template'
import styles from './ModernDeveloper.module.css'

interface ModernDeveloperProps {
  userProfile: UserProfile
}

/**
 * Template moderno para desenvolvedores
 * Design clean e profissional focado em projetos e experiência
 */
export const ModernDeveloper = ({ userProfile }: ModernDeveloperProps) => {
  const { personal, contact, skills, experience, projects } = userProfile

  return (
    <div className={styles.template}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.profile}>
            <img
              src={personal.avatar}
              alt={`Foto de ${personal.name}`}
              className={styles.avatar}
            />
            <div className={styles.info}>
              <h1 className={styles.name}>{personal.name}</h1>
              <h2 className={styles.title}>{personal.title}</h2>
              {personal.location && (
                <p className={styles.location}>📍 {personal.location}</p>
              )}
            </div>
          </div>
          <div className={styles.contact}>
            <a href={`mailto:${contact.email}`} className={styles.contactLink}>
              {contact.email}
            </a>
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                LinkedIn
              </a>
            )}
            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h3 className={styles.sectionTitle}>Sobre mim</h3>
          <p className={styles.bio}>{personal.bio}</p>
        </div>
      </section>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h3 className={styles.sectionTitle}>Habilidades</h3>{' '}
            <div className={styles.skills}>
              {skills.map((skill: string) => (
                <span key={skill} className={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h3 className={styles.sectionTitle}>Projetos</h3>{' '}
            <div className={styles.projects}>
              {projects.map((project: (typeof projects)[0]) => (
                <div key={project.name} className={styles.project}>
                  {project.image && (
                    <img
                      src={project.image}
                      alt={`Projeto ${project.name}`}
                      className={styles.projectImage}
                    />
                  )}
                  <div className={styles.projectContent}>
                    <h4 className={styles.projectName}>{project.name}</h4>
                    <p className={styles.projectDescription}>
                      {project.description}
                    </p>{' '}
                    <div className={styles.technologies}>
                      {project.technologies.map((tech: string) => (
                        <span key={tech} className={styles.technology}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLink}
                      >
                        Ver projeto
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h3 className={styles.sectionTitle}>Experiência</h3>{' '}
            <div className={styles.experience}>
              {experience.map((exp: (typeof experience)[0], index: number) => (
                <div key={index} className={styles.experienceItem}>
                  <div className={styles.experienceHeader}>
                    <h4 className={styles.experiencePosition}>
                      {exp.position}
                    </h4>
                    <span className={styles.experiencePeriod}>
                      {exp.period}
                    </span>
                  </div>
                  <p className={styles.experienceCompany}>{exp.company}</p>
                  <p className={styles.experienceDescription}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
