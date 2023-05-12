<style scoped>

button.negative-margin {
  margin-right: -15px;
}

.hamburger {
  opacity: 1 !important;
}

.hamburger.is-active:hover {
  opacity: 1 !important;
}

</style>

<script>
export default {
  methods: {
    toggleMobileMenu() {
      // set the hamburger menu itself to active
      this.$refs["hamburger"].classList.toggle("is-active")

      // show the mobile-menu
      this.$refs["mobile-menu"].classList.toggle("hidden")
      this.$refs["mobile-menu"].classList.toggle("sm:flex")
    },
    closeMobileMenu() {
      // set the hamburger menu itself to inactive
      this.$refs["hamburger"].classList.remove("is-active")

      // hide the mobile-menu
      this.$refs["mobile-menu"].classList.remove("is-active")
      this.$refs["mobile-menu"].classList.add("hidden")
      this.$refs["mobile-menu"].classList.remove("sm:flex")
    }
  }
}

</script>

<template>
  <header class="flex flex-row my-6 md:my-9 items-center relative text-lg font-semibold">
    <a href="/" v-on:click="closeMobileMenu" class="mr-auto whitespace-nowrap hover:text-secondary">
      nils@orbat.sh:~$ <span class="text-secondary">_</span>
    </a>

    <nav class="flex self-end">
      <!-- mobile header -->
      <!-- https://github.com/jonsuh/hamburgers/issues/66#issuecomment-491905089 --->
      <button ref="hamburger" v-on:click="toggleMobileMenu"
              class="sm:!hidden negative-margin hamburger hamburger--3dxy !leading-none"
              type="button">
        <span class="hamburger-box !w-8 !block">
          <span class="hamburger-inner !w-8 before:!w-8 after:!w-8 !bg-font after:!bg-font before:!bg-font"></span>
        </span>
      </button>

    <!-- tablet and larger header -->
      <ul class="hidden sm:flex text-end gap-x-8">
        <li>
          <a class="hover:text-secondary" v-on:click="closeMobileMenu" href="/about/">about</a>
        </li>
        <li>
          <a class="hover:text-secondary" v-on:click="closeMobileMenu" href="/blog/">blog</a>
        </li>
      </ul>
    </nav>

    <!-- mobile menu -->
    <section ref="mobile-menu"
             class="!bg-primary flex flex-col absolute left-0 right-0 top-20 hidden transition-transform z-10">
      <ul class="flex flex-col text-end border-t">
        <a class="hover:text-secondary" v-on:click="toggleMobileMenu" href="/about/">
          <li class="ml-auto w-full py-6  border-b">
            about
          </li>
        </a>
        <a class="hover:text-secondary" v-on:click="toggleMobileMenu" href="/blog/">
          <li class="ml-auto w-full py-6 border-b">
            blog
          </li>
        </a>
      </ul>
      <div class="w-full h-3"></div>
    </section>

  </header>

</template>
