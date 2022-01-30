<template>
  <shadow-root>
    <section ref="styleDom"></section>
    <main>
      <Widget />
      <BlockProcessor />
    </main>
  </shadow-root>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, computed, provide } from "vue";
import Widget from "@/view/Widget/index.vue";
import BlockProcessor from "@/view/BlockProcessor/index.vue";
import type { StoreProvider } from "@/type";
import getCssSelector from "css-selector-generator";
import { positionSelector } from "@/service/PositionSelector";

const styleDom = ref(null);

interface Props {
  isContentStyleShadow?: boolean;
  contentStyle?: string;
  baseZIndex?: number;
}

const props = withDefaults(defineProps<Props>(), {
  isContentStyleShadow: true,
  baseZIndex: 10000,
});

const baseZIndex = computed(() => props.baseZIndex);

const emits = defineEmits<{
  (e: "onHoverChanged", el: Element): void;
  (e: "onPositionSelected", el: Element): void;
  (e: "onCanceled"): void;
}>();

let tmpSaveSelector = "";

const storeProvider = reactive<StoreProvider>({
  baseZIndex: props.baseZIndex,
  blockConfig: {
    selector: "",
    insertPosition: "bottom",
    align: "center",
    width: 100,
  },
  isPreviewChoosing: false,
  isShowSectionBg: false,
  startPositionSelector(
    startCb: () => void = () => {},
    successCb: (el: Element) => void = () => {}
  ) {
    tmpSaveSelector = this.blockConfig.selector;
    this.isPreviewChoosing = true;
    this.blockConfig.selector = "";

    positionSelector.baseZIndex = storeProvider.baseZIndex;
    positionSelector
      .setOnSelectedHandler((el: HTMLElement) => {
        emits("onPositionSelected", el), successCb(el);
        this.isPreviewChoosing = false;
        const newSelector = getCssSelector(el, { blacklist: [/src/] });
        if (newSelector) {
          this.blockConfig.selector = newSelector;
        }
      })
      .setOnHoverChangedHandler((el) => {
        emits("onHoverChanged", el);
      })
      .setInsertPosition(this.blockConfig.insertPosition)
      .startSelector();

    startCb();
  },
  cancelPositionSelector(cancelCb: () => void) {
    this.isPreviewChoosing = false;
    positionSelector.stopSelector();
    this.blockConfig.selector = tmpSaveSelector;
    emits("onCanceled"), cancelCb();
  },
});

provide("storeProvider", storeProvider);

// inject style into shadow root
onMounted(() => {
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
  z-index: v-bind(baseZIndex);
  color: white;
  padding: 5px;
  border-radius: 5px;
  background-color: #5a62b3;
  transition-delay: 1s;
}
</style>
