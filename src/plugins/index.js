/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from '../router'
import Tmap from '@map-component/vue-tmap';
import '@mdi/font/css/materialdesignicons.css'

export function registerPlugins (app) {
  loadFonts()
  app
    .use(vuetify, {
      iconfont: 'mdi'
    })
    .use(router)
    .use(Tmap)
    .use()
}
