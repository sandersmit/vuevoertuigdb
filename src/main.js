//import 'createApp' method from a vue library 'package'
import { createApp } from 'vue';
//import from the 'default' object from the 'general' App.vue file - a vue file
import AppName  from './App.vue';

//import router - createRouter and history.. from 'vue-router' npm dependancy
import router from './router';

//pinia instance for data
import { createPinia } from 'pinia'

//import custom components

import FilterCheckboxComp from './components/forms/FilterCheckboxComp.vue'
import FormFieldComp from './components/forms/FormFieldComp.vue' 
import PaginationComp from './components/PaginationComp.vue';
import TopNavBar from './components/TopNavBar.vue';
import VoertuigComp from './components/VoertuigComp.vue';
import CustomVoertuigComp from './components/CustomVoertuigComp.vue';
import VoertuigDetailComp from './components/VoertuigDetailComp.vue';

//thirdparty
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
//add the specific icons
library.add(faXmark,faTrashCan)

//setting a constant for the imported 'main/global' AppName
const AppNameConst = createApp(AppName);

//setting a constant for the imported 'createPinia' call it : pinia
const pinia = createPinia()

//using the custom component method
// 1 name as string: VriendContact -> reference to the data() object  
//use it as <vriend-contact></vriend-contact> in main App.vue
// 2 component object/instance name, defined on the import..above


AppNameConst.component('filtercheckbox-comp', FilterCheckboxComp)
AppNameConst.component('form-field-comp', FormFieldComp)
AppNameConst.component('pagination-comp', PaginationComp)
AppNameConst.component('top-nav-bar', TopNavBar)
AppNameConst.component('voertuig-comp', VoertuigComp)
AppNameConst.component('custom-voertuig-comp', CustomVoertuigComp)
AppNameConst.component('voertuig-detail-comp', VoertuigDetailComp)

//adding icon font to app instance 'AppNameConst'
AppNameConst.component('font-awesome-icon', FontAwesomeIcon)

//adding router
AppNameConst.use(router);

//adding pinia
AppNameConst.use(pinia)

//mount to <div> with id #app
AppNameConst.mount('#app');



