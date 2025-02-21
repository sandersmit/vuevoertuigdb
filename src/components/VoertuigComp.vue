<template>
        <div>
        <!-- USING 2 properties - Data properties & Props properties
        Prop properties you can use with only the prop name {{ nameProp }}
        Data properties you need to call with the dot notation: by {{Object.propertiename}} -->
            <router-link   :to="`/voertuigdetailpage/${voertuigIdProp}`" @click="updateUserHistory()">
                id: {{ voertuigIdProp}} - index: {{ indexProp}} merk: {{voertuigNameProp}} handbena:{{voertuigHandelsbenamingProp}} kenteken: {{ voertuigKentekenProp }}</router-link>
        </div>
</template>Detail
<script>

export default{
     //using composition api with setup() as am option from the option API
     setup() {

    },
    //end using composition api with setup()
    //Make Vue aware of the props
    //use them with the this.propname - in the whole component. 
    //write them with CAMEL case --and use them in the html with DASH - 
    props: {
        //each prop can be an object -> with own key:value to comunicate for developers on how it works. 
        // 1 to make sure the type , string or number or boolean etc.. 
        // 2 to check if the prop is required
            voertuigIdProp:{
                type:Number,
                required: true
            },
            indexProp:{
                type:Number,
                required: true
            },
            voertuigNameProp:{
                type:String,
                required: false
            },
            voertuigSoortProp:{
                type:String,
                required: false
            },
            voertuigKentekenProp:{
                type:String,
                required: false
            },
            voertuigHandelsbenamingProp:{
                type:String,
                required: false
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
    'emit-update-user-history'
    ],
    methods: {
         togleClassname:function(){  
          this.dataProp = !this.dataProp;
          console.log(`toggle ${this.value1}`);
         },
        updateUserHistory:function(){  
        //     //LET OP!
        //     //emitting custom event 'emit-custom-event' => to parent comp
        //     // passing 'custom event name' + argument
           this.$emit('emit-update-user-history', this.voertuigKentekenProp)
        },
    },
       //lifecyclehooks voor fetchen API data. 
    beforeCreate() {
    },
    created() {
    }
}
</script>
<style scoped lang="scss">
.voertuigcomp{
    border-bottom:solid 1px #155f3e; 
}
a{
    color:#33a06f;
    text-decoration: none;
    padding: 1rem;
    display: block;
    border-bottom: solid 1px #484848;
    &:hover{
        color:#f2f2f2
    }
}
 
</style>

