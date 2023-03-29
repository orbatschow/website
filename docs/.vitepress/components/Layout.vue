<script setup>
import Home from "./Home.vue";
import Blog from "./Blog.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import {useData} from 'vitepress'

const {frontmatter} = useData()
</script>

<style>
</style>

<template>
  <main class="min-h-screen mx-6 md:mx-10">
    <section class="min-h-screen flex flex-col grow mx-auto max-w-4xl justify-between">
      <Header/>

      <Home v-if="frontmatter.layout === 'home'"/>
      <Blog v-if="frontmatter.layout === 'blog'"/>

      <Content class="vp-doc mb-auto mt-6"/>


      <Footer/>
    </section>
  </main>
</template>
