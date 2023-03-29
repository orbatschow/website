// .vitepress/theme/index.js
import './tailwind.postcss'
import DefaultTheme from "vitepress/theme";
import Layout from '../components/Layout.vue'
import './custom.css'
import 'hamburgers/dist/hamburgers.css'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@fontsource/source-code-pro"

export default {
    ...DefaultTheme,
    Layout: Layout,
    enhanceApp(ctx) {
        // extend default theme custom behaviour.
        DefaultTheme.enhanceApp(ctx)

        // register your custom global components
        ctx.app.component("font-awesome-icon", FontAwesomeIcon)
    }
}
