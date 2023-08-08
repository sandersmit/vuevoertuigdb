<template>
       <!-- <article v-if="voertuigDetailIdProp === indexProp"  > -->
        <article v-if="this.indexProp == this.voertuigDetailIdProp">
            
        <mark>from detail compnent</mark>
        <!-- <h2>id: {{ this.routeProp}}</h2> -->
          <!-- <h1>automerk: {{ route.params.voertuignameparam}}</h1>-->
          <!-- <h2>id: {{ route.params.voertuigidparam}}</h2>  -->
          <h2>indexProp: {{ indexProp}}</h2>
          <h2>voertuigDetailIdProp: {{ voertuigDetailIdProp}}</h2>
          <h2>voertuigDetailHandelsbenamingProp: {{ voertuigDetailHandelsbenamingProp}}</h2>
          <!-- USING 2 properties - Data properties & Props properties
        Prop properties you can use with only the prop name {{ nameProp }}
        Data properties you need to call with the dot notation: by {{Object.propertiename}} -->
    </article> 
</template>

<script>

export default{  
    //Make Vue aware of the props
    //use them with the this.propname - in the whole component. 
    //write them with CAMEL case --and use them in the html with DASH - 
    props: {
        //each prop can be an object -> with own key:value to comunicate for developers on how it works. 
        // 1 to make sure the type , string or number or boolean etc.. 
        // 2 to check if the prop is required
            indexProp:{
                type:Number,
                required: true
            },
            voertuigDetailIdProp:{
                type:String,
                required: true
            },
            voertuigDetailHandelsbenamingProp:{
                type:String,
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
    // 'emit-custom-event',
    // 'delete-event-emit'
    ],
    methods: {
        
    },
       //lifecyclehooks voor fetchen API data. 
    beforeCreate() {
    },
    created() {
      console.log("create() lifecycle VoortuigDetailComp");
    }
}
</script>
<style scoped>

</style>

