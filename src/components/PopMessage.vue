<template>
  <p class="pop-msg" :class="{ 'active': show }">{{ msg }}</p>
</template>

<script lang="ts" setup>
import { watch } from 'vue';

const props = defineProps({
  msg: {
    type: String,
    require: true,
  },
  show: {
    type: Boolean,
    require: true,
  }
});

const emit = defineEmits(['reset']);

watch(
  () => props.show,
  (val, prevVal) => {
    if (val) {
      setTimeout(() => {
        emit('reset', prevVal);
      }, 500);
    }
  }
);
</script>

<style lang="scss">
@keyframes showPop {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
}
.pop-msg {
  position: fixed;
  padding: 20px;
  background-color: $blue;
  background-color: lighten($green, 30);
  color: darken($green, 10);
  font-size: 16px;
  right: 0;
  bottom: 50px;
  box-shadow: -3px 2px 6px rgba(#000, 0.2);
  border-radius: 4px 0px 0px 4px;
  text-align: center;
  min-width: 150px;
  // animation: showPop 1s 3s ease-in-out;
  transform: translateX(100%);
  z-index: -1;
  opacity: 0;
  transition: 1s 0.5s ease-in-out;
  &.active {
    opacity: 1;
    z-index: 1;
    transform: translateX(0%);
    transition: 0.3s ease-in-out;
  }
}
</style>
