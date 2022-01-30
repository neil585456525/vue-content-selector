<template>
  <BlockBuilder
    v-if="storeInject.blockConfig.selectedElement"
    :blockConfig="storeInject.blockConfig"
    :isContentStyleShadow="isContentStyleShadow"
    @onBeforeContentBuilding="onBeforeContentBuilding"
    @onContentBuilded="onContentBuilded"
    @onContentBuildFaild="onContentBuildFaild"
  >
    <template #style>
      <section
        v-if="contentStyle"
        v-html="`<style type='text/css'>${contentStyle}</style>`"
      ></section>
    </template>
    <template #content>
      <slot>
        <div :style="noContentStyle">content block</div>
      </slot>
    </template>
  </BlockBuilder>
</template>

<script lang="ts" setup>
import { HtmlHTMLAttributes, inject } from "vue";
import BlockBuilder from "./BlockBuilder.vue";
import type { StoreProvider } from "@/type";

interface Props {
  isContentStyleShadow?: boolean;
  contentStyle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isContentStyleShadow: false,
  contentStyle: "",
});

let contentSectionDom: HTMLElement | null = null;

const storeInject = inject("storeProvider") as StoreProvider;

function onBeforeContentBuilding() {
  // remove old dom first
  if (contentSectionDom) contentSectionDom.remove();
}

function onContentBuilded(editSectionEl: HTMLElement) {
  editSectionEl.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
  contentSectionDom = editSectionEl;
}

function onContentBuildFaild() {
  console.error("onSelectFailed");
}

const noContentStyle: HtmlHTMLAttributes["style"] = {
  color: "gray",
  width: "100%",
  backgroundColor: "#ffe7af",
  textAlign: "center",
  fontSize: "22px",
  padding: "30px 0",
};
</script>
