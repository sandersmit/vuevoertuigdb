<script>
// import { useRoute } from 'vue-router';
//import { onMounted } from "vue";
import { ref } from 'vue'

export default{
    //using composition api with setup() as am option from the option API
      setup() {
       // const togglecheckboxEl = ref([])
     
            return{
              //  togglecheckboxEl
            }
        },
    //end using composition api with setup()
    //Make Vue aware of the props
    //use them with the this.propname - in the whole component. 
    //write them with CAMEL case --and use them in the html with DASH - 
    props: {
        //each prop can be an object -> with own key:value to comunicate for developers on how it works. 
        // 1 to make sure the type , string or number or boolean etc.. 
        // 2 to check if the prop is required
        checkIdProp:{
                type:Number,
                required: true
            },
            checkboxNameProp:{
                type:String,
                required: true
            },
            checkboxMerkProp:{
                type:String,
                required: true
            },
            checkboxValueProp: {
                type:String,
                required: true
            }
    },
    data() {
        return {
            detailsAreVisible: false,
            selected: false
        }
    },
     //to comunicate for developers on howmany or wich emit events there are. 
     emits:[
    'emit-checkbox-value',
    // 'delete-event-emit'
    ],
    methods: {
        // togleDetails:function(){  
        //     this.detailsAreVisible = !this.detailsAreVisible;
        //     console.log(`toggle ${this.bedrijfsnaamProp} test6 ${this.bedrijfsUrlArgumentProp}`);
        // },
        setCheckbox(){
           console.log(this.togglecheckboxEl[0])
           // this.checkboxEl.checked = !this.checkboxEl.checked;
           //this.checkboxEl.checked = !this.checkboxEl.checked;
        },
        checkboxValuePropEmit:function(){  
           // console.log(this.togglecheckboxEl)
           //this.setCheckbox();
            //LET OP!
            //emitting custom event 'emit-custom-event' => to parent comp
            // passing 'custom event name' + argument
            this.selected =! this.selected;
            console.log("this.selected?:"+ this.selected)
            //console.log("checkboxValuePropEmit:"+ this.togglecheckboxEl[0])
           // console.log("checkboxValuePropEmit:"+ this.checkboxNameProp)
           const emitCheckboxProps = {
            'thisSelected':this.selected,
             'thisCheckboxName': this.checkboxNameProp,
             'thisCheckboxMerk': this.checkboxMerkProp
           }
           console.log("this.:"+ this.checkboxMerkProp)
           this.$emit('emit-checkbox-value', emitCheckboxProps)
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
        computedClass() {
      const valueclassname = paginationIndexProp=0 ? 'active':''
      //let className = 'active';
      // More complicated logic to determine what
      // class should be applied
      return valueclassname;
        },
        // returnChecked() {
        //     return this.selected
        // }   
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
<template>
    <div class="form-check">
        <input type="checkbox" class="form-check-input"
        :id="`${checkboxValueProp}`"
        :class="checkIdProp==0 ?'active':''" 
        :value="`${checkboxValueProp}`" 
        :for="`${checkIdProp}`"
        @click="checkboxValuePropEmit"
        v-model="selected"
        >                                 
        <label :for="`${checkboxValueProp}`" class="form-check-label">{{checkboxNameProp}}</label>
    </div>
    <!-- {{ this.togglecheckboxEl[0] }} -->
    <!-- {{ this.selected }} -->
    <!-- {{ this.returnChecked }} -->
</template>
<style scoped lang="scss">
body{
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

