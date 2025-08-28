<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-8">
      <div class="p-3 bg-sky-500 rounded-lg">
        <Twitter class="w-8 h-8 text-white" />
      </div>
      <div>
        <h1 class="text-3xl font-bold text-base-content">Twitter</h1>
        <p class="text-base-content/60">Engage in real-time conversations and build your community</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-primary">
          <Users class="w-8 h-8" />
        </div>
        <div class="stat-title">Followers</div>
        <div class="stat-value text-primary">67.8K</div>
        <div class="stat-desc">↗︎ 16% (30 days)</div>
      </div>
      
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-secondary">
          <MessageCircle class="w-8 h-8" />
        </div>
        <div class="stat-title">Tweets</div>
        <div class="stat-value text-secondary">1,234</div>
        <div class="stat-desc">↗︎ 8% (30 days)</div>
      </div>
      
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-accent">
          <Heart class="w-8 h-8" />
        </div>
        <div class="stat-title">Total Likes</div>
        <div class="stat-value text-accent">89.2K</div>
        <div class="stat-desc">↗︎ 23% (30 days)</div>
      </div>
      
      <div class="stat bg-base-200 rounded-lg">
        <div class="stat-figure text-warning">
          <Repeat class="w-8 h-8" />
        </div>
        <div class="stat-title">Retweets</div>
        <div class="stat-value text-warning">12.4K</div>
        <div class="stat-desc">↗︎ 19% (30 days)</div>
      </div>
    </div>

    <!-- Tweet Composer -->
    <div class="card bg-base-200 shadow-xl mb-8">
      <div class="card-body">
        <h2 class="card-title text-xl mb-4">Compose Tweet</h2>
        <div class="form-control">
          <textarea 
            v-model="newTweet"
            class="textarea textarea-bordered h-24 resize-none" 
            placeholder="What's happening?"
            maxlength="280"
          ></textarea>
          <div class="flex items-center justify-between mt-3">
            <div class="flex items-center gap-2">
              <button class="btn btn-ghost btn-sm">
                <ImageIcon class="w-4 h-4" />
              </button>
              <button class="btn btn-ghost btn-sm">
                <Video class="w-4 h-4" />
              </button>
              <button class="btn btn-ghost btn-sm">
                <Smile class="w-4 h-4" />
              </button>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-sm text-base-content/60">{{ newTweet.length }}/280</span>
              <button class="btn btn-primary btn-sm" :disabled="!newTweet.trim()">
                <Send class="w-4 h-4 mr-2" />
                Tweet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Tweets -->
    <div class="card bg-base-200 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-6">Recent Tweets</h2>
        
        <div class="space-y-6">
          <div v-for="tweet in tweets" :key="tweet.id" class="card bg-base-100 shadow-sm">
            <div class="card-body p-6">
              <div class="flex items-start gap-4">
                <div class="avatar">
                  <div class="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
                    <Twitter class="w-6 h-6 text-sky-500" />
                  </div>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <h3 class="font-semibold">Your Account</h3>
                    <div class="badge badge-primary badge-xs">Verified</div>
                    <span class="text-sm text-base-content/60">@youraccount</span>
                    <span class="text-sm text-base-content/60">·</span>
                    <span class="text-sm text-base-content/60">{{ tweet.timeAgo }}</span>
                  </div>
                  <p class="text-base-content/90 mb-4 leading-relaxed">{{ tweet.content }}</p>
                  
                  <!-- Tweet Media -->
                  <div v-if="tweet.hasMedia" class="bg-base-200 rounded-lg p-8 mb-4 flex items-center justify-center">
                    <div class="text-center">
                      <ImageIcon class="w-12 h-12 text-base-content/30 mx-auto mb-2" />
                      <p class="text-sm text-base-content/50">{{ tweet.mediaType }}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between text-base-content/60">
                    <button class="flex items-center gap-2 hover:text-blue-500 transition-colors">
                      <MessageCircle class="w-4 h-4" />
                      <span class="text-sm">{{ tweet.replies }}</span>
                    </button>
                    <button class="flex items-center gap-2 hover:text-green-500 transition-colors">
                      <Repeat class="w-4 h-4" />
                      <span class="text-sm">{{ tweet.retweets }}</span>
                    </button>
                    <button class="flex items-center gap-2 hover:text-red-500 transition-colors">
                      <Heart class="w-4 h-4" />
                      <span class="text-sm">{{ tweet.likes }}</span>
                    </button>
                    <button class="flex items-center gap-2 hover:text-blue-500 transition-colors">
                      <Share class="w-4 h-4" />
                      <span class="text-sm">{{ tweet.shares }}</span>
                    </button>
                    <div class="dropdown dropdown-end">
                      <button tabindex="0" class="btn btn-ghost btn-xs">
                        <MoreVertical class="w-4 h-4" />
                      </button>
                      <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a><Edit class="w-4 h-4" />Edit Tweet</a></li>
                        <li><a><BarChart3 class="w-4 h-4" />View Analytics</a></li>
                        <li><a><ExternalLink class="w-4 h-4" />View on Twitter</a></li>
                        <li><a><Copy class="w-4 h-4" />Copy Link</a></li>
                        <li><a class="text-error"><Trash2 class="w-4 h-4" />Delete</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-center mt-6">
          <button class="btn btn-outline">Load More Tweets</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Twitter,
  Users,
  MessageCircle,
  Heart,
  Repeat,
  ImageIcon,
  Video,
  Smile,
  Send,
  Share,
  MoreVertical,
  Edit,
  BarChart3,
  ExternalLink,
  Copy,
  Trash2
} from 'lucide-vue-next'

interface Tweet {
  id: number
  content: string
  timeAgo: string
  replies: number
  retweets: number
  likes: number
  shares: number
  hasMedia: boolean
  mediaType?: string
}

const newTweet = ref('')

const tweets = ref<Tweet[]>([
  {
    id: 1,
    content: "Just shipped a new feature! 🚀 The team worked incredibly hard to make this happen. Grateful for everyone's dedication and creativity. #TeamWork #Innovation #TechLife",
    timeAgo: "2h",
    replies: 23,
    retweets: 45,
    likes: 156,
    shares: 12,
    hasMedia: false
  },
  {
    id: 2,
    content: "Quick thread on the future of web development 🧵\n\n1/ The landscape is evolving rapidly\n2/ New frameworks are emerging\n3/ Performance optimization is key\n4/ User experience remains paramount\n\nWhat are your thoughts? 💭",
    timeAgo: "4h",
    replies: 67,
    retweets: 89,
    likes: 234,
    shares: 28,
    hasMedia: false
  },
  {
    id: 3,
    content: "Behind the scenes of our latest project! The design process is always fascinating - from concept to reality. Swipe to see the evolution ➡️",
    timeAgo: "6h",
    replies: 34,
    retweets: 56,
    likes: 189,
    shares: 15,
    hasMedia: true,
    mediaType: "Image carousel"
  },
  {
    id: 4,
    content: "Coffee ☕ + Code 💻 = Perfect Monday morning! What's fueling your productivity today? Drop your go-to work setup in the replies 👇",
    timeAgo: "1d",
    replies: 78,
    retweets: 34,
    likes: 145,
    shares: 9,
    hasMedia: true,
    mediaType: "Photo"
  },
  {
    id: 5,
    content: "Attending an amazing tech conference today! The speakers are sharing incredible insights about AI, machine learning, and the future of technology. Live-tweeting the best moments 🎤 #TechConf2024",
    timeAgo: "2d",
    replies: 45,
    retweets: 67,
    likes: 203,
    shares: 22,
    hasMedia: false
  },
  {
    id: 6,
    content: "Weekend project complete! ✅ Built a small app to track my reading habits. It's amazing what you can accomplish with a few focused hours. Code is available on GitHub 📚 #WeekendCoding #OpenSource",
    timeAgo: "3d",
    replies: 56,
    retweets: 78,
    likes: 167,
    shares: 31,
    hasMedia: true,
    mediaType: "Screenshot"
  }
])
</script>
