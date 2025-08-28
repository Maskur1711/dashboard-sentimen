<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue'

const props = withDefaults(defineProps<{ displayName?: string }>(), {
  displayName: 'Maskur',
})

const initials = computed(() => {
  const parts = props.displayName.split(' ').filter(Boolean)
  return parts.map(p => p[0]).join('').slice(0, 2).toUpperCase()
})
</script>

<template>
  <div class="flex min-h-screen w-full">
    <aside class="min-h-screen w-64 bg-base-200 border-r border-base-300">
      <div class="px-4 py-4 text-xl font-bold">Dashboard Sentinel</div>
      <ul class="menu px-2">
        <li>
          <RouterLink to="/" class="font-medium">
            <span class="mr-2">🏠</span>
            <span>Dashboard</span>
          </RouterLink>
        </li>
      </ul>
    </aside>

    <div class="flex-1 bg-base-100">
      <div class="navbar bg-base-100 border-b border-base-300">
        <div class="flex-1 px-4">
          <span class="text-lg font-semibold">Dashboard</span>
        </div>
        <div class="flex-none px-4">
          <div class="flex items-center gap-3">
            <span class="hidden sm:block font-medium">{{ props.displayName }}</span>
            <div class="avatar placeholder">
              <div class="bg-neutral text-neutral-content w-8 rounded-full">
                <span class="text-xs">{{ initials }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <slot />
      </div>
    </div>
  </div>

</template>

<style scoped></style>
