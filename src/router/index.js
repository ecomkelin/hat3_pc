import { createRouter,createWebHashHistory} from "vue-router";

// 1. Define route components.
// These can be imported from other files
import HatHome from '../pages/HatHome';
import HatAttr from '../pages/HatAttr';
import HatUser from '../pages/HatUser';
import AnalysisOrder from '../pages/AnalysisOrder';

import TestDemo from '../pages/TestDemo';
import TestSave from '../pages/TestSave';

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: HatHome },
  { path: '/attr', component: HatAttr },
  { path: '/user', component: HatUser },
  { path: '/demo', component: TestDemo },
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