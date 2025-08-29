<script setup lang="ts">
import { ChevronsLeft, ChevronsRight } from 'lucide-vue-next'
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
    const pages: number[] = []
    const maxVisible = 5

    if (props.totalPages <= maxVisible) {
        for (let page = 1; page <= props.totalPages; page++) {
            pages.push(page)
        }
    } else {
        const start = Math.max(1, props.currentPage - 2)
        const end = Math.min(props.totalPages, start + maxVisible - 1)

        for (let page = start; page <= end; page++) {
            pages.push(page)
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

<template>
    <div class="text-xs sm:text-sm text-base-content/60 text-center sm:text-left">
        Menampilkan data {{ startItem }} - {{ endItem }} dari {{ totalItems }} total Data
    </div>
    <div class="flex justify-center items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
        <div class="join">
            <button class="join-item btn btn-sm sm:btn-md" :disabled="currentPage === 1"
                :class="{ 'hover:bg-base-200 hover:cursor-not-allowed': currentPage === 1 }"
                @click="$emit('page-change', currentPage - 1)">
                <ChevronsLeft class="w-3 h-3" />
            </button>

            <button v-for="page in visiblePages" :key="page" class="join-item btn btn-sm sm:btn-md"
                :class="{ 'btn-active': page === currentPage }" @click="$emit('page-change', page)">
                {{ page }}
            </button>

            <button class="join-item btn btn-sm sm:btn-md" :disabled="currentPage === totalPages"
                :class="{ 'hover:bg-base-200 hover:cursor-not-allowed': currentPage === totalPages }"
                @click="$emit('page-change', currentPage + 1)">
                <ChevronsRight class="w-3 h-3" />
            </button>
        </div>
    </div>

</template>
