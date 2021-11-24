/* eslint-disable no-use-before-define */
import { useMouse, useIntervalFn } from '@vueuse/core';
import { HtmlHTMLAttributes } from 'vue';
import { baseZIndex } from '../config';
import { selectedClassName, previewElClassName, addStyleTagToDocument } from './selectStyle';

addStyleTagToDocument();

export const select = (
  onSelected: (el: HTMLElement) => void | undefined,
  insertPosition: 'top' | 'bottom' = 'bottom'
): { stopSelector: () => void } => {
  const { x, y } = useMouse({ touch: false });
  let hoverEl: HTMLElement | null = null;
  let privewEl: HTMLElement | null = null;
  let maskEl: HTMLElement | null = null;

  initMask();

  /**
   * 選到元素
   */
  function selectHandler() {
    if (!hoverEl) return;
    const selectedEl = hoverEl;
    stopSelector();
    onSelected(selectedEl);
  }

  /**
   * 遮罩層，隔絕滑鼠事件避免直接與元素互動，出現在最前面 elementsFromPoint[0]
   */
  function initMask() {
    const style:HtmlHTMLAttributes['style'] = {
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      cursor: 'pointer',
      zIndex: (baseZIndex - 1),
    };
    maskEl = document.createElement('div');
    Object.assign(maskEl.style, style);
    document.body.append(maskEl);
    maskEl.addEventListener('click', selectHandler);
  }

  function initPrivewEl() {
    privewEl = document.createElement('div');
    privewEl.classList.add(previewElClassName);
  }

  const { pause } = useIntervalFn(() => {
    // 如果畫面有拉伸，要調整偏差值
    const el = document.elementsFromPoint(
      x.value - window.pageXOffset,
      y.value - window.pageYOffset
    )[1]; // 0 是 mask，但如果在<停止鍵>時，mask 為 1，固可用判定
    if (!(el instanceof HTMLElement) || el === privewEl || el === maskEl) {
      return;
    }
    // 忽略元素
    // console.log(el);
    // if (elRoot && elRoot.contains(el)) {
    //   console.log('in root');
    //   return;
    // }
    // 如果移到新元素就更新
    if (hoverEl !== el) {
      // reset 舊的
      if (hoverEl) {
        hoverEl.classList.remove(selectedClassName);
        if (privewEl) privewEl.remove();
      }
      // 註冊新的
      hoverEl = el;
      hoverEl.classList.add(selectedClassName);
      initPrivewEl();
      if (!privewEl) return;
      // 看加上面還下面
      if (insertPosition === 'bottom') {
        hoverEl.after(privewEl);
        return;
      }
      hoverEl.before(privewEl);
    }
  }, 100);

  function stopSelector() {
    pause();
    if (maskEl) maskEl.remove();
    if (hoverEl) hoverEl.classList.remove(selectedClassName);
    if (privewEl) privewEl.remove();
  }

  return {
    stopSelector,
  };
};
