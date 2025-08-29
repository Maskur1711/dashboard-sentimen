<template>
    <div class="h-full flex flex-col bg-white">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200/60">
            <div>
                <h2 class="text-xl font-semibold text-gray-900">{{ title }}</h2>
                <p class="text-sm text-gray-600 mt-1">Analisis data sentimen per platform</p>
            </div>

            <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input 
                    v-model="searchQuery" 
                    type="text" 
                    placeholder="Cari platform..." 
                    class="pl-10 pr-4 py-2 border border-gray-300 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm w-64"
                />
            </div>
        </div>

        <!-- Table Container -->
        <div class="flex-1 overflow-hidden">
            <div class="h-full overflow-auto">
                <table class="w-full">
                    <!-- Table Header -->
                    <thead class="bg-gray-50/80 sticky top-0 z-10">
                        <tr class="border-b border-gray-200/60">
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                No
                            </th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <button @click="sortBy('channel')" class="flex items-center gap-2 hover:text-blue-600 transition-colors group">
                                    Platform
                                    <svg class="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                    </svg>
                                </button>
                            </th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <button @click="sortBy('positive')" class="flex items-center gap-2 hover:text-green-600 transition-colors group">
                                    Positive
                                    <svg class="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                    </svg>
                                </button>
                            </th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <button @click="sortBy('neutral')" class="flex items-center gap-2 hover:text-gray-600 transition-colors group">
                                    Neutral
                                    <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                    </svg>
                                </button>
                            </th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <button @click="sortBy('negative')" class="flex items-center gap-2 hover:text-red-600 transition-colors group">
                                    Negative
                                    <svg class="w-4 h-4 text-gray-400 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                    </svg>
                                </button>
                            </th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <button @click="sortBy('total')" class="flex items-center gap-2 hover:text-blue-600 transition-colors group">
                                    Total
                                    <svg class="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                    </svg>
                                </button>
                            </th>
                            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Distribusi
                            </th>
                        </tr>
                    </thead>

                    <!-- Table Body -->
                    <tbody class="bg-white divide-y divide-gray-100">
                        <!-- Skeleton Loading -->
                        <template v-if="isLoading">
                            <tr v-for="i in itemsPerPage" :key="`skeleton-${i}`" class="hover:bg-gray-50/50 transition-colors">
                                <td class="px-6 py-4">
                                    <Skeleton width="8" height="4" />
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <Skeleton width="8" height="8" circle />
                                        <Skeleton width="24" height="4" />
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <Skeleton width="16" height="6" />
                                </td>
                                <td class="px-6 py-4">
                                    <Skeleton width="16" height="6" />
                                </td>
                                <td class="px-6 py-4">
                                    <Skeleton width="16" height="6" />
                                </td>
                                <td class="px-6 py-4">
                                    <Skeleton width="20" height="6" />
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center justify-center">
                                        <div class="flex gap-2">
                                            <div class="flex flex-col items-center gap-1">
                                                <Skeleton width="6" height="12" />
                                                <Skeleton width="12" height="3" />
                                            </div>
                                            <div class="flex flex-col items-center gap-1">
                                                <Skeleton width="6" height="12" />
                                                <Skeleton width="12" height="3" />
                                            </div>
                                            <div class="flex flex-col items-center gap-1">
                                                <Skeleton width="6" height="12" />
                                                <Skeleton width="12" height="3" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </template>

                        <!-- Actual Data -->
                        <tr v-else v-for="(item, index) in paginatedData" :key="item.channel" 
                            class="hover:bg-gray-50/80 transition-all duration-200 group">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center gap-3">
                                    <component v-if="item.icon" :is="item.icon"
                                        class="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                                    <span class="text-sm font-medium text-gray-900">{{ item.channel }}</span>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="text-sm font-semibold text-green-600">
                                    {{ item.positive.toLocaleString() }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="text-sm font-semibold text-gray-600">
                                    {{ item.neutral.toLocaleString() }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="text-sm font-semibold text-red-600">
                                    {{ item.negative.toLocaleString() }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="text-sm font-semibold text-gray-900">
                                    {{ item.total.toLocaleString() }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center justify-center">
                                    <div class="flex gap-2">
                                        <!-- Positive Bar -->
                                        <div class="flex flex-col items-center gap-1">
                                            <div class="w-6 h-12 bg-gray-100 rounded-full relative overflow-hidden">
                                                <div class="absolute bottom-0 w-full bg-green-500 transition-all duration-500 ease-out rounded-full"
                                                    :style="{ height: item.positivePercent + '%' }"></div>
                                            </div>
                                            <span class="text-xs font-medium text-green-600">{{ item.positivePercent.toFixed(1) }}%</span>
                                        </div>
                                        <!-- Neutral Bar -->
                                        <div class="flex flex-col items-center gap-1">
                                            <div class="w-6 h-12 bg-gray-100 rounded-full relative overflow-hidden">
                                                <div class="absolute bottom-0 w-full bg-gray-500 transition-all duration-500 ease-out rounded-full"
                                                    :style="{ height: item.neutralPercent + '%' }"></div>
                                            </div>
                                            <span class="text-xs font-medium text-gray-600">{{ item.neutralPercent.toFixed(1) }}%</span>
                                        </div>
                                        <!-- Negative Bar -->
                                        <div class="flex flex-col items-center gap-1">
                                            <div class="w-6 h-12 bg-gray-100 rounded-full relative overflow-hidden">
                                                <div class="absolute bottom-0 w-full bg-red-500 transition-all duration-500 ease-out rounded-full"
                                                    :style="{ height: item.negativePercent + '%' }"></div>
                                            </div>
                                            <span class="text-xs font-medium text-red-600">{{ item.negativePercent.toFixed(1) }}%</span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Pagination -->
        <div class="border-t border-gray-200/60 bg-gray-50/30 px-6 py-4">
            <Pagination v-if="!isLoading && totalPages > 1" :current-page="currentPage" :total-pages="totalPages"
                :total-items="filteredData.length" :items-per-page="itemsPerPage" @page-change="handlePageChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Facebook, Instagram, Twitter, Youtube, Music, Newspaper } from 'lucide-vue-next'
import Pagination from './pagination.vue'
import Skeleton from './Skeleton.vue'
import { useSentimentStore } from '../../stores/sentimentStore'

interface ChannelData {
    channel: string
    icon?: any
    positive: number
    neutral: number
    negative: number
    total: number
    positivePercent: number
    neutralPercent: number
    negativePercent: number
}

interface Props {
    title: string
    itemsPerPage?: number
}

const props = withDefaults(defineProps<Props>(), {
    itemsPerPage: 4
})

const searchQuery = ref('')
const sortField = ref<keyof ChannelData>('total')
const sortDirection = ref<'asc' | 'desc'>('desc')
const currentPage = ref(1)
const isLoading = ref(true)
const sentimentStore = useSentimentStore()

setTimeout(() => {
    isLoading.value = false
}, 1500)

const iconMap = {
    'News': Newspaper,
    'Instagram': Instagram,
    'YouTube': Youtube,
    'Facebook': Facebook,
    'TikTok': Music,
    'Twitter': Twitter
}

const channelData = computed<ChannelData[]>(() => {
    return sentimentStore.channelData.map(item => ({
        ...item,
        icon: iconMap[item.channel as keyof typeof iconMap]
    }))
})

const filteredData = computed(() => {
    if (!searchQuery.value) return channelData.value

    const query = searchQuery.value.toLowerCase()
    return channelData.value.filter(item =>
        item.channel.toLowerCase().includes(query)
    )
})

const sortedData = computed(() => {
    const data = [...filteredData.value]

    return data.sort((a, b) => {
        const aValue = a[sortField.value]
        const bValue = b[sortField.value]

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            const comparison = aValue.localeCompare(bValue)
            return sortDirection.value === 'asc' ? comparison : -comparison
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
            const comparison = aValue - bValue
            return sortDirection.value === 'asc' ? comparison : -comparison
        }

        return 0
    })
})

const totalPages = computed(() => Math.ceil(filteredData.value.length / props.itemsPerPage))

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * props.itemsPerPage
    const end = start + props.itemsPerPage
    return sortedData.value.slice(start, end)
})

const sortBy = (field: keyof ChannelData) => {
    if (sortField.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
        sortField.value = field
        sortDirection.value = 'desc'
    }
    currentPage.value = 1
}

const handlePageChange = (page: number) => {
    currentPage.value = page
}

const resetPage = () => {
    currentPage.value = 1
}

import { watch } from 'vue'
watch(searchQuery, resetPage)
</script>
