<style scoped>
div.description {
  -webkit-line-clamp: 3;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
}
</style>

<script >

import { data as articles } from './articles.data.js'

export default {
  data(){
    return {
      articles: articles
    }
  },
}

</script>

<template>

  <section class="flex flex-col mb-auto mt-6">
    <div v-for="(article, index) in articles" :key="index">
      <a :href="article.url" class="block font-semibold text-2xl text-secondary">
     {{ article.frontmatter.title }}
        </a>
      <a :href="article.url" class="block py-4 text-xl text-secondary opacity-60 description">
        {{ article.frontmatter.date }} • {{ article.frontmatter.tags }}
      </a>
      <div class="mb-20 text-lg description">{{ article.frontmatter.description }}</div>
    </div>
  </section>

</template>
