<template>
        <!-- USING 2 properties - Data properties & Props properties
        Prop properties you can use with only the prop name {{ nameProp }}
        Data properties you need to call with the dot notation: by {{Object.propertiename}} -->

            <!-- <router-link   :to="`/voertuigdetailpage/${voertuigIdProp}`" @click="updateUserHistory()">
                id: {{ voertuigIdProp}} - index: {{ indexProp}} merk: {{voertuigNameProp}} handbena:{{voertuigHandelsbenamingProp}} kenteken: {{ voertuigKentekenProp }}</router-link>
         -->
        <label class="form-input-label">{{inputFieldNameProp}}</label>
        <input type="text" 
        :id="`${inputFieldIdProp}`"
        class="form-control"
        :aria-describedby="`${inputFieldNameProp}`"
        :placeholder="`${inputFieldPlaceholderProp}`"
        :value="inputFieldValueProp"
        @input="inputFieldValuePropEmit"
        >
       <!-- works with $emit(update:.. & v-model on parent-->
        <!-- @input="inputFieldValuePropEmit" 
        :value="inputFieldValueProp" -->
        
</template>
<script>
import { ref } from 'vue'

export default{
     //using composition api with setup() as am option from the option API
     setup() {
        const voertuigObj = ref(
            //{inputFieldKey:this.inputfieldvaluedata}
            // {inputFieldValueKey:""},
            // {inputFieldNameKey:""}
            )
        return {voertuigObj}  
    },
    //end using composition api with setup()
    //Make Vue aware of the props
    //use them with the this.propname - in the whole component. 
    //write them with CAMEL case --and use them in the html with DASH - 
    props: {
        //each prop can be an object -> with own key:value to comunicate for developers on how it works. 
        // 1 to make sure the type , string or number or boolean etc.. 
        // 2 to input if the prop is required
            inputFieldIdProp:{
                    type:Number,
                    required: true
                },
            inputFieldNameProp:{
                type:String,
                required: false
            },
            inputFieldPlaceholderProp:{
                type:String,
                required: true
            },
            inputFieldValueProp:{
                type:String,
                default:'',
                required: true
            },
            ariaDescribedbyProp:{
                type:String,
                required: true
            }
    },
    data() {
        return {
            detailsAreVisible: false,
           // inputfieldvaluedata:""
        }
    },
     //to comunicate for developers on howmany or wich emit events there are. 
     emits:[
    // 'emit-custom-event',
    // 'delete-event-emit'
    //'input-field-value-prop-emit',
    
    ],
    methods: {
        inputFieldValuePropEmit:function($event){  
            //LET OP!
            //emitting custom event 'emit-custom-event' => to parent comp
            // passing 'custom event name' + argument
            //this.inputFieldValueProp = $event.target.value;
             console.log("inputFieldValuePropEmit!:"+ $event.target.value )
            //if(inputFieldValueProp!=""){
            //name of the emit : payloadname -> named whats being emited //typescript
            this.$emit('update:inputFieldValueProp', $event.target.value)
            //this.$emit('input-field-value-prop-emit', $event.target.value)
        //     }else{
        //        console.log("show warning")
        //    }
           
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

