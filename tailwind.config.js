import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
        "./node_modules/flowbite/**/*.js"
    ],

    darkMode: "media",
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'wine': '#411A2D',
                'dark-wine': '#29101c',
                'pinky': '#D84E89',
                'light-pinky': '#FBD3E3',
                'dark-pinky': '#a13865',
            },
        },
    },

    plugins: [require('flowbite/plugin')],
};
