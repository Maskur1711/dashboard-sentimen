<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js';
import { useSentimentStore } from '../../stores/sentimentStore';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const isLoading = ref(true);
const sentimentStore = useSentimentStore();

const channels = [
    { name: 'News', key: 'news' },
    { name: 'Instagram', key: 'instagram' },
    { name: 'YouTube', key: 'youtube' },
    { name: 'Facebook', key: 'facebook' },
    { name: 'TikTok', key: 'tiktok' },
    { name: 'Twitter', key: 'twitter' },
];

const getChartData = (channel: { key: string }) => {
    const data = sentimentStore.getChannelData(channel.key);

    const chartData = (data && typeof data === 'object' && 'pie' in data && data.pie?.series)
        ? data.pie.series
        : [0, 0, 0];

    return {
        labels: ['Positif', 'Netral', 'Negatif'],
        datasets: [
            {
                data: [
                    chartData[0] || 0,
                    chartData[1] || 0,
                    chartData[2] || 0,
                ],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(156, 163, 175, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                ],
                borderColor: [
                    'rgb(34, 197, 94)',
                    'rgb(156, 163, 175)',
                    'rgb(239, 68, 68)',
                ],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            },
        ],
    };
};

const getChartOptions = (channelName: string) => {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    title: () => channelName,
                    label: (context: any) => {
                        const labels = ['Positif', 'Netral', 'Negatif'];
                        return `${labels[context.dataIndex]}: ${context.parsed.y.toLocaleString()}`;
                    },
                },
            },
        },
        scales: {
            x: {
                display: true,
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 11,
                        weight: 'bold' as const,
                    },
                    color: '#6b7280',
                    maxRotation: 0,
                    minRotation: 0,
                },
            },
            y: {
                display: true,
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                    drawBorder: false,
                },
                ticks: {
                    font: {
                        size: 11,
                        weight: 'bold' as const,
                    },
                    color: '#6b7280',
                    callback: (value: any) => {
                        return value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value;
                    },
                    maxTicksLimit: 4,
                },
            },
        },
        layout: {
            padding: {
                top: 15,
                bottom: 10,
                left: 10,
                right: 10,
            },
        },
        animation: {
            duration: 1000,
            easing: 'easeOutQuart' as const,
        },
    };
};

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false;
    }, 1000);
});
</script>

<template>
    <div class="h-full flex flex-col bg-white dark:bg-gray-800">
        <div class="p-6 border-b border-gray-200/60 dark:border-gray-700/60">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Sentimen Per Platform</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Visualisasi distribusi sentimen dari berbagai platform
            </p>
        </div>

        <div class="flex-1 p-6 overflow-x-auto">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="channel in channels" :key="channel.name"
                    class="bg-gray-50/50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200/60 dark:border-gray-600/60 hover:shadow-md transition-all duration-300 group">
                    <div class="flex items-center justify-between mb-4">
                        <h4 class="text-sm font-semibold text-gray-900 dark:text-white">{{ channel.name }}</h4>
                        <div
                            class="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full group-hover:bg-blue-600 dark:group-hover:bg-blue-300 transition-colors">
                        </div>
                    </div>

                    <div class="w-full h-[180px] lg:h-[220px] relative">
                        <div v-if="isLoading"
                            class="w-full h-full flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200/60 dark:border-gray-600/60">
                            <div class="flex flex-col items-center gap-3">
                                <div
                                    class="w-8 h-8 border-2 border-blue-500 dark:border-blue-400 border-t-transparent rounded-full animate-spin">
                                </div>
                                <span class="text-sm text-gray-500 dark:text-gray-400">Memuat chart...</span>
                            </div>
                        </div>

                        <div v-else
                            class="w-full h-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200/60 dark:border-gray-600/60 p-2">
                            <Bar :id="`chart-${channel.key}`" :options="getChartOptions(channel.name)"
                                :data="getChartData(channel)" class="w-full h-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>