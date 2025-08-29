<script setup lang="ts">
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next'
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
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <!-- Info Text -->
        <div class="text-sm text-gray-600">
            Menampilkan <span class="font-medium text-gray-900">{{ startItem }}</span> - 
            <span class="font-medium text-gray-900">{{ endItem }}</span> dari 
            <span class="font-medium text-gray-900">{{ totalItems }}</span> data
        </div>

        <!-- Pagination Controls -->
        <div class="flex items-center gap-2">
            <!-- First Page -->
            <button 
                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                :disabled="currentPage === 1"
                @click="$emit('page-change', 1)"
            >
                <ChevronsLeft class="w-4 h-4" />
            </button>

            <!-- Previous Page -->
            <button 
                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                :disabled="currentPage === 1"
                @click="$emit('page-change', currentPage - 1)"
            >
                <ChevronLeft class="w-4 h-4" />
            </button>

            <!-- Page Numbers -->
            <div class="flex items-center gap-1">
                <button 
                    v-for="page in visiblePages" 
                    :key="page" 
                    class="px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                    :class="page === currentPage 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'"
                    @click="$emit('page-change', page)"
                >
                    {{ page }}
                </button>
            </div>

            <!-- Next Page -->
            <button 
                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                :disabled="currentPage === totalPages"
                @click="$emit('page-change', currentPage + 1)"
            >
                <ChevronRight class="w-4 h-4" />
            </button>

            <!-- Last Page -->
            <button 
                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                :disabled="currentPage === totalPages"
                @click="$emit('page-change', totalPages)"
            >
                <ChevronsRight class="w-4 h-4" />
            </button>
        </div>
    </div>
</template>

<style scoped>
/* Performance optimized hover effects */
button:not(:disabled):hover {
    transform: translateY(-1px);
}

button:not(:disabled):active {
    transform: translateY(0);
}
</style>
