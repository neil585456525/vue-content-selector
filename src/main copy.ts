import { createApp } from 'vue';
import { createPinia } from 'pinia';
import shadow from 'vue-shadow-dom';
import { createDivWithId, initHelper } from './helper/utils';
import { FontAwesomeIcon } from './fontIcon';
import App from './App.vue';

async function init(): Promise<void> {
  try {
    initHelper(async () => {
      const appDom = createDivWithId('dotta_app');
      document.body.appendChild(appDom);
      // init Vue
      const app = createApp(App);
      app
        .use(createPinia())
        .use(shadow)
        .component('font-awesome-icon', FontAwesomeIcon)
        .mount(appDom);
    });
  } catch (err) {
    console.log('init edit false');
    console.error(err);
  }
}
