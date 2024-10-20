/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			animation: {
				bounce: "bounce 0.5s infinite",
				bounce200: "bounce 0.5s infinite 0.1s",
				bounce400: "bounce 0.5s infinite 0.2s",
			},
			keyframes: {
				bounce: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-1rem)" },
				},
			},
		},
	},
	plugins: [],
};
