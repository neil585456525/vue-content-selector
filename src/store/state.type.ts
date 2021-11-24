export type BlockConfig = {
  selector: string;
  insertPosition: 'top' | 'bottom';
  align: 'start' | 'center' | 'end';
  width: number;
}
export interface State {
  // 用於儲存判斷
  blockConfig: BlockConfig;
  isPreviewChoosing: boolean;
  isOnFindElLoading: boolean;
  isShowSectionBg: boolean;
  isSelectElFalse: boolean;
}
