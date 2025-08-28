<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed, ref } from 'vue'

import { House, PanelLeftClose, PanelRightClose } from 'lucide-vue-next'

const props = withDefaults(defineProps<{ displayName?: string }>(), {
  displayName: 'Maskur',
})

const initials = computed(() => {
  const parts = props.displayName.split(' ').filter(Boolean)
  return parts.map(p => p[0]).join('').slice(0, 2).toUpperCase()
})

const isOpen = ref(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true)
const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="flex min-h-screen w-full">
    <div v-if="isOpen" class="fixed inset-0 bg-base-300/50 lg:hidden z-40" @click="isOpen = false" />

    <aside
      class="min-h-screen bg-base-200 border-r border-base-300 transition-all duration-200 ease-in-out overflow-hidden z-50 lg:static fixed"
      :class="[
        isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:translate-x-0',
      ]">
      <div class="px-4 py-4 text-xl font-bold">Dashboard Sentinel</div>
      <ul class="menu px-2 w-full">
        <li>
          <RouterLink to="/" class="font-medium">
            <span class="mr-2">
              <House :size="16" />
            </span>
            <span>Dashboard</span>
          </RouterLink>
        </li>
      </ul>
    </aside>

    <div class="flex-1 bg-base-100">
      <div class="navbar bg-base-100 border-b border-base-300">
        <div class="flex-1 px-2 sm:px-4">
          <button class="btn btn-ghost btn-sm" @click="toggleSidebar" aria-label="Toggle sidebar">
            <component :is="isOpen ? PanelLeftClose : PanelRightClose" :size="18" />
          </button>
        </div>
        <div class="flex-none px-4">
          <div class="flex items-center gap-3">
            <div class="avatar avatar-online">
              <div class="w-10 rounded-full">
                <span class="hidden sm:block font-medium">{{ props.displayName }}</span>
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
