import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["shadcn-nuxt", "@pinia/nuxt"],
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
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
          src: "/logo-192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: "/logo-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable any",
        },
      ],
      categories: ["finance", "productivity", "utilities"],
      screenshots: [
        {
          src: "/screenshot-mobile.png",
          type: "image/png",
          sizes: "390x844",
          form_factor: "narrow",
        },
        {
          src: "/screenshot-desktop.png",
          type: "image/png",
          sizes: "1280x720",
          form_factor: "wide",
        },
      ],
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
    // Private keys (only available on server-side)

    // Public keys (exposed to client-side)
    public: {
      googleSheetId: process.env.GOOGLE_SHEET_ID,
      googleServiceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY,
      googleApiKey: process.env.GOOGLE_API_KEY,
      // Add any public env vars here if needed
    },
  },

  // Optimize for production
  nitro: {
    prerender: {
      routes: ["/"],
    },
  },

  css: ["~/assets/css/tailwind.css"],

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
