<template>
  <section class="widget" ref="editWidgetRef">
    <DragContainer>
      <div class="toolEl" :class="{ hide: isWidgetCollapse }">
        <!-- fold btn -->
        <CollapseBtn
          v-if="!storeInject.isPreviewChoosing"
          @click="isWidgetCollapse = !isWidgetCollapse"
          :active="isWidgetCollapse"
        />
        <!-- cancel selecting -->
        <CButton v-else @click="cancelChoose" class="stop-sel-btn" primary
          >cancel</CButton
        >
        <section class="option mt-4">
          <div class="btn-group">
            <CButton class="btn-main" @click="startChoose" icon="crosshairs" primary
              >start select</CButton
            >
            <CButton
              icon="paint-brush"
              primary
              @click="openSelectSetting = !openSelectSetting"
            ></CButton>
          </div>
          <CButton class="mt-1 btn selector">{{
            storeInject?.blockConfig?.selectedElement?.tagName || "none"
          }}</CButton>
          <BlockSetting v-show="openSelectSetting" />
        </section>
        <PopMessage :msg="popMsg.msg" :show="popMsg.show" @reset="popMsg.show = false" />
      </div>
    </DragContainer>
  </section>
</template>

<script lang="ts" setup>
import { ref, reactive, inject } from "vue";
import PopMessage from "@/components/PopMessage.vue";
import DragContainer from "./DragContainer.vue";
import BlockSetting from "./BlockSetting/index.vue";
import CButton from "@/components/CButton.vue";
import CollapseBtn from "./CollapseBtn.vue";
import type { StoreProvider } from "@/type";

const editWidgetRef = ref<HTMLElement | null>(null);

const popMsg = reactive({
  msg: "",
  show: false,
});
const isWidgetCollapse = ref(false);
const openSelectSetting = ref(false);

const storeInject = inject("storeProvider") as StoreProvider;

function startChoose() {
  storeInject.startPositionSelector(
    () => {
      isWidgetCollapse.value = true;
    },
    (el) => {
      isWidgetCollapse.value = false;
    }
  );
}

function cancelChoose() {
  storeInject.cancelPositionSelector(() => {
    isWidgetCollapse.value = false;
  });
}

const isOnSaving = ref(false);

function endSaving() {
  isOnSaving.value = false;
  popMsg.msg = "success";
  popMsg.show = true;
}
</script>

<style lang="scss" scoped>
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

.stop-sel-btn {
  position: absolute;
  left: 10px;
  z-index: 1;
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

.save-btn {
  width: 100%;
}
</style>
