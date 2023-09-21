<script>
import FormFieldComp from '../components/forms/FormFieldComp.vue';
import VoertuigComp from '../components/VoertuigComp.vue';
import PaginationComp from '../components/PaginationComp.vue';
import { useVoertuigStore } from '../stores/VoertuigStore';
import { useRoute } from 'vue-router';
import { reactive, onMounted, ref} from "vue";
import { useUrlTrack } from '../composables/composeUrlTrack';

export default {
    //Setup option is happening before every option - used in option & composition API
    //using composition api with setup() as am option from the option API
    setup() {
        const voertuigStore = useVoertuigStore();
        const route = useRoute();
        const composeUrlTrack = useUrlTrack();
        const brandArrayRef = ref([])
        const customBrandArrayRef = ref([{custvoertuignameData:'CUSTOM OPEL',custvoertuigkentekenData:'00-00-00',custvoertuighandelsnaamData:'OPTIMUS', custvoertuigsoortData:'PERSONENAUTO'},{custvoertuignameData:'CUSTOM FORD',custvoertuigkentekenData:'11-11-11',custvoertuighandelsnaamData:'PRIME', custvoertuigsoortData:'PERSONENAUTO'}])
        const inputfieldsObjRef = ref({inputfield1:"merknaam", inputfield2:"kenteken", inputfield3:"handelsbenaming", inputfield4:"type" })
        //refs
        const userhistory = ref(false);
        const totalResults = ref(0)
        const inputElementRef = ref(null)
        const formfieldsReactive = reactive({
            custvoertuignameData: "",
            custvoertuigkentekenData: "",
            custvoertuighandelsnaamData: "",
            custvoertuigsoortData:"",
        })
        onMounted(() => {
         //console.log("onMounted() lifecycle Reactive Voertuigpage");
        //console.log(inputElementRef.value.className);
         //inputElementRef.value
        })

        return {
            voertuigStore,
            route,
            userhistory,
            composeUrlTrack,
            totalResults,
            brandArrayRef,
            customBrandArrayRef,
            inputfieldsObjRef,
            inputElementRef,
            formfieldsReactive
        }
    },
    //end using composition api with setup()
    components: {
        VoertuigComp,
        PaginationComp,
        FormFieldComp
    },
    data() {
        return {
            data1: false,
            title: "Overzichts pagina",
            data2: 'this is some data from Voertuig DB home page',
            filterResults: false,
            filtercheckbox:false,
            currentPage: 0,
            startRange: 0,
            resultsPerPage: 100,
            //resultsPerPage: 10,
            totalnavsPagination: 10,
            vbindingtest: null,
            searchText: null,
            filterSelect: '',
            //reactiveDataSet
            selectedArgument:false,
            selectedName:'',
            merkFiltersSelected:[],
            newrangeArray: [
            ],
            sortedVoertuigenArr: [
            ],
            //LET OP!
            //set the prop value in the data object - to use UNIDIRECTIONAL DATA FLOW:
            //pass data from child to parent
            //isFavouriteData: this.isFavouriteProp
            reactiveVoertuigData: this.voertuigStore.getVoertuigList,
            voertuigDataInArrayLength: this.voertuigStore.getVoertuigList.length,
            
            //initial data state add form & fields comp
            inputFormTitle: "Addvoertuig",
        };
    },
    methods: {
        // emitFieldVal(argument){
        //     this.formfieldsReactive.custvoertuignameData = argument;
        //     console.log(this.formfieldsReactive.custvoertuignameData)
        //     //return argument
        // },
        addCustomItem() {
            console.log("addcustomitem"+ this.voertuigStore.customBrandVoertuiglist.length)
            let addCustvoertuigObj = {
                custvoertuignameData: this.formfieldsReactive.custvoertuignameData.toUpperCase(),
                custvoertuigkentekenData: this.formfieldsReactive.custvoertuigkentekenData.toUpperCase(),
                custvoertuighandelsnaamData: this.formfieldsReactive.custvoertuighandelsnaamData.toUpperCase(),
                custvoertuigsoortData: this.formfieldsReactive.custvoertuigsoortData.toUpperCase(),
            };
            //this.customBrandArrayRef.push(addCustvoertuigObj);
            this.voertuigStore.updateCustomBrandLists.push(addCustvoertuigObj)
            //this.voertuigStore.customBrandVoertuiglist.push(addCustvoertuigObj)
            //reset fields
            this.formfieldsReactive.custvoertuignameData = "";
            this.formfieldsReactive.custvoertuigkentekenData = "";
            this.formfieldsReactive.custvoertuighandelsnaamData = "";
            this.formfieldsReactive.custvoertuigsoortData = "";
        },
        setCustomParams(){
           
            let baseUrl = `http://localhost:5184/#/voertuigenpage?`;

            const getmyparams = new URLSearchParams( baseUrl.search);
            //let filternameparam = getmyparams.get("filtername");
            //getmyparams.delete('filtername', `merk`);
            //getmyparams.append('filtername', `merk`);
            const appendparam = function(){
               console.log("this.filterSelect"+this.filterSelect)
               getmyparams.append('filtername', `${this.filterSelect}`)
            }
            this.filterSelect?appendparam:false;
            //console.log('has params?:'+ getmyparams.has("filtername"));
            
            //console.log(filternameparam)
           // const currentUrl = location.href;
                // const url = new URL(currentUrl);
                
            // if (getmyparams.has("filtername")) {
            //     console.log('replace params:'+ getmyparams.has("filtername"));
            //     getmyparams.set("filtername", `${this.filterSelect}`)
            window.location.replace(`${baseUrl}${getmyparams}`);
            
            //      //console.log('show current url '+ currentUrl);
            // } 
            // if (!getmyparams.has("filtername")) {
            //     console.log('add new params:'+ getmyparams.has("filtername"));
            //     getmyparams.append('filtername', `${this.filterSelect}`)
                
            //     window.location.replace(`/voertuigenpage?${getmyparams}`);
            //      //console.log('show current url '+ currentUrl);
            // } 
            // getmyparams.has("filtername") ? getmyparams.set("filtername", `${this.filterSelect}`):getmyparams.append('filtername', `${this.filterSelect}`);
            return  getmyparams.has("filtername")
           
        },
        checkstores() {
            console.log("checkstoress");
            //console.log(this.voertuigStore.getChangedReactiveVoertuiglist)
            console.log(this.voertuigStore.updateCustomBrandLists)
        },
        outputFilter($event) {
            //landen op pagina, met de juiste sortering, lezen uit de url params
            //sortering initieren vanuit de params. 
            //active state setten in paginations menu
            this.filterSelect = $event.target.value;
            if (this.filterSelect != "") {
                this.filterResults = true;  
                console.log("this.filterSelect"+this.filterSelect);
                console.log("this.filterResults"+this.filterResults);
            }
            if (this.filterSelect == "") {
                this.filterResults = false;  
                console.log("this.filterSelect"+this.filterSelect);
                console.log("this.filterResults"+this.filterResults);
            }
            
            //console.log($event.target.value);
            //set filterResults 
            //filterparams = ?filterResults=true;
            //route.push('/newurl')
        },
        emitArrayRange: function (argument) {
            // console.log(`this.bedrijfsnaamArgument is : ${argument} from ,custom event: emitArrayRange
            //  , triggerd by the child component to parent component`)
            this.currentPage = argument;
            // this.newrangeArray =  this.voertuigStore.getVoertuigList.slice(2, 6);
            //  console.log(this.newrangeArray);
            this.setStartRange();
            
            // this.setCustomParams()?this.filterResults=true:this.filterResults = false;
           
            //check if filter value is used in url params and current selection state
            if((this.setCustomParams()) || (this.filterSelect != "")){
                console.log('setCustomParams is:'+ this.setCustomParams())
                this.filterResults = true;
                this.setStartRange();
            }else{
                console.log('setCustomParams is:'+ this.setCustomParams())
                this.filterResults = false;
            }
            
        },
        emitCheckboxValue: function (argument) {
            //  console.log(`emited argument is : ${argument} from ,custom event: emitCheckboxValue
            //   , triggerd by the child component to parent component`)
        this.selectedArgument = argument.thisSelected;
        this.selectedName = argument.thisCheckboxName

        if(this.selectedArgument){
            console.log("selected name: "+argument.thisCheckboxName +" & value is: "+ argument.thisSelected )
            this.merkFiltersSelected.push(argument.thisCheckboxName);
        }else{
            console.log("selection false- DONT push but DELETE: "+ argument.thisCheckboxName + argument.thisSelected);
           this.merkFiltersSelected.filter((deleteItem, index)=>{
                if(deleteItem ==  this.selectedName){
                    //this.brandArrayRef.push(argument);
                    let findindex = this.merkFiltersSelected.indexOf(deleteItem);
                    console.log("delete"+ deleteItem + findindex + index);
                    console.log(this.merkFiltersSelected);
                   // this.voertuigStore.deleteVoertuigByBrand(argument.thisCheckboxName);
                    delete this.merkFiltersSelected[findindex]; 
                }
                //To remove the duplicates, you use the filter() method to include only 
                //elements whose indexes match their indexOf values:
                //return removedItem
        })
        }
        this.filterResults = false; 
        this.filtercheckbox = true;

        },
        emitUpdateUserHistory: function (argument) {
          //  console.log(argument);
            
            this.voertuigStore.getHistoryList.push(argument);
            
            this.userhistory = true;
            //console.log(this.userhistory);

        },
        onEmitRemoveCustCar:function(payload){
       
            // this.customBrandArrayRef.filter((deleteItem, index)=>{
            //     if(index == payload){
            //         //this.brandArrayRef.push(argument);
            //         let findindex = this.customBrandArrayRef.indexOf(index);
            //         console.log("delete"+ "payload:"+ payload ,+"index:"+index );
            //         console.log(this.customBrandArrayRef);
            //        // this.voertuigStore.deleteVoertuigByBrand(argument.thisCheckboxName);
            //         delete this.customBrandArrayRef[findindex]; 
            //     }
            // }
                for( var i = 0; i < this.voertuigStore.customBrandVoertuiglist.length; i++){ 
                    console.log("use indexOf on item: " +  this.voertuigStore.customBrandVoertuiglist[i].custvoertuignameData)
                    if (  i === payload) { 
                        console.log("payload:" + payload)
                        this.voertuigStore.customBrandVoertuiglist.splice(payload, 1); 
                       // i--; 
                    }
                //To remove the duplicates, you use the filter() method to include only 
                //elements whose indexes match their indexOf values:
                //return removedItem
            }
        },
        setStartRange() {
            //return this.setTotalPages ;
            this.startRange = (this.voertuigStore.getVoertuigList.length / this.totalnavsPagination) * this.currentPage
            //console.log(startRange*argument);
            // console.log(this.currentPage*this.startRange);
            return this.startRange;
        },
        makeNavPagination() {
          // console.log('make page navigation')
           return new Array(this.totalnavsPagination);
        },
        setEndRange() {
          //  console.log('endrange set')
            return this.setStartRange() + 100;
        },
        collectbrands(){
             //reset ref
             this.brandArrayRef = ref([]);
             this.brandArrayRef = this.voertuigStore.getAllBrands.filter((knownItem, index)=>{
                if(knownItem){
                    this.brandArrayRef.push(knownItem.merk).value;
                }
                //To remove the duplicates, you use the filter() method to include only 
                //elements whose indexes match their indexOf values:
                return this.brandArrayRef.indexOf(knownItem.merk) === index;
            });
            console.log("collectbrands()");
             console.log(this.brandArrayRef.length);
        },
        keepSelected(){
             //reset ref
             
            //  let updatebrandsArr = [];
            // updatebrandsArr = this.voertuigStore.getVoertuigByBrand.filter((knownItem, index)=>{
            //     if(knownItem){
            //         console.log('knownItem.merk')
            //        
            //         // updatebrandsArr.push(knownItem.merk).value;
            //     }
            // });
            // return updatebrandsArr;
        //    console.log(this.voertuigStore.getVoertuigByBrand('OPEL') )
          
           // let updatebrandsArr = [];
            // this.merkFiltersSelected.forEach(keepbrand);
            //         function keepbrand(keepitem, index){
            //             //merkFiltersSelected.length
            //             console.log(keepitem)
            //             //Passing arguments to getters
            //             this.voertuigStore.getVoertuigByBrand("FORD");
            //         }
          //   return updatebrandsArr;
           
        },
        
    },
    //COMPUTED: 
    //-are configurations that add functions to binding :bind
    // should be used as a property not as data
    //-with computed properties, VUE is aware of the dependancys.
    //-it uses the cache memory. Its Performance better than Methods:

    // --------------Difference with methods: 
    //YOU only want to change 1 value when 1 dependancy in  //data properies - changes. 
    //YOU only want to change 1 value when 1 dependency changes.NOT all..
    //Not change all because of one change in one of the existing data depandancy..
    // so only to check and return or display allready-known & 
    // -calculated values (from methods:) to the user-interface
    computed: {
        
        // computeCustomitems(){
        //     return this.customBrandArrayRef
        // },
        computeCustomitems(){
            return this.voertuigStore.customBrandVoertuiglist;
        },
        setPages() {
            // console.log("computed startrange setPages():" + this.setStartRange())
            return this.setStartRange();
            // return (this.setStartRange ? 0 : this.setStartRange)
        },
        setPagesNav() {
            return this.setTotalPages;
            // return (this.setStartRange ? 0 : this.setStartRange)
        },
        setTotalPages() {
            return this.voertuigStore.getVoertuigList.length / this.resultsPerPage;
        },
        setIndexVoertuigen() {
            //return this.voertuigStore.reactiveVoertuiglist;
            return this.voertuigStore.getChangedReactiveVoertuiglist

        },
        searchSortVoertuigen() {
            //i : filter on case-insenitive
            let searchTextfield = new RegExp(this.searchText, 'i')
            if (this.filterSelect != "") {
                console.log('filterSelect != ""');
                const searchedVoertuigen = this.sortVoertuigenMerk.filter(
                function (item) {
                    return item.merk.match(searchTextfield);
                });
                return searchedVoertuigen
            }else{
                console.log('getChangedReactiveVoertuiglist');
                return this.voertuigStore.getChangedReactiveVoertuiglist;
            }
        },
        searchVoertuigen() {
            //i : filter on case-insenitive
            let searchTextfield = new RegExp(this.searchText, 'i')
            if (this.searchText != null) {
                console.log('searchText != null');
                const searchedVoertuigen = this.sortVoertuigenMerk.filter(
                function (item) {
                    return item.merk.match(searchTextfield);
                });
                return searchedVoertuigen
            }else{
                
                return this.voertuigStore.getChangedReactiveVoertuiglist;
            }
        },
        //this is for shwowing the gui number "Aantal merken geselecteerd"
        checkBoxSelectedArray(){
            const returnedArray = this.merkFiltersSelected.filter(showselected)
            function showselected(item, index) {
              // console.log("item?"+ item) 
                 return item;
                }
            return returnedArray;
        },
        checkboxSelectedMerk(){
         // console.log("merkFiltersSelected used"+this.filtercheckbox)
         if(this.filtercheckbox){
            console.log('checkboxSelectedMerk using - selectedVoertuigen find..'+ this.filtercheckbox);
             //return this.merkFiltersSelected;
             const selectedMerken = this.merkFiltersSelected;
             const selectedVoertuigen = this.voertuigStore.getChangedReactiveVoertuiglist.filter(
                function (item,index) {
                    return item.merk.match(selectedMerken[0]);
                 //console.log(item)
                });
                return selectedVoertuigen;
          }else{
          //  console.log('searchSortVoertuigen using - getChangedReactiveVoertuiglist'+ this.filtercheckbox);
            return this.voertuigStore.getChangedReactiveVoertuiglist;
           
          }
        },
        sortVoertuigenMerk() {
            if  (this.filterSelect != "") {
                     const sortedVoertuigen = this.voertuigStore.getChangedReactiveVoertuiglist.sort((p1, p2) => {
                    if (this.filterSelect == 'merk') {
                        if (p1.merk < p2.merk) return -1;
                        if (p1.merk > p2.merk) return 1;
                    } else if (this.filterSelect == 'kenteken') {
                        if (p1.kenteken < p2.kenteken) return -1;
                        if (p1.kenteken > p2.kenteken) return 1;
                    } else if (this.filterSelect == 'handelsbenaming') {
                        if (p1.handelsbenaming < p2.handelsbenaming) return -1;
                        if (p1.handelsbenaming > p2.handelsbenaming) return 1;
                    }
                    // return 0;
                });
                //this.sortedVoertuigenArr = sortedVoertuigen
               // console.log("this.sorddtedVoertuigenArr"+this.sortedVoertuigenArr[0].merk)
                return sortedVoertuigen;
            }else{
             return this.voertuigStore.getChangedReactiveVoertuiglist;
            }
            //console.log(sortedVoertuigen);
        },
        computeResults(){
            const newtotalResults =this.searchText!=null?this.searchSortVoertuigen.length:this.voertuigStore.getChangedReactiveVoertuiglist.length; 
            //this.totalResults = this.searchSortVoertuigen.length; 
            // console.log( this.searchSortVoertuigen.length)
            // console.log( this.voertuigStore.getChangedReactiveVoertuiglist.length)
            return newtotalResults;
        },
        computeBrandArray(){
            let theArr = [];
            theArr = this.voertuigStore.getAllBrands.filter((knownItem, index)=>{
                if(knownItem){
                    theArr.push(knownItem.merk).value;
                }
                return theArr.indexOf(knownItem.merk) === index;
            });
            return  theArr;
        },
        // showSelectedBrandsList(){
        //     console.log("return getBrandVoertuigList")
        //     return this.voertuigStore.getBrandVoertuigList;
        // },
        updateSelectedBrands(){   
           // console.log(this.merkFiltersSelected[0])
            const returnSelectedBrands = this.merkFiltersSelected.filter(showselected)
                function showselected(item, index) {
                    console.log('updateSelectedBrands forEach item :'+ item +'index: '+index)
                    return item;                    
                }
                console.log(returnSelectedBrands + this.selectedArgument);
                //passing params for store update 
                const storeUpdateParams = {
                    'valueSelected':this.selectedArgument,
                    'checkboxName': this.selectedName 
                    //'checkboxName': returnSelectedBrands[0]
                }

                //only passing the first item in the returnSelectedBrands
                
            return this.voertuigStore.getVoertuigByBrand(storeUpdateParams);
        }
    },
    //YOU repeat the names from //data properies  //for example 'counter'
    // - in the 'watch:' object - as functions() - to watch changes between them. 
    watch: {
        //value is the default parameter/argument that comes with a watch: propertie. 
        checkBoxSelectedArray(value) {
            if (value.length < 1) {
                console.log("no more selections");
                //this.roundCount = 0;
                this.filtercheckbox = false;
                this.voertuigStore.resetselectedBrandVoertuiglist;
            }
        },
        startRange(value) {
            //watch: - only checks for - this.playerHealth
            if (value >= 0) {
                console.log(`watch startRange : ${this.startRange} new`);
            }
        },
        currentPage(value) {
            if (value >= 0) {
               // console.log("watch currentpage" + this.currentPage);
                 //add class when value is changed.
                    let elements = document.querySelectorAll('[data-cur-page]');
                    elements.forEach(element => {
                     //   console.log(element.getAttribute("data-cur-page")) 
                        if (this.currentPage == element.getAttribute("data-cur-page")) {
                            //console.log("addclass")  
                            element.classList.add('active'); 
                        } else {
                            element.classList.remove('active'); 
                        }
                    });
                //return this.currentPage
            }
        },
        filterSelect(value) {
            //if (value == 'merk') {
                console.log('watch change filter value to: ' + value)
                // this.outputFilter(value)
                //this.setCustomParams()
                console.log('watch this.setCustomParams():' + this.setCustomParams());
                //console.log("filterSelect() lifecycle Voertuig page" +  document.querySelector(".item"));
           // }
        },
        searchText(value){
            console.log('watch searchText: ' + value)
            if(!value){
                console.log('set searchText to null')
                this.searchText = null
            }
           // this.searchSortVoertuigen
        }
    },
    //options api lifecycle hook created()
    created() {
        this.voertuigStore.fetchVoertuigen();
       // console.log("created() lifecycle Voertuig page" +  document.querySelector(".item"));
    //    document.querySelector(".item").classList.add('active')
    },
    mounted() {
    //   console.log("onMounted() lifecycle Voertuig page"+  document.querySelector(".item"));
    //   console.log("onMounted()"+  document.querySelector(".container"));
    //   document.addEventListener('DOMContentLoaded', function () {
    //     // INSERT CODE HERE
    //     console.log("DOMContentLoaded"+  document.querySelector(".item"));
    // });
      //const paginationComp = document.getElementsByClassName("paginationComp")
    //   const paginationCompItem = document.querySelector(".item");
    //   paginationCompItem.classList.add('active');
     // document.querySelector(".item")[0].classList.add('active');
   //console.log("onMounted() lifecycle show element ref");

   
   //add the first two default dummy data to the customBrandVoertuiglist         
   //this.voertuigStore.customBrandVoertuiglist.push(this.customBrandArrayRef[0])
   //console.log("onMounted() lifecycle "+ this.voertuigStore.customBrandVoertuiglist.length);
            //customBrandArrayRef
            // console.log(inputElementRef.value.tagName);
            // inputElementRef.value.tagName
       
    },

    //to comunicate for developers on howmany or wich emit events there are. 
    emits: [
        'emit-update-user-history',
        'emit-array-range'
    ]
}
</script>

