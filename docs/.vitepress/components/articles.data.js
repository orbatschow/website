import { createContentLoader } from 'vitepress'

export default createContentLoader('blog/*/index.md', {
    transform: function (articles) {
        // sort the articles by date
        let sorted = articles.sort((a, b) => {
            return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        })

        // remove index from url path
        return sorted.map(function (article) {
            article.url = article.url.replace('index','');
            return article
        })
    }
})


