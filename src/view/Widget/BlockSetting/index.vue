<template>
  <main>
    <section class="select-setting mt-2">
      <Radio
        style="width: 30%;"
        icon="arrow-up"
        text="insert before"
        :is-active="blockConfig.insertPosition === 'top'"
        @click="store.blockConfig.insertPosition = 'top'"
      />
      <Radio
        style="width: 30%;"
        icon="arrow-up"
        text="insert before"
        :is-active="blockConfig.insertPosition === 'top'"
        @click="store.blockConfig.insertPosition = 'top'"
      />
      <Radio
        style="width: 30%;"
        icon="arrow-down"
        text="insert after"
        :is-active="blockConfig.insertPosition === 'bottom'"
        @click="store.blockConfig.insertPosition = 'bottom'"
      />
    </section>
    <hr class="mt-2" />
    <h3 class="mt-1 mb-1" style="text-align: center;">computer layout</h3>
    <section class="mt-2 slider mb-3">
      block width
      <label>
        <input type="range" v-model="store.blockConfig.width" numbers step="1" min="10" max="100" />
        <span style="font-size: 10px;">{{ blockConfig.width }}%</span>
      </label>
    </section>
    <select class="btn" style="width: 100%;" v-model="store.blockConfig.align">
      <option v-for=" item in alignOptions" :key="item.name" :value="item.value">{{ item.name }}</option>
    </select>
  </main>
</template>

<script lang="ts" setup>
import Radio from './Radio.vue'

import { storeToRefs } from 'pinia';
import { useMainStore } from '@/store';

type SelectModel = { name: string; value: 'start' | 'center' | 'end'; }

const store = useMainStore();
const { blockConfig } = storeToRefs(store);

const alignOptions: SelectModel[] = [{ name: 'left', value: 'start' }, { name: 'center', value: 'center' }, { name: 'right', value: 'end' }];
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
}
</style>
