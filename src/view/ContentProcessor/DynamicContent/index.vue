<template>
  <teleport v-if="contentSectionDom" :to="contentSectionDom">
    <shadow-root>
      <section style="width: 100%;all: initial">
        <div class="wrapper-container" :style="containerStyle">
          <div :style="{ width: widthCss }">
            <!-- 這裡給別人注入內容 -->
            <slot name="noContent"></slot>
          </div>
        </div>
      </section>
    </shadow-root>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, computed, watch, HtmlHTMLAttributes } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { addContentSection } from './ContentWrapperBuilder';
import type { BlockConfig } from '@/type';

const props = defineProps<{
  blockConfig: BlockConfig
}>();

const emit = defineEmits<{
  (e: 'onContentBuilding'): void,
  (e: 'onContentBuilded', el: HTMLElement): void,
  (e: 'onContentBuildFaild'): void
}>();

const contentSectionDom = ref<HTMLElement | null>(null);

async function initSection() {
  try {
    emit('onContentBuilding');
    const contentSectionEl = await addContentSection(
      props.blockConfig.selector,
      props.blockConfig.insertPosition
    );
    contentSectionDom.value = contentSectionEl;
    emit('onContentBuilded', contentSectionEl);
  } catch (err) {
    contentSectionDom.value = null;
    emit('onContentBuildFaild');
    console.log(err);
    console.log('error');
  }
}

initSection();

// 因為上下不會重新渲染整個組件，所以需要利用 watch 去觸發重渲染
watch(() => props.blockConfig.insertPosition, () => {
  if (!contentSectionDom.value) return;
  contentSectionDom.value.remove();
  initSection();
});

/**
     * style config
     */
const alignCss = computed(() => {
  const alignName = {
    start: 'flex-start', center: 'center', end: 'flex-end'
  };
  return alignName[props.blockConfig.align] || 'center';
});

const containerStyle = computed<HtmlHTMLAttributes['style']>(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  border: '2px gray dashed',
  alignItems: alignCss.value,
}));


const widthCss = computed(() => {
  if (useMediaQuery('(max-width: 550px)').value) return '100%';
  return `${props.blockConfig.width || 80}%`;
});
</script>
