<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-8">
      <div class="p-3 bg-red-500 rounded-lg">
        <Youtube class="w-8 h-8 text-white" />
      </div>
      <div>
        <h1 class="text-3xl font-bold text-base-content">YouTube</h1>
        <p class="text-base-content/60">Manage your YouTube channel and video content</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-primary">
          <Users class="w-8 h-8" />
        </div>
        <div class="stat-title">Subscribers</div>
        <div class="stat-value text-primary">127K</div>
        <div class="stat-desc">↗︎ 12% (30 days)</div>
      </div>
      
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-secondary">
          <Play class="w-8 h-8" />
        </div>
        <div class="stat-title">Total Views</div>
        <div class="stat-value text-secondary">2.4M</div>
        <div class="stat-desc">↗︎ 25% (30 days)</div>
      </div>
      
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-accent">
          <Clock class="w-8 h-8" />
        </div>
        <div class="stat-title">Watch Time</div>
        <div class="stat-value text-accent">18.2K</div>
        <div class="stat-desc text-xs">hours (30 days)</div>
      </div>
      
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-warning">
          <TrendingUp class="w-8 h-8" />
        </div>
        <div class="stat-title">Avg. View Duration</div>
        <div class="stat-value text-warning">4:32</div>
        <div class="stat-desc">↗︎ 8% (30 days)</div>
      </div>
    </div>

    <!-- Recent Videos -->
    <div class="card bg-base-200 shadow-xl">
      <div class="card-body">
        <div class="flex items-center justify-between mb-6">
          <h2 class="card-title text-2xl">Recent Videos</h2>
          <button class="btn btn-primary btn-sm">
            <Plus class="w-4 h-4 mr-2" />
            Upload Video
          </button>
        </div>
        
        <div class="space-y-4">
          <div v-for="video in youtubeVideos" :key="video.id" class="card bg-base-100 shadow-sm">
            <div class="card-body p-6">
              <div class="flex items-start gap-4">
                <div class="relative">
                  <div class="w-32 h-20 bg-red-100 rounded-lg flex items-center justify-center">
                    <Play class="w-8 h-8 text-red-500" />
                  </div>
                  <div class="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                    {{ video.duration }}
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-lg mb-2">{{ video.title }}</h3>
                  <p class="text-base-content/70 text-sm mb-3">{{ video.description }}</p>
                  <div class="flex items-center gap-4 text-sm text-base-content/60">
                    <span class="flex items-center gap-1">
                      <Eye class="w-4 h-4" />
                      {{ video.views }}
                    </span>
                    <span class="flex items-center gap-1">
                      <ThumbsUp class="w-4 h-4" />
                      {{ video.likes }}
                    </span>
                    <span class="flex items-center gap-1">
                      <MessageCircle class="w-4 h-4" />
                      {{ video.comments }}
                    </span>
                    <span class="flex items-center gap-1">
                      <Calendar class="w-4 h-4" />
                      {{ video.publishedAt }}
                    </span>
                  </div>
                  <div class="flex items-center gap-2 mt-3">
                    <div class="badge badge-sm" :class="{
                      'badge-success': video.status === 'published',
                      'badge-warning': video.status === 'processing',
                      'badge-error': video.status === 'failed'
                    }">
                      {{ video.status }}
                    </div>
                    <div class="badge badge-outline badge-sm">{{ video.category }}</div>
                  </div>
                </div>
                <div class="dropdown dropdown-end">
                  <button tabindex="0" class="btn btn-ghost btn-sm">
                    <MoreVertical class="w-4 h-4" />
                  </button>
                  <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a><Edit class="w-4 h-4" />Edit</a></li>
                    <li><a><BarChart3 class="w-4 h-4" />Analytics</a></li>
                    <li><a><ExternalLink class="w-4 h-4" />View on YouTube</a></li>
                    <li><a><Share class="w-4 h-4" />Share</a></li>
                    <li><a class="text-error"><Trash2 class="w-4 h-4" />Delete</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-center mt-6">
          <div class="join">
            <button class="join-item btn">«</button>
            <button class="join-item btn btn-active">1</button>
            <button class="join-item btn">2</button>
            <button class="join-item btn">3</button>
            <button class="join-item btn">»</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Youtube,
  Users,
  Play,
  Clock,
  TrendingUp,
  Plus,
  Eye,
  ThumbsUp,
  MessageCircle,
  Calendar,
  MoreVertical,
  Edit,
  BarChart3,
  ExternalLink,
  Share,
  Trash2
} from 'lucide-vue-next'

interface YouTubeVideo {
  id: number
  title: string
  description: string
  duration: string
  views: string
  likes: string
  comments: number
  publishedAt: string
  status: 'published' | 'processing' | 'failed'
  category: string
}

const youtubeVideos = ref<YouTubeVideo[]>([
  {
    id: 1,
    title: "Complete Guide to Web Development in 2024",
    description: "Learn everything you need to know about modern web development, from basics to advanced concepts.",
    duration: "45:23",
    views: "125K",
    likes: "3.2K",
    comments: 184,
    publishedAt: "2024-01-15",
    status: "published",
    category: "Education"
  },
  {
    id: 2,
    title: "React vs Vue: Which Framework to Choose?",
    description: "Comprehensive comparison between React and Vue.js to help you make the right choice for your project.",
    duration: "28:45",
    views: "87K",
    likes: "2.1K",
    comments: 156,
    publishedAt: "2024-01-12",
    status: "published",
    category: "Technology"
  },
  {
    id: 3,
    title: "Building a Full-Stack Application Tutorial",
    description: "Step-by-step tutorial on creating a complete full-stack application from scratch.",
    duration: "1:12:34",
    views: "203K",
    likes: "5.8K",
    comments: 342,
    publishedAt: "2024-01-10",
    status: "published",
    category: "Tutorial"
  },
  {
    id: 4,
    title: "JavaScript Tips and Tricks for Beginners",
    description: "Essential JavaScript tips that every beginner developer should know.",
    duration: "22:16",
    views: "156K",
    likes: "4.1K",
    comments: 218,
    publishedAt: "2024-01-08",
    status: "published",
    category: "Education"
  },
  {
    id: 5,
    title: "Database Design Best Practices",
    description: "Learn how to design efficient and scalable database schemas for your applications.",
    duration: "38:52",
    views: "94K",
    likes: "2.7K",
    comments: 167,
    publishedAt: "2024-01-05",
    status: "published",
    category: "Database"
  }
])
</script>
