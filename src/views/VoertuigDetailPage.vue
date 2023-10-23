<script>
import { useVoertuigStore } from '../stores/VoertuigStore';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useComposableUrlTrack } from '../composables/composeUseUrlTrack';
//import { useComposableUrlTrack } from '../composables/composeUseUrlTrack';
import router from '../router/index';



export default {
  //using composition api with setup() as am option from the option API
  setup() {
     const voertuigStore = useVoertuigStore(); 
     const route = useRoute(); 
     //destructure composable
     const { urlTrackReactive , updateUrlTracking, getFilterUrlParams, setCustomParams, setUrl } = useComposableUrlTrack();

     const url = new URL("https://example.com?foo=1&bar=2");
     const params = new URLSearchParams(url.search);
     const urltrack = ref('');
    // const useComposUrlTrack = useComposableUrlTrack()

// Add a third parameter.
params.set("baz", 3);
params.toString(); // "foo=1&bar=2&baz=3"

//METHODS
const goBack = () => {
            console.log("goback");
            //router.go(-1)
            history.back();
        }
      return {
        voertuigStore,
        route,
        
        urlTrackReactive,
        updateUrlTracking,
        getFilterUrlParams,
        setCustomParams,
        setUrl,
        
        params,
        url,
        //useComposUrlTrack,
        goBack
        }
    },
    //end using composition api with setup()
    components:{
      
    },
    //Make Vue aware of the props
    //use them with the this.propname - in the whole component. 
    //write them with CAMEL case --and use them in the html with DASH - 
    props: 
        //each prop can be an object -> with own key:value to comunicate for developers on how it works. 
        // 1 to make sure the type , string or number or boolean etc.. 
        // 2 to check if the prop is required  
        
          //NOTE!
          //use the prop of the detailpage 
          //set in the router to use props on this rout/view
        ['voertuigidparam'],
    data() {
        return {
            detailsAreVisible: false,
            title:'Detailpage',
                //NOTE!
                //call the route object -> params.custompathname 
                //FROM EVERY WHERE
                //routeProp: this.route.params.custompathname
            routeProp: this.route.params.voertuigidparam
        }
    },
     //to comunicate for developers on howmany or wich emit events there are. 
     emits:[
    // 'emit-custom-event',
    // 'delete-event-emit'
    ],
    methods: {
      
    },
    computed:{
      computeUrlTrack(){
       //return this.urltrack = ref('');
       //return this.composeUrlTrack.length;
      }
    },
    watch: {
        //value is the default parameter/argument that comes with a watch: propertie. 
        // composeUrlTrack(value) {
        //     if (value) {
        //         console.log("watch composeUrlTrack");
        //     }
        // }
    },
    //lifecyclehooks voor fetchen API data. 
    beforeCreate() {
    },
    created() {
    //console.log("create() lifecycle");
    //this.voertuigStore.fetchVoertuigen();
    },
    mounted() {
    //return url
    this.setUrl()
    }
}
</script>
<template>
  <article class="detailpage">
      <!-- USING 2 properties - Data properties & Props properties
      Prop properties you can use with only the prop name {{ nameProp }}
      Data properties you need to call with the dot notation: by {{Object.propertiename}} -->
      <div class="row">
        <header class="col-12">
            <h1>{{ this.title }}</h1>
        </header>
    </div>
    <div class="row">
        <aside class="col-sm-12 col-md-3">
          <a href="voertuigenpage#/voertuigenpage" @click.prevent="goBack" class="btn btn-outline-secondary">
            back</a>
          <!-- <a href="voertuigenpage#/voertuigenpage" @click.prevent="composeUrlTrack.updateUrlTrack()" class="btn btn-outline-secondary">back</a> -->
          <ul>
            <!-- <li>url track: {{ computeUrlTrack }}</li> -->
            <li>composeUrlTrack:
               {{ composeUrlTrack }}</li>
               <li>computeUrlTrack: {{ this.computeUrlTrack  }}</li>
          </ul>       
        </aside>
        <main  class="col-sm-12 col-md-9">     
          <h2>show items on id ?{{ voertuigStore.getVoertuigList.length }}</h2>
          show param: {{route.params.voertuigidparam}}
            <ul>
              <li v-for="(value, key) in voertuigStore.getVoertuigList[route.params.voertuigidparam]">
                      {{ key }}: {{ value }}
              </li>
            </ul>
          <h2>show from history by kenteken as id {{ voertuigStore.getVoertuigByKenteken }}</h2>
              show param: {{route.params.voertuigidparam}}
            <ul>
              <li v-for="(value, key) in voertuigStore.getVoertuigByKenteken[route.params.voertuigidparam]">
                      {{ key }}: {{ value }}
              </li>
            </ul> 
            <h2>show from custom items {{ voertuigStore.customBrandVoertuiglist.length }}</h2>
            <ul>
              <p v-if="loading">Loading posts...</p>
              <p v-if="error">{{ error.message }}</p>
              <li v-for="(value, key) in voertuigStore.customBrandVoertuiglist[route.params.voertuigidparam]">
                      {{ key }}: {{ value }}
              </li>
            </ul>
          </main>
        </div>
</article>
</template>
<style scoped lang="scss">
 h2{
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #f2f2f2;
  }
  .detailpage{
    color: #f2f2f2;
  }
  main{
    ul{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0px;

      li{
        display: block;
        position: relative;
        width: 250px;
        word-break: break-word;
        padding: 1rem;
        padding-left: 0px;
      }
    }
  
  }
 
</style>

