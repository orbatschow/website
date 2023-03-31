<style>

.not-found-error-font {
  font-family: 'Fira Code', monospace !important;
}

@media (min-width: 768px) {
  .not-found-error-font {
    font-size: 7rem;
  }
}

@media (max-width: 768px) {
  .not-found-error-font {
    font-size: 5rem;
  }
}

@media (min-width: 768px) {
  .not-found-error-svg {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 768px) {
  .not-found-error-svg {
    width: 60px;
    height: 60px;
  }
}

</style>

<script>

</script>

<template>

  <section class="flex flex-col grow justify-center gap-y-8 md:gap-y-12">

    <div class="flex gap-x-3 md:gap-x-5 justify-center">
      <div class="not-found-error-font my-auto">
        4
      </div>
      <inline-svg class="not-found-error-svg my-auto"
                  src="/death-star.svg"
                  fill="#fffff5db"
                  aria-label="My image"
      ></inline-svg>

      <div class="not-found-error-font my-auto">
        4
      </div>
    </div>

    <div class="sm:2xl md:text-3xl text-center">That's no moon, <br/> head back to <a
        class="text-secondary hover:opacity-70 transition" href="javascript:history.go(-1)">safety</a>.
    </div>

  </section>


</template>
