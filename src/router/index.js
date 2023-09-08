// //import router - createRouter and history.. from 'vue-router' npm dependancy
import { createRouter } from 'vue-router';
import { createWebHashHistory } from 'vue-router';

// //import all pages
import HomePage from '../views/HomePage.vue';
import AboutPage from '../views/AboutPage.vue';
// import WorkPage from '../views/WorkPage.vue';
// import WorkDetailPage from '../views/WorkDetailPage.vue';

// import OverviewPage from '../views/OverviewPage.vue';

// import UserPage from '../views/UserPage.vue';
// import UserDetailPage from '../views/UserDetailPage.vue';

import VoertuigPage from '../views/VoertuigPage.vue';
import VoertuigDetailPage from '../views/VoertuigDetailPage.vue';
import VoertuigEditPage from '../views/VoertuigEditPage.vue'


//setting a constant for the imported 'vue-router' call it : router
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path:"/",
            component: HomePage
        },
        {
            path:"/about",
            //component: () => import("@/views/AboutPage.vue")
            component: AboutPage
        },
        {
            path:"/voertuigenpage",
            //router by default loads no props
            //set 'props' to true to pass props 
            //into component: Voertuigpage (passed by the router) 
            props: true,
            component: VoertuigPage,
            // children: [
            //     {
            //         path:":voertuigidparam",
            //         props: true,
            //         //component: () => import("@/views/VoertuigDetailPage.vue")
            //         component: VoertuigDetailPage
            //     }
            // ]
        },
        {
            path:"/voertuigdetailpage/:voertuigidparam",
            //:passed prop :voertuigidparam
            //to component:VoertuigDetailpage
            //name:'VoertuigDetail',
            props: true,
            //component: () => import("@/views/VoertuigDetailPage.vue")
            component: VoertuigDetailPage
        },
        {
            path:"/voertuigeditpage/:voertuigidparam",
            //:passed prop :voertuigidparam
            //to component:VoertuigDetailpage
            //name:'VoertuigDetail',
            props: true,
            //component: () => import("@/views/VoertuigDetailPage.vue")
            component: VoertuigEditPage
        }
    ],                                                                          
});

export default router;
