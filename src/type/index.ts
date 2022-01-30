export type BlockConfig = {
  selector: string;
  insertPosition: 'top' | 'bottom';
  align: 'start' | 'center' | 'end';
  width: number;
}

export interface StoreProvider {
  blockConfig: BlockConfig;
  isPreviewChoosing: boolean;
  isShowSectionBg: boolean;
  startPositionSelector: (startCb: () => void, successCb: (el: Element) => void) => void;
  cancelPositionSelector: (cancelCb: () => void) => void;
  emitCanceled: () => void;
  emitPositionChanged: (el: Element) => void;
  emitPositionSelected: (el: Element) => void;
}