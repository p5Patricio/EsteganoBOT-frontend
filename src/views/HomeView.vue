<template>
  <div class="home">
    <section class="hero">
      <h1 class="hero-title">Esteganografía simple y segura</h1>
      <p class="hero-subtitle">
        Ocultá mensajes secretos dentro de imágenes PNG o JPEG sin dejar rastros visibles.
        Revelalos cuando quieras, de forma rápida y privada.
      </p>
    </section>

    <section class="tools-grid">
      <StegoForm />
      <RevealForm />
    </section>
  </div>
</template>

<script>
import StegoForm from "@/components/StegoForm.vue";
import RevealForm from "@/components/RevealForm.vue";

export default {
  name: "HomeView",
  components: {
    StegoForm,
    RevealForm,
  },
};
</script>

<style scoped>
.hero {
  text-align: center;
  margin-bottom: 48px;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin: 0 0 16px 0;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin: 0;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  align-items: start;
}

@media (max-width: 900px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }
}
</style>
