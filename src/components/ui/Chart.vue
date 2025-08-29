<template>
    <div class="h-full flex flex-col bg-white">
        <!-- Header -->
        <div class="p-6 border-b border-gray-200/60">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Sentimen Per Platform</h3>
            <p class="text-sm text-gray-600">Visualisasi distribusi sentimen dari berbagai platform</p>
        </div>

        <!-- Chart -->
        <div class="flex-1 p-6 overflow-x-auto">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="channel in channels" :key="channel.name"
                    class="bg-gray-50/50 rounded-xl p-4 border border-gray-200/60 hover:shadow-md transition-all duration-300 group">
                    <div class="flex items-center justify-between mb-4">
                        <h4 class="text-sm font-semibold text-gray-900">{{ channel.name }}</h4>
                        <div class="w-2 h-2 bg-blue-500 rounded-full group-hover:bg-blue-600 transition-colors"></div>
                    </div>

                    <div class="w-full h-[180px] lg:h-[220px] relative">
                        <!-- Loading State -->
                        <div v-if="isLoading"
                            class="w-full h-full flex items-center justify-center bg-white rounded-lg border border-gray-200/60">
                            <div class="flex flex-col items-center gap-3">
                                <div
                                    class="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin">
                                </div>
                                <span class="text-sm text-gray-500">Memuat chart...</span>
                            </div>
                        </div>

                        <!-- Chart -->
                        <div v-else class="w-full h-full bg-white rounded-lg border border-gray-200/60 p-2">
                            <Bar :id="`chart-${channel.key}`" :options="getChartOptions(channel.name)"
                                :data="getChartData(channel)" class="w-full h-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { ref, onMounted } from 'vue'
import { useSentimentStore } from '../../stores/sentimentStore'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'SentimentChart',
    components: { Bar },
    setup() {
        const isLoading = ref(true)
        const sentimentStore = useSentimentStore()

        const channels = [
            { name: 'News', key: 'news' },
            { name: 'Instagram', key: 'instagram' },
            { name: 'YouTube', key: 'youtube' },
            { name: 'Facebook', key: 'facebook' },
            { name: 'TikTok', key: 'tiktok' },
            { name: 'Twitter', key: 'twitter' }
        ]

        onMounted(() => {
            setTimeout(() => {
                isLoading.value = false
            }, 1000)
        })

        return {
            isLoading,
            channels,
            sentimentStore
        }
    },
    methods: {
        getChartData(channel) {
            const data = this.sentimentStore.getChannelData(channel.key)
            
            const chartData = data?.pie?.series || [0, 0, 0]
            
            return {
                labels: ['Positif', 'Netral', 'Negatif'],
                datasets: [{
                    data: [
                        chartData[0] || 0,
                        chartData[1] || 0,
                        chartData[2] || 0
                    ],
                    backgroundColor: [
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(156, 163, 175, 0.8)',
                        'rgba(239, 68, 68, 0.8)'
                    ],
                    borderColor: [
                        'rgb(34, 197, 94)',
                        'rgb(156, 163, 175)',
                        'rgb(239, 68, 68)'
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            }
        },
        getChartOptions(channelName) {
            return {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
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
                            label: (context) => {
                                const labels = ['Positif', 'Netral', 'Negatif']
                                return `${labels[context.dataIndex]}: ${context.parsed.y.toLocaleString()}`
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 11,
                                weight: '500'
                            },
                            color: '#6b7280',
                            maxRotation: 0,
                            minRotation: 0
                        }
                    },
                    y: {
                        display: true,
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            font: {
                                size: 11,
                                weight: '500'
                            },
                            color: '#6b7280',
                            callback: function (value) {
                                return value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value
                            },
                            maxTicksLimit: 4
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 15,
                        bottom: 10,
                        left: 10,
                        right: 10
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        }
    }
}
</script>

<style scoped>

</style>