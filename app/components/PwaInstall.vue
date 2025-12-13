<template>
  <div v-if="showInstallPrompt" class="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-4">
      <div class="flex items-start gap-3">
        <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Download class="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="font-medium text-gray-900 dark:text-white">Install App</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Add to home screen for quick access and offline use
          </p>
          <div class="flex gap-2 mt-3">
            <button 
              @click="installPWA"
              class="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
            >
              Install
            </button>
            <button 
              @click="dismissPrompt"
              class="text-sm text-gray-600 dark:text-gray-400 px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Not now
            </button>
          </div>
        </div>
        <button @click="dismissPrompt" class="text-gray-400 hover:text-gray-600">
          <X class="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Download, X } from 'lucide-vue-next'

const showInstallPrompt = ref(false)
let deferredPrompt = null

onMounted(() => {
  // Only run on client side
  if (process.client) {
    // Check if already installed
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      console.log('App is already installed')
      return
    }

    // Check if running as PWA
    if (window.navigator && window.navigator.standalone) {
      console.log('App is running as PWA on iOS')
      return
    }

    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('beforeinstallprompt event fired')
      e.preventDefault()
      deferredPrompt = e
      
      // Show custom install prompt after a delay
      setTimeout(() => {
        showInstallPrompt.value = true
      }, 5000) // Increased delay to 5 seconds
    })

    // Check if service worker is supported
    if ('serviceWorker' in navigator) {
      console.log('Service Worker is supported')
    } else {
      console.log('Service Worker is not supported')
    }

    // For debugging - show prompt manually after some time if no event
    setTimeout(() => {
      if (!deferredPrompt && !showInstallPrompt.value) {
        console.log('No install prompt event detected. Browser may not support PWA installation.')
        // Optionally show a manual install instruction
      }
    }, 10000)
  }
})

function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then((choiceResult) => {
      console.log('Install choice:', choiceResult.outcome)
      if (choiceResult.outcome === 'accepted') {
        console.log('PWA installed successfully')
      } else {
        console.log('PWA installation declined')
      }
      deferredPrompt = null
      showInstallPrompt.value = false
    })
  } else {
    console.log('No deferred prompt available')
    // Fallback: show manual installation instructions
    showManualInstallInstructions()
  }
}

function showManualInstallInstructions() {
  // Show browser-specific instructions
  alert('To install this app:\n\nChrome/Edge: Click the install icon in the address bar\niOS Safari: Tap Share → Add to Home Screen\nFirefox: Look for "Install" option in the menu')
}

function dismissPrompt() {
  showInstallPrompt.value = false
  // Remember user dismissed it (optional)
  if (process.client && localStorage) {
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
  }
}
</script>