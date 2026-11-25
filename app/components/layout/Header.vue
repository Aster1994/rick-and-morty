<script lang="ts" setup>
import Logo from '~/components/common/logo.vue'
</script>

<template>
  <header class="header isolate">
    <div
      class="header__content blur-circle px-4 pt-3 pb-6 mx-auto max-w-max-width-container flex flex-col gap-6"
    >
      <Logo />

      <slot />
    </div>
  </header>
</template>

<style scoped>
.header {
  background: linear-gradient(90deg, var(--color-main-bg) 0%, var(--color-dark-bg) 100%);

  .blur-circle {
    background: radial-gradient(
      circle 140px at 15% 50%,
      color-mix(in srgb, var(--color-primary) 45%, transparent),
      transparent 120%
    );

    @media screen and (max-width: 1024px) {
      background: radial-gradient(
        circle 140px at 10% 80%,
        color-mix(in srgb, var(--color-primary) 45%, transparent),
        transparent 100%
      );
    }
  }
}
</style>
