/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import router from '../router'
import Tmap from '@map-component/vue-tmap';

// Toast
import { showToast } from 'vant';
import 'vant/es/toast/style';

// Dialog
import { showDialog } from 'vant';
import 'vant/es/dialog/style';

// Notify
import { showNotify } from 'vant';
import 'vant/es/notify/style';

// ImagePreview
import { showImagePreview } from 'vant';
import 'vant/es/image-preview/style';

export function registerPlugins (app) {
  loadFonts()
  app
    .use(router)
    .use(Tmap)
    .use()
}
