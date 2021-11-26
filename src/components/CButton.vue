<template>
  <button :class="{ primary, secondary }" :disabled="isDisabled">
    <font-awesome-icon
      v-if="alignIcon === 'start'"
      :class="{ 'mr-1': hasDefaultSlot }"
      :icon="loading ? 'spinner' : icon"
    />
    <slot></slot>
    <font-awesome-icon
      v-if="alignIcon === 'end'"
      :class="{ 'ml-1': hasDefaultSlot }"
      :icon="loading ? 'spinner' : icon"
    />
  </button>
</template>

<script lang="ts" setup>

import { useSlots, computed } from 'vue';

const props = withDefaults(defineProps<
  {
    primary?: boolean;
    secondary?: boolean;
    icon?: string;
    alignIcon?: 'start' | 'end'
    loading?: boolean;
    isDisabled?: boolean;
  }>(), {
  isDisabled: false,
  alignIcon: 'start'
})

const slots = useSlots();

const hasDefaultSlot = computed(() => slots.default ? true : false)

</script>

<style lang="scss" scoped>
button {
  @include flex();
  // display: inline-block;
  line-height: 1;
  min-height: 40px;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: none;
  border: 1px solid $border;
  color: $text;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 8px 16px;
  font-size: 12px;
  border-radius: 4px;
  &:hover {
    background-color: darken(#fff, 10);
  }
  svg {
    width: 12px;
  }

  &.primary {
    background-color: $primary;
    border-color: $primary;
    color: #fff;
    &:hover {
      background-color: darken($primary, 10);
    }
  }
  &.secondary {
    background-color: $orange;
    border-color: $orange;
    color: #fff;
    &:hover {
      background-color: darken($orange, 10);
    }
  }

  &:disabled {
    background-color: #eee;
    border-color: #eee;
    color: #000;
    cursor: not-allowed;
  }
}
</style>