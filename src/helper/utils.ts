export function createDivWithId(id: string): HTMLElement {
  const el = document.createElement('div');
  el.setAttribute('id', id);
  return el;
}

/**
 * 在 dom load 完成後執行，避免找不到 dom 出錯
 * @param initAppFn
 * @returns
 */
export async function initHelper(initAppFn: () => void): Promise<void> {
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => {
      initAppFn();
    });
    return;
  }
  initAppFn();
}

export function getQuery(queryName: string): string | null {
  const { search } = window.location;
  const urlParams = new URLSearchParams(search);
  const queryValue = urlParams.get(queryName);
  return queryValue;
}
