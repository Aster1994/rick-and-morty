<script lang="ts" setup>
import { useToast } from '~/composables/useToast.ts'
import BaseAlert from '~/components/common/BaseAlert.vue'

const { toasts, dismiss } = useToast()
</script>

<template>
  <Teleport to="body">
    <div
      class="pointer-events-none fixed inset-x-4 top-4 z-50 flex flex-col gap-2 sm:inset-x-auto sm:right-4 sm:w-96"
    >
      <TransitionGroup class="flex flex-col gap-2" name="toast" tag="div">
        <div v-for="toast in toasts" :key="toast.id" class="pointer-events-auto">
          <BaseAlert :variant="toast.type" @dismiss="dismiss(toast)">
            <template v-if="toast.text">
              <span class="font-medium">
                {{ toast.title }}
              </span>
              <span class="block mt-1">
                {{ toast.text }}
              </span>
            </template>

            <template v-else>
              {{ toast.title }}
            </template>
          </BaseAlert>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
