import {ref,reactive, watch} from "vue"

export function useComposableUrlTrack(paramupdate){
    console.log("init useComposableUrlTrack")


    const urlParamUpdate = ref('none');
    const urlTrackArr = ['/'];
    const lastPageUrl = document.referrer;
    let baseUrl = new URL("http://localhost:5184/#/voertuigenpage");
    //define current page
    let currentPageUrl = window.location.href;
    let currentUrlParams = new URL(window.location).searchParams;
    //console.log(window.location)
    //console.log(currentUrlParams)


    const urlTrackReactive = reactive({
        param1: "/somefilterparam",
        param2: "",
        param3: "",
    })

    function updateUrlTracking(paramupdate){
            if(paramupdate){
                urlParamUpdate.value=paramupdate
            }
            console.log('updateUrlTracking set to: '+ urlParamUpdate.value)
            return urlParamUpdate.value;
    }

    function getFilterUrlParams(paramupdate){
        console.log('currentPageUrl:'+ currentPageUrl) 
        console.log('currentUrlParams:'+ currentUrlParams) 
        console.log('filtername param:'+ currentUrlParams.get("filtername")); 
        updateUrlTracking(paramupdate)
        if(currentUrlParams.has("filtername")){
            paramupdate = currentUrlParams.get("filtername")
            console.log("return get filter params:" + currentUrlParams.has("filtername")+ currentUrlParams.get("filtername"))
            return updateUrlTracking(paramupdate) 
        }else{
            return false;
        }
    }

    //TRIGGER = SORTING FILTER 
    function setCustomParams(paramupdate){    
        console.log("paramupdate"+paramupdate )
        setUrl(updateUrlTracking(paramupdate))
        console.log('has params?:'+ currentUrlParams.has("filtername"));
        console.log("filternameparam: " + currentUrlParams.get("filtername"))
        return  currentUrlParams.get("filtername")  
    }

    function setUrl(newParam){
        //get filter params
        if(currentUrlParams.has("filtername")){
            let curFiltername = currentUrlParams.get("filtername")
            console.log("curFiltername: "+ updateUrlTracking(curFiltername))
            //call getFilterUrlParams
        }
        //appended with filter
        if(newParam){
            console.log("set url(newParam): "+ newParam);
            console.log("History.state before pushState: ", history.state);
            history.pushState({ filtername: `${updateUrlTracking(newParam)}` }, "not used param", `/#/voertuigenpage?filtername=${updateUrlTracking(newParam)}`);
            console.log("History.state after pushState: ", history.state);
            if(history.state.filtername){
            
            }else{
                console.log("no History.state?: ", history.state);
                console.log("return get filter params:" + currentUrlParams.has("filtername")+ currentUrlParams.get("filtername"))
            }
        }   
        if(!newParam){
            console.log("no params?:")
            if(history.state.filtername){
                console.log("History.state: ", history.state);
                console.log("return get filter params:" + currentUrlParams.has("filtername")+ currentUrlParams.get("filtername"))
            }else{
                console.log("no History.state?: ", history.state);
                console.log("return get filter params:" + currentUrlParams.has("filtername")+ currentUrlParams.get("filtername"))
            }
        }
    }

    return {
        urlParamUpdate,
        urlTrackReactive,
        updateUrlTracking,
        getFilterUrlParams,
        setCustomParams,
        setUrl
    }
}
