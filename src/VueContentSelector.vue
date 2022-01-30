<template>
  <shadow-root>
    <section ref="styleDom"></section>
    <main>
      <Widget />
      <BlockProcessor
        :contentStyle="contentStyleInShadow"
        :isContentStyleShadow="isContentStyleShadow"
      >
        <slot> </slot>
      </BlockProcessor>
    </main>
  </shadow-root>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, provide } from "vue";
import Widget from "@/view/Widget/index.vue";
import BlockProcessor from "@/view/BlockProcessor/index.vue";
import type { StoreProvider } from "@/type";
import { positionSelector } from "@/service/PositionSelector";

interface Props {
  isContentStyleShadow?: boolean;
  contentStyleInShadow?: string;
  baseZIndex?: number;
}

const props = withDefaults(defineProps<Props>(), {
  isContentStyleShadow: false,
  contentStyle: "",
  baseZIndex: 10000,
});

const emits = defineEmits<{
  (e: "onHoverChanged", el: Element): void;
  (e: "onPositionSelected", el: Element): void;
  (e: "onCanceled"): void;
}>();

let tmpSaveSelectedElement: StoreProvider["blockConfig"]["selectedElement"] = null;

const storeProvider = reactive<StoreProvider>({
  baseZIndex: props.baseZIndex,
  blockConfig: {
    selectedElement: null,
    insertPosition: "bottom",
    align: "center",
    width: 100,
  },
  isPreviewChoosing: false,
  startPositionSelector(
    startCb: () => void = () => {},
    successCb: (el: Element) => void = () => {}
  ) {
    tmpSaveSelectedElement = this.blockConfig.selectedElement;
    this.isPreviewChoosing = true;
    this.blockConfig.selectedElement = null;

    positionSelector
      .setBaseZIndex(storeProvider.baseZIndex)
      .setOnSelectedHandler((el: HTMLElement) => {
        emits("onPositionSelected", el), successCb(el);
        this.isPreviewChoosing = false;
        this.blockConfig.selectedElement = el;
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
    this.blockConfig.selectedElement = tmpSaveSelectedElement;
    emits("onCanceled"), cancelCb();
  },
});

provide("storeProvider", storeProvider);

// inject style into shadow root
const styleDom = ref(null);
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
