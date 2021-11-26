<template>
  <CButton class="collapse-btn" :class="{ active, primary: active }" icon="chevron-left"></CButton>
</template>

<script lang="ts" setup>
import CButton from '@/components/CButton.vue';

const props = defineProps<{
  active: boolean
}>()
</script>

<style lang="scss" scoped>
.collapse-btn {
  @include flex();
  padding: 0px 12px;
  height: 40px;
  border-radius: 0px 4px 4px 0px;
  box-shadow: 2px 2px 6px rgba(#000, 0.3);
  border: none;
  position: absolute;
  left: 100%;
  top: 10px;
  z-index: 10;
  :deep(svg) {
    transition: 0.2s;
    width: 10px;
  }
  &.active {
    :deep(svg) {
      transform: rotateY(180deg);
    }
  }
}
</style>