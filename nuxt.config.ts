import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["shadcn-nuxt", "@pinia/nuxt", "@vite-pwa/nuxt"],

  shadcn: {
    prefix: "",
    componentDir: "@/components/ui",
  },

  pwa: {
    registerType: "autoUpdate",
    includeManifestIcons: false,
    manifest: {
      name: "Expense Tracker",
      short_name: "ExpenseApp",
      description: "Personal expense tracking application with insights and analytics",
      theme_color: "#3B82F6",
      background_color: "#ffffff",
      display: "standalone",
      orientation: "portrait",
      scope: "/",
      start_url: "/",
      id: "expense-tracker-pwa",
      icons: [
        {
          src: "/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
      categories: ["finance", "productivity", "utilities"],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
      // Fix navigation fallback for SPA routing
      navigateFallback: "/",
      navigateFallbackDenylist: [
        /^\/api\//,
        /^\/_nuxt\//,
        /^\/.*\.(png|jpg|jpeg|svg|ico|css|js)$/
      ],
      // Add specific routing rules
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
            },
            cacheKeyWillBeUsed: async ({ request }) => {
              return `${request.url}?${Date.now()}`;
            },
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
            },
          },
        },
      ],
      cleanupOutdatedCaches: true,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      type: "module",
    },
  },

  runtimeConfig: {
    public: {
      googleSheetId: process.env.GOOGLE_SHEET_ID,
      googleServiceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY,
      googleApiKey: process.env.GOOGLE_API_KEY,
    },
  },

  nitro: {
    prerender: {
      routes: ["/", "/recap"], // Add all your routes here
    },
  },

  // Ensure proper SPA routing
  ssr: false, // This might help with PWA routing issues

  app: {
    head: {
      viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
      charset: "utf-8",
      meta: [
        { name: "format-detection", content: "telephone=no" },
        { name: "msapplication-TileColor", content: "#3B82F6" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      ],
      link: [
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/manifest.webmanifest" },
      ],
    },
  },
});
