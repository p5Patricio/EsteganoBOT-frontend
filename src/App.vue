<template>
  <div id="app">
    <header class="navbar">
      <div class="navbar-brand">
        <svg class="logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="2"/>
          <path d="M8 12L10.5 14.5L16 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="18" cy="6" r="1.5" fill="currentColor"/>
        </svg>
        <span class="brand-text">EsteganoBot</span>
      </div>
      <nav class="nav-links">
        <router-link to="/" class="nav-link">Inicio</router-link>
        <router-link to="/about" class="nav-link">Acerca de</router-link>
      </nav>
    </header>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <p>EsteganoBot — Ocultá y revelá mensajes en imágenes de forma segura.</p>
    </footer>
  </div>
</template>

<style>
/* ===== CSS Custom Properties ===== */
:root {
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-text: #1e293b;
  --color-text-secondary: #64748b;
  --color-text-muted: #94a3b8;
  --color-border: #e2e8f0;
  --color-border-light: #f1f5f9;
  --color-accent: #0f766e;
  --color-accent-hover: #115e59;
  --color-accent-soft: #ccfbf1;
  --color-accent-bg: #f0fdfa;
  --color-error: #ef4444;
  --color-error-bg: #fef2f2;
  --color-error-border: #fecaca;
  --color-success: #10b981;
  --color-success-bg: #ecfdf5;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.04);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.07), 0 4px 6px -4px rgb(0 0 0 / 0.04);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04);
  --transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --max-width: 1200px;
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace;
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-bg);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ===== Navbar ===== */
.navbar {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo {
  width: 28px;
  height: 28px;
  color: var(--color-accent);
}

.brand-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  gap: 8px;
}

.nav-link {
  text-decoration: none;
  color: var(--color-text-secondary);
  font-size: 0.9375rem;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  transition: all var(--transition);
}

.nav-link:hover {
  color: var(--color-text);
  background: var(--color-border-light);
}

.nav-link.router-link-exact-active {
  color: var(--color-accent);
  background: var(--color-accent-soft);
}

/* ===== Main Content ===== */
.main-content {
  flex: 1;
  max-width: var(--max-width);
  width: 100%;
  margin: 0 auto;
  padding: 40px 24px;
}

/* ===== Footer ===== */
.footer {
  text-align: center;
  padding: 24px;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  border-top: 1px solid var(--color-border);
}

.footer p {
  margin: 0;
}

/* ===== Utilities ===== */
.card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  transition: box-shadow var(--transition);
}

.card:hover {
  box-shadow: var(--shadow-lg);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  font-size: 0.9375rem;
  font-weight: 600;
  font-family: inherit;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition);
  text-decoration: none;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--color-accent);
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  background: var(--color-accent-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background: var(--color-accent-bg);
  color: var(--color-accent);
  border: 1px solid var(--color-accent-soft);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--color-accent-soft);
}

/* ===== Responsive ===== */
@media (max-width: 640px) {
  .navbar {
    padding: 0 16px;
    height: 56px;
  }

  .brand-text {
    font-size: 1.1rem;
  }

  .main-content {
    padding: 24px 16px;
  }
}
</style>
