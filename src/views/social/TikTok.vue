<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-8">
      <div class="p-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg">
        <Music class="w-8 h-8 text-white" />
      </div>
      <div>
        <h1 class="text-3xl font-bold text-base-content">TikTok</h1>
        <p class="text-base-content/60">Create viral content and engage with your audience</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-primary">
          <Users class="w-8 h-8" />
        </div>
        <div class="stat-title">Followers</div>
        <div class="stat-value text-primary">234K</div>
        <div class="stat-desc">↗︎ 32% (30 days)</div>
      </div>
      
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-secondary">
          <Heart class="w-8 h-8" />
        </div>
        <div class="stat-title">Total Likes</div>
        <div class="stat-value text-secondary">1.2M</div>
        <div class="stat-desc">↗︎ 45% (30 days)</div>
      </div>
      
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-accent">
          <Eye class="w-8 h-8" />
        </div>
        <div class="stat-title">Total Views</div>
        <div class="stat-value text-accent">5.8M</div>
        <div class="stat-desc">↗︎ 28% (30 days)</div>
      </div>
      
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-warning">
          <Share class="w-8 h-8" />
        </div>
        <div class="stat-title">Shares</div>
        <div class="stat-value text-warning">89K</div>
        <div class="stat-desc">↗︎ 67% (30 days)</div>
      </div>
    </div>

    <!-- Recent Videos -->
    <div class="card bg-base-200 shadow-xl">
      <div class="card-body">
        <div class="flex items-center justify-between mb-6">
          <h2 class="card-title text-2xl">Recent Videos</h2>
          <button class="btn btn-primary btn-sm">
            <Plus class="w-4 h-4 mr-2" />
            Create Video
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="video in tiktokVideos" :key="video.id" class="card bg-base-100 shadow-sm">
            <figure class="aspect-[9/16] bg-gradient-to-br from-pink-400 via-red-400 to-yellow-400 relative">
              <div class="w-full h-full flex items-center justify-center">
                <Play class="w-12 h-12 text-white/80" />
              </div>
              <div class="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {{ video.duration }}
              </div>
              <div class="absolute bottom-2 left-2 right-2">
                <div class="flex items-center gap-2 text-white text-sm">
                  <Music class="w-4 h-4" />
                  <span class="truncate">{{ video.sound }}</span>
                </div>
              </div>
            </figure>
            <div class="card-body p-4">
              <p class="text-sm text-base-content/80 mb-3 line-clamp-2">{{ video.caption }}</p>
              <div class="flex items-center justify-between text-xs text-base-content/60 mb-3">
                <div class="flex items-center gap-3">
                  <span class="flex items-center gap-1">
                    <Eye class="w-3 h-3" />
                    {{ video.views }}
                  </span>
                  <span class="flex items-center gap-1">
                    <Heart class="w-3 h-3" />
                    {{ video.likes }}
                  </span>
                  <span class="flex items-center gap-1">
                    <MessageCircle class="w-3 h-3" />
                    {{ video.comments }}
                  </span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="badge badge-xs" :class="{
                    'badge-success': video.status === 'published',
                    'badge-warning': video.status === 'processing',
                    'badge-info': video.status === 'scheduled'
                  }">
                    {{ video.status }}
                  </div>
                  <span class="text-xs text-base-content/50">{{ video.publishedAt }}</span>
                </div>
                <div class="dropdown dropdown-end">
                  <button tabindex="0" class="btn btn-ghost btn-xs">
                    <MoreVertical class="w-3 h-3" />
                  </button>
                  <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                    <li><a><Edit class="w-3 h-3" />Edit</a></li>
                    <li><a><BarChart3 class="w-3 h-3" />Analytics</a></li>
                    <li><a><ExternalLink class="w-3 h-3" />View</a></li>
                    <li><a class="text-error"><Trash2 class="w-3 h-3" />Delete</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-center mt-6">
          <button class="btn btn-outline">Load More Videos</button>
        </div>
      </div>
    </div>

    <!-- Trending Hashtags -->
    <div class="card bg-base-200 shadow-xl mt-8">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-6">Trending Hashtags</h2>
        <div class="flex flex-wrap gap-2">
          <div v-for="hashtag in trendingHashtags" :key="hashtag.tag" class="badge badge-lg badge-primary cursor-pointer hover:badge-secondary transition-colors">
            {{ hashtag.tag }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Music,
  Users,
  Heart,
  Eye,
  Share,
  Plus,
  Play,
  MessageCircle,
  MoreVertical,
  Edit,
  BarChart3,
  ExternalLink,
  Trash2
} from 'lucide-vue-next'

interface TikTokVideo {
  id: number
  caption: string
  duration: string
  sound: string
  views: string
  likes: string
  comments: number
  publishedAt: string
  status: 'published' | 'processing' | 'scheduled'
}

interface TrendingHashtag {
  tag: string
  count: string
}

const tiktokVideos = ref<TikTokVideo[]>([
  {
    id: 1,
    caption: "Day in the life of a developer 💻 #developer #coding #dayinthelife #tech",
    duration: "0:45",
    sound: "Original Sound - TechVibes",
    views: "2.3M",
    likes: "456K",
    comments: 1234,
    publishedAt: "2d",
    status: "published"
  },
  {
    id: 2,
    caption: "Quick CSS tricks that will blow your mind! 🤯 #css #webdev #programming #tips",
    duration: "0:32",
    sound: "Trending Audio - CodeBeats",
    views: "1.8M",
    likes: "234K",
    comments: 892,
    publishedAt: "3d",
    status: "published"
  },
  {
    id: 3,
    caption: "React vs Vue: The ultimate showdown ⚡ #react #vue #frontend #comparison",
    duration: "1:12",
    sound: "Epic Battle Music",
    views: "3.1M",
    likes: "678K",
    comments: 2156,
    publishedAt: "5d",
    status: "published"
  },
  {
    id: 4,
    caption: "POV: You're debugging at 3 AM 😴 #debugging #programmer #relatable #coding",
    duration: "0:28",
    sound: "Sleepy Vibes - ChillBeats",
    views: "4.2M",
    likes: "892K",
    comments: 3421,
    publishedAt: "1w",
    status: "published"
  },
  {
    id: 5,
    caption: "From idea to app in 60 seconds 🚀 #app #development #startup #innovation",
    duration: "1:00",
    sound: "Motivational Tech - InspireBeats",
    views: "1.5M",
    likes: "312K",
    comments: 756,
    publishedAt: "1w",
    status: "published"
  },
  {
    id: 6,
    caption: "JavaScript one-liners that save time ⏰ #javascript #coding #tips #webdev",
    duration: "0:41",
    sound: "Code Master - TechTunes",
    views: "2.7M",
    likes: "534K",
    comments: 1678,
    publishedAt: "2w",
    status: "published"
  },
  {
    id: 7,
    caption: "My coding setup tour 2024 ✨ #setup #coding #workspace #tech",
    duration: "1:23",
    sound: "Setup Goals - WorkVibes",
    views: "1.9M",
    likes: "423K",
    comments: 987,
    publishedAt: "2w",
    status: "published"
  },
  {
    id: 8,
    caption: "When your code works on the first try 🎉 #coding #developer #success #celebration",
    duration: "0:35",
    sound: "Victory Dance - CelebrationBeats",
    views: "5.1M",
    likes: "1.2M",
    comments: 4523,
    publishedAt: "3w",
    status: "published"
  }
])

const trendingHashtags = ref<TrendingHashtag[]>([
  { tag: "#coding", count: "2.3M" },
  { tag: "#developer", count: "1.8M" },
  { tag: "#programming", count: "1.5M" },
  { tag: "#tech", count: "3.2M" },
  { tag: "#webdev", count: "892K" },
  { tag: "#javascript", count: "1.1M" },
  { tag: "#react", count: "756K" },
  { tag: "#css", count: "634K" },
  { tag: "#frontend", count: "543K" },
  { tag: "#backend", count: "421K" },
  { tag: "#ai", count: "2.1M" },
  { tag: "#startup", count: "987K" }
])
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
