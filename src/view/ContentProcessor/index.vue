<template>
  <DynamicContent
    v-if="blockConfig.selector"
    :blockConfig="blockConfig"
    @onContentBuilding="onContentBuilding"
    @onContentBuilded="onContentBuilded"
    @onContentBuildFaild="onContentBuildFaild"
  >
    <template #noContent>
      <div :style="noContentStyle">content block</div>
    </template>
  </DynamicContent>
</template>

<script lang="ts" setup>
import { HtmlHTMLAttributes, ref } from 'vue';
import { storeToRefs } from 'pinia';
import DynamicContent from './DynamicContent/index.vue';
import { useMainStore } from '@/store';

const contentSectionDom = ref<HTMLElement | null>(null);

const { blockConfig, isOnFindElLoading, isSelectElFalse } = storeToRefs(useMainStore());

function onContentBuilding() {
  // remove old dom first
  if (contentSectionDom.value) {
    contentSectionDom.value.remove();
  }
  isOnFindElLoading.value = true;
}

function onContentBuilded(editSectionEl: HTMLElement) {
  isOnFindElLoading.value = false;
  isSelectElFalse.value = false;
  editSectionEl.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
  contentSectionDom.value = editSectionEl;
}

function onContentBuildFaild() {
  isOnFindElLoading.value = false;
  isSelectElFalse.value = true;
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
