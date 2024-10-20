/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API: string; // Declare your environment variable here
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
