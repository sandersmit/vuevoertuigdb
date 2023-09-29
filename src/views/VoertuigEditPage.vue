<script setup>
import {  useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { reactive,computed,defineProps,ref } from "vue";

import { useVoertuigStore } from '../stores/VoertuigStore';
import { storeToRefs } from "pinia"; 

import FormFieldComp from '../components/forms/FormFieldComp.vue';
import router from '../router/index';

//import { useComposableUrlTrack} from '../composables/composeUseUrlTrack';


////using composition api with setup() as am option from the option API
//complete store
const voertuigStore = useVoertuigStore(); 
//destructure parts of the store
const { currentUser,customBrandVoertuiglist } = storeToRefs(useVoertuigStore()); 
const route = useRoute(); 
const url = new URL("https://example.com?foo=1&bar=2");
const params = new URLSearchParams(url.search);
const urltrack = ref('');
const kentekenRef = ref('');
//const useComposUrlTrack = useComposableUrlTrack();
const formfieldsReactive = reactive({
      custvoertuignameData: "",
      custvoertuigkentekenData: "",
      custvoertuighandelsnaamData: "",
      custvoertuigsoortData:"",
  });
const placeholderObjRef = ref(
  {
    inputfield1: "merknaam1",
    inputfield2: "kenteken",
    inputfield3: "handelsbenaming",
    inputfield4: "type"
  }
)


       

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
      type: Number,
      default: 0
    }
});
//emits 
const emit = defineEmits([
  'change',
  'delete'
])
//METHODS
const goBack = () => {
    console.log("goback");
    router.go(-1)
}

// function changeInputTest(inputFieldData){
//   voertuigStore.$patch((state) => {
//     console.log("inputFieldData"+inputFieldData);
//     formfieldsReactive.inputFieldData ? 
//     state.customBrandVoertuiglist[route.params.voertuigidparam].inputFieldData = formfieldsReactive.inputFieldData :
//     state.customBrandVoertuiglist[route.params.voertuigidparam].inputFieldData = state.customBrandVoertuiglist[route.params.voertuigidparam].inputFieldData
//   })
// }


const submitchangeStates = (inputFieldData) => {
  ///////////////////////////////////////////////use $patch from Pinia
  voertuigStore.$patch((state) => {
    //Add new data to store. 
    //state.customBrandVoertuiglist.push({ currentUsername: 'Smit'})
    //Change existing data to store - checkif value us true
    formfieldsReactive.custvoertuignameData ? 
    state.customBrandVoertuiglist[route.params.voertuigidparam].custvoertuignameData = formfieldsReactive.custvoertuignameData :
    state.customBrandVoertuiglist[route.params.voertuigidparam].custvoertuignameData = state.customBrandVoertuiglist[route.params.voertuigidparam].custvoertuignameData

    formfieldsReactive.custvoertuigkentekenData ? 
    state.customBrandVoertuiglist[route.params.voertuigidparam].custvoertuigkentekenData = formfieldsReactive.custvoertuigkentekenData :
    state.customBrandVoertuiglist[route.params.voertuigidparam].custvoertuigkentekenData = state.customBrandVoertuiglist[route.params.voertuigidparam].custvoertuigkentekenData

    formfieldsReactive.custvoertuighandelsnaamData ? 
    state.customBrandVoertuiglist[route.params.voertuigidparam].custvoertuighandelsnaamData = formfieldsReactive.custvoertuighandelsnaamData :
    state.customBrandVoertuiglist[route.params.voertuigidparam].custvoertuighandelsnaamData = state.customBrandVoertuiglist[route.params.voertuigidparam].custvoertuighandelsnaamData

    formfieldsReactive.custvoertuigsoortData ? 
    state.customBrandVoertuiglist[route.params.voertuigidparam].custvoertuigsoortData = formfieldsReactive.custvoertuigsoortData :
    state.customBrandVoertuiglist[route.params.voertuigidparam].custvoertuigsoortData = state.customBrandVoertuiglist[route.params.voertuigidparam].custvoertuigsoortData
   
    //Example
    // state.hasChanged = true
  })
}

//COMPUTED
//const usernameState = computed(() => count.value + 1)
//const usernameState = computed(() => mapstState(voertuigStore, ["currentUser"]))
const destructuredUserName = computed(() => currentUser )
const destructuredVoertuigCustList = computed(() => customBrandVoertuiglist )

//WATCHERS


onBeforeRouteLeave((to, from) => {
    const answer = window.confirm(
        'Do you really want to leave? you have unsaved changes!'
    )
    // cancel the navigation and stay on the same page
    if (!answer) return false
})

