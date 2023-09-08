<script>
import { useRoute } from 'vue-router';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { ref } from 'vue';
import { reactive } from "vue";
import { defineProps } from "vue";
import { useVoertuigStore } from '../stores/VoertuigStore';
import { useUrlTrack } from '../composables/composeUrlTrack';
import FormFieldComp from '../components/forms/FormFieldComp.vue';
import router from '../router/index';


export default {
  //using composition api with setup() as am option from the option API
  setup() {
     const voertuigStore = useVoertuigStore(); 
     const route = useRoute(); 
     const url = new URL("https://example.com?foo=1&bar=2");
     const params = new URLSearchParams(url.search);
     const urltrack = ref('');
     const composeUrlTrack = useUrlTrack();
     const formfieldsReactive = reactive({
            custvoertuignameData: "",
            custvoertuigkentekenData: "",
            custvoertuighandelsnaamData: "",
            custvoertuigsoortData:"",
        });
    const inputfieldsObjRef = ref({inputfield1:"merknaam", inputfield2:"kenteken", inputfield3:"handelsbenaming", inputfield4:"type" })
       

    // Add a third parameter.
    params.set("baz", 3);
    params.toString(); // "foo=1&bar=2&baz=3"


    //Make Vue aware of the props
    //use them with the this.propname - in the whole component. 
    //write them with CAMEL case --and use them in the html with DASH - 
        const props =  defineProps({
            voertuigEditTitle: {
                type: String,
                default: "Edit Detailpage",
            },
            routeVoertuigidparam:{
                default: route.params.voertuigidparam
            }
        });
        //METHODS
        const goBack = () => {
            console.log("goback");
            router.go(-1)
        }
        onBeforeRouteLeave((to, from) => {
            const answer = window.confirm(
                'Do you really want to leave? you have unsaved changes!'
            )
            // cancel the navigation and stay on the same page
            if (!answer) return false
        })
    //each prop can be an object -> with own key:value to comunicate for developers on how it works. 
    // 1 to make sure the type , string or number or boolean etc.. 
    // 2 to check if the prop is required  
    //NOTE!
    //use the prop of the detailpage 
    //set in the router to use props on this view
    return {
        voertuigStore,
        route,
        params,
        url,
        urltrack,
        composeUrlTrack,
        props,
        formfieldsReactive,
        inputfieldsObjRef,
        goBack
        }
    },
    //end using composition api with setup()
    components:{
      
    },
     //to comunicate for developers on howmany or wich emit events there are. 
     emits:[
    // 'emit-custom-event',
    // 'delete-event-emit'
    ],
    
    //lifecyclehooks voor fetchen API data. 
    beforeCreate() {
    },
    created() {
    //console.log("create() lifecycle");
    this.voertuigStore.fetchVoertuigen();
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
            <h3>{{ this.title }}title from props</h3>
        </header>
    </div>
    <div class="row">
        <aside class="col-sm-12 col-md-3">
            <a href="voertuigenpage#/voertuigenpage" @click.prevent="this.goBack" class="btn btn-outline-secondary">
            back</a>
        </aside>
        <main  class="col-sm-12 col-md-9"> 
            <section>
            <form @submit.prevent="editCustomItem">
                    <h3>Edit voertuig {{ route.params.voertuigidparam }}</h3>
                   <!-- v-model:{{ this.formfieldsReactive.custvoertuignameData }} -->
                    <div class="form-group" ref="inputElementRef">  
                        <div class="form-group">
                            <!-- v-model binds the valueProp from the child comp with the Data object from the parent comp-->
                            <form-field-comp v-model:inputFieldValueProp="this.formfieldsReactive.custvoertuignameData" :aria-describedby-prop="inputfieldsObjRef.inputfield1" :input-field-id-prop='0'  :input-field-name-prop="inputfieldsObjRef.inputfield1" :input-field-placeholder-prop="inputfieldsObjRef.inputfield1">         
                            </form-field-comp> 
                        </div> 
                        <div class="form-group">
                            <form-field-comp v-model:inputFieldValueProp="this.formfieldsReactive.custvoertuigkentekenData" :aria-describedby-prop="inputfieldsObjRef.inputfield1"  :input-field-id-prop='1'  :input-field-name-prop="inputfieldsObjRef.inputfield2" :input-field-placeholder-prop="inputfieldsObjRef.inputfield2">         
                            </form-field-comp> 
                        </div>
                        <div class="form-group">
                            <form-field-comp v-model:inputFieldValueProp="this.formfieldsReactive.custvoertuighandelsnaamData" :aria-describedby-prop="inputfieldsObjRef.inputfield3"  :input-field-id-prop='2'  :input-field-name-prop="inputfieldsObjRef.inputfield3" :input-field-placeholder-prop="inputfieldsObjRef.inputfield3">         
                            </form-field-comp> 
                        </div>
                        <div class="form-group">
                            <form-field-comp v-model:inputFieldValueProp="this.formfieldsReactive.custvoertuigsoortData" :aria-describedby-prop="inputfieldsObjRef.inputfield4" :input-field-id-prop='4' :input-field-name-prop="inputfieldsObjRef.inputfield4" :input-field-placeholder-prop="inputfieldsObjRef.inputfield4">         
                            </form-field-comp> 
                        </div>
                    </div>
                <button type="submit" class="btn btn-primary my-3" >Submit custom car</button>
            </form>
        </section>    
          <h2>show items on id</h2>
            <ul>
              <li v-for="(value, key) in voertuigStore.getVoertuigList[params.voertuigidparam]">
                      {{ key }}: {{ value }}
              </li>
            </ul>
          <h2>show from history by kenteken as id</h2>
            <ul>
              <li v-for="(value, key) in voertuigStore.getVoertuigByKenteken(params.voertuigidparam)">
                      {{ key }}: {{ value }}
              </li>
            </ul>
            <!-- <div  v-for="(voertuigdetail,index) in voertuigStore.getVoertuigList" > -->
                <!-- <ul v-if="index == route.params.voertuigidparam">
                 
                </ul> -->
                <!-- //for history items -->
                <!-- <ul v-else-if="voertuigdetail.kenteken == route.params.voertuigidparam">
                  <li v-for="(value, key) in voertuigStore.getVoertuigByKenteken(voertuigdetail.kenteken)">
                    {{ key }}: {{ value }}
                  </li>
                </ul> -->
                <!-- <ul v-if="index == route.params.voertuigidparam">
                  <li >
                    automerk: {{voertuigdetail.merk }} index is: {{ index }} {{voertuigdetail.kenteken }}
                  </li>
                </ul> -->
            <!-- </div> -->
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

