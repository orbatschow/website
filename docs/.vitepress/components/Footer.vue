<template>

  <!-- smartphone -->
  <footer class="flex flex-row my-9 justify-between font-semibold text-lg flex sm:hidden">
    <div>
      <span class="block mb-2">© {{ new Date().getFullYear() }}</span>
      <span class="bl">Nils Orbat</span>
    </div>
    <div class="flex flex-col text-right">
      <a class="hover:text-secondary mb-2" href="/legal/">Legal</a>
      <a class="hover:text-secondary" href="/privacy-policy/">Privacy Policy</a>
    </div>
  </footer>

  <!-- tablet and bigger -->
  <footer class="flex flex-row my-9 justify-between font-semibold text-lg hidden sm:flex">
    <span>© {{ new Date().getFullYear() }} • Nils Orbat</span>
    <div>
      <a class="hover:text-secondary" href="/legal/">Legal</a> •
      <a class="hover:text-secondary" href="/privacy-policy/">Privacy Policy</a>
    </div>
  </footer>

</template>
