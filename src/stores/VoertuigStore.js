import { defineStore } from "pinia";
//import { onMounted } from "vue";

//as the name of the file 'VoertuigStore.js'
export const useVoertuigStore = defineStore('VoertuigStore', {
  //The state is defined as a function returning the initial state
    state: function () {
        return {
          currentUser:"Mister Smith",
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

          ],
          customBrandVoertuiglist:[
            {
              "custvoertuignameData": "CUSTOM OPEL",
              "custvoertuigkentekenData": "00-00-00",
              "custvoertuighandelsnaamData": "OPTIMUS",
              "custvoertuigsoortData": "PERSONENAUTO"
            }

          ]
        };
      },
      //Getters are synchronous functions used to retrieve data from the state
    getters: {
      getLoader:function(state){
        return state.reactiveVoertuiglist.length != 0 ? true : false
       },
      getVoertuigen:function(state){
      return state.reactiveVoertuiglist 
      },
      getVoertuigList:function(state){
        return state.changedReactiveVoertuiglist.length != 0 ? state.changedReactiveVoertuiglist : []
       },
      // getChangedReactiveVoertuiglist:function(state){
      //   state.changedReactiveVoertuiglist.length = 0;
      //   //console.log("state.changedReactiveVoertuiglist: "+ state.changedReactiveVoertuiglist)
      //   this.reactiveVoertuiglist.forEach(addIndex);
      //               function addIndex(item, index){
      //                 state.changedReactiveVoertuiglist.push({
      //                   'id':index,
      //                   'kenteken': item.kenteken,
      //                   'voertuigsoort': item.voertuigsoort,
      //                   'merk': item.merk,
      //                   'handelsbenaming': item.handelsbenaming,
      //                  })   
      //           } 
      //         return state.changedReactiveVoertuiglist      
      // },
      // getHistoryList:function(state){
      //   return state.historylist;
      // },
      // // getFilteredList:function(state){
      // //   return state.filteredlist = state.reactiveVoertuiglist.map(function(item){
      // //     //return ({'merk':item.merk});
      // //     return item;
      // //   });
      // // },
      // //Passing arguments to getters
      // getVoertuigByKenteken:function (state) {
      //   return function (argument) {
      //     return state.reactiveVoertuiglist.find(function (item) {
      //       console.log(argument)
      //       return item.kenteken === argument;
      //     });
      //   };
      //  // return state.selectedBrandVoertuiglist;
      // },
      // //reset voertuiglist to 0
      // resetselectedBrandVoertuiglist:function (state) { 
      //   state.selectedBrandVoertuiglist.length = 0;
      //   console.log(state.selectedBrandVoertuiglist.length)
      // },
      // //UPDATE: PUSH array state. Passing arguments to getters
      // _getVoertuigByBrand: function (state) {
      //   return function (newStoreUpdateParams) {
      //     if (newStoreUpdateParams.valueSelected) {
      //       console.log("Value is true: " + newStoreUpdateParams.valueSelected + state.reactiveVoertuiglist.length);
      //       state.reactiveVoertuiglist.forEach(function (item, index) {
      //         // console.log("filter keepitem?: " + keepitem + item.id)
      //         if (item.merk === newStoreUpdateParams.checkboxName) {
      //           console.log("push?" + newStoreUpdateParams.checkboxName);
      //           state.selectedBrandVoertuiglist.push({
      //             'id': index,
      //             'kenteken': item.kenteken,
      //             'voertuigsoort': item.voertuigsoort,
      //             'merk': item.merk,
      //             'handelsbenaming': item.handelsbenaming,
      //           });
      //           console.log(state.selectedBrandVoertuiglist.length);
      //           // console.log(state.selectedBrandVoertuiglist)
      //         }
      //         });
      //       return state.selectedBrandVoertuiglist;
      //     } else {
      //       for (let i = 0; i < state.selectedBrandVoertuiglist.length; i++) {
      //         console.log("use indexOf on item: " + state.selectedBrandVoertuiglist[i].merk);
      //         if (state.selectedBrandVoertuiglist[i].merk === newStoreUpdateParams.checkboxName) {
      //           state.selectedBrandVoertuiglist.splice(i, 1);
      //           i--;
      //         }
      //       }
      //       return state.selectedBrandVoertuiglist;
      //     }

      //   };
      // },  
      // get getVoertuigByBrand() {
      //   return this._getVoertuigByBrand;
      // },
      // set getVoertuigByBrand(value) {
      //   this._getVoertuigByBrand = value;
      // },

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
                  //    console.log("getAllBrands")
                      state.brandVoertuiglist.push({
                        'id':index,
                        'merk': item.merk,
                      });
                    }
          return state.brandVoertuiglist
      },
      updateCustomBrandLists:function(state){
        return state.customBrandVoertuiglist;
      }
     },
    //Actions are functions that can also be asynchronous which are used to update the state
    actions:{
        async fetchVoertuigen(){
          console.log("fetching..")
            const response = await fetch('https://opendata.rdw.nl/resource/m9d7-ebf2.json?voertuigsoort=Personenauto'
            ).then(function (response) {
               console.log(response)
                return response.json();            
            });
            this.reactiveVoertuiglist = response;
        }
    }
  })
 
 