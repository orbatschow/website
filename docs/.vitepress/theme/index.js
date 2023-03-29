// .vitepress/theme/index.js
import './tailwind.postcss'
import DefaultTheme from "vitepress/theme";
import Layout from '../components/Layout.vue'
import './custom.css'

// import hamburger.css
import 'hamburgers/dist/hamburgers.css'

// import fontawesome.css, required for SSR
import '@fortawesome/fontawesome-svg-core/styles.css'

// import source code pro font
import "@fontsource/source-code-pro"
import "@fontsource/source-code-pro/600-italic.css"
import "@fontsource/source-code-pro/600.css"

export default {
    ...DefaultTheme,
    Layout: Layout,
    enhanceApp(ctx) {
        // extend default theme custom behaviour.
        DefaultTheme.enhanceApp(ctx)
    }
}
