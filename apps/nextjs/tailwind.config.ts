import baseConfig from "@claudiorivera/tailwind-config";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig],
} satisfies Config;
