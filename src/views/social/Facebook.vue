<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-8">
      <div class="p-3 bg-blue-600 rounded-lg">
        <Facebook class="w-8 h-8 text-white" />
      </div>
      <div>
        <h1 class="text-3xl font-bold text-base-content">Facebook</h1>
        <p class="text-base-content/60">Manage your Facebook page and social engagement</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-primary">
          <Users class="w-8 h-8" />
        </div>
        <div class="stat-title">Page Likes</div>
        <div class="stat-value text-primary">89.3K</div>
        <div class="stat-desc">↗︎ 9% (30 days)</div>
      </div>
      
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-secondary">
          <Eye class="w-8 h-8" />
        </div>
        <div class="stat-title">Post Reach</div>
        <div class="stat-value text-secondary">456K</div>
        <div class="stat-desc">↗︎ 18% (30 days)</div>
      </div>
      
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-accent">
          <MessageCircle class="w-8 h-8" />
        </div>
        <div class="stat-title">Engagement</div>
        <div class="stat-value text-accent">23.4K</div>
        <div class="stat-desc">↗︎ 14% (30 days)</div>
      </div>
      
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-warning">
          <TrendingUp class="w-8 h-8" />
        </div>
        <div class="stat-title">Engagement Rate</div>
        <div class="stat-value text-warning">5.1%</div>
        <div class="stat-desc">↗︎ 3% (30 days)</div>
      </div>
    </div>

    <!-- Recent Posts -->
    <div class="card bg-base-200 shadow-xl">
      <div class="card-body">
        <div class="flex items-center justify-between mb-6">
          <h2 class="card-title text-2xl">Recent Posts</h2>
          <button class="btn btn-primary btn-sm">
            <Plus class="w-4 h-4 mr-2" />
            Create Post
          </button>
        </div>
        
        <div class="space-y-6">
          <div v-for="post in facebookPosts" :key="post.id" class="card bg-base-100 shadow-sm">
            <div class="card-body p-6">
              <div class="flex items-start gap-4">
                <div class="avatar">
                  <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Facebook class="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <h3 class="font-semibold">Your Page</h3>
                    <div class="badge badge-primary badge-xs">Page</div>
                  </div>
                  <p class="text-base-content/80 mb-4">{{ post.content }}</p>
                  
                  <!-- Post Media Preview -->
                  <div v-if="post.hasMedia" class="bg-base-200 rounded-lg p-8 mb-4 flex items-center justify-center">
                    <div class="text-center">
                      <Image class="w-12 h-12 text-base-content/30 mx-auto mb-2" />
                      <p class="text-sm text-base-content/50">{{ post.mediaType }} content</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between text-sm text-base-content/60 mb-4">
                    <div class="flex items-center gap-4">
                      <span class="flex items-center gap-1">
                        <ThumbsUp class="w-4 h-4" />
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
                    <span class="flex items-center gap-1">
                      <Calendar class="w-4 h-4" />
                      {{ post.publishedAt }}
                    </span>
                  </div>
                  
                  <div class="flex items-center gap-2">
                    <div class="badge badge-sm" :class="{
                      'badge-success': post.status === 'published',
                      'badge-warning': post.status === 'scheduled',
                      'badge-info': post.status === 'draft'
                    }">
                      {{ post.status }}
                    </div>
                    <div class="badge badge-outline badge-sm">{{ post.postType }}</div>
                  </div>
                </div>
                <div class="dropdown dropdown-end">
                  <button tabindex="0" class="btn btn-ghost btn-sm">
                    <MoreVertical class="w-4 h-4" />
                  </button>
                  <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a><Edit class="w-4 h-4" />Edit</a></li>
                    <li><a><BarChart3 class="w-4 h-4" />View Insights</a></li>
                    <li><a><ExternalLink class="w-4 h-4" />View on Facebook</a></li>
                    <li><a><Copy class="w-4 h-4" />Copy Link</a></li>
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
  Facebook,
  Users,
  Eye,
  MessageCircle,
  TrendingUp,
  Plus,
  Image,
  ThumbsUp,
  Share,
  Calendar,
  MoreVertical,
  Edit,
  BarChart3,
  ExternalLink,
  Copy,
  Trash2
} from 'lucide-vue-next'

interface FacebookPost {
  id: number
  content: string
  hasMedia: boolean
  mediaType?: string
  likes: string
  comments: number
  shares: number
  publishedAt: string
  status: 'published' | 'scheduled' | 'draft'
  postType: string
}

const facebookPosts = ref<FacebookPost[]>([
  {
    id: 1,
    content: "🚀 Exciting news! We're launching our new product line next week. Stay tuned for amazing updates and special launch offers. Thank you for your continued support! #NewProduct #Launch #Excited",
    hasMedia: true,
    mediaType: "Image",
    likes: "2.3K",
    comments: 89,
    shares: 156,
    publishedAt: "2024-01-15",
    status: "published",
    postType: "Promotional"
  },
  {
    id: 2,
    content: "Behind the scenes of our creative team! 💡 Watch how we bring ideas to life through collaboration, innovation, and lots of coffee ☕ What's your creative process like?",
    hasMedia: true,
    mediaType: "Video",
    likes: "1.8K",
    comments: 67,
    shares: 92,
    publishedAt: "2024-01-14",
    status: "published",
    postType: "Behind the Scenes"
  },
  {
    id: 3,
    content: "Customer spotlight! 🌟 Meet Sarah, who transformed her business using our solutions. Her success story is truly inspiring and shows what's possible with dedication and the right tools.",
    hasMedia: true,
    mediaType: "Image",
    likes: "1.5K",
    comments: 45,
    shares: 73,
    publishedAt: "2024-01-13",
    status: "published",
    postType: "Customer Story"
  },
  {
    id: 4,
    content: "Tips Tuesday! 📝 Here are 5 essential strategies to boost your productivity: 1) Time blocking 2) Priority matrix 3) Regular breaks 4) Goal setting 5) Continuous learning. Which tip resonates with you most?",
    hasMedia: false,
    likes: "2.1K",
    comments: 124,
    shares: 187,
    publishedAt: "2024-01-12",
    status: "published",
    postType: "Educational"
  },
  {
    id: 5,
    content: "Weekend vibes! 🌈 Take time to recharge, spend time with loved ones, and pursue your passions. Work-life balance is key to long-term success and happiness. How do you spend your weekends?",
    hasMedia: true,
    mediaType: "Image",
    likes: "3.2K",
    comments: 156,
    shares: 234,
    publishedAt: "2024-01-11",
    status: "published",
    postType: "Lifestyle"
  }
])
</script>
