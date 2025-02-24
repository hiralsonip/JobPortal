/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			colors: {
				border: "hsl(214.3, 31.8%, 91.4%)",
				background: "hsl(0, 0%, 100%)", // Adjust as needed
				foreground: "hsl(222.2, 84%, 4.9%)",
			},
		},
	},
	plugins: [],
};
