import type { App } from 'vue';
import { createPinia } from 'pinia';
import shadow from 'vue-shadow-dom';
// import { createDivWithId, initHelper } from './helper/utils';
import { FontAwesomeIcon } from './fontIcon';
import VueContentSelector from './VueContentSelector.vue';

const install = (app: App) => {
  app
    .use(createPinia())
    .use(shadow)
    .component('font-awesome-icon', FontAwesomeIcon)
    .component('vue-content-selector', VueContentSelector)
}

export default { install }