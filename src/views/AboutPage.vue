<!-- //using composition api with setup in script tag -->
<!-- <script setup>
</script> -->
<script>
export default {
  //using composition api with setup() as am option from the option API
  // setup() {
  //     return {
  //    
  //       }
  //   },
  //end using composition api with setup()

    //Make Vue aware of the props
    //use them with the optional:this.propnameProp /or only propnameProp - in the whole component. 
    //write them with CAMEL case --and use them in the html with DASH - 
    props: {
        //each prop can be an object -> with own key:value to comunicate for developers on how it works. 
        // 1 to make sure the type , string or number or boolean etc.. 
        // 2 to check if the prop is required
        left: Boolean,
    },
    data() {
        return {
            data1: false,
            data2:'this is some data from CustomSlotComp',
            //LET OP!
            //set the prop value in the data object - to use UNIDIRECTIONAL DATA FLOW:
            //pass data from child to parent
        }
    },
    methods: {
    },
    created() {
      console.log("create() lifecycle aboutpage");
    },
    //to comunicate for developers on howmany or wich emit events there are. 
    emits:[
    
    ]   
}
</script>

<template>
    <h1>About page</h1>
      <p>
        f human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain 
        pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some 
      </p>
</template>

<style scoped>
p{
  color: #888;
}
</style>