<template>
    <div class="row">
        <header class="col-12">
            <h1>{{ this.title }}</h1>
        </header>
    </div>
    <div class="row">
        <aside class="col-sm-12 col-md-3">
            <a href="voertuigenpage#/voertuigenpage"  @click.prevent="composeUrlTrack.updateUrlTrack(),checkstores()" class="btn btn-outline-secondary">show composable last url</a>
          <ul>
            <!-- <li>composeUrlTrack:{{ composeUrlTrack }}</li>
            <li>computeUrlTrack: {{ this.computeUrlTrack  }}</li> -->
          </ul>  
            <h3>show history</h3>
            <ul class="history" v-if="this.voertuigStore.getHistoryList.length > 0" v-for="(historyItem, index) in this.voertuigStore.getHistoryList"  :key="index" >
                <li>{{ index }}: {{ historyItem }}
                <span>
                    <router-link :to="`/voertuigdetailpage/${historyItem}`">
                        id: {{ historyItem}}
                    </router-link>
                </span>
            </li>
            </ul>
            <ul class="history" v-else>
                <li>no user history</li>
            </ul>
            <article>
                <ul class="huddata">
                    <li>
                        <button @click="keepSelected()" class="btn">show params</button>
                    </li>
                    <li>
                        paginationNavs: {{ this.makeNavPagination().length }}
                    </li>
                    <li>
                        StartRange: {{ this.setPages }}
                    </li>
                    <li>
                        EndRange: {{ this.setEndRange() }}
                    </li>
                    <li>
                        setPages {{ this.setPages }}
                    </li>
                    <li>
                        currentpage {{ this.currentPage }}
                    </li>
                    <li>
                        totalPages: {{ this.setTotalPages }}
                    </li>
                    <li>
                        setPagesNav: {{ this.setPagesNav }}
                    </li>
                </ul>
            </article>
            <form class="py-1">
                    <label class="form-label" for="filter1">sorteer op:</label>
                    <select id="filter1" name="filter1" class="form-select" @change="outputFilter($event)" aria-label="Default select example">
                        <option value=""> selecteer</option>
                        <option value="merk">Merk</option>
                        <option value="kenteken">Kenteken</option>
                        <option value="handelsbenaming">Handelsbenaming</option>
                    </select>
                    <label class="form-label" for="filter1">zoeken op:</label>
                    <input type="search" class="form-control" v-model="this.searchText" placeholder="zoek op merk">      
                    <fieldset>
                        <hr>
                        Totaal aantal merken"{{ this.computeBrandArray.length }}
                        <hr>
                        Aantal merken geselecteerd: {{ this.checkBoxSelectedArray.length }}
                        Geselecteerde voertuigen: {{ this.checkBoxSelectedArray }}
                        <hr>
                        <legend>filter op merk <div>aantal merken <span>{{this.checkboxSelectedMerk.length}}</span></div></legend>
                    <filtercheckbox-comp v-for="(checkboxitem, index) in this.computeBrandArray" :key="index" :checkbox-name-prop="checkboxitem.merk"
                    :check-id-prop="index" :checkbox-value-prop="checkboxitem.merk" @emit-checkbox-value="emitCheckboxValue">
                    </filtercheckbox-comp >
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="save-info">
                            <label class="form-check-label" for="save-info">direct check</label>
                        </div>
                    </fieldset>
                </form>
        </aside>
    <main  class="col-sm-12 col-md-9">
        <section>
            <form @submit.prevent="addCustomItem">
                    <h3>Add custom voertuig</h3>
                   v-model:{{ this.formfieldsReactive.custvoertuignameData }}
                    <div class="form-group" ref="inputElementRef">  
                        <div class="form-group">
                            <!-- v-model binds the valueProp from the child comp with the Data object from the parent comp-->
                            <form-field-comp  v-model:inputFieldValueProp="this.formfieldsReactive.custvoertuignameData" :aria-describedby-prop="inputfieldsObjRef.inputfield1" :input-field-id-prop='0'  :input-field-name-prop="inputfieldsObjRef.inputfield1" :input-field-placeholder-prop="inputfieldsObjRef.inputfield1">         
                            </form-field-comp> 
                        </div> 
                        <div class="form-group">
                            <form-field-comp v-model:inputFieldValueProp="this.formfieldsReactive.custvoertuigkentekenData" :aria-describedby-prop="inputfieldsObjRef.inputfield2"  :input-field-id-prop='1'  :input-field-name-prop="inputfieldsObjRef.inputfield2" :input-field-placeholder-prop="inputfieldsObjRef.inputfield2">         
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
        <section>
            <ul class="paginationComp test">
                <pagination-comp v-for="(voertuig, index) in this.setPagesNav" :key="index" :pagination-index-prop="index"
                    :pagination-id-prop="index" :current-page-prop="index"    @emit-array-range="emitArrayRange">
                </pagination-comp>
            </ul>
            <div class="resultsTotal">
            Totaal aantal custom voertuigen:  {{ this.voertuigStore.customBrandVoertuiglist.length }} 
              
            </div>
            <div class="results"> 
                <!-- <mark>Added custom voertuigen : <pre> {{ this.customBrandArrayRef }}</pre></mark> -->
                <mark>Added custom voertuigen : <pre>{{this.voertuigStore.customBrandVoertuiglist}}</pre></mark>
                <custom-voertuig-comp v-for="(voertuig, index) in this.computeCustomitems"
                    :key="index" :index-prop="index"
                    :cust-voertuig-id-prop="index" 
                    :cust-voertuig-name-prop="voertuig.custvoertuignameData"
                    :cust-voertuig-soort-prop="voertuig.custvoertuigsoortData" 
                    :cust-voertuig-kenteken-prop="voertuig.custvoertuigkentekenData"
                    :cust-voertuig-handelsbenaming-prop="voertuig.custvoertuighandelsnaamData"
                    @emit-update-user-history="emitUpdateUserHistory"
                    @emit-remove-cust-car="onEmitRemoveCustCar">
                </custom-voertuig-comp>
            </div>
            <div class="resultsTotal" v-if="this.voertuigStore.selectedBrandVoertuiglist.length > 0" >
                {{ this.voertuigStore.selectedBrandVoertuiglist.length }} results van Totaal  {{ computeResults }}  default voertuigen.
            </div>
            <div class="resultsTotal" v-else>
                 Totaal  {{ computeResults }}  default voertuigen.
            </div>
            <div class="results filterResultstrue searchresultsfalse" v-if="this.filterResults==true && this.searchText==null && filtercheckbox==false">
                <mark>Sort results ONLY on : {{ filterSelect }} - filterResults: {{ filterResults }}</mark>
                <voertuig-comp v-for="(voertuig, index) in this.sortVoertuigenMerk.slice(this.setPages, this.setEndRange())"
                    :key="index" :index-prop="index" :voertuig-id-prop="voertuig.id" :voertuig-name-prop="voertuig.merk"
                    :voertuig-soort-prop="voertuig.voertuigsoort" :voertuig-kenteken-prop="voertuig.kenteken"
                    :voertuig-handelsbenaming-prop="voertuig.handelsbenaming"
                    @emit-update-user-history="emitUpdateUserHistory">
                </voertuig-comp>
            </div>
            <div class="results filterResultstrue searchresultstrue" v-if="this.filterResults==true && this.searchText!=null && this.filtercheckbox==false">
                <mark>Search+sort results ONLY : {{ filterSelect }} - filterResults: {{ filterResults }}</mark>
                <voertuig-comp v-for="(voertuig, index) in this.searchSortVoertuigen.slice(this.setPages, this.setEndRange())"
                    :key="index" :index-prop="index" :voertuig-id-prop="voertuig.id" :voertuig-name-prop="voertuig.merk"
                    :voertuig-soort-prop="voertuig.voertuigsoort" :voertuig-kenteken-prop="voertuig.kenteken"
                    :voertuig-handelsbenaming-prop="voertuig.handelsbenaming"
                    @emit-update-user-history="emitUpdateUserHistory">
                </voertuig-comp>
            </div>
            <div class="results filterResultstrue searchresultstrue" v-if="this.filterResults==false && this.searchText!=null && this.filtercheckbox==true">
                <mark>Search+check results ONLY : {{ filterSelect }} - filterResults: {{ filterResults }}</mark>
                <voertuig-comp v-for="(voertuig, index) in this.searchSortVoertuigen.slice(this.setPages, this.setEndRange())"
                    :key="index" :index-prop="index" :voertuig-id-prop="voertuig.id" :voertuig-name-prop="voertuig.merk"
                    :voertuig-soort-prop="voertuig.voertuigsoort" :voertuig-kenteken-prop="voertuig.kenteken"
                    :voertuig-handelsbenaming-prop="voertuig.handelsbenaming"
                    @emit-update-user-history="emitUpdateUserHistory">
                </voertuig-comp>
            </div>
            <div class="results filterResultstrue searchresultstrue" v-if="this.filterResults==true && this.searchText==null && this.filtercheckbox==true">
                <mark>Sort+Check results ONLY : {{ filterSelect }} - filterResults: {{ filterResults }}</mark>
                <voertuig-comp v-for="(voertuig, index) in this.updateSelectedBrands.slice(this.setPages, this.setEndRange())"
                    :key="index" :index-prop="index" :voertuig-id-prop="voertuig.id" :voertuig-name-prop="voertuig.merk"
                    :voertuig-soort-prop="voertuig.voertuigsoort" :voertuig-kenteken-prop="voertuig.kenteken"
                    :voertuig-handelsbenaming-prop="voertuig.handelsbenaming"
                    @emit-update-user-history="emitUpdateUserHistory">
                </voertuig-comp>
            </div>
            <div class="results filterResultsfalse searchresultstrue filtercheckboxfalse" v-if="this.filterResults==false && this.searchText!=null && this.filtercheckbox==false">
                <mark>Search results ONLY - filterResults: {{ filterResults }} filtercheckbox{{ filtercheckbox  }}</mark>
                <voertuig-comp ref="userhistory" v-for="(voertuig, index) in this.searchVoertuigen.slice(this.setPages, this.setEndRange())"
                    :key="index" :index-prop="index" :voertuig-id-prop="index" :voertuig-name-prop="voertuig.merk"
                    :voertuig-soort-prop="voertuig.voertuigsoort" :voertuig-kenteken-prop="voertuig.kenteken"
                    :voertuig-handelsbenaming-prop="voertuig.handelsbenaming"
                    @emit-update-user-history="emitUpdateUserHistory">
                </voertuig-comp>
            </div>
            <div class="results filterResultsfalse searchresultsfalse filtercheckboxtrue" v-if="this.filterResults==false && this.searchText==null && this.filtercheckbox==true">
                <mark>Checkbox results ONLY - filterResults: {{ filterResults }} with checkbox {{ filtercheckbox }}</mark>
                <mark><pre>{{checkBoxSelectedArray}}</pre></mark>
                <voertuig-comp ref="userhistory" v-for="(voertuig, index) in this.updateSelectedBrands.slice(this.setPages, this.setEndRange())"
                    :key="index" :index-prop="index" :voertuig-id-prop="index" :voertuig-name-prop="voertuig.merk"
                    :voertuig-soort-prop="voertuig.voertuigsoort" :voertuig-kenteken-prop="voertuig.kenteken"
                    :voertuig-handelsbenaming-prop="voertuig.handelsbenaming"
                    @emit-update-user-history="emitUpdateUserHistory">
                </voertuig-comp>
            </div>
            
            <div class="results filterResultsfalse searchresultsfalse filtercheckboxfalse" v-if="this.filterResults==false && this.searchText==null && this.filtercheckbox==false">
                <mark>default results no filter used</mark>
                <voertuig-comp ref="userhistory" v-for="(voertuig, index) in this.voertuigStore.getChangedReactiveVoertuiglist.slice(this.setPages, this.setEndRange())"
                    :key="index" :index-prop="index" :voertuig-id-prop="index" :voertuig-name-prop="voertuig.merk"
                    :voertuig-soort-prop="voertuig.voertuigsoort" :voertuig-kenteken-prop="voertuig.kenteken"
                    :voertuig-handelsbenaming-prop="voertuig.handelsbenaming"
                    @emit-update-user-history="emitUpdateUserHistory">
                </voertuig-comp>
            </div>
            <div class="results filterResultsfalse searchresultsfalse filtercheckboxfalse" v-if="this.filterResults==true && this.searchText!=null && this.filtercheckbox==true">
                <mark>No selection possible - checkbox {{ filtercheckbox }}</mark>
            </div>
            <!-- use a "child" <router-view> in the parent page 
                //when using children routes. SEE children routes in router.js
                //to generate a page - within a page  -->
            <!-- <router-view></router-view> -->

        </section>
    </main>
</div>
</template>

<style scoped lang="scss">
mark{
    margin: 1rem 0px;
    color: #636363;
    background-color: #282828;
    display: block;
    position: relative;
}
.results{
    display: flex;
    flex-direction: column;
}
.resultsTotal{
    color:#155f3e; 
    text-align: right;
    font-weight: bold;

}
.huddata {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-start;
    list-style: none;
    padding: 0px;
        li {
            list-style: none;
            padding: 0.5rem 0px;
        }
}
h3{
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #636363;
}
ul{
    color: #636363; 
    border-bottom: solid 1px #636363;
    padding-bottom: 1rem;
     &.history{
        li{
            color: #636363; 
        }
    }

}

form{
    color:#636363;
    background-color: #282828;
    padding: 1rem;
    border-radius: 0.5rem;
    legend{
        font-size: 1rem;
        padding-top: 1rem;
    }
}
.form-label{
    color: #636363; 
}
.btn{
 background-color: #282828;
 color: #aac8e4;
 border: solid 1px #33a06f;
 display: block;

 
}



.paginationComp{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: left;
    padding: 1rem 0rem;
    li{
        list-style: none;
    }
}


</style>
