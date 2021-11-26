<template>
  <DynamicContent
    v-if="blockConfig.selector"
    :blockConfig="blockConfig"
    @onBeforeContentBuilding="onBeforeContentBuilding"
    @onContentBuilded="onContentBuilded"
    @onContentBuildFaild="onContentBuildFaild"
  >
    <template #noContent>
      <div :style="noContentStyle">content block</div>
    </template>
  </DynamicContent>
</template>

<script lang="ts" setup>
import { HtmlHTMLAttributes } from 'vue';
import { storeToRefs } from 'pinia';
import DynamicContent from './BlockBuilder.vue';
import { useMainStore } from '@/store';

let contentSectionDom: HTMLElement | null = null;

const { blockConfig } = storeToRefs(useMainStore());

function onBeforeContentBuilding() {
  // remove old dom first
  if (contentSectionDom) contentSectionDom.remove();
}

function onContentBuilded(editSectionEl: HTMLElement) {
  editSectionEl.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
  contentSectionDom = editSectionEl;
}

function onContentBuildFaild() {
  alert('onSelectFailed');
}

const noContentStyle: HtmlHTMLAttributes['style'] = {
  color: 'gray',
  width: '100%',
  backgroundColor: '#ffe7af',
  textAlign: 'center',
  fontSize: '22px',
  padding: '30px 0'
};
</script>
