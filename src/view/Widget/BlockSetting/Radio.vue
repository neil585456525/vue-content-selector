<template>
  <div class="btn-item" :class="{ active: isActive }">
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

const props = defineProps({
  icon: String,
  text: String,
  isActive: Boolean
})

</script>

<style lang="scss" scoped>
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
    text-align: center;
    margin: 0;
    padding: 0;
  }
}
</style>