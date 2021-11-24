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
import { ref, PropType, computed, watch, HtmlHTMLAttributes } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { addContentSection } from './ContentWrapperBuilder';
import type { BlockConfig } from '@/type';

const props = defineProps({
  blockConfig: {
    type: Object as PropType<BlockConfig>,
    required: true
  }
});

const emit = defineEmits(['onSelecting', 'selected', 'selectFailed']);

const contentSectionDom = ref<HTMLElement | null>(null);
const selector = computed(() => props.blockConfig.selector);
const insertPosition = computed(() => props.blockConfig.insertPosition);

async function initSection() {
  try {
    emit('onSelecting');
    const contentSectionEl = await addContentSection(
      selector.value,
      insertPosition.value
    );
    contentSectionDom.value = contentSectionEl;
    emit('selected', contentSectionEl);
    console.log('selected');
  } catch (err) {
    contentSectionDom.value = null;
    emit('selectFailed');
    console.log(err);
    console.log('error');
  }
}
initSection();

// 因為上下不會重新渲染整個組件，所以需要利用 watch 去觸發重渲染
watch(() => insertPosition.value, () => {
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
  alignItems: alignCss.value
}));

const isMobileWidth = useMediaQuery('(max-width: 550px)');

const widthCss = computed(() => {
  if (isMobileWidth.value) return '100%';
  return `${props.blockConfig.width || 80}%`;
});
</script>
