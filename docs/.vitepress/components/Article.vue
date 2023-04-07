<script setup>

import {useRoute} from 'vitepress'
import {data as articles} from "./articles.data";

const route = useRoute()
</script>


<template>
  <Content class="vp-doc mb-auto mt-6"/>

  <!-- this section will only be rendered for article pages -->
  <section v-if="route.path.includes('/blog/')"
           class="flex mt-6 flex-col md:flex-row gap-y-8 md:gap-x-10 justify-between border-t pt-8 border-t-divider">
    <a class="flex md:w-1/2 text-secondary hover:opacity-70 transition p-4 border border-secondary" target="_blank"
       :href="'https://github.com/orbatschow/website/blob/master/docs' + route.path.replace('index', '') + 'index.md'">
      Edit this page on Github
    </a>
    <a class="flex md:w-1/2 text-right text-secondary hover:opacity-70 transition p-4 border border-secondary"
       target="_blank" :href="'https://github.com/orbatschow/website/blob/master/docs' + route.path.replace('index', '') + 'code'">
          <span class="block w-full text-right">
            Find the source code on GitHub
          </span>
    </a>
  </section>

</template>




