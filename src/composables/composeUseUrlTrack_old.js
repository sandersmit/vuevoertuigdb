import {ref,reactive, watch} from "vue"


export function useComposableUrlTrack(paramupdate){
    
    const urlParamUpdate = ref('none');
    const urlTrackArr = ['/'];
    const lastPageUrl = document.referrer
    const currentPageUrl = window.location;
    let baseUrl = new URL("http://localhost:5184/#/voertuigenpage?");
    const getmyparams = new URLSearchParams( window.location.search);
    getmyparams.append('param', urlParamUpdate.value);
    

  

    const urlTrackReactive = reactive({
        param1: "/somefilterparam",
        param2: "",
        param3: "",
    })

   

    
    function updateUrlTracking(paramupdate){
        console.log('updateUrlTracking')
            urlParamUpdate.value=paramupdate
            return urlParamUpdate;
         //  setUrl(urlParamUpdate.value)
        
        // if (getmyparams.get("filtername")) {
        //     console.log('filtername param:'+ getmyparams.get("filtername"));
        //     return getmyparams.get("filtername")
        // } else {
        //     return urlParamUpdate.value; 
        // }
        //setUrl()
        
    }

    function getFilterUrlParams(paramupdate){
        console.log('currentPageUrl:'+ currentPageUrl) 
        console.log('getmyparams:'+ getmyparams) 
        console.log('filtername param:'+ getmyparams.get("filtername")); 
        if(getmyparams.has("filtername")){
            paramupdate = getmyparams.get("filtername")
            console.log(getmyparams.has("filtername")+ getmyparams.get("filtername"))
            return getmyparams.get("filtername")
        }else{
            return false
        }
    }

    function setUrl(newParam){
        if(getmyparams.has("filtername")){
            newParam = getmyparams.get("filtername")
            console.log("newParam"+ newParam)
            return window.location.replace(`${baseUrl}filtername=${newParam}`);
        }if(newParam){
        getmyparams.append('filtername', updateUrlTracking(paramupdate));
        return window.location.replace(`${baseUrl}filtername=${newParam}`);
        }
        else{
            return window.location.replace(`${baseUrl}`);
       }
    }

    //TRIGGER = SORTING FILTER 
    function setCustomParams(paramupdate){    
        console.log("paramupdate"+paramupdate )
        //let filternameparam = getmyparams.get("filtername");
        //getmyparams.delete('filtername', `merk`);
        //getmyparams.append('filtername', updateUrlTracking(paramupdate));
        
        //setting/overwriting new param -> set()
        //getmyparams.set("filtername", updateUrlTracking(paramupdate))
        

        //setUrl(updateUrlTracking(paramupdate))
        
        console.log('has params?:'+ getmyparams.has("filtername"));
        console.log("filternameparam: " + getmyparams.get("filtername"))

         //update urlParams
        // updateUrlTracking(paramupdate);
        
         // const currentUrl = location.href;
         // const url = new URL(currentUrl);
            
        // if (getmyparams.has("filtername")) {
        //     console.log('replace params:'+ getmyparams.has("filtername"));
        //     getmyparams.set("filtername", `${this.filterSelect}`)
       
        
        //      //console.log('show current url '+ currentUrl);
        // } 
        // if (!getmyparams.has("filtername")) {
        //     console.log('add new params:'+ getmyparams.has("filtername"));
        //     getmyparams.append('filtername', `${this.filterSelect}`)
            
        //     window.location.replace(`/voertuigenpage?${getmyparams}`);
        //      //console.log('show current url '+ currentUrl);
        // } 
        // getmyparams.has("filtername") ? getmyparams.set("filtername", `${this.filterSelect}`):getmyparams.append('filtername', `${this.filterSelect}`);
        return  getmyparams.get("filtername")
       
    }
   // const watchChangeUrl = watch(val, updateUrlTrack )




    return {
        urlParamUpdate,
        urlTrackReactive,
        updateUrlTracking,
        getFilterUrlParams,
        setCustomParams
    }
}
