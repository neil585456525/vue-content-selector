/* eslint-disable no-use-before-define */
/**
 * I use a Singleton pattern to avoid the multi-side-effect and increase the performace.
 * Everytime call the PositionSelector will always using the same instance, so any parameter
 * changing, need to call the setXXX method. 
 */
import { useIntervalFn, useMouse } from '@vueuse/core';
import { HtmlHTMLAttributes, computed, ref, watch, unref, nextTick } from 'vue';
import { selectedClassName, previewElClassName, addStyleTagToDocument } from './selectStyle';
import type { BlockConfig } from '@/type'

addStyleTagToDocument();

type OnSelectedHandler = (el: HTMLElement) => void | undefined;
type OnHoverChangedHandler = (el: HTMLElement) => void | undefined;
type SelectingHoverTracker = { start: () => void, stop: () => Promise<void> }

class PositionSelector {

  private onSelectedHandler: OnSelectedHandler = () => { };
  private onHoverChangedHandler: OnHoverChangedHandler = () => { };
  private insertPosition: BlockConfig['insertPosition'] = 'bottom'
  /**
   * used to prevent directly interact with element
   * when it's clicked will trigger onSelectHandler 
   */
  private maskEl: HTMLElement | null = null;
  /**
   * the element be hoverd
   */
  private hoverEl = ref<HTMLElement | null>(null);
  private readonly selectingHoverTracker: SelectingHoverTracker

  private baseZIndex: number = 9999;

  constructor() {
    this.selectingHoverTracker = this.initSelectingHoverTracker();
  }

  public startSelector() {
    // select el by mask
    this.maskEl = this.addMask(
      async () => {
        const selectedEl = unref(this.hoverEl);
        await this.stopSelector();
        if (selectedEl) this.onSelectedHandler(selectedEl);
      });

    this.selectingHoverTracker.start();
    return this;
  }

  public async stopSelector() {
    await this.selectingHoverTracker.stop();
    if (this.maskEl) this.maskEl.remove();
    return this;
  }

  public setBaseZIndex(zIndex: number) {
    this.baseZIndex = zIndex;
    return this
  }

  public setInsertPosition(newIP: BlockConfig['insertPosition']) {
    this.insertPosition = newIP;
    return this;
  }

  public setOnSelectedHandler(newHandler: OnSelectedHandler) {
    this.onSelectedHandler = newHandler;
    return this;
  }

  public setOnHoverChangedHandler(newHandler: OnSelectedHandler) {
    this.onHoverChangedHandler = newHandler;
    return this;
  }


  private addMask(onClickCb: () => void) {
    const style: HtmlHTMLAttributes['style'] = {
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      cursor: 'pointer',
      zIndex: (this.baseZIndex - 1),
    };
    const maskEl = document.createElement('div');
    Object.assign(maskEl.style, style);
    maskEl.addEventListener('click', onClickCb);
    document.body.append(maskEl);
    return maskEl;
  }

  private initSelectingHoverTracker(): SelectingHoverTracker {

    let privewEl: HTMLElement | null = null;
    const { x, y } = useMouse({ touch: false });
    const cursor = computed(() => ({ x: x.value - window.pageXOffset, y: y.value - window.pageYOffset }))

    const { pause, resume } = useIntervalFn(() => {
      // 0 is mask, but when stop mask will be 1
      const el = document.elementsFromPoint(cursor.value.x, cursor.value.y)[1];

      // check if can be selected
      if (el instanceof HTMLElement
        && el !== privewEl
        && el !== this.maskEl
        && el !== this.hoverEl.value) {

        this.hoverEl.value = el;

      };

    }, 100, { immediate: false });


    /**
     * visual effect = hoverEl style + preview block
     */
    watch(this.hoverEl, (newHoverEl, oldHoverEl) => {
      // clean old effect
      if (oldHoverEl) oldHoverEl.classList.remove(selectedClassName);
      if (privewEl) privewEl.remove();

      if (!newHoverEl) return;
      newHoverEl.classList.add(selectedClassName);

      privewEl = document.createElement('div');
      privewEl.classList.add(previewElClassName);

      if (this.insertPosition === 'bottom') newHoverEl.after(privewEl);
      if (this.insertPosition === 'top') newHoverEl.before(privewEl);

      this.onHoverChangedHandler(newHoverEl);
    })

    return {
      start: resume,
      // clean all side effect on hoverEl
      stop: async () => {
        pause();
        this.hoverEl.value = null;
        await nextTick();
      }
    }
  }
}

const positionSelector = new PositionSelector();

export { positionSelector }
