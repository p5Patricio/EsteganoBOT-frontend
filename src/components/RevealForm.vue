<template>
  <div class="reveal-card card">
    <div class="card-header">
      <div class="card-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </div>
      <div>
        <h2 class="card-title">Revelar mensaje</h2>
        <p class="card-desc">Subí una imagen con un mensaje oculto para descubrirlo.</p>
      </div>
    </div>

    <ErrorAlert :message="error" />

    <form @submit.prevent="handleSubmit" class="form">
      <!-- Drop Zone -->
      <label class="drop-zone" :class="{ 'has-file': fileName, 'dragover': isDragOver }"
             @dragover.prevent="isDragOver = true"
             @dragleave.prevent="isDragOver = false"
             @drop.prevent="onDrop">
        <input
          type="file"
          accept="image/png,image/jpeg"
          @change="onFileChange"
          :disabled="loading"
          required
          class="file-input"
        />
        <div class="drop-zone-content">
          <svg class="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <p class="drop-zone-text">
            <span v-if="fileName" class="file-name">{{ fileName }}</span>
            <span v-else>
              <strong>Arrastrá una imagen</strong> o hacé clic para elegir
            </span>
          </p>
          <p class="drop-zone-hint">PNG o JPEG · Hasta 5 MB</p>
        </div>
      </label>

      <!-- Password -->
      <div class="field">
        <label class="field-label">Contraseña</label>
        <input
          type="password"
          v-model="password"
          placeholder="Escribí la contraseña si el mensaje está protegido..."
          :disabled="loading"
          class="textarea"
        />
        <div class="field-hint">
          <span>Solo si el mensaje fue ocultado con una contraseña</span>
        </div>
      </div>

      <!-- Submit -->
      <button type="submit" class="btn btn-primary btn-full" :disabled="loading || !file">
        <span v-if="loading" class="spinner"></span>
        <span v-else>
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          Revelar mensaje
        </span>
      </button>
    </form>

    <!-- Result -->
    <div v-if="revealedMessage !== null" class="result">
      <div class="result-header">
        <svg class="result-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <span>Mensaje encontrado</span>
      </div>
      <div class="message-box">
        <p class="message-text">{{ revealedMessage }}</p>
      </div>
      <button type="button" class="btn btn-secondary btn-full" @click="copyMessage">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        {{ copied ? "¡Copiado!" : "Copiar mensaje" }}
      </button>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import ErrorAlert from "./ErrorAlert.vue";

export default {
  name: "RevealForm",
  components: { ErrorAlert },
  data() {
    return {
      file: null,
      fileName: "",
      imagePreview: null,
      password: "",
      loading: false,
      error: "",
      revealedMessage: null,
      isDragOver: false,
      copied: false,
      maxFileSize: 5 * 1024 * 1024,
    };
  },
  methods: {
    onFileChange(event) {
      const f = event.target.files[0];
      this.setFile(f);
    },
    onDrop(event) {
      this.isDragOver = false;
      const f = event.dataTransfer.files[0];
      if (f && (f.type === "image/png" || f.type === "image/jpeg")) {
        this.setFile(f);
      }
    },
    setFile(f) {
      this.error = "";
      this.revealedMessage = null;
      if (!f) {
        this.file = null;
        this.fileName = "";
        this.imagePreview = null;
        return;
      }
      if (!f.type.match(/^image\/(png|jpeg|jpg)$/)) {
        this.error = "Solo se permiten imágenes PNG o JPEG.";
        this.file = null;
        this.fileName = "";
        this.imagePreview = null;
        return;
      }
      if (f.size > this.maxFileSize) {
        this.error = "El archivo supera los 5 MB permitidos.";
        this.file = null;
        this.fileName = "";
        this.imagePreview = null;
        return;
      }
      this.file = f;
      this.fileName = f.name;
      this.imagePreview = URL.createObjectURL(f);
    },
    reset() {
      this.file = null;
      this.fileName = "";
      this.imagePreview = null;
      this.error = "";
      this.revealedMessage = null;
      this.copied = false;
    },
    async handleSubmit() {
      if (!this.file) {
        this.error = "Seleccioná una imagen.";
        return;
      }

      this.loading = true;
      this.error = "";
      this.revealedMessage = null;

      const formData = new FormData();
      formData.append("image", this.file);
      if (this.password) {
        formData.append("password", this.password);
      }

      try {
        const response = await api.post("/reveal", formData);
        const msg = response.data.message;
        this.revealedMessage = msg || "";
        this.$nextTick(() => {
          const el = this.$refs.resultSection;
          if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
      } catch (err) {
        this.error = err.message || "No se pudo revelar el mensaje.";
      } finally {
        this.loading = false;
      }
    },
    async copyMessage() {
      try {
        await navigator.clipboard.writeText(this.revealedMessage);
        this.copied = true;
        setTimeout(() => (this.copied = false), 2000);
      } catch {
        // fallback silent
      }
    },
  },
};
</script>

<style scoped>
.reveal-card {
  padding: 28px;
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 20px;
}

.card-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: var(--color-accent-bg);
  color: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-icon svg {
  width: 22px;
  height: 22px;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 4px 0;
}

.card-desc {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Drop Zone */
.drop-zone {
  display: block;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  padding: 28px 20px;
  text-align: center;
  cursor: pointer;
  transition: all var(--transition);
  background: var(--color-bg);
  position: relative;
}

.drop-zone:hover,
.drop-zone.dragover {
  border-color: var(--color-accent);
  background: var(--color-accent-bg);
}

.drop-zone.has-file {
  border-style: solid;
  border-color: var(--color-accent);
  background: var(--color-accent-bg);
}

.file-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.drop-zone-content {
  pointer-events: none;
}

.upload-icon {
  width: 36px;
  height: 36px;
  color: var(--color-text-muted);
  margin-bottom: 10px;
}

.drop-zone:hover .upload-icon,
.drop-zone.dragover .upload-icon {
  color: var(--color-accent);
}

.drop-zone-text {
  font-size: 0.9375rem;
  color: var(--color-text);
  margin: 0 0 6px 0;
}

.file-name {
  font-weight: 600;
  color: var(--color-accent);
}

.drop-zone-hint {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin: 0;
}

/* Button */
.btn-full {
  width: 100%;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Result */
.result {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
  animation: fadeIn 300ms ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-success);
  margin-bottom: 14px;
}

.result-icon {
  width: 18px;
  height: 18px;
}

.message-box {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 16px;
  margin-bottom: 14px;
}

.message-box.message-empty {
  background: var(--color-error-bg);
  border-color: var(--color-error-border);
  color: var(--color-error);
}

.message-box.message-empty p {
  margin: 0;
  font-size: 0.9375rem;
}

.message-text {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.9375rem;
  color: var(--color-text);
  word-break: break-word;
  line-height: 1.6;
  white-space: pre-wrap;
}

.result-empty {
  color: var(--color-error) !important;
}

.image-preview-box {
  margin-top: 4px;
}

.image-preview-thumb {
  width: 100%;
  max-height: 160px;
  object-fit: contain;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-bg);
}

.btn-ghost {
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid transparent;
  margin-top: 10px;
}

.btn-ghost:hover {
  color: var(--color-text);
  background: var(--color-border-light);
  border-color: var(--color-border);
}

/* Loading overlay */
.loading-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(2px);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  animation: fadeIn 150ms ease-out;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--color-text-secondary);
  font-size: 0.9375rem;
  font-weight: 500;
}

.spinner-overlay {
  display: inline-block;
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.reveal-card {
  position: relative;
}
</style>
