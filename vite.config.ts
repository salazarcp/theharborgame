import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('react-dom') || (id.includes('node_modules/react/') && !id.includes('react-day-picker'))) return 'react-vendor';
          if (id.includes('gsap')) return 'gsap';
          if (id.includes('@radix-ui')) return 'radix';
          if (id.includes('@supabase')) return 'supabase';
          if (id.includes('lucide-react')) return 'lucide';
          if (id.includes('recharts') || id.includes('d3')) return 'charts';
          if (id.includes('date-fns') || id.includes('react-day-picker')) return 'date';
          if (id.includes('zod') || id.includes('react-hook-form') || id.includes('@hookform')) return 'forms';
          if (id.includes('embla-carousel')) return 'carousel';
          if (id.includes('sonner') || id.includes('vaul') || id.includes('cmdk')) return 'overlay';
          return undefined;
        },
      },
    },
  },
});
