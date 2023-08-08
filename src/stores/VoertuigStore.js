import { defineStore } from "pinia";
import { onMounted } from "vue";

//as the name of the file 'bookStore'
export const useVoertuigStore = defineStore('VoertuigStore', {
  //The state is defined as a function returning the initial state
    state: function () {
        return {
          //reactiveDataSet
          reactiveVoertuiglist:[

          ],
          changedReactiveVoertuiglist:[

          ],
          historylist:[

          ],
          filteredlist:[

          ]
        };
      },
      //Getters are synchronous functions used to retrieve data from the state
    getters: {
      getVoertuigList:function(state){
        return state.reactiveVoertuiglist
      },
      getChangedReactiveVoertuiglist:function(state){
        this.reactiveVoertuiglist.forEach(addIndex);
                    function addIndex(item, index){
                      state.changedReactiveVoertuiglist.push({
                        'id':index,
                        'kenteken': item.kenteken,
                        'voertuigsoort': item.voertuigsoort,
                        'merk': item.merk,
                        'handelsbenaming': item.handelsbenaming,
                       })   
                } 
              return state.changedReactiveVoertuiglist      
      },
      getHistoryList:function(state){
        return state.historylist;
      },
      getFilteredList:function(state){
        return state.filteredlist = state.reactiveVoertuiglist.map(function(item){
          //return ({'merk':item.merk});
          return item;
        });
      },
      getVoertuigByKenteken:function (state) {
        return function (argument) {
          return state.reactiveVoertuiglist.find(function (item) {
            //console.log(item.kenteken)
            return item.kenteken === argument;
          });
        };
      }
    },
    //Actions are functions that can also be asynchronous which are used to update the state
    actions:{
        async fetchVoertuigen(){
            const response = await fetch('https://opendata.rdw.nl/resource/m9d7-ebf2.json?voertuigsoort=Personenauto'
            ).then(function (response) {
               // console.log(response)
                return response.json();            
            });
            this.reactiveVoertuiglist = response;
        }
    }
  })
 
 