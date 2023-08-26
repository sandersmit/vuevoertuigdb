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

          ],
          brandVoertuiglist:[

          ],
          selectedBrandVoertuiglist:[

          ]
        };
      },
      //Getters are synchronous functions used to retrieve data from the state
    getters: {
      getVoertuigList:function(state){
        return state.reactiveVoertuiglist
      },
      getChangedReactiveVoertuiglist:function(state){
        state.changedReactiveVoertuiglist.length = 0;
        //console.log("state.changedReactiveVoertuiglist: "+ state.changedReactiveVoertuiglist)
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
      //Passing arguments to getters
      getVoertuigByKenteken:function (state) {
        return function (argument) {
          return state.reactiveVoertuiglist.find(function (item) {
            //console.log(item.kenteken)
            return item.kenteken === argument;
          });
        };
      },
      //reset voertuiglist to 0
      resetselectedBrandVoertuiglist:function (state) { 
        state.selectedBrandVoertuiglist.length = 0;
        console.log(state.selectedBrandVoertuiglist.length)
      },
      //UPDATE: PUSH array state. Passing arguments to getters
      getVoertuigByBrand:function (state) { 
              return function (newStoreUpdateParams) {
               
                if( newStoreUpdateParams.valueSelected ){
                console.log("store keepitem true?: " + newStoreUpdateParams.valueSelected)
                  state.reactiveVoertuiglist.forEach(function (item, index) {
                 // console.log("filter keepitem?: " + keepitem + item.id)
                  if (item.merk === newStoreUpdateParams.checkboxName){
                   // console.log("push?")
                    state.selectedBrandVoertuiglist.push({
                      'id':index,
                        'kenteken': item.kenteken,
                        'voertuigsoort': item.voertuigsoort,
                        'merk': item.merk,
                        'handelsbenaming': item.handelsbenaming,
                    });
                    console.log(state.selectedBrandVoertuiglist.length)
                    console.log(state.selectedBrandVoertuiglist)
                  }
                });
              return state.selectedBrandVoertuiglist;
              } else {
               

                  for( var i = 0; i <  state.selectedBrandVoertuiglist.length; i++){ 
                    console.log("use indexOf on item: " + state.selectedBrandVoertuiglist[i].merk)
                    if (  state.selectedBrandVoertuiglist[i].merk === newStoreUpdateParams.checkboxName) { 
                      state.selectedBrandVoertuiglist.splice(i, 1); 
                        i--; 
                    }
                }
              // state.selectedBrandVoertuiglist.forEach(function (item, index) {
                  
               
                // if (item.merk === newStoreUpdateParams.checkboxName){
                //      console.log("store deleteitem value selected: " + newStoreUpdateParams.valueSelected)
                //      console.log("store deleteitem checkboxName" + newStoreUpdateParams.checkboxName)
                //      let deleteindex = state.selectedBrandVoertuiglist.indexOf(item);
                //      //state.selectedBrandVoertuiglist.splice(index,1);
                //      //console.log("delete----: "+ newStoreUpdateParams.checkboxName + deleteindex) 
                //      console.log("indexOf deleteindex: " + deleteindex)
                //      console.log("use indexOf on item: " + state.selectedBrandVoertuiglist[deleteindex])
                //      console.log("use indexOf on item: " + state.selectedBrandVoertuiglist[deleteindex].merk)
                     
                //     // state.selectedBrandVoertuiglist.splice(2,1);
                //      //state.selectedBrandVoertuiglist.reverse()
                //     //delete state.selectedBrandVoertuiglist[deleteindex];
                //     // console.log(state.selectedBrandVoertuiglist.length)
                //     //state.selectedBrandVoertuiglist.pop(item)
                //    // console.log(state.selectedBrandVoertuiglist)
                //   }
               // });
                //filter returns array
                //  state.selectedBrandVoertuiglist.filter(
                //   function(item){
                //        if(item.merk === newStoreUpdateParams.checkboxName){
                //         let deleteindex = state.selectedBrandVoertuiglist.indexOf(item)
                //        console.log("store deleteitem value selected: " + newStoreUpdateParams.valueSelected)
                //        console.log("store deleteitem checkboxName: " + newStoreUpdateParams.checkboxName)
                //        console.log("stored delete item.merk: " + item.merk)
                //         console.log("store deleteitem??: " + item  + deleteindex)
                //         console.log("store unshift")
                //         state.selectedBrandVoertuiglist.pop(item)
                //        // state.selectedBrandVoertuiglist.splice(0 , 1)
                //        }
                //     });
               
                  return state.selectedBrandVoertuiglist;
              }
             
            };   
      },
      //UPDATE: DELETE array state. Passing arguments to getters
//       deleteVoertuigByBrand:function (state) { 
//         return function (removeItem) {
//           console.log("store deleteitem?: " + removeItem)
//             state.selectedBrandVoertuiglist.forEach(function (item, index) {
              
//             if (item.merk === removeItem){
//                console.log("delete?: ") 
//           let deleteindex = item.indexOf(removeItem);
//            console.log("delete?: "+deleteindex)
//             //  console.log("delete?:"+ findindex)
//             //  console.log("deleteitem + findindex + index"+ deleteitem + findindex + index);
//               delete state.selectedBrandVoertuiglist[deleteindex];
//               console.log(state.selectedBrandVoertuiglist.length)
//               console.log(state.selectedBrandVoertuiglist)
//             }
//           });
//         };   
// },
      getAllBrands:function (state) {
       //console.log("getAllBrands")
       this.reactiveVoertuiglist.forEach(addbrand);
                    function addbrand(item, index){
                      state.brandVoertuiglist.push({
                        'id':index,
                        'merk': item.merk,
                      });
                    }
          return state.brandVoertuiglist
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
 
 