<script setup lang="ts">
import { computed, defineAsyncComponent, ref, onMounted } from 'vue'
import SentimentTable from '../components/ui/Table.vue'
import Skeleton from '../components/ui/Skeleton.vue'
import responseData from '../data/response.json'

const isLoadingCards = ref(true)

// Simulate loading for cards
onMounted(() => {
    setTimeout(() => {
        isLoadingCards.value = false
    }, 1200)
})

const Chart = defineAsyncComponent({
    loader: () => import('../components/ui/Chart.vue'),
    loadingComponent: {
        template: `
            <div class="card bg-base-200 shadow-xl">
                <div class="card-body">
                    <h3 class="text-base sm:text-lg font-semibold mb-4 text-gray-900 dark:text-white">Sentimen Per Platform</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        <div v-for="i in 6" :key="i" class="bg-base-100 rounded-lg p-2 sm:p-3 shadow">
                            <div class="w-full h-[400px] sm:h-[180px] lg:h-[220px] flex items-center justify-center">
                                <div class="flex flex-col items-center gap-2">
                                    <span class="loading loading-ring loading-xs"></span>
                                    <span class="text-sm text-base-content/60">Loading charts...</span>
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
            <div class="card bg-base-200 shadow-xl">
                <div class="card-body">
                    <div class="alert alert-error">
                        <span>Error loading charts. Please refresh the page.</span>
                    </div>
                </div>
            </div>
        `
    },
    delay: 500,
    timeout: 10000
})

const totalStats = computed(() => {
    const data = responseData.data

    const positive = (data.news?.pie?.series?.[0] || 0) +
        (data.instagram?.pie?.series?.[0] || 0) +
        (data.youtube?.pie?.series?.[0] || 0) +
        (data.facebook?.pie?.series?.[0] || 0) +
        (data.tiktok?.pie?.series?.[0] || 0) +
        (data.twitter?.pie?.series?.[0] || 0)

    const neutral = (data.news?.pie?.series?.[1] || 0) +
        (data.instagram?.pie?.series?.[1] || 0) +
        (data.youtube?.pie?.series?.[1] || 0) +
        (data.facebook?.pie?.series?.[1] || 0) +
        (data.tiktok?.pie?.series?.[1] || 0) +
        (data.twitter?.pie?.series?.[1] || 0)

    const negative = (data.news?.pie?.series?.[2] || 0) +
        (data.instagram?.pie?.series?.[2] || 0) +
        (data.youtube?.pie?.series?.[2] || 0) +
        (data.facebook?.pie?.series?.[2] || 0) +
        (data.tiktok?.pie?.series?.[2] || 0) +
        (data.twitter?.pie?.series?.[2] || 0)

    const total = positive + neutral + negative

    return {
        positive,
        neutral,
        negative,
        total,
        positivePercent: total > 0 ? (positive / total) * 100 : 0,
        neutralPercent: total > 0 ? (neutral / total) * 100 : 0,
        negativePercent: total > 0 ? (negative / total) * 100 : 0
    }
})

</script>

<template>
    <div class="md:p-6 xl:p-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-2 mb-6">
            <!-- Skeleton Loading Cards -->
            <template v-if="isLoadingCards">
                <div v-for="i in 4" :key="`skeleton-card-${i}`" class="card bg-base-200 shadow-lg">
                    <div class="card-body">
                        <Skeleton height="6" width="3/4" class="mb-4" />
                        <Skeleton height="8" width="1/2" class="mb-2" />
                        <Skeleton height="4" width="1/3" />
                    </div>
                </div>
            </template>
            
            <!-- Actual Cards -->
            <template v-else>
                <div class="card bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
                    <div class="card-body">
                        <h2 class="card-title text-white">Total Positive</h2>
                        <p class="text-2xl font-bold">{{ totalStats.positive.toLocaleString() }}</p>
                        <p class="text-green-100">{{ totalStats.positivePercent.toFixed(1) }}%</p>
                    </div>
                </div>
                <div class="card bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg">
                    <div class="card-body">
                        <h2 class="card-title text-white">Total Neutral</h2>
                        <p class="text-2xl font-bold">{{ totalStats.neutral.toLocaleString() }}</p>
                        <p class="text-gray-100">{{ totalStats.neutralPercent.toFixed(1) }}%</p>
                    </div>
                </div>
                <div class="card bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
                    <div class="card-body">
                        <h2 class="card-title text-white">Total Negative</h2>
                        <p class="text-2xl font-bold">{{ totalStats.negative.toLocaleString() }}</p>
                        <p class="text-red-100">{{ totalStats.negativePercent.toFixed(1) }}%</p>
                    </div>
                </div>
                <div class="card bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                    <div class="card-body">
                        <h2 class="card-title text-white">Total Data</h2>
                        <p class="text-2xl font-bold">{{ totalStats.total.toLocaleString() }}</p>
                        <p class="text-blue-100">6 Kanal</p>
                    </div>
                </div>
            </template>
        </div>

        <div class="flex flex-col xl:flex-row gap-4 sm:gap-6">
            <!-- table -->
            <div class="xl:w-1/2 flex-shrink-0">
                <div class="h-[500px] sm:h-[600px] lg:h-[657px]">
                    <SentimentTable title="Data Sentimen" :response-data="responseData" :items-per-page="4" />
                </div>
            </div>
            <!-- Chart -->
            <div class="xl:w-1/2 flex-shrink-0">
                <Chart class="h-[500px] sm:h-[600px] lg:h-[657px] w-full" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>