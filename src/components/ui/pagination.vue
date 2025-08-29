<template>
    <div class="text-xs sm:text-sm text-base-content/60 text-center sm:text-left">
        Menampilkan data {{ startItem }} - {{ endItem }} dari {{ totalItems }} total Data
    </div>
    <div class="flex justify-center items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
        <div class="join">
            <button class="join-item btn btn-sm sm:btn-md" :disabled="currentPage === 1" @click="$emit('page-change', currentPage - 1)">
                «
            </button>

            <button v-for="page in visiblePages" :key="page" class="join-item btn btn-sm sm:btn-md"
                :class="{ 'btn-active': page === currentPage }" @click="$emit('page-change', page)">
                {{ page }}
            </button>

            <button class="join-item btn btn-sm sm:btn-md" :disabled="currentPage === totalPages"
                @click="$emit('page-change', currentPage + 1)">
                »
            </button>
        </div>
    </div>

</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
}

const props = defineProps<Props>()

defineEmits<{
    'page-change': [page: number]
}>()

const visiblePages = computed(() => {
    const pages = []
    const maxVisible = 5

    if (props.totalPages <= maxVisible) {
        for (let i = 1; i <= props.totalPages; i++) {
            pages.push(i)
        }
    } else {
        const start = Math.max(1, props.currentPage - 2)
        const end = Math.min(props.totalPages, start + maxVisible - 1)

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }
    }

    return pages
})

const startItem = computed(() => {
    return (props.currentPage - 1) * props.itemsPerPage + 1
})

const endItem = computed(() => {
    return Math.min(props.currentPage * props.itemsPerPage, props.totalItems)
})
</script>