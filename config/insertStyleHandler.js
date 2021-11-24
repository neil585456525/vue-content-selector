/**
 * 這個進到前端才會執行，每個組件的 style 都會呼叫一次
 * 如果單純把 style elem 插入的話， dynamic content 二次呼叫會讓他們移位，造成 widget 找不到的問題
 * ? 可以考慮利用註解、loader 名稱的方式對他們區分，但目前因為瀏覽模式不會二次載入，所以效能還能接受
 */
module.exports = function insertStyleHandler(elem) {
  window.dottaShadowStyleObj = window.dottaShadowStyleObj || {
    elemList: [],
    loadStyles(styleWrapperEl) {
      let styleStr = '';
      this.elemList.forEach(item => {
        // ! 不知道為啥 innerHTML 一定要在這個 fn 裡面用，在外面用都會空掉
        styleStr += item.innerHTML;
      });
      const style = document.createElement('style');
      style.innerHTML = styleStr;
      styleWrapperEl.appendChild(style);
    }
  };
  window.dottaShadowStyleObj.elemList.push(elem);
};
