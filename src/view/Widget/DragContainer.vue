<template>
  <section
    ref="dragWrapperRef"
    class="drag-container"
    :class="{
      'align-right': isAlignRight,
      'on-draging': isDraging
    }"
    :style="{ left: xCss, top: yCss }"
  >
    <span class="drag-btn" @mousedown="startDrag" @mouseup="endDrag">
      <font-awesome-icon icon="grip-vertical" />
    </span>
    <slot></slot>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { baseZIndex } from '@/config';

const dragWrapperRef = ref<HTMLElement | null>(null);

// page left
const x = ref(0);
// page top
const y = ref(50);

const isDraging = ref(false);
const isAlignRight = ref(false);

// const views = reactive({
//   isAlignRight: false,
//   alignRightEnd: false,
// });

const xCss = computed(() => (x.value !== -1 ? `${x.value.toString()}px` : '100%'));
const yCss = computed(() => `${y.value.toString()}px`);

let ElWidth = 180;

function moveEl(event: MouseEvent) {
  isAlignRight.value = false;
  const { clientX, clientY } = event;
  x.value = clientX - 20;
  y.value = clientY - 20;
}

function startDrag() {
  document.body.addEventListener('mousemove', moveEl);
  // ensure the element width and set interact scope
  isDraging.value = true;
  if (dragWrapperRef.value) {
    const { width } = dragWrapperRef.value.getBoundingClientRect();
    ElWidth = width;
  }
}

function endDrag() {
  document.body.removeEventListener('mousemove', moveEl);
  const { width: bodyWidth } = document.body.getBoundingClientRect();
  if (x.value + ElWidth / 2 < bodyWidth / 2) {
    // stick to left
    x.value = 0;
    isAlignRight.value = false;
    isDraging.value = false;
    return;
  }
  // stick to right
  isAlignRight.value = true;
  isDraging.value = false;
  x.value = bodyWidth;
  // x.value = -1;
}
</script>

<style lang="scss">
.drag-container {
  position: fixed;
  z-index: v-bind(baseZIndex);
  &.align-right {
    &:not(.on-draging) {
      transform: translateX(-100%);
    }
    .toolEl {
      box-shadow: -2px 2px 6px rgba(#000, 0.3);
    }
  }

  .drag-btn {
    cursor: grab;
    background-color: transparent;
    color: #bbb;
    border: none;
    position: absolute;
    left: 0;
    top: 0;
    padding: 5px 5px 5px 10px;
    margin: 10px;
    z-index: 1;
    svg {
      width: 10px;
    }
  }
}
</style>
