import {ref} from "vue"

const urlTrack = ref([]);
const urlTrackArr = ['/'];
const lastPageUrl = document.referrer
const currentPageUrl = window.location.hash;

function updateUrlTrack(){
    urlTrackArr.push(currentPageUrl)
    //urlTrack.value.push(lastPageUrl)
    console.log(urlTrackArr)
    console.log(urlTrackArr.length)
    console.log(window.location.hash)
    //location.href = lastPageUrl;
   return urlTrackArr;
}
export function useUrlTrack(){
    return {
        updateUrlTrack,
        urlTrackArr,
        urlTrack
    }
}
