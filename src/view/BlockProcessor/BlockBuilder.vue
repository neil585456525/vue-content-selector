<template>
  <teleport v-if="contentSectionDom" :to="contentSectionDom">
    <!-- <shadow-root> -->
    <section style="width: 100%; all: initial">
      <div class="wrapper-container" :style="containerStyle">
        <div :style="{ width: widthCss }">
          <div v-if="content" v-html="content"></div>
          <slot v-else name="noContent"></slot>
        </div>
      </div>
    </section>
    <!-- </shadow-root> -->
  </teleport>
</template>

<script lang="ts" setup>
import { ref, computed, watch, HtmlHTMLAttributes } from "vue";
import { useMediaQuery } from "@vueuse/core";
import type { BlockConfig } from "@/type";

const props = defineProps<{
  blockConfig: BlockConfig;
  content?: string;
}>();

const emit = defineEmits<{
  (e: "onBeforeContentBuilding"): void;
  (e: "onContentBuilded", el: HTMLElement): void;
  (e: "onContentBuildFaild"): void;
}>();

const contentSectionDom = ref<HTMLElement | null>(null);

const initSection = () => {
  function addContentSection(
    selector: string,
    insertPosition: "top" | "bottom" = "top"
  ): HTMLElement {
    let targetEl = document.querySelector(selector);
    if (!targetEl) {
      throw new Error("cant get el by selector");
    }
    const el = document.createElement("div");
    if (insertPosition === "bottom") {
      targetEl.after(el);
      return el;
    }
    targetEl.before(el);
    return el;
  }

  try {
    emit("onBeforeContentBuilding");
    const contentSectionEl = addContentSection(
      props.blockConfig.selector,
      props.blockConfig.insertPosition
    );
    contentSectionDom.value = contentSectionEl;
    emit("onContentBuilded", contentSectionEl);
  } catch (err) {
    contentSectionDom.value = null;
    emit("onContentBuildFaild");
    console.log(err);
  }
};

initSection();

watch(
  () => props.blockConfig.insertPosition,
  () => {
    if (!contentSectionDom.value) return;
    contentSectionDom.value.remove();
    initSection();
  }
);

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
</script>
