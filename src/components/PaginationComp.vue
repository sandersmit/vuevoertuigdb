<template>
    <li>
        <a :href="`/voertuigenpage/${paginationIndexProp}`"  
        :data-cur-page="`${currentPageProp}`" :data-page-number=setPages @click.prevent="currentPageEventEmit">
        page {{ paginationIdProp }}</a>
    </li>
</template>

<script>
// import { useRoute } from 'vue-router';
//import { onMounted } from "vue";

export default{
    //using composition api with setup() as am option from the option API
    //   setup() {
    //  
    //     },
    //end using composition api with setup()
    //Make Vue aware of the props
    //use them with the this.propname - in the whole component. 
    //write them with CAMEL case --and use them in the html with DASH - 
    props: {
        //each prop can be an object -> with own key:value to comunicate for developers on how it works. 
        // 1 to make sure the type , string or number or boolean etc.. 
        // 2 to check if the prop is required
            paginationIdProp:{
                type:Number,
                required: true
            },
            paginationIndexProp:{
                type:Number,
                required: true
            },
            currentPageProp: {
                type:Number,
                required: true
            }
    },
    data() {
        return {
            detailsAreVisible: false,
        }
    },
     //to comunicate for developers on howmany or wich emit events there are. 
     emits:[
    'emit-array-range',
    // 'delete-event-emit'
    ],
    methods: {
        // togleDetails:function(){  
        //     this.detailsAreVisible = !this.detailsAreVisible;
        //     console.log(`toggle ${this.bedrijfsnaamProp} test6 ${this.bedrijfsUrlArgumentProp}`);
        // },
        currentPageEventEmit:function(){  
            //LET OP!
            //emitting custom event 'emit-custom-event' => to parent comp
            // passing 'custom event name' + argument
            this.$emit('emit-array-range', this.paginationIndexProp)
        },
        // deleteEventEmit:function(){  
        //     //LET OP!
        //     //emitting custom event 'delete-event-emit' => to parent comp
        //     // emit is passing ('custom event name' + argument (this.idProp)
        //     this.$emit('delete-event-emit', this.idProp)
        // },
    },
       //YOU only want to change one value when one dependency changes.NOT all..
    //Not change all because of one change in one of the existing data depandancy..
    // so only to check and return or display allready-known & 
    // -calculated values (from methods:) to the user-interface
    computed:{
      

    },
    //YOU repeat the names from //data properies  //for example 'counter'
    // - in the 'watch:' object - as functions() - to watch changes between them. 
    watch:{
        
    },
    //lifecyclehooks voor fetchen API data. 
    beforeCreate() { 
   
    },
    created() {
     
    }
}
</script>
<style scoped lang="scss">
body{
    li{
        color: red;
    }
    a{
        text-decoration: none;
        margin:1px;
        padding: 0.5rem 1rem;
        display: inline-block;
        color: #d1d1d1;
        background-color: #282828;
        &:hover{
            background-color: #3a3a3a;
        }
    }
    a[data-cur-page]{
        &.active{
            color:#42d392;
        }
        

    }
}
   
</style>

