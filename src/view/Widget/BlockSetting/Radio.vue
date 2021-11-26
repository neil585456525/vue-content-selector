<template>
  <div class="radio-item" :class="{ active: isActive }">
    <label class="radio-wrapper">
      <input type="radio" />
      <span>
        <font-awesome-icon :icon="icon" />
      </span>
      <p>{{ text }}</p>
    </label>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  icon: String,
  text: String,
  isActive: Boolean
}>()

</script>

<style lang="scss" scoped>
.radio-item {
  font-size: 14px;
  padding: 3px 3px;
  margin: 5px 5px;
  transition: 0.2s;
  border: 1px solid rgb(219, 217, 217);
  border-radius: 3px;
  &.active {
    background-color: rgb(214, 214, 214);
  }
  &:hover {
    background-color: #eee;
  }
  span {
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 5px;
    &::after {
      content: "";
      position: absolute;
      display: inline-block;
      height: 2px;
      width: 16px;
      background-color: $template-r;
      bottom: 0;
    }
  }
}
.radio-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  input {
    visibility: hidden;
  }
  svg {
    width: 14px;
  }
  p {
    /* force every word to wrap */
    word-spacing: 100vw;
    word-break: keep-all;
    text-align: center;
    margin: 0;
    padding: 0;
  }
}
</style>