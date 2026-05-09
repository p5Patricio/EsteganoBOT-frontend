<template>
  <div class="about">
    <div class="about-card card">
      <div class="about-header">
        <div class="about-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        </div>
        <h1>Acerca de EsteganoBot</h1>
      </div>

      <div class="about-body">
        <p class="lead">
          EsteganoBot es una herramienta web que permite ocultar y revelar mensajes de texto
          dentro de imágenes digitales usando técnicas de esteganografía LSB
          <em>(Least Significant Bit)</em>.
        </p>

        <section class="section">
          <h2>¿Cómo funciona?</h2>
          <p>
            La esteganografía LSB modifica los bits menos significativos de los píxeles de una imagen
            para almacenar información sin alterar visualmente la foto. Un ojo humano no puede
            detectar la diferencia entre la imagen original y la que contiene el mensaje oculto.
          </p>
          <p>
            El proceso es completamente reversible: subiendo la imagen modificada, EsteganoBot
            puede extraer el mensaje original de los píxeles.
          </p>
        </section>

        <section class="section">
          <h2>Características</h2>
          <ul class="feature-list">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Soporte para imágenes PNG y JPEG
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Sin registro ni almacenamiento en servidor
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Interfaz rápida y minimalista
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Open source
            </li>
          </ul>
        </section>

        <section class="section">
          <h2>Seguridad</h2>
          <p>
            Las imágenes procesadas no se almacenan permanentemente. El mensaje oculto viaja
            únicamente dentro del archivo de imagen que descargás. Sin embargo, esta herramienta
            no reemplaza a un cifrado robusto: si necesitás máxima seguridad, combiná
            esteganografía con cifrado AES u otro algoritmo confiable.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  max-width: 720px;
  margin: 0 auto;
}

.about-card {
  padding: 40px;
}

.about-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--color-border);
}

.about-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  background: var(--color-accent-bg);
  color: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.about-icon svg {
  width: 24px;
  height: 24px;
}

.about-header h1 {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-text);
  margin: 0;
  letter-spacing: -0.02em;
}

.about-body {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.lead {
  font-size: 1.0625rem;
  color: var(--color-text-secondary);
  line-height: 1.75;
  margin: 0;
}

.lead em {
  color: var(--color-text);
  font-style: normal;
  font-weight: 600;
}

.section h2 {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 10px 0;
}

.section p {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin: 0 0 10px 0;
}

.section p:last-child {
  margin-bottom: 0;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9375rem;
  color: var(--color-text);
}

.feature-list li svg {
  width: 18px;
  height: 18px;
  color: var(--color-success);
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .about-card {
    padding: 24px;
  }

  .about-header h1 {
    font-size: 1.25rem;
  }
}
</style>
