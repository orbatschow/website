import {defineConfig} from 'vitepress'
import path from 'path'

export default defineConfig({
    lang: 'en-US',
    title: 'orbat.sh',

    lastUpdated: true,
    cleanUrls: true,

    markdown: {
        theme: 'one-dark-pro',
        lineNumbers: true
    },

    outDir: path.resolve(process.cwd(), `public`),

    appearance: 'dark'
})

