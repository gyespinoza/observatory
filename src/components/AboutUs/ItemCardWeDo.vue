<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="we-do d-flex">
    <div class="icons">
      <slot name="icon"></slot>
    </div>
    <div>
      <h2 class="we-do-title">{{ title }}</h2>
      <p class="we-do-description lh-base">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.we-do-title {
  font-size: var(--h2);
  font-weight: bold;
  letter-spacing: var(--letter-spacing);
  margin-top: 1rem;
}

.we-do-description {
  font-size: var(--text);
  margin-right: 3rem;
  text-align: justify;
}

@media (max-width: 992px) {
  .we-do {
    padding: 1.5rem;
    box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.75);
    border-radius: 1.6rem;
    margin-bottom: 3.2rem;
  }

  .we-do:hover {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    transform: scale(1.05);
  }
}

@media (max-width: 768px) {
  .we-do {
    flex-direction: column;
    align-items: center;
  }

  .we-do-title {
    text-align: center;
    margin-top: 0;
  }

  .we-do-description {
    text-align: center;
    margin-right: 0;
  }
}
</style>
