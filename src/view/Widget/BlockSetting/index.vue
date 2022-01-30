<template>
  <main>
    <section class="select-setting mt-2">
      <Radio
        style="width: 45%"
        icon="arrow-up"
        text="insert before"
        :is-active="storeInject.blockConfig.insertPosition === 'top'"
        @click="storeInject.blockConfig.insertPosition = 'top'"
      />
      <Radio
        style="width: 45%"
        icon="arrow-down"
        text="insert after"
        :is-active="storeInject.blockConfig.insertPosition === 'bottom'"
        @click="storeInject.blockConfig.insertPosition = 'bottom'"
      />
    </section>
    <hr class="mt-2" />
    <h3 class="mt-1 mb-1" style="text-align: center">computer layout</h3>
    <section class="mt-2 slider mb-3">
      block width
      <label>
        <input
          type="range"
          v-model="storeInject.blockConfig.width"
          numbers
          step="1"
          min="10"
          max="100"
        />
        <span style="font-size: 10px">{{ storeInject.blockConfig.width }}%</span>
      </label>
    </section>
    <select class="btn" style="width: 100%" v-model="storeInject.blockConfig.align">
      <option v-for="item in alignOptions" :key="item.name" :value="item.value">
        {{ item.name }}
      </option>
    </select>
  </main>
</template>

<script lang="ts" setup>
import { inject } from "vue";
import Radio from "./Radio.vue";
import type { StoreProvider } from "@/type";

type SelectModel = { name: string; value: "start" | "center" | "end" };

const storeInject = inject("storeProvider") as StoreProvider;

const alignOptions: SelectModel[] = [
  { name: "left", value: "start" },
  { name: "center", value: "center" },
  { name: "right", value: "end" },
];
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
}
</style>
