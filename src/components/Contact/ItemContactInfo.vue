<script setup>
defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  secondPhoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  secondEmail: {
    type: String,
  },
});
</script>

<template>
  <div class="container">
    <div class="row text-start p-4">
      <div class="col-lg-2 icons mx-auto">
        <slot name="icon"></slot>
      </div>
      <div class="col-lg-10">
        <h2 class="title" v-if="title">{{ title }}</h2>
        <p class="description" v-if="description">
          {{ description }}
        </p>
        <p class="description" v-if="phoneNumber">
          <a class="enlace" :href="'tel:' + phoneNumber"
            >+503 {{ phoneNumber }}</a
          >
        </p>
        <p class="description" v-if="secondPhoneNumber">
          <a class="enlace" :href="'tel:' + secondPhoneNumber"
            >+503 {{ secondPhoneNumber }}</a
          >
        </p>
        <p class="description" v-if="email">
          <a class="enlace" :href="'mailto:' + email">{{ email }}</a>
        </p>
        <p class="description" v-if="secondEmail">
          <a class="enlace" :href="'mailto:' + secondEmail">{{
            secondEmail
          }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: var(--h2);
  font-weight: 600;
  margin-top: 1rem;
}

.description {
  font-size: var(--paragraph);
  text-decoration: none;
}

.enlace {
  text-decoration: none;
  color: var(--black);
}

.enlace:hover {
  color: var(--green-900);
}

@media (max-width: 992px) {
  .icons {
    margin-bottom: 1rem;
  }

  .description,
  .title {
    text-align: center;
  }

  .row {
    margin-bottom: 2rem;
    box-shadow: 12px 10px 26px rgba(0, 0, 0, 0.08);
  }
}
</style>
