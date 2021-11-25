/**
 * 根據選擇器建立 content section，將會執行輪詢策略持續 3s 如果都找不到將報錯
 * @param selector
 * @param insertPosition
 * @returns
 */
export function addContentSection(
  selector: string,
  insertPosition: 'top' | 'bottom' = 'top'
): Promise<HTMLElement> {
  return new Promise((resolve, reject) => {
    let targetEl = document.querySelector(selector);

    // 如果找不到不會先拋出，會先執行輪詢策略
    function tryCreate() {
      if (!targetEl) {
        return;
      }
      const el = document.createElement('div');
      if (insertPosition === 'bottom') {
        targetEl.after(el);
        resolve(el);
        return;
      }
      targetEl.before(el);
      resolve(el);
    }

    // 如果一開始沒找到就執行輪詢策略
    const totalTime = 5000;
    const step = 200;
    let timer = 0;
    const interval = setInterval(() => {
      timer += step;
      // 持續輪詢直到找到或時間到
      if (!targetEl && timer < totalTime) {
        targetEl = document.querySelector(selector);
        return;
      }
      clearInterval(interval);
      // 輪詢完還是沒找到就拋出
      if (!targetEl) {
        reject(new Error('cant find selector el'));
        return;
      }
      tryCreate();
    }, step);
  });
}
