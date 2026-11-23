<script lang="ts" setup>
import { getVisiblePages } from '~/utils/pagination'
import BaseButton from '~/components/common/BaseButton.vue'

const props = withDefaults(
  defineProps<{
    modelValue: number
    totalPages: number
    disabled?: boolean
  }>(),
  { disabled: false },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const route = useRoute()

const visiblePages = computed(() => getVisiblePages(props.modelValue, props.totalPages))

const showLeadingEllipsis = computed(
  () => visiblePages.value.length > 0 && visiblePages.value[0] && visiblePages.value[0] > 1,
)

const showTrailingEllipsis = computed(
  () => visiblePages.value.length > 0 && visiblePages.value.at(-1)! < props.totalPages,
)

// Synchronize pagination state when the URL changes externally.
watch(
  () => route.query.page,
  (page) => {
    const parsedPage = Number(page) || 1

    if (
      Number.isInteger(parsedPage) &&
      parsedPage >= 1 &&
      parsedPage <= props.totalPages &&
      parsedPage !== props.modelValue
    ) {
      emit('update:modelValue', parsedPage)
    }
  },
)

async function goToPage(targetPage: number) {
  if (
    props.disabled ||
    targetPage < 1 ||
    targetPage > props.totalPages ||
    targetPage === props.modelValue
  ) {
    return
  }

  const query = { ...route.query }

  if (targetPage === 1) {
    delete query.page
  } else {
    query.page = String(targetPage)
  }

  await navigateTo({ path: route.path, query }, { replace: false })
}
</script>

<template>
  <nav
    v-if="totalPages > 1"
    aria-label="Pagination"
    class="flex flex-wrap items-center justify-center gap-1.5"
  >
    <BaseButton
      :class="{ '!text-muted-text': disabled || modelValue === 1 }"
      :disabled="disabled || modelValue === 1"
      append-icon="lucide:chevrons-left"
      aria-label="Go to first page"
      class="!text-base"
      rounded
      size="sm"
      title="First page"
      variant="ghost"
      @click="goToPage(1)"
    />

    <BaseButton
      :class="{ '!text-muted-text': disabled || modelValue === 1 }"
      :disabled="disabled || modelValue === 1"
      append-icon="lucide:chevron-left"
      aria-label="Go to previous page"
      class="!text-base"
      rounded
      size="sm"
      title="Previous page"
      variant="ghost"
      @click="goToPage(modelValue - 1)"
    />

    <span v-if="showLeadingEllipsis" aria-hidden="true" class="px-1 text-base text-muted-text">
      …
    </span>

    <BaseButton
      v-for="page in visiblePages"
      :key="page"
      :aria-current="page === modelValue ? 'page' : undefined"
      :aria-label="`Go to page ${page}`"
      :class="{ '!text-muted-text': page !== modelValue }"
      :disabled="disabled"
      :variant="page === modelValue ? 'primary' : 'ghost'"
      class="!text-base"
      rounded
      size="sm"
      @click="goToPage(page)"
    >
      {{ page }}
    </BaseButton>

    <span v-if="showTrailingEllipsis" aria-hidden="true" class="px-1 text-base text-muted-text">
      …
    </span>

    <BaseButton
      :class="{ '!text-muted-text': disabled || modelValue === totalPages }"
      :disabled="disabled || modelValue === totalPages"
      append-icon="lucide:chevron-right"
      aria-label="Go to next page"
      class="!text-base"
      rounded
      size="sm"
      title="Next page"
      variant="ghost"
      @click="goToPage(modelValue + 1)"
    />

    <BaseButton
      :class="{ '!text-muted-text': disabled || modelValue === totalPages }"
      :disabled="disabled || modelValue === totalPages"
      append-icon="lucide:chevrons-right"
      aria-label="Go to last page"
      class="!text-base"
      rounded
      size="sm"
      title="Last page"
      variant="ghost"
      @click="goToPage(totalPages)"
    />
  </nav>
</template>
