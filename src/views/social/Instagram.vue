<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-8">
      <div class="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
        <Instagram class="w-8 h-8 text-white" />
      </div>
      <div>
        <h1 class="text-3xl font-bold text-base-content">Instagram</h1>
        <p class="text-base-content/60">Manage your Instagram presence and analytics</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-primary">
          <Users class="w-8 h-8" />
        </div>
        <div class="stat-title">Followers</div>
        <div class="stat-value text-primary">45.2K</div>
        <div class="stat-desc">↗︎ 15% (30 days)</div>
      </div>
      
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-secondary">
          <Heart class="w-8 h-8" />
        </div>
        <div class="stat-title">Total Likes</div>
        <div class="stat-value text-secondary">234K</div>
        <div class="stat-desc">↗︎ 28% (30 days)</div>
      </div>
      
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-accent">
          <MessageCircle class="w-8 h-8" />
        </div>
        <div class="stat-title">Comments</div>
        <div class="stat-value text-accent">12.8K</div>
        <div class="stat-desc">↗︎ 18% (30 days)</div>
      </div>
      
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-warning">
          <TrendingUp class="w-8 h-8" />
        </div>
        <div class="stat-title">Engagement Rate</div>
        <div class="stat-value text-warning">4.2%</div>
        <div class="stat-desc">↗︎ 2% (30 days)</div>
      </div>
    </div>

    <!-- Recent Posts -->
    <div class="card bg-base-200 shadow-xl">
      <div class="card-body">
        <div class="flex items-center justify-between mb-6">
          <h2 class="card-title text-2xl">Recent Posts</h2>
          <button class="btn btn-primary btn-sm">
            <Plus class="w-4 h-4 mr-2" />
            New Post
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="post in instagramPosts" :key="post.id" class="card bg-base-100 shadow-sm">
            <figure class="aspect-square bg-gradient-to-br from-purple-400 to-pink-400">
              <div class="w-full h-full flex items-center justify-center">
                <Image class="w-16 h-16 text-white/50" />
              </div>
            </figure>
            <div class="card-body p-4">
              <p class="text-sm text-base-content/80 mb-3">{{ post.caption }}</p>
              <div class="flex items-center justify-between text-sm text-base-content/60">
                <div class="flex items-center gap-3">
                  <span class="flex items-center gap-1">
                    <Heart class="w-4 h-4" />
                    {{ post.likes }}
                  </span>
                  <span class="flex items-center gap-1">
                    <MessageCircle class="w-4 h-4" />
                    {{ post.comments }}
                  </span>
                  <span class="flex items-center gap-1">
                    <Share class="w-4 h-4" />
                    {{ post.shares }}
                  </span>
                </div>
                <span>{{ post.date }}</span>
              </div>
              <div class="card-actions justify-end mt-4">
                <button class="btn btn-ghost btn-xs">
                  <BarChart3 class="w-4 h-4" />
                  Analytics
                </button>
                <div class="dropdown dropdown-end">
                  <button tabindex="0" class="btn btn-ghost btn-xs">
                    <MoreVertical class="w-4 h-4" />
                  </button>
                  <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                    <li><a><Edit class="w-4 h-4" />Edit</a></li>
                    <li><a><ExternalLink class="w-4 h-4" />View</a></li>
                    <li><a class="text-error"><Trash2 class="w-4 h-4" />Delete</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-center mt-6">
          <button class="btn btn-outline">Load More Posts</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Instagram,
  Users,
  Heart,
  MessageCircle,
  TrendingUp,
  Plus,
  Image,
  Share,
  BarChart3,
  MoreVertical,
  Edit,
  ExternalLink,
  Trash2
} from 'lucide-vue-next'

interface InstagramPost {
  id: number
  caption: string
  likes: string
  comments: number
  shares: number
  date: string
}

const instagramPosts = ref<InstagramPost[]>([
  {
    id: 1,
    caption: "Beautiful sunset from our latest adventure! 🌅 #sunset #adventure #travel",
    likes: "1.2K",
    comments: 45,
    shares: 23,
    date: "2d"
  },
  {
    id: 2,
    caption: "New product launch coming soon! Stay tuned for exciting updates 🚀",
    likes: "892",
    comments: 32,
    shares: 18,
    date: "3d"
  },
  {
    id: 3,
    caption: "Behind the scenes of our creative process ✨ #creative #process #design",
    likes: "756",
    comments: 28,
    shares: 15,
    date: "4d"
  },
  {
    id: 4,
    caption: "Team building day! Great energy and collaboration 💪 #team #collaboration",
    likes: "643",
    comments: 22,
    shares: 12,
    date: "5d"
  },
  {
    id: 5,
    caption: "Celebrating our community milestone! Thank you for your support 🎉",
    likes: "1.5K",
    comments: 67,
    shares: 34,
    date: "6d"
  },
  {
    id: 6,
    caption: "Innovation at its finest! Check out our latest feature update 💡",
    likes: "934",
    comments: 41,
    shares: 26,
    date: "1w"
  }
])
</script>
