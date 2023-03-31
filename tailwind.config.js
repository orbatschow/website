module.exports = {
    theme: {
      colors: {
          primary: '#1e1e20',
          secondary: '#ffd900',
          font: '#fffff5db',
          divider: 'rgba(82, 82, 89, 0.32)',
      }
    },
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        content: [
            './docs/.vitepress/**/*.js',
            './docs/.vitepress/**/*.vue',
            './docs/.vitepress/**/*.ts',
        ],
        options: {
            safelist: ['html', 'body'],
        },
    },
}