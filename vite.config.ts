import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite"; // 1. Import the nitro plugin

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      nitro({
        preset: "vercel", // 2. Force Nitro to output for Vercel
      }),
    ],
    optimizeDeps: {
      include: [
        "@radix-ui/react-avatar",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-label",
        "@radix-ui/react-progress",
        "@radix-ui/react-separator",
        "@radix-ui/react-slot",
        "framer-motion",
        "lucide-react",
        "recharts",
        "sonner",
      ],
    },
  },
});
