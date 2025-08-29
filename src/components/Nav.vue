<script setup lang="ts">

</script>

<template>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Dashboard Sentimen</a>
    </div>
    <div class="flex gap-2">
      <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <slot />

</template>
<style scoped></style>

