<style scoped>
a.hero-contact:hover {
  color: #ffd900;
}

div.image-size {
  width: 10rem;
  min-width: 10rem;
}

</style>

<script>


import {icon} from "@fortawesome/fontawesome-svg-core";
import {faGithub} from "@fortawesome/free-brands-svg-icons"
import {faLinkedin} from "@fortawesome/free-brands-svg-icons"
import {faKey} from "@fortawesome/free-solid-svg-icons"
import {defineComponent} from "vue";

export default defineComponent({
  data() {
    return {
      faGithub: faGithub,
      faLinkedin: faLinkedin,
      faKey: faKey
    }
  },
  methods: {
    icon: icon
  }
})


</script>

<template>

  <section class="flex flex-row grow my-8">

    <div class="flex flex-col md:flex-row m-auto items-center">

      <div class="mb-12 md:mb-0 md:mr-12 image-size">
        <img src="./assets/profile.jpg" class="rounded-full border-2 border-secondary" alt="">
      </div>

      <div class="flex flex-col leading-10 gap-y-12 md:gap-y-8">

        <div class="hero-info text-center md:text-left text-2xl sm:text-3xl font-semibold">
          Hi, I'm <span class="text-secondary">Nils</span>. I'm a Site Reliability Engineer and Open Source Enthusiast.
        </div>

        <div class="flex flex-row justify-center md:justify-start flex-wrap gap-14 md:gap-8 text-2xl md:text-xl">
          <a href="https://github.com/orbatschow/" target="_blank"
             class="hero-contact flex flex-row items-center gap-4 font-semibold">
            <div v-html=icon(faGithub).html[0]></div>
            <div class="hidden md:block">Github</div>
          </a>
          <a href="https://keys.openpgp.org/search?q=EDE3+F6C5+CFCC+20A9+53FF++2E91+0F9E+4305+534A+2380" target="_blank"
             class="hero-contact flex flex-row items-center gap-4 font-semibold">
            <div v-html=icon(faKey).html[0]></div>
            <div class="hidden md:block">OpenPGP</div>
          </a>
          <a href="https://www.linkedin.com/in/nils-orbat/" target="_blank"
             class="hero-contact flex flex-row items-center gap-4 font-semibold">
            <div v-html=icon(faLinkedin).html[0]></div>
            <div class="hidden md:block">LinkedIn</div>
          </a>
        </div>

      </div>

    </div>

  </section>

</template>

