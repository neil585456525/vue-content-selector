<template>
  <section
    ref="dragWrapperRef"
    class="drag-container"
    :class="{
      'align-right': isAlignRight,
      'on-draging': isDraging,
    }"
    :style="{ left: xCss, top: yCss }"
  >
    <span ref="dragBtn" class="drag-btn" @mousedown="startDrag" @mouseup="endDrag">
      <font-awesome-icon icon="grip-vertical" />
    </span>
    <slot></slot>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, inject } from "vue";
import type { StoreProvider } from "@/type";

const storeInject = inject("storeProvider") as StoreProvider;

const baseZIndex = computed(() => storeInject.baseZIndex);

const dragWrapperRef = ref<HTMLElement | null>(null);
const dragBtn = ref<HTMLElement | null>(null);

// page left
const x = ref(0);
// page top
const y = ref(50);

const isDraging = ref(false);
const isAlignRight = ref(false);

const xCss = computed(() => (x.value !== -1 ? `${x.value.toString()}px` : "100%"));
const yCss = computed(() => `${y.value.toString()}px`);

function moveToMousePosition(event: MouseEvent) {
  if (!dragBtn.value) return;
  isDraging.value = true;
  const rect = dragBtn.value.getBoundingClientRect();
  const { clientX, clientY } = event;
  x.value = clientX - rect.width;
  y.value = clientY - rect.height;
}

function startDrag() {
  document.body.addEventListener("mousemove", moveToMousePosition);
}

function endDrag() {
  isDraging.value = false;

  document.body.removeEventListener("mousemove", moveToMousePosition);
  const { width: bodyWidth } = document.body.getBoundingClientRect();

  if (!dragWrapperRef.value) return;
  const { width: dragWrapperWidth } = dragWrapperRef.value.getBoundingClientRect();

  if (x.value + dragWrapperWidth / 2 < bodyWidth / 2) {
    // stick to left
    x.value = 0;
    isAlignRight.value = false;

    return;
  }
  // stick to right
  isAlignRight.value = true;
  x.value = bodyWidth;
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
