<template>
  <section class="widget" ref="editWidgetRef">
    <DragContainer>
      <div class="toolEl" :class="{ hide: isWidgetCollapse }">
        <!-- fold btn -->
        <button
          class="btn collapse-btn"
          :class="{ active: isWidgetCollapse }"
          v-if="!isPreviewChoosing"
          @click="isWidgetCollapse = !isWidgetCollapse"
        >
          <font-awesome-icon icon="chevron-right" />
        </button>
        <!-- cancel selecting -->
        <button v-else @click="stopSelectorHandler" class="btn btn-primary stop-sel-btn">cancel</button>
        <section class="option mt-4">
          <!-- <div class="mt-1 mb-1 infor-text" v-if="isSelectElFalse">invalid position</div> -->
          <div class="btn-group">
            <button class="btn btn-primary btn-main" @click="chooseElement">start select</button>
            <button class="btn btn-primary" @click="openSelectSetting = !openSelectSetting">
              <font-awesome-icon icon="cog" />
            </button>
          </div>
          <div v-if="blockConfig.selector" class="mt-1 btn selector">{{ blockConfig.selector }}</div>
          <span style="border-left: 1px white solid;"></span>
          <BlockSetting v-show="openSelectSetting" />
          <button class="btn save-btn mt-1" @click="saveDataToRepo" :disabled="isOnSaving">
            <font-awesome-icon icon="spinner" v-if="isOnSaving" />saving
          </button>
        </section>
        <PopMessage :msg="popMsg.msg" :show="popMsg.show" @reset="popMsg.show = false" />
      </div>
    </DragContainer>
  </section>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import getCssSelector from 'css-selector-generator';
import { useMainStore } from '@/store';
import PopMessage from '@/components/PopMessage.vue';
import { ContentSelector } from '../ContentSelector';
import DragContainer from './DragContainer.vue';
import BlockSetting from './BlockSetting/index.vue';

const editWidgetRef = ref<HTMLElement | null>(null);

const { isPreviewChoosing, isSelectElFalse, blockConfig } = storeToRefs(useMainStore());

const popMsg = reactive({
  msg: '',
  show: false,
});
const isWidgetCollapse = ref(false);
const openSelectSetting = ref(false);

const stopSelectorHandler = ref<((e: MouseEvent) => void) | undefined>();

function chooseElement() {
  const tmpSaveSelector = blockConfig.value.selector;
  // 成功選擇回呼
  function onSelectedCb(el: HTMLElement) {
    isPreviewChoosing.value = false;
    isWidgetCollapse.value = false;
    const newSelector = getCssSelector(el, { blacklist: [/src/] });
    if (newSelector) {
      blockConfig.value.selector = newSelector;
    }
  }
  // 初始化
  isPreviewChoosing.value = true;
  isWidgetCollapse.value = true;
  blockConfig.value.selector = '';
  const { stopSelector } = ContentSelector(onSelectedCb, blockConfig.value.insertPosition);
  // 停止
  stopSelectorHandler.value = () => {
    isPreviewChoosing.value = false;
    isWidgetCollapse.value = false;
    blockConfig.value.selector = tmpSaveSelector;
    stopSelector();
  };
}

const isOnSaving = ref(false);

function endSaving() {
  isOnSaving.value = false;
  popMsg.msg = '儲存成功';
  popMsg.show = true;
}

async function saveDataToRepo() {
  isOnSaving.value = true;
  // await store.saveEditData();
  endSaving();
}
</script>

<style lang="scss">
.widget {
  .toolEl {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    background: white;
    border-radius: 4px;
    max-width: 200px;
    max-height: 80vh;
    overflow-x: hidden;
    overflow-y: scroll;
    transition: 0.5s;
    box-shadow: 1px 2px 6px rgba(#000, 0.3);
    .option {
      min-width: 170px;
      padding: 15px 10px;
    }
    &.hide {
      max-width: 0;
    }
    button {
      white-space: nowrap;
    }
  }

  .infor-text {
    color: #5a62b3;
    display: flex;
    align-items: center;
  }

  #event_list {
    max-height: 150px;
    overflow: scroll;
    width: 120px;
  }

  .selector {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
  }
}
</style>
