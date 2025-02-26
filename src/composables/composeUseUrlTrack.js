import {ref,reactive, watch} from "vue"

export function useComposableUrlTrack(paramupdate){
    console.log("init useComposableUrlTrack")


    const urlParamUpdate = ref('');
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
                console.log('updateUrlTracking set to: '+ urlParamUpdate.value)
                return urlParamUpdate.value;
            }else{
                console.log('updateUrlTracking set to default is NONE')
                return urlParamUpdate.value = '';
            }
           
    }
    //using url API https://developer.mozilla.org/en-US/docs/Web/API/URL_API
    function getFilterUrlParams(paramupdate){
        // console.log('currentPageUrl:'+ currentPageUrl) 
        // console.log('currentUrlParams:'+ currentUrlParams) 
        // console.log('filtername param:'+ currentUrlParams.get("filtername")); 
        // updateUrlTracking(paramupdate)
        if(currentUrlParams.has("filtername")){
            // paramupdate = currentUrlParams.get("filtername")
            // console.log("return get filter params:" + currentUrlParams.has("filtername")+ currentUrlParams.get("filtername"))
            // return updateUrlTracking(paramupdate) 
        }else{
           // return false;
        }
    }

    //TRIGGER = SORTING FILTER  https://developer.mozilla.org/en-US/docs/Web/API/URL_API
    function setCustomParams(paramupdate){    
        // console.log("paramupdate"+paramupdate )
        // setUrl(updateUrlTracking(paramupdate))
        // return currentUrlParams.get("filtername")  
    }

    //using history API https://developer.mozilla.org/en-US/docs/Web/API/History_API
    function setUrl(newParam){
        //appended new history state from sorting
        if(newParam){
            console.log("history state from params:"+ newParam)
            history.pushState({ filtername: `${updateUrlTracking(newParam)}` }, "not used param", `/#/voertuigenpage?filtername=${updateUrlTracking(newParam)}`);
            console.log("History.state after pushState: ", history.state);
            //return history.state;
        }   
        //when entering on page without value from sorting - retrieve it from previous selection
        if(!newParam){
            if(history.state.filtername){
                console.log("History state from filtername: " + history.state.filtername);
                return history.state.filtername;
            }
        }
    }

    function resetUrl(argument){
        history.pushState({ filtername: `${updateUrlTracking(argument)}` }, "not used param", "/#/voertuigenpage");
        console.log("history after reset url history state: ", history.state)
        //return history.state.none;
    }

        /*
    * Create form to request access token from Google's OAuth 2.0 server.
    */
    function oauthSignIn() {
        // Google's OAuth 2.0 endpoint for requesting an access token
        var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    
        // Create <form> element to submit parameters to OAuth 2.0 endpoint.
        var form = document.createElement('form');
        form.setAttribute('method', 'GET'); // Send as a GET request.
        form.setAttribute('action', oauth2Endpoint);
    
        // Parameters to pass to OAuth 2.0 endpoint.
        var params = {'client_id': 'YOUR_CLIENT_ID',
                    'redirect_uri': 'YOUR_REDIRECT_URI',
                    'response_type': 'token',
                    'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/calendar.readonly',
                    'include_granted_scopes': 'true',
                    'state': 'pass-through value'};
    
        // Add form parameters as hidden input values.
        for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
        }
        // Add form to page and submit it to open the OAuth 2.0 endpoint.
        document.body.appendChild(form);
        form.submit();
    }

    return {
        //returned for destructoring
        urlParamUpdate,
        urlTrackReactive,
        updateUrlTracking,
        setUrl,
        resetUrl,
        oauthSignIn
    }
}
