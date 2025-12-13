import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  // Add the PWA module here!
  modules: ["shadcn-nuxt", "@pinia/nuxt", "@nuxtjs/pwa"],

  shadcn: {
    prefix: "",
    componentDir: "@/components/ui",
  },

  pwa: {
    registerType: "autoUpdate",
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
    manifest: {
      name: "Expense Tracker",
      short_name: "ExpenseApp",
      description:
        "Personal expense tracking application with insights and analytics",
      theme_color: "#3B82F6",
      background_color: "#ffffff",
      display: "standalone",
      orientation: "portrait",
      scope: "/",
      start_url: "/",
      icons: [
        {
          src: "/icon-192x192.png", // Fix the filename
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: "/icon-512x512.png", // Fix the filename
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable any",
        },
      ],
      categories: ["finance", "productivity", "utilities"],
    },
    meta: {
      name: "Expense Tracker",
      author: "Your Name",
      description: "Track your expenses with detailed analytics and insights",
      theme_color: "#3B82F6",
      lang: "en",
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
      routes: ["/"],
    },
  },

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
      link: [{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" }],
    },
  },
});
