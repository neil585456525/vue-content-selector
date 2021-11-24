<template>
  <main>
    <section class="select-setting mt-2">
      <div class="btn-item" :class="{ active: blockConfig.insertPosition === 'top' }">
        <label class="radio-wrapper">
          <input type="radio" value="top" @click="store.blockConfig.insertPosition = 'top'" />
          <span>
            <font-awesome-icon icon="arrow-up" />
          </span>
          <p>向上插入</p>
        </label>
      </div>
      <div class="btn-item" :class="{ active: blockConfig.insertPosition === 'bottom' }">
        <label class="radio-wrapper">
          <input type="radio" value="bottom" @click="store.blockConfig.insertPosition = 'bottom'" />
          <span>
            <font-awesome-icon icon="arrow-down" />
          </span>
          <p>向下插入</p>
        </label>
      </div>
    </section>
    <hr />
    <div class="mt-1 mb-1" style="text-align: center;">電腦版版面設定</div>
    <section class="mt-2">
      <div>區塊寬度</div>
      <input
        type="range"
        class="mb-3 mt-1"
        v-model="store.blockConfig.width"
        numbers
        step="1"
        min="10"
        max="100"
      />
    </section>
    <select style="width: 100%;" v-model="store.blockConfig.align">
      <option v-for=" item in alignOptions" :key="item.name" :value="item.value">{{ item.name }}</option>
    </select>
  </main>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/store';

type SelectModel = { name: string; value: 'start' | 'center' | 'end'; }

const store = useMainStore();
const { blockConfig } = storeToRefs(store);

const alignOptions: SelectModel[] = [{ name: '置左', value: 'start' }, { name: '置中', value: 'center' }, { name: '置右', value: 'end' }];
</script>

<style lang="scss" scoped>
.select-setting {
  // max-height: 50px;
  border: 1px solid rgb(219, 217, 217);
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  transition: 0.3s ease-in-out;
  .btn-item {
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
    .radio-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      input {
        visibility: hidden;
      }
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
    svg {
      width: 14px;
    }
    p {
      margin: 0;
      padding: 0;
    }
  }
}
</style>
