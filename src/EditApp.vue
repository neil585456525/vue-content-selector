<template>
  <shadow-root>
    <section ref="styleDom"></section>
    <main>
      <Widget />
      <ContentProcessor />
      <transition name="fade">
        <div class="find-el-msg" v-if="isOnFindElLoading">正在找尋區塊... 注意：過久顯示內容將影響使用者體驗，建議選擇較快載入的區塊</div>
      </transition>
    </main>
  </shadow-root>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import Widget from '@/view/Widget.vue';
import ContentProcessor from '@/view/ContentProcessor.vue';
import { useMainStore } from '@/store';

const styleDom = ref(null);

const { isOnFindElLoading } = storeToRefs(useMainStore());

// 一開始先取區塊位置資料，並觸發渲染
onMounted(async () => {
  // 注入 style 進 shadow
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
