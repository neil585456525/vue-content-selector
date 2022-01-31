<template>
  <teleport v-if="contentSectionDom" :to="contentSectionDom">
    <component :is="isContentStyleShadow ? 'shadow-root' : 'div'">
      <slot name="style"></slot>
      <section style="width: 100%; all: initial">
        <div class="wrapper-container" :style="containerStyle">
          <div :style="{ width: widthCss }">
            <slot name="content"></slot>
          </div>
        </div>
      </section>
    </component>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, computed, watch, HtmlHTMLAttributes } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { insertElementByPosition } from "@/service/PositionSelector";
import type { BlockConfig } from "@/type";

const props = defineProps<{
  blockConfig: BlockConfig;
  isContentStyleShadow?: boolean;
}>();

const emit = defineEmits<{
  (e: "onBeforeContentBuilding"): void;
  (e: "onContentBuilded", el: Element): void;
  (e: "onContentBuildFaild"): void;
}>();

const contentSectionDom = ref<Element | null>(null);

const initSection = () => {
  if (!props.blockConfig.selectedElement) throw new Error("no selectedElement");

  try {
    emit("onBeforeContentBuilding");
    contentSectionDom.value = insertElementByPosition(
      props.blockConfig.selectedElement,
      props.blockConfig.insertPosition
    );
    emit("onContentBuilded", contentSectionDom.value);
  } catch (err) {
    contentSectionDom.value = null;
    emit("onContentBuildFaild");
    console.log(err);
  }
};

initSection();

/**
 * style config
 */
const alignCss = computed(() => {
  const alignName = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
  };
  return alignName[props.blockConfig.align] || "center";
});

const containerStyle = computed<HtmlHTMLAttributes["style"]>(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  border: "2px gray dashed",
  alignItems: alignCss.value,
}));

const widthCss = computed(() => {
  if (useMediaQuery("(max-width: 550px)").value) return "100%";
  return `${props.blockConfig.width || 80}%`;
});

/**
 * ? has ploblem
 * Every props-causing re-render should build a new contentSectionDom to avoid lifecycle unMounted error.
 * It's need to watch both insertPosition and width.
 */

watch(
  () => [props.blockConfig.insertPosition, widthCss.value],
  () => {
    if (!contentSectionDom.value) return;
    contentSectionDom.value.remove();
    initSection();
  }
);
</script>
