<template>
  <section v-if="blockConfig.selector">
    <DynamicContent
      :blockConfig="blockConfig"
      @onSelecting="onSelecting"
      @selected="onSelected"
      @selectFailed="onSelectFailed"
    >
      <template #noContent>
        <div :style="noContentStyle">content block</div>
      </template>
    </DynamicContent>
  </section>
</template>

<script lang="ts" setup>
import { HtmlHTMLAttributes, ref } from 'vue';
import { storeToRefs } from 'pinia';
import DynamicContent from '@/components/DynamicContent/Index.vue';
import { useMainStore } from '@/store';

const contentSectionDom = ref<HTMLElement | null>(null);

const { blockConfig, isOnFindElLoading, isSelectElFalse } = storeToRefs(useMainStore());

function onSelecting() {
  // remove old dom first
  if (contentSectionDom.value) {
    contentSectionDom.value.remove();
  }
  isOnFindElLoading.value = true;
}

function onSelected(editSectionEl: HTMLDivElement) {
  isOnFindElLoading.value = false;
  isSelectElFalse.value = false;
  editSectionEl.scrollIntoView({
    behavior: 'smooth',
  });
  contentSectionDom.value = editSectionEl;
}

function onSelectFailed() {
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