</script>
<template>
  <article class="detailpage">
    <div>
      {{ destructuredUserName }}
      <br>
      
      <br>
      {{ destructuredVoertuigCustList }}
    </div>
      <!-- USING 2 properties - Data properties & Props properties
      Prop properties you can use with only the prop name {{ nameProp }}
      Data properties you need to call with the dot notation: by {{Object.propertiename}} -->
      <div class="row">
        <header class="col-12 py-4">
            <h3>{{ this.voertuigEditTitle }} {{customBrandVoertuiglist[route.params.voertuigidparam].custvoertuignameData}} title from props </h3>
            <div>loged in as: <span class="currentUsername"> {{ destructuredUserName }} </span> role:{{currentUser.padStart(currentUser.length+1,' ')}}</div>
        </header>
    </div>
    <div class="row">
        <aside class="col-sm-12 col-md-3">
            <a href="voertuigenpage#/voertuigenpage" @click.prevent="goBack" class="btn btn-outline-secondary">
            back</a>
        </aside>
        <main  class="col-sm-12 col-md-9"> 
            <section>
            <form @submit.prevent="submitchangeStates">
                    <h3>Edit voertuig {{ route.params.voertuigidparam }}</h3>
                   <!-- v-model:{{ this.formfieldsReactive.custvoertuignameData }} -->
                    <div class="form-group" ref="inputElementRef">  
                      <!-- <div class="form-group">       
                        <input type="text" :placeholder="placeholderObjRef.inputfield3" :v-model="formfieldsReactive.custvoertuignameData" @input="changeInputTest(formfieldsReactive.custvoertuignameData)" />
                     </div>  -->
                        <div class="form-group">
                         
                            <!-- v-model binds the valueProp from the child comp with the Data object from the parent comp-->
                            <form-field-comp v-model:inputFieldValueProp="formfieldsReactive.custvoertuignameData" :aria-describedby-prop="placeholderObjRef.inputfield1" :input-field-id-prop='0'  :input-field-name-prop="placeholderObjRef.inputfield1" :input-field-placeholder-prop="customBrandVoertuiglist[route.params.voertuigidparam].custvoertuignameData">         
                            </form-field-comp> 
                        </div> 
                        <div class="form-group">
                          
                            <form-field-comp v-model:inputFieldValueProp="formfieldsReactive.custvoertuigkentekenData" :aria-describedby-prop="placeholderObjRef.inputfield2"  :input-field-id-prop='2'  :input-field-name-prop="placeholderObjRef.inputfield2" :input-field-placeholder-prop="customBrandVoertuiglist[route.params.voertuigidparam].custvoertuigkentekenData">         
                            </form-field-comp> 
                        </div>
                        <div class="form-group">
                            <form-field-comp v-model:inputFieldValueProp="formfieldsReactive.custvoertuighandelsnaamData" :aria-describedby-prop="placeholderObjRef.inputfield3"  :input-field-id-prop='2'  :input-field-name-prop="placeholderObjRef.inputfield3" :input-field-placeholder-prop="customBrandVoertuiglist[route.params.voertuigidparam].custvoertuighandelsnaamData">         
                            </form-field-comp> 
                        </div>
                        <div class="form-group">
                            <form-field-comp v-model:inputFieldValueProp="formfieldsReactive.custvoertuigsoortData" :aria-describedby-prop="placeholderObjRef.inputfield4" :input-field-id-prop='4' :input-field-name-prop="placeholderObjRef.inputfield4" :input-field-placeholder-prop="customBrandVoertuiglist[route.params.voertuigidparam].custvoertuigsoortData">         
                            </form-field-comp> 
                        </div>
                    </div>
                <button type="submit" class="btn btn-primary my-3" >Submit change</button>
            </form>
        </section>    
        <h2>show custom item</h2>
            <ul>
              <p v-if="loading">Loading posts...</p>
              <p v-if="error">{{ error.message }}</p>
              <!-- {{ customBrandVoertuiglist[route.params.voertuigidparam].custvoertuignameData }} -->
              <li v-for="(value, key) in customBrandVoertuiglist[route.params.voertuigidparam]">
                      {{ key }}: {{ value }}
              </li>
            </ul>
          </main>
        </div>
</article>
</template>
<style scoped lang="scss">
 h2,h3{
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #484848;
  }

  .currentUsername{
    color:#155f3e;
  }
  .detailpage{
    color: #f2f2f2;
  }
  header{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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

