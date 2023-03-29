module.exports = {
    theme: {
      colors: {
          primary: '#1e1e20',
          secondary: '#ffd900',
          font: '#fffff5db',
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