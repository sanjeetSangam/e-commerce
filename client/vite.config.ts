import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	const API_URL = `${env.VITE_API_URL ?? "http://localhost:8080"}`;
	return {
		plugins: [react()],
		server: {
			proxy: {
				"/api": {
					target: API_URL,
					secure: false,
					changeOrigin: true,
				},
			},
		},
	};
});
