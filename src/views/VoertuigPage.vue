<script>

import VoertuigComp from '../components/VoertuigComp.vue';
import PaginationComp from '../components/PaginationComp.vue';
import { useVoertuigStore } from '../stores/VoertuigStore';
import { useRoute } from 'vue-router';
import { ref } from 'vue'
import { useUrlTrack } from '../composables/composeUrlTrack';

//import { onMounted } from "vue";

export default {
    //using composition api with setup() as am option from the option API
    setup() {
        const voertuigStore = useVoertuigStore();
        const route = useRoute();
        const userhistory = ref(false);
        const composeUrlTrack = useUrlTrack();
        return {
            voertuigStore,
            route,
            userhistory,
            composeUrlTrack
        }
    },
    //end using composition api with setup()
    components: {
        VoertuigComp,
        PaginationComp
    },
    data() {
        return {
            data1: false,
            title: "Overzichts pagina",
            data2: 'this is some data from Voertuig DB home page',
            filterResults: false,
            currentPage: 0,
            startRange: 0,
            resultsPerPage: 100,
            //resultsPerPage: 10,
            totalnavsPagination: 10,
            vbindingtest: null,
            searchText: '',
            filterSelect: null,
            //reactiveDataSet
            newrangeArray: [
            ],
            //LET OP!
            //set the prop value in the data object - to use UNIDIRECTIONAL DATA FLOW:
            //pass data from child to parent
            //isFavouriteData: this.isFavouriteProp
            reactiveVoertuigData: this.voertuigStore.getVoertuigList,
            voertuigDataInArrayLength: this.voertuigStore.getVoertuigList.length
            //voertuigDataInArray: fruits.push({ name: 'Banana', amount: 4 });
        }
    },
    methods: {
        checkstores() {
            console.log(this.voertuigStore.getChangedReactiveVoertuiglist)
        },
        outputFilter($event) {
            //landen op pagina, met de juiste sortering, lezen uit de url params
            //sortering initieren vanuit de params. 
            //active state setten in paginations menu

            this.filterSelect = $event.target.value;
            console.log(this.filterSelect);
            console.log($event.target.value);
            //set filterResults
            this.filterResults = true;
            //filterparams = ?filterResults=true;

            // Retrieve params via url.search, passed into constructor
            //const url = new URL("https://example.com?foo=1&bar=2");
            //const params1 = new URLSearchParams(url.search);

            // Get the URLSearchParams object directly from a URL object
            //const params1a = url.searchParams;

            // Pass in a string literal
            //const params2 = new URLSearchParams("foo=1&bar=2");
            //const params2a = new URLSearchParams("?foo=1&bar=2");
            const newUrl = `${window.location.hash}?filterResults=${this.filterSelect}`;

            window.location.replace(newUrl);
           //route.push('/newurl')
        },
        emitArrayRange: function (argument) {
            console.log(`this.bedrijfsnaamArgument is : ${argument} from ,custom event: emitArrayRange
             , triggerd by the child component to parent component`)
            this.currentPage = argument;
            // this.newrangeArray =  this.voertuigStore.getVoertuigList.slice(2, 6);
            //  console.log(this.newrangeArray);
            
            this.setStartRange();
            this.filterResults = false;
           
            
        },
        emitUpdateUserHistory: function (argument) {
            console.log(argument);
            
            this.voertuigStore.getHistoryList.push(argument);
            
            this.userhistory = true;
            console.log(this.userhistory);

        },
        setStartRange() {
            //return this.setTotalPages ;
            this.startRange = (this.voertuigStore.getVoertuigList.length / this.totalnavsPagination) * this.currentPage
            //console.log(startRange*argument);
            // console.log(this.currentPage*this.startRange);
            return this.startRange;
        },
        makeNavPagination() {
            // console.log( new Array(this.totalnavsPagination))
            return new Array(this.totalnavsPagination);
        },
        setEndRange() {
            return this.setStartRange() + 100;
        }
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
        setPages() {
            console.log("computed startrange setPages():" + this.setStartRange())
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
        searchVoertuigen() {
            //i : filter on case-insenitive
            let searchTextfield = new RegExp(this.searchText, 'i')
            return this.voertuigStore.getVoertuigList.filter(
                function (item) {
                    //return item.merk.match(searchTextfield);
                    return item.merk.match(searchTextfield);
                });
        },
        sortVoertuigenMerk() {
            const currentfilterVal = this.filterSelect;
            console.log(currentfilterVal);
            console.log(typeof currentfilterVal);
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
            console.log(sortedVoertuigen);
            return sortedVoertuigen

        }
    },
    //YOU repeat the names from //data properies  //for example 'counter'
    // - in the 'watch:' object - as functions() - to watch changes between them. 
    watch: {
        //value is the default parameter/argument that comes with a watch: propertie. 
        roundCount(value) {
            if (value % 3 === 0) {
                console.log("special attack 100%");
                //this.roundCount = 0;
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
                console.log("watch currentpage" + this.currentPage);
                 // .getAttribute("data-cur-page");
                    let elements = document.querySelectorAll('[data-cur-page]');
                    elements.forEach(element => {
                        console.log(element.getAttribute("data-cur-page")) 
                        if (this.currentPage == element.getAttribute("data-cur-page")) {
                            console.log("addclass")  
                            element.classList.add('active'); 
                        } else {
                            element.classList.remove('active'); 
                        }
                    });
                //return this.currentPage
            }
        },
        filterSelect(value) {
            if (value == 'merk') {
                console.log('watch change filter to merk: ' + value)
                // this.outputFilter(value)
            }
        }
    },
    created() {
        this.voertuigStore.fetchVoertuigen();
    },
    mounted() {
        console.log("onMounted() lifecycle Voertuig page");
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
            <a href="voertuigenpage#/voertuigenpage" @click.prevent="composeUrlTrack.updateUrlTrack()" class="btn btn-outline-secondary">back</a>
          <ul>
            <li>composeUrlTrack:
               {{ composeUrlTrack }}</li>
               <li>computeUrlTrack: {{ this.computeUrlTrack  }}</li>
          </ul>  
            <h3>show history</h3>
            <ul class="history" v-if="this.voertuigStore.getHistoryList.length > 0" v-for="(historyItem, index) in this.voertuigStore.getHistoryList">
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
                        <button @click.prevent="checkstores" class="btn">show log</button>
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
                    <label class="form-label" for="filter1">filteren op:</label>
                    <select id="filter1" name="filter1" class="form-select" @change="outputFilter($event)" aria-label="Default select example">
                        <option value=""> selecteer</option>
                        <option value="merk">Merk</option>
                        <option value="kenteken">Kenteken</option>
                        <option value="handelsbenaming">Handelsbenaming</option>
                    </select>
                   
                    <label class="form-label" for="filter1">zoeken op:</label>
                    <input type="search" class="form-control" v-model="this.searchText" placeholder="zoek op merk">      
                    <fieldset>
                        <legend>filter op merk</legend>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="save-info">
                        <label class="form-check-label" for="save-info">Alfa romeo</label>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="save-info">
                        <label class="form-check-label" for="save-info">Opel</label>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="save-info">
                        <label class="form-check-label" for="save-info">Mercedes</label>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="save-info">
                        <label class="form-check-label" for="save-info">Ford</label>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="save-info">
                        <label class="form-check-label" for="save-info">Peugot</label>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="save-info">
                        <label class="form-check-label" for="save-info">BMW</label>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="save-info">
                        <label class="form-check-label" for="save-info">Audi</label>
                    </div>
                    </fieldset>
                </form>
        </aside>
    <main  class="col-sm-12 col-md-9">
        <section>
            <ul class="paginationComp">
                <pagination-comp v-for="(voertuig, index) in this.setPagesNav" :key="index" :pagination-index-prop="index"
                    :pagination-id-prop="index" :current-page-prop="index" @emit-array-range="emitArrayRange">
                </pagination-comp>
            </ul>

            <div class="results" v-if="filterResults == true">
                <mark>filtered on : {{ filterSelect }}</mark>
                <voertuig-comp v-for="(voertuig, index) in this.sortVoertuigenMerk.slice(this.setPages, this.setEndRange())"
                    :key="index" :index-prop="index" :voertuig-id-prop="voertuig.id" :voertuig-name-prop="voertuig.merk"
                    :voertuig-soort-prop="voertuig.voertuigsoort" :voertuig-kenteken-prop="voertuig.kenteken"
                    :voertuig-handelsbenaming-prop="voertuig.handelsbenaming"
                    @emit-update-user-history="emitUpdateUserHistory">
                </voertuig-comp>

            </div>
            <div class="results" v-else>
                <mark>default results</mark>
                <voertuig-comp ref="userhistory" v-for="(voertuig, index) in searchVoertuigen.slice(this.setPages, this.setEndRange())"
                    :key="index" :index-prop="index" :voertuig-id-prop="index" :voertuig-name-prop="voertuig.merk"
                    :voertuig-soort-prop="voertuig.voertuigsoort" :voertuig-kenteken-prop="voertuig.kenteken"
                    :voertuig-handelsbenaming-prop="voertuig.handelsbenaming"
                    @emit-update-user-history="emitUpdateUserHistory">
                </voertuig-comp>
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
.huddata {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-start;
    list-style: none;
        li {
            list-style: none;
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
 color: #636363;
}



.paginationComp{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem 0rem;
    li{
        list-style: none;
    }
}


</style>
