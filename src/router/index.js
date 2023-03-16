import { createRouter, createWebHashHistory } from "vue-router";

// 1. Define route components.
// These can be imported from other files
import HatHome from '../pages/HatHome';
import HatUser from '../pages/HatUser';
import HatCatef from '../pages/HatCatef';
import HatPd from '../pages/HatPd';
import HatOrder from '../pages/HatOrder';

import HatSetting from '../pages/HatSetting';
import TestSave from '../pages/TestSave';

import AnalysisOrder from '../pages/AnalysisOrder';
import HatCateb from '../pages/HatCateb';
import HatAttr from '../pages/HatAttr';
import FileImg from "@/components/setting/FileImg"
import HomePd from "@/components/setting/HomePd"

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: HatHome },
  { path: '/User', component: HatUser },
  { path: '/Catef', component: HatCatef },
  { path: '/Pd', component: HatPd },
  { path: '/Order', component: HatOrder },
  { path: '/setting', component: HatSetting },
  { path: '/save', component: TestSave },
  
  { path: '/AnalysisOrder', component: AnalysisOrder },
  { path: '/Cateb', component: HatCateb },
  { path: '/Attr', component: HatAttr },
  { path: '/images', component: FileImg },
  { path: '/HomePd', component: HomePd },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export default createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})