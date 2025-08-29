import { defineStore } from 'pinia'
import { computed } from 'vue'
import responseData from '../data/response.json'

export const useSentimentStore = defineStore('sentiment', () => {
  const data = responseData

  const channelData = computed(() => {
    const channels = [
      {
        channel: 'News',
        key: 'news',
        positive: data.data.news?.pie?.series?.[0] || 0,
        neutral: data.data.news?.pie?.series?.[1] || 0,
        negative: data.data.news?.pie?.series?.[2] || 0,
        total: data.data.news?.total || 0
      },
      {
        channel: 'Instagram',
        key: 'instagram',
        positive: data.data.instagram?.pie?.series?.[0] || 0,
        neutral: data.data.instagram?.pie?.series?.[1] || 0,
        negative: data.data.instagram?.pie?.series?.[2] || 0,
        total: data.data.instagram?.total || 0
      },
      {
        channel: 'YouTube',
        key: 'youtube',
        positive: data.data.youtube?.pie?.series?.[0] || 0,
        neutral: data.data.youtube?.pie?.series?.[1] || 0,
        negative: data.data.youtube?.pie?.series?.[2] || 0,
        total: data.data.youtube?.total || 0
      },
      {
        channel: 'Facebook',
        key: 'facebook',
        positive: data.data.facebook?.pie?.series?.[0] || 0,
        neutral: data.data.facebook?.pie?.series?.[1] || 0,
        negative: data.data.facebook?.pie?.series?.[2] || 0,
        total: data.data.facebook?.total || 0
      },
      {
        channel: 'TikTok',
        key: 'tiktok',
        positive: data.data.tiktok?.pie?.series?.[0] || 0,
        neutral: data.data.tiktok?.pie?.series?.[1] || 0,
        negative: data.data.tiktok?.pie?.series?.[2] || 0,
        total: data.data.tiktok?.total || 0
      },
      {
        channel: 'Twitter',
        key: 'twitter',
        positive: data.data.twitter?.pie?.series?.[0] || 0,
        neutral: data.data.twitter?.pie?.series?.[1] || 0,
        negative: data.data.twitter?.pie?.series?.[2] || 0,
        total: data.data.twitter?.total || 0
      }
    ]

    return channels.map(item => ({
      ...item,
      positivePercent: item.total > 0 ? (item.positive / item.total) * 100 : 0,
      neutralPercent: item.total > 0 ? (item.neutral / item.total) * 100 : 0,
      negativePercent: item.total > 0 ? (item.negative / item.total) * 100 : 0
    }))
  })

  const totalStats = computed(() => {
    const positive = channelData.value.reduce((sum, item) => sum + item.positive, 0)
    const neutral = channelData.value.reduce((sum, item) => sum + item.neutral, 0)
    const negative = channelData.value.reduce((sum, item) => sum + item.negative, 0)
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

  const getChannelData = (channelKey: string) => {
    return data.data[channelKey as keyof typeof data.data]
  }

  return {
    data,
    channelData,
    totalStats,
    getChannelData
  }
})
