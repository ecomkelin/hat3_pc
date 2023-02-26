import { createRouter,createWebHashHistory} from "vue-router";

// 1. Define route components.
// These can be imported from other files
import HatHome from '../pages/HatHome';
import HatUser from '../pages/HatUser';
import HatAttr from '../pages/HatAttr';
import HatCateb from '../pages/HatCateb';
import HatCatef from '../pages/HatCatef';
import HatPd from '../pages/HatPd';
import AnalysisOrder from '../pages/AnalysisOrder';

import HatSetting from '../pages/HatSetting';
import TestSave from '../pages/TestSave';

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: HatHome },
  { path: '/User', component: HatUser },
  { path: '/Attr', component: HatAttr },
  { path: '/Cateb', component: HatCateb },
  { path: '/Catef', component: HatCatef },
  { path: '/Pd', component: HatPd },
  { path: '/setting', component: HatSetting },
  { path: '/AnalysisOrder', component: AnalysisOrder },
  { path: '/save', component: TestSave },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export default createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})