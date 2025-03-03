/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './sidebar/**/*.{js,ts,jsx,tsx}',
        './toolbar/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
        fontFamily: {
            inter: ['inter', 'sans-serif'],
        },
    },
    plugins: [],
};
