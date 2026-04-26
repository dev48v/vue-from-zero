// STEP 1 — Application bootstrap.
//
// `createApp` builds the root Vue instance. We attach the router so that
// <RouterView> in App.vue knows which view to render, then mount onto the
// <div id="app"> from index.html.

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

createApp(App).use(router).mount('#app')
