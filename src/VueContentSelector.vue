<template>
  <shadow-root>
    <section ref="styleDom"></section>
    <main>
      456465
      <Widget />
      <BlockProcessor />
    </main>
  </shadow-root>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Widget from "@/view/Widget/index.vue";
import BlockProcessor from "@/view/BlockProcessor/index.vue";

const styleDom = ref(null);

onMounted(() => {
  // inject style into shadow root
  window.dottaShadowStyleObj.loadStyles(styleDom.value);
});
</script>

<style lang="scss">
@import "~@/assets/scss/main.scss";
</style>

<style lang="scss" scoped>
.find-el-msg {
  position: fixed;
  top: 15vh;
  left: 20vw;
  z-index: 99999999;
  color: white;
  padding: 5px;
  border-radius: 5px;
  background-color: #5a62b3;
  transition-delay: 1s;
}
</style>
