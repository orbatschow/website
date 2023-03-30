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

    <!-- mobile section -->
    <div class="flex flex-col m-auto md:hidden items-center">

      <div class="mb-12 image-size">
        <img src="./assets/profile.jpg" class="rounded-full border-2 border-secondary" alt="">
      </div>

      <div class="flex flex-col leading-10">

        <!-- set font size for mobile -->
        <div class="hero-info mb-12 text-center text-2xl font-semibold sm:hidden">
          Hi, I'm <span class="text-secondary">Nils</span>. I'm a Site Reliability Engineer and Open Source Enthusiast.
        </div>

        <!-- change font size for tablet -->
        <div class="hero-info mb-12 text-center text-3xl font-semibold hidden sm:block">
          Hi, I'm <span class="text-secondary">Nils</span>. I'm a Site Reliability Engineer and Open Source Enthusiast.
        </div>

        <div class="flex justify-center flex-row flex-wrap gap-14 text-2xl">
          <a href="https://github.com/orbatschow/" target="_blank"
             class="hero-contact flex flex-row items-center">
            <div v-html=icon(faGithub).html[0] />
          </a>
          <a href="https://keys.openpgp.org/search?q=EDE3+F6C5+CFCC+20A9+53FF++2E91+0F9E+4305+534A+2380" target="_blank"
             class="hero-contact flex flex-row items-center">
            <div v-html=icon(faKey).html[0] />
          </a>
          <a href="https://www.linkedin.com/in/nils-orbat/" target="_blank"
             class="hero-contact flex flex-row items-center">
            <div v-html=icon(faLinkedin).html[0] />
          </a>
        </div>
      </div>
    </div>

    <!-- tablet and larger hero section -->
    <div class="md:flex hidden items-center">

      <div class="mr-12 image-size">
        <img src="./assets/profile.jpg" class="rounded-full border-2 border-secondary" alt="">
      </div>

      <div class="flex flex-col leading-10">

        <div class="hero-info font-semibold text-3xl">Hi, I'm <span class="text-secondary">Nils</span>. I'm a Site Reliability Engineer and
          Open Source Enthusiast.
        </div>

        <div class="flex flex-row flex-wrap mt-8 gap-8 ">
          <a href="https://github.com/orbatschow/" target="_blank"
             class="hero-contact flex flex-row items-center gap-4 text-xl font-semibold">
             <div v-html=icon(faGithub).html[0] />
            <div>Github</div>
          </a>
          <a href="https://keys.openpgp.org/search?q=EDE3+F6C5+CFCC+20A9+53FF++2E91+0F9E+4305+534A+2380" target="_blank"
             class="hero-contact flex flex-row items-center gap-4 text-xl font-semibold">
            <div v-html=icon(faKey).html[0] />
            <div>OpenPGP</div>
          </a>
          <a href="https://www.linkedin.com/in/nils-orbat/" target="_blank"
             class="hero-contact flex flex-row items-center gap-4 text-xl font-semibold">
            <div v-html=icon(faLinkedin).html[0] />
            <div>LinkedIn</div>
          </a>
        </div>
      </div>

    </div>
  </section>

</template>

