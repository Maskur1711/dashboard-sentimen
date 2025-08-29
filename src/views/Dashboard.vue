<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted } from 'vue'
import SentimentTable from '../components/ui/Table.vue'
import Skeleton from '../components/ui/Skeleton.vue'
import { useSentimentStore } from '../stores/sentimentStore'
import { TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-vue-next'

const isLoadingCards = ref(true)
const sentimentStore = useSentimentStore()

onMounted(() => {
    setTimeout(() => {
        isLoadingCards.value = false
    }, 1200)
})

const Chart = defineAsyncComponent({
    loader: () => import('../components/ui/Chart.vue'),
    loadingComponent: {
        template: `
            <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
                <div class="p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-6">Sentimen Per Platform</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div v-for="i in 6" :key="i" class="bg-gray-50 rounded-xl p-4">
                            <div class="w-full h-[180px] lg:h-[220px] flex items-center justify-center">
                                <div class="flex flex-col items-center gap-3">
                                    <div class="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                    <span class="text-sm text-gray-500">Loading chart...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    errorComponent: {
        template: `
            <div class="bg-white rounded-2xl shadow-sm border border-gray-200/60">
                <div class="p-6">
                    <div class="bg-red-50 border border-red-200 rounded-xl p-4">
                        <div class="flex items-center gap-2">
                            <div class="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                <span class="text-white text-xs">!</span>
                            </div>
                            <span class="text-red-700 text-sm">Error loading charts. Please refresh the page.</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    delay: 500,
    timeout: 10000
})
</script>

<template>
    <div class="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 border-bg-gray-900/50 rounded-xl">
        <div class="mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <!-- Header Section -->
            <div class="mb-8">
                <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
                <p class="text-gray-600 dark:text-gray-400">Analisis sentimen data dari berbagai platform sosial media
                </p>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                <!-- Skeleton Loading Cards -->
                <template v-if="isLoadingCards">
                    <div v-for="i in 4" :key="`skeleton-card-${i}`"
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/60 dark:border-gray-700/60 p-6">
                        <Skeleton height="6" width="3/4" class="mb-4" />
                        <Skeleton height="8" width="1/2" class="mb-2" />
                        <Skeleton height="4" width="1/3" />
                    </div>
                </template>

                <!-- Actual Cards -->
                <template v-else>
                    <div
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/60 dark:border-gray-700/60 p-6 hover:shadow-lg transition-all duration-300 group">
                        <div class="flex items-center justify-between mb-4">
                            <div
                                class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                                <TrendingUp class="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <span class="text-green-600 dark:text-green-400 text-sm font-medium">+12.5%</span>
                        </div>
                        <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Total Positive</h3>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white mb-1">{{
                            sentimentStore.totalStats.positive.toLocaleString() }}</p>
                        <p class="text-green-600 dark:text-green-400 text-sm font-medium">{{
                            sentimentStore.totalStats.positivePercent.toFixed(1) }}% dari total</p>
                    </div>

                    <div
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/60 dark:border-gray-700/60 p-6 hover:shadow-lg transition-all duration-300 group">
                        <div class="flex items-center justify-between mb-4">
                            <div
                                class="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
                                <Minus class="w-6 h-6 text-gray-600 dark:text-gray-400" />
                            </div>
                            <span class="text-gray-600 dark:text-gray-400 text-sm font-medium">+5.2%</span>
                        </div>
                        <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Total Neutral</h3>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white mb-1">{{
                            sentimentStore.totalStats.neutral.toLocaleString() }}</p>
                        <p class="text-gray-600 dark:text-gray-400 text-sm font-medium">{{
                            sentimentStore.totalStats.neutralPercent.toFixed(1) }}% dari total</p>
                    </div>

                    <div
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/60 dark:border-gray-700/60 p-6 hover:shadow-lg transition-all duration-300 group">
                        <div class="flex items-center justify-between mb-4">
                            <div
                                class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                                <TrendingDown class="w-6 h-6 text-red-600 dark:text-red-400" />
                            </div>
                            <span class="text-red-600 dark:text-red-400 text-sm font-medium">-8.1%</span>
                        </div>
                        <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Total Negative</h3>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white mb-1">{{
                            sentimentStore.totalStats.negative.toLocaleString() }}</p>
                        <p class="text-red-600 dark:text-red-400 text-sm font-medium">{{
                            sentimentStore.totalStats.negativePercent.toFixed(1) }}% dari total</p>
                    </div>

                    <div
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/60 dark:border-gray-700/60 p-6 hover:shadow-lg transition-all duration-300 group">
                        <div class="flex items-center justify-between mb-4">
                            <div
                                class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                                <BarChart3 class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span class="text-blue-600 dark:text-blue-400 text-sm font-medium">+15.3%</span>
                        </div>
                        <h3 class="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Total Data</h3>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white mb-1">{{
                            sentimentStore.totalStats.total.toLocaleString() }}</p>
                        <p class="text-blue-600 dark:text-blue-400 text-sm font-medium">6 Platform</p>
                    </div>
                </template>
            </div>

            <!-- Main Content -->
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <!-- Table Section -->
                <div
                    class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/60 dark:border-gray-700/60 overflow-hidden">
                    <div class="h-[600px] lg:h-[700px]">
                        <SentimentTable title="Data Sentimen" :items-per-page="4" />
                    </div>
                </div>

                <!-- Chart Section -->
                <div
                    class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/60 dark:border-gray-700/60 overflow-hidden">
                    <div class="h-[600px] lg:h-[700px]">
                        <Chart class="w-full h-full" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Performance optimized animations */
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.grid>* {
    animation: slideInUp 0.4s ease-out;
}

.grid>*:nth-child(1) {
    animation-delay: 0.1s;
}

.grid>*:nth-child(2) {
    animation-delay: 0.2s;
}

.grid>*:nth-child(3) {
    animation-delay: 0.3s;
}

.grid>*:nth-child(4) {
    animation-delay: 0.4s;
}
</style>