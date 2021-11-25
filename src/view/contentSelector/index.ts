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

  function selectHandler() {
    if (!hoverEl) return;
    const selectedEl = hoverEl;
    stopSelector();
    onSelected(selectedEl);
  }

  /**
   * mask, prevent cursor event with element -> elementsFromPoint[0]
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
    // if window size change, fix the offset
    const el = document.elementsFromPoint(
      x.value - window.pageXOffset,
      y.value - window.pageYOffset
    )[1]; // 0 is mask, but when stop mask will be 1
    if (!(el instanceof HTMLElement) || el === privewEl || el === maskEl) {
      return;
    }
    // refresh when cursor move to another element
    if (hoverEl !== el) {
      // reset old el
      if (hoverEl) {
        hoverEl.classList.remove(selectedClassName);
        if (privewEl) privewEl.remove();
      }
      // register new one
      hoverEl = el;
      hoverEl.classList.add(selectedClassName);
      initPrivewEl();
      if (!privewEl) return;
      
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
