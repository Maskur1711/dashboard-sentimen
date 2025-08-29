<script setup lang="ts">
import Navbar from './components/Nav.vue'
</script>

<template>
  <Navbar>
    <div class="p-4 sm:p-6 lg:p-8">
      <router-view />
    </div>
  </Navbar>

</template>
<style scoped></style>

