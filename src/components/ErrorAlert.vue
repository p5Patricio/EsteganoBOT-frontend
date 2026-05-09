<template>
  <div v-if="message" class="error-alert" role="alert">
    <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
    <span class="error-text">{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: "ErrorAlert",
  props: {
    message: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.error-alert {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  background: var(--color-error-bg);
  border: 1px solid var(--color-error-border);
  border-radius: var(--radius-md);
  color: var(--color-error);
  font-size: 0.875rem;
  font-weight: 500;
  animation: shakeIn 250ms ease-out;
}

.error-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 1px;
}

.error-text {
  line-height: 1.5;
}

@keyframes shakeIn {
  0% {
    opacity: 0;
    transform: translateX(-4px);
  }
  50% {
    transform: translateX(2px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
