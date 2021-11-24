<template>
  <section
    ref="dragWrapperRef"
    class="drag-container"
    :class="{
      'align-right': views.isAlignRight,
      'align-right-end': views.alignRightEnd,
    }"
    :style="{ left: xCss, top: yCss }"
  >
    <!-- 拖曳按鈕 -->
    <span class="drag-btn" @mousedown="startDrag" @mouseup="endDrag">
      <font-awesome-icon icon="grip-vertical" />
    </span>
    <!-- <it-icon name="drag_indicator" class="drag-btn" @mousedown="startDrag" @mouseup="endDrag" /> -->
    <slot></slot>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { baseZIndex } from '../config';

const dragWrapperRef = ref<HTMLElement | null>(null);

// 距離頁面左
const x = ref(0);
// 距離頁面上
const y = ref(50);
const views = {
  isAlignRight: false,
  alignRightEnd: false,
};

const xCss = computed(() => (x.value !== -1 ? `${x.value.toString()}px` : '100%'));
const yCss = computed(() => `${y.value.toString()}px`);

let ElWidth = 180;

function moveEl(event: MouseEvent) {
  views.alignRightEnd = false;
  const { clientX, clientY } = event;
  x.value = clientX - 10;
  y.value = clientY - 10;
}

function startDrag() {
  document.body.addEventListener('mousemove', moveEl);
  // 確認元件寬度，避免游標對不到
  if (dragWrapperRef.value) {
    const { width } = dragWrapperRef.value.getBoundingClientRect();
    ElWidth = width;
  }
}

function endDrag() {
  document.body.removeEventListener('mousemove', moveEl);
  const { width: bodyWidth } = document.body.getBoundingClientRect();
  if (x.value + ElWidth / 2 < bodyWidth / 2) {
    // 黏到左邊
    x.value = 0;
    views.isAlignRight = false;
    views.alignRightEnd = false;
    return;
  }
  // 黏到右邊
  views.isAlignRight = true;
  views.alignRightEnd = true;
  x.value = bodyWidth;
  // x.value = -1;
}
</script>

<style lang="scss">
.drag-container {
  position: fixed;
  z-index: v-bind(baseZIndex);
  &.align-right {
    &.align-right-end {
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
    padding: 20px 10px 10px 15px;
    z-index: 1;
    svg {
      width: 10px;
    }
  }
}
</style>
