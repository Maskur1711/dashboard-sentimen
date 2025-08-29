<template>
    <div class="card bg-base-200 shadow-xl" ref="chartContainer">
        <div class="card-body">
            <h3 class="text-base sm:text-lg font-semibold mb-4 text-gray-900 dark:text-white">Sentimen Per Platform</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div v-for="channel in channels" :key="channel.name" class="bg-base-100 rounded-lg p-2 sm:p-3 shadow">
                    <h4 class="text-xs sm:text-sm font-medium mb-2 text-center">{{ channel.name }}</h4>
                    <div class="w-full h-[400px] sm:h-[180px] lg:h-[220px] relative">
                        <!-- Loading -->
                        <div v-if="!isVisible || isLoading"
                            class="w-full h-full flex items-center justify-center bg-base-200 rounded-lg">
                            <div class="flex flex-col items-center gap-2">
                                <span class="loading loading-ring loading-xs"></span>
                                <span class="text-sm text-base-content/60">Mohon Tunggu...</span>
                            </div>
                        </div>

                        <!-- Chart -->
                        <Bar v-else :id="`chart-${channel.key}`" :options="getChartOptions(channel.name)"
                            :data="getChartData(channel)" class="w-full h-full" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { ref, onMounted, onUnmounted } from 'vue'
import { useSentimentStore } from '../../stores/sentimentStore'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'SentimentChart',
    components: { Bar },
    setup() {
        const chartContainer = ref(null)
        const isVisible = ref(false)
        const isLoading = ref(false)
        const sentimentStore = useSentimentStore()
        let observer = null

        const channels = [
            { name: 'News', key: 'news' },
            { name: 'Instagram', key: 'instagram' },
            { name: 'YouTube', key: 'youtube' },
            { name: 'Facebook', key: 'facebook' },
            { name: 'TikTok', key: 'tiktok' },
            { name: 'Twitter', key: 'twitter' }
        ]

        onMounted(() => {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !isVisible.value) {
                            isLoading.value = true

                            setTimeout(() => {
                                isVisible.value = true
                                isLoading.value = false
                                observer.unobserve(entry.target)
                            }, 500)
                        }
                    })
                },
                {
                    threshold: 0.1, 
                    rootMargin: '100px'
                }
            )

            if (chartContainer.value) {
                observer.observe(chartContainer.value)
            }
        })

        onUnmounted(() => {
            if (observer) {
                observer.disconnect()
            }
        })

        return {
            chartContainer,
            isVisible,
            isLoading,
            channels,
            sentimentStore
        }
    },
    methods: {
        getChartData(channel) {
            const data = this.sentimentStore.getChannelData(channel.key)
            return {
                labels: ['Pos', 'Net', 'Neg'],
                datasets: [{
                    data: [
                        data?.pie?.series?.[0] || 0,
                        data?.pie?.series?.[1] || 0,
                        data?.pie?.series?.[2] || 0
                    ],
                    backgroundColor: ['#3EC764', '#B3B6C6', '#ED3E3E'],
                    borderColor: ['#3EC764', '#B3B6C6', '#ED3E3E'],
                    borderWidth: 1
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
                        callbacks: {
                            label: (context) => {
                                const labels = ['Positive', 'Neutral', 'Negative']
                                return labels[context.dataIndex] + ': ' + context.parsed.y.toLocaleString()
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
                                size: 10
                            },
                            maxRotation: 0,
                            minRotation: 0
                        }
                    },
                    y: {
                        display: true,
                        beginAtZero: true,
                        ticks: {
                            font: {
                                size: 10
                            },
                            callback: function (value) {
                                return value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value
                            },
                            maxTicksLimit: 4
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 10,
                        bottom: 5,
                        left: 5,
                        right: 5
                    }
                }
            }
        }
    }
}
</script>