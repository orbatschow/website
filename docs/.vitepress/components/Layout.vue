<script setup>
import Home from "./Home.vue";
import Blog from "./Blog.vue";
import Article from "./Article.vue";
import NotFound from "./NotFound.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import {useData} from 'vitepress'

const {page, frontmatter} = useData()
</script>

<template>
  <main class="min-h-screen mx-6 md:mx-10">
    <section class="min-h-screen flex flex-col grow mx-auto max-w-4xl justify-between">
      <Header/>

      <Home v-if="frontmatter.layout === 'home'"/>
      <Blog v-else-if="frontmatter.layout === 'blog'"/>
      <NotFound v-else-if="page.isNotFound" />

      <Article v-else/>

      <Footer/>
    </section>
  </main>
</template>
