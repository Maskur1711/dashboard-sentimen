<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-8">
      <div class="p-3 bg-primary/10 rounded-lg">
        <Newspaper class="w-8 h-8 text-primary" />
      </div>
      <div>
        <h1 class="text-3xl font-bold text-base-content">News</h1>
        <p class="text-base-content/60">Stay updated with the latest news and updates</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-primary">
          <TrendingUp class="w-8 h-8" />
        </div>
        <div class="stat-title">Total Articles</div>
        <div class="stat-value text-primary">1,249</div>
        <div class="stat-desc">↗︎ 12% (30 days)</div>
      </div>
      
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-secondary">
          <Eye class="w-8 h-8" />
        </div>
        <div class="stat-title">Total Views</div>
        <div class="stat-value text-secondary">89.4K</div>
        <div class="stat-desc">↗︎ 21% (30 days)</div>
      </div>
      
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-accent">
          <Users class="w-8 h-8" />
        </div>
        <div class="stat-title">Active Readers</div>
        <div class="stat-value text-accent">12.4K</div>
        <div class="stat-desc">↗︎ 8% (30 days)</div>
      </div>
      
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-warning">
          <Clock class="w-8 h-8" />
        </div>
        <div class="stat-title">Avg. Read Time</div>
        <div class="stat-value text-warning">3.2m</div>
        <div class="stat-desc">↘︎ 5% (30 days)</div>
      </div>
    </div>

    <!-- Recent News -->
    <div class="card bg-base-200 shadow-xl">
      <div class="card-body">
        <div class="flex items-center justify-between mb-6">
          <h2 class="card-title text-2xl">Recent News</h2>
          <button class="btn btn-primary btn-sm">
            <Plus class="w-4 h-4 mr-2" />
            Add News
          </button>
        </div>
        
        <div class="space-y-4">
          <div v-for="article in newsArticles" :key="article.id" class="card bg-base-100 shadow-sm">
            <div class="card-body p-6">
              <div class="flex items-start gap-4">
                <div class="avatar">
                  <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Newspaper class="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-lg mb-2">{{ article.title }}</h3>
                  <p class="text-base-content/70 mb-3">{{ article.excerpt }}</p>
                  <div class="flex items-center gap-4 text-sm text-base-content/60">
                    <span class="flex items-center gap-1">
                      <Calendar class="w-4 h-4" />
                      {{ article.date }}
                    </span>
                    <span class="flex items-center gap-1">
                      <Eye class="w-4 h-4" />
                      {{ article.views }}
                    </span>
                    <span class="flex items-center gap-1">
                      <MessageCircle class="w-4 h-4" />
                      {{ article.comments }}
                    </span>
                  </div>
                </div>
                <div class="dropdown dropdown-end">
                  <button tabindex="0" class="btn btn-ghost btn-sm">
                    <MoreVertical class="w-4 h-4" />
                  </button>
                  <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a><Edit class="w-4 h-4" />Edit</a></li>
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
  Newspaper,
  TrendingUp,
  Eye,
  Users,
  Clock,
  Plus,
  Calendar,
  MessageCircle,
  MoreVertical,
  Edit,
  Share,
  Trash2
} from 'lucide-vue-next'

interface NewsArticle {
  id: number
  title: string
  excerpt: string
  date: string
  views: string
  comments: number
}

const newsArticles = ref<NewsArticle[]>([
  {
    id: 1,
    title: "Breaking: New Social Media Algorithm Updates",
    excerpt: "Major social media platforms announce significant changes to their content distribution algorithms, affecting millions of users worldwide.",
    date: "2024-01-15",
    views: "2.3K",
    comments: 45
  },
  {
    id: 2,
    title: "Tech Industry Trends for 2024",
    excerpt: "Analysis of emerging technologies and their potential impact on various industries throughout the upcoming year.",
    date: "2024-01-14",
    views: "1.8K",
    comments: 32
  },
  {
    id: 3,
    title: "Digital Marketing Strategies That Work",
    excerpt: "Comprehensive guide to effective digital marketing techniques that deliver measurable results for businesses of all sizes.",
    date: "2024-01-13",
    views: "3.1K",
    comments: 67
  },
  {
    id: 4,
    title: "The Future of Remote Work",
    excerpt: "Exploring how remote work culture continues to evolve and shape the modern workplace landscape.",
    date: "2024-01-12",
    views: "1.5K",
    comments: 28
  },
  {
    id: 5,
    title: "Cybersecurity Best Practices",
    excerpt: "Essential security measures every individual and organization should implement to protect against cyber threats.",
    date: "2024-01-11",
    views: "2.7K",
    comments: 54
  }
])
</script>
