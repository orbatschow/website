import {defineConfig} from 'vitepress'
import { createContentLoader } from 'vitepress'
import path from 'path'

// TODO
// https://vitepress.dev/guide/data-loading#data-from-local-files


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

    appearance: "dark"
})

