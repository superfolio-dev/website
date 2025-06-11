import { useState } from 'react'
import { mockTemplate, mockUserProfile } from '../../../utils/mockData'
import type { Template } from '../../../types/Template'
import styles from './TemplateSelection.module.css'
import { ModernDeveloper } from '../../templates/ModernDeveloper'

export const TemplateSelection = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  )
  const [showPreview, setShowPreview] = useState(false)

  // Por enquanto temos apenas um template, mas a estrutura suporta múltiplos
  const templates = [mockTemplate]

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template)
    setShowPreview(true)
  }

  const handleClosePreview = () => {
    setShowPreview(false)
    setSelectedTemplate(null)
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Escolha seu template</h1>
          <p className={styles.description}>
            Selecione o template que melhor representa seu estilo profissional
          </p>
        </header>

        <main className={styles.main}>
          <div className={styles.templateGrid} data-testid="template-grid">
            {templates.map((template) => (
              <div
                key={template.id}
                className={styles.templateCard}
                data-testid="template-card"
                onClick={() => handleTemplateSelect(template)}
              >
                <div className={styles.templateThumbnail}>
                  <img
                    src={template.thumbnail}
                    alt={`Template ${template.name}`}
                    className={styles.thumbnailImage}
                  />
                  <div className={styles.overlay}>
                    {' '}
                    <button
                      className={styles.previewButton}
                      type="button"
                      onClick={() => handleTemplateSelect(template)}
                      aria-label={`Visualizar template ${template.name}`}
                    >
                      Visualizar
                    </button>
                  </div>
                </div>

                <div className={styles.templateInfo}>
                  <h3 className={styles.templateName}>{template.name}</h3>
                  <p className={styles.templateCategory}>{template.category}</p>
                  <div className={styles.features}>
                    {template.features.map((feature) => (
                      <span key={feature} className={styles.feature}>
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className={styles.customizable}>
                    <p className={styles.customizableTitle}>Personalizável:</p>
                    <div className={styles.customizableOptions}>
                      {template.customizable.colors && (
                        <span className={styles.customizableOption}>Cores</span>
                      )}
                      {template.customizable.typography && (
                        <span className={styles.customizableOption}>
                          Tipografia
                        </span>
                      )}
                      {template.customizable.layout && (
                        <span className={styles.customizableOption}>
                          Layout
                        </span>
                      )}
                    </div>
                  </div>{' '}
                  <button
                    className={styles.selectButton}
                    type="button"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    Escolher template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Preview Modal */}
      {showPreview && selectedTemplate && (
        <div className={styles.modal} role="dialog" aria-modal="true">
          <div className={styles.modalOverlay} onClick={handleClosePreview} />
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                Preview: {selectedTemplate.name}
              </h2>{' '}
              <button
                className={styles.closeButton}
                type="button"
                onClick={handleClosePreview}
                aria-label="Fechar preview"
              >
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.previewContainer}>
                {selectedTemplate.id === 'modern-developer' && (
                  <ModernDeveloper userProfile={mockUserProfile} />
                )}
              </div>
            </div>

            <div className={styles.modalFooter}>
              {' '}
              <button
                className={styles.cancelButton}
                type="button"
                onClick={handleClosePreview}
              >
                Voltar
              </button>
              <button className={styles.selectTemplateButton} type="button">
                Escolher este template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
