<template>

  <footer class="flex flex-row my-9 justify-between font-semibold text-lg flex">
    <div class="flex flex-col sm:flex-row">
      <span class="mb-2">© {{ new Date().getFullYear() }}</span>
      <span class="hidden sm:inline">&nbsp;•&nbsp;</span>
      <span>Nils Orbat</span>
    </div>
    <div class="flex flex-col sm:flex-row text-right">
      <a class="hover:text-secondary mb-2" href="/legal/">Legal</a>
      <span class="hidden sm:inline">&nbsp;•&nbsp;</span>
      <a class="hover:text-secondary" href="/privacy-policy/">Privacy Policy</a>
    </div>
  </footer>

</template>
