<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed, ref } from 'vue'

import { 
  House, 
  PanelLeftClose, 
  PanelRightClose,
  Share2,
  Newspaper,
  Instagram,
  Youtube,
  Facebook,
  Music,
  Twitter
} from 'lucide-vue-next'

const props = withDefaults(defineProps<{ displayName?: string }>(), {
  displayName: 'Maskur',
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
      class="h-screen bg-base-200 border-r border-base-300 transition-all duration-200 ease-in-out overflow-y-auto z-50 fixed"
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
        
        <!-- Social Media Section -->
        <li>
          <div class="font-medium px-4 py-2 text-base-content/70">
            <span class="mr-2">
              <Share2 :size="16" />
            </span>
            <span>Social Media</span>
          </div>
        </li>
        
        <!-- Social Media Links -->
        <li>
          <RouterLink to="/social/news" class="text-sm pl-8">
            <span class="mr-2">
              <Newspaper :size="14" />
            </span>
            <span>News</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/social/instagram" class="text-sm pl-8">
            <span class="mr-2">
              <Instagram :size="14" />
            </span>
            <span>Instagram</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/social/youtube" class="text-sm pl-8">
            <span class="mr-2">
              <Youtube :size="14" />
            </span>
            <span>YouTube</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/social/facebook" class="text-sm pl-8">
            <span class="mr-2">
              <Facebook :size="14" />
            </span>
            <span>Facebook</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/social/tiktok" class="text-sm pl-8">
            <span class="mr-2">
              <Music :size="14" />
            </span>
            <span>TikTok</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/social/twitter" class="text-sm pl-8">
            <span class="mr-2">
              <Twitter :size="14" />
            </span>
            <span>Twitter</span>
          </RouterLink>
        </li>
      </ul>
    </aside>

    <div class="flex-1 bg-base-100" :class="{ 'lg:ml-64': isOpen }">
      <div class="navbar bg-base-100 border-b border-base-300 sticky top-0 z-30">
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

      <div class="min-h-screen">
        <slot />
      </div>
    </div>
  </div>

</template>

<style scoped></style>
