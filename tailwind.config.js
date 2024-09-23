/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            colors: {
                primaryBg: 'var(--bg-primary)',
                secondaryBg: 'var(--bg-secondary)',
                tertiaryBg: 'var(--bg-tertiary)',
                primaryBorder: 'var(--border-primary)',
                secondaryBorder: 'var(--border-secondary)',
                primaryText: 'var(--text-primary)',
                secondaryText: 'var(--text-secondary)',
                tertiaryText: 'var(--text-tertiary)',
                primaryColor: 'var(--primary-color)',
                secondaryColor: 'var(--secondary-color)',
                tertiaryColor: 'var(--tertiary-color)',
                warningColor: 'var(--warning-color)',
                errorColor: 'var(--error-color)',
            },
            transitionProperty: {
                'height': 'height',
            },
        },
    },
    plugins: [],
}

