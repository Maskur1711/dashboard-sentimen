<template>
    <div class="card bg-base-200 shadow-xl h-full">
        <div class="card-body flex flex-col">
            <div class="flex items-center justify-between mb-6 flex-shrink-0">
                <h2 class="card-title text-2xl">{{ title }}</h2>

                <!-- Search Input -->
                <div class="form-control w-full max-w-xs">
                    <input v-model="searchQuery" type="text" placeholder="Cari kanal..."
                        class="input input-bordered input-sm" />
                </div>
            </div>

            <!-- Data Table -->
            <div class="overflow-x-auto -mx-2 sm:mx-0 flex-1 flex flex-col border border-base-200 rounded-lg">
                <table class="table table-zebra w-full">
                    <thead class="flex-shrink-0">
                        <tr>
                            <th>No</th>
                            <th>
                                <button @click="sortBy('channel')" class="flex items-center gap-1 hover:text-primary">
                                    Kanal
                                    <span v-if="sortField === 'channel'">
                                        {{ sortDirection === 'asc' ? '↑' : '↓' }}
                                    </span>
                                </button>
                            </th>
                            <th>
                                <button @click="sortBy('positive')" class="flex items-center gap-1 hover:text-primary">
                                    Positive
                                    <span v-if="sortField === 'positive'">
                                        {{ sortDirection === 'asc' ? '↑' : '↓' }}
                                    </span>
                                </button>
                            </th>
                            <th>
                                <button @click="sortBy('neutral')" class="flex items-center gap-1 hover:text-primary">
                                    Neutral
                                    <span v-if="sortField === 'neutral'">
                                        {{ sortDirection === 'asc' ? '↑' : '↓' }}
                                    </span>
                                </button>
                            </th>
                            <th>
                                <button @click="sortBy('negative')" class="flex items-center gap-1 hover:text-primary">
                                    Negative
                                    <span v-if="sortField === 'negative'">
                                        {{ sortDirection === 'asc' ? '↑' : '↓' }}
                                    </span>
                                </button>
                            </th>
                            <th>
                                <button @click="sortBy('total')" class="flex items-center gap-1 hover:text-primary">
                                    Total
                                    <span v-if="sortField === 'total'">
                                        {{ sortDirection === 'asc' ? '↑' : '↓' }}
                                    </span>
                                </button>
                            </th>
                            <th>Distribusi Sentimen</th>
                        </tr>
                    </thead>
                    <tbody class="min-h-[400px]">
                        <!-- Skeleton Loading -->
                        <template v-if="isLoading">
                            <tr v-for="i in itemsPerPage" :key="`skeleton-${i}`">
                                <td class="text-center">
                                    <Skeleton width="6" height="4" class="mx-auto" />
                                </td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <Skeleton width="5" height="5" circle class="shrink-0" />
                                        <Skeleton width="20" height="4" />
                                    </div>
                                </td>
                                <td>
                                    <Skeleton width="16" height="6" />
                                </td>
                                <td>
                                    <Skeleton width="16" height="6" />
                                </td>
                                <td>
                                    <Skeleton width="16" height="6" />
                                </td>
                                <td>
                                    <Skeleton width="20" height="6" />
                                </td>
                                <td>
                                    <div class="flex items-center justify-center">
                                        <div class="flex gap-1">
                                            <div class="flex flex-col items-center gap-1">
                                                <Skeleton width="4" height="10" circle />
                                                <Skeleton width="8" height="3" />
                                            </div>
                                            <div class="flex flex-col items-center gap-1">
                                                <Skeleton width="4" height="10" circle />
                                                <Skeleton width="8" height="3" />
                                            </div>
                                            <div class="flex flex-col items-center gap-1">
                                                <Skeleton width="4" height="10" circle />
                                                <Skeleton width="8" height="3" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </template>

                        <!-- Actual Data -->
                        <tr v-else v-for="(item, index) in paginatedData" :key="item.channel" class="text-[13px]">
                            <td class="text-center font-semibold">{{ (currentPage - 1) * itemsPerPage + index + 1 }}
                            </td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <component v-if="item.icon" :is="item.icon"
                                        class="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                    <span class="font-medium truncate max-w-[120px] sm:max-w-none">{{ item.channel
                                    }}</span>
                                </div>
                            </td>
                            <td>
                                <div class="flex flex-col">
                                    <span class="font-mono text-[13px] font-semibold text-green-600">
                                        {{ item.positive.toLocaleString() }}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div class="flex flex-col">
                                    <span class="font-mono text-[13px] font-semibold text-gray-600">
                                        {{ item.neutral.toLocaleString() }}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div class="flex flex-col">
                                    <span class="font-mono text-[13px] font-semibold text-red-600">
                                        {{ item.negative.toLocaleString() }}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <span class="font-mono text-[13px] font-semibold">
                                    {{ item.total.toLocaleString() }}
                                </span>
                            </td>
                            <td>
                                <div class="flex items-center justify-center">
                                    <div class="flex flex-col items-center gap-1">
                                        <!-- Vertical Progress Bars -->
                                        <div class="flex gap-1">
                                            <!-- Positive Bar -->
                                            <div class="flex flex-col items-center gap-1">
                                                <div class="w-4 h-10 bg-base-200 rounded-full relative overflow-hidden">
                                                    <div class="absolute bottom-0 w-full bg-green-500 transition-all duration-300 rounded-full"
                                                        :style="{ height: item.positivePercent + '%' }"></div>
                                                </div>
                                                <span class="text-[13px] text-green-600 font-medium">{{
                                                    item.positivePercent.toFixed(1) }}%</span>
                                            </div>
                                            <!-- Neutral Bar -->
                                            <div class="flex flex-col items-center gap-1">
                                                <div class="w-4 h-10 bg-base-200 rounded-full relative overflow-hidden">
                                                    <div class="absolute bottom-0 w-full bg-gray-500 transition-all duration-300 rounded-full"
                                                        :style="{ height: item.neutralPercent + '%' }"></div>
                                                </div>
                                                <span class="text-[13px] text-gray-600 font-medium">{{
                                                    item.neutralPercent.toFixed(1) }}%</span>
                                            </div>
                                            <!-- Negative Bar -->
                                            <div class="flex flex-col items-center gap-1">
                                                <div class="w-4 h-10 bg-base-200 rounded-full relative overflow-hidden">
                                                    <div class="absolute bottom-0 w-full bg-red-500 transition-all duration-300 rounded-full"
                                                        :style="{ height: item.negativePercent + '%' }"></div>
                                                </div>
                                                <span class="text-[13px] text-red-600 font-medium">{{
                                                    item.negativePercent.toFixed(1) }}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="flex-shrink-0 mt-auto pt-4">
                <Pagination v-if="!isLoading && totalPages > 1" :current-page="currentPage" :total-pages="totalPages"
                    :total-items="filteredData.length" :items-per-page="itemsPerPage" @page-change="handlePageChange" />
            </div>
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
