<template>
  <shadow-root>
    <section ref="styleDom"></section>
    <main>
      <Widget />
      <ContentProcessor />
      <transition name="fade">
        <div class="find-el-msg" v-if="isOnFindElLoading">trying to find element by selector...</div>
      </transition>
    </main>
  </shadow-root>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import Widget from '@/view/Widget/index.vue';
import ContentProcessor from '@/view/ContentProcessor/index.vue';
import { useMainStore } from '@/store';

const styleDom = ref(null);

const { isOnFindElLoading } = storeToRefs(useMainStore());

onMounted(async () => {
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
