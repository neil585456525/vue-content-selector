import { createApp } from 'vue';
import { createPinia } from 'pinia';
import shadow from 'vue-shadow-dom';
import { createDivWithId, initHelper } from './helper/utils';
import { FontAwesomeIcon } from './fontIcon';
import EditApp from './EditApp.vue';

export async function editInit(): Promise<void> {
  try {
    initHelper(async () => {
      const appDom = createDivWithId('dotta_app');
      document.body.appendChild(appDom);
      // init Vue
      const app = createApp(EditApp);
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

editInit();
