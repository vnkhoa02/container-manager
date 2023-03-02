<template>
  <div style="display: flex; justify-content: center; align-items: center; flex-direction: column">
    <div style="margin-top: 20px">
      <img
          src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
          alt="not-found"
      />
    </div>
    <RouterLink to="/">
      <div
          style="padding: 20px; background-color: lightgreen; font-size: large; width: fit-content; color: black; border-radius: 4px">
        Go Home
      </div>
    </RouterLink>
  </div>
</template>

<script>
export default {
  name: "PageNotFound"
}
</script>

<style scoped>

</style>
