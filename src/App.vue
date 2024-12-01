<template>
  <router-view />
</template>
<script>
export default {
    created() {
    if (localStorage.getItem('AoutoLogin') === 'yes') {
    this.$router.push('/home')
     }
    },
}
</script>
<style>
@import url("https:fonts.googleapis.com/css2?family=Delius+Swash+Caps&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
* {
  background-color: #9fb1bc;
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
</style>