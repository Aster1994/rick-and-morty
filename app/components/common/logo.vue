<script lang="ts" setup></script>

<template>
  <NuxtLink
    class="inline-flex w-fit shrink-0 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    to="/"
  >
    <NuxtImg
      alt="Rick and Morty"
      class="block h-9 w-[116px] object-contain"
      decoding="async"
      densities="1x 2x"
      format="webp"
      height="36"
      loading="eager"
      quality="85"
      src="/assets/images/logo.png"
      width="116"
    />
  </NuxtLink>
</template>
