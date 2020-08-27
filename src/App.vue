<template>
  <div id="app">
    <poker/>
  </div>
</template>

<script>


import Poker from "./components/poker";
export default {
  name: 'App',
  components: {Poker}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
