<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <vue-content-selector
      @onPositionChanged="log('onPositionChanged')"
      @onPositionSelected="log('onPositionSelected')"
      @onCanceled="log('onCanceled')"
    />
  </div>
</template>

<script setup>
import HelloWorld from "./components/HelloWorld.vue";

const log = (msg) => console.log(msg);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
