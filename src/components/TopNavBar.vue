<template>
        <!-- USING 2 properties - Data properties & Props properties
        Prop properties you can use with only the prop name {{ nameProp }}
        Data properties you need to call with the dot notation: by {{Object.propertiename}} -->    
    <nav>
      <ul class="nav nav-pills">
        <li @click="togleClassname($event)" class="nav-item" :class="{ active: isActive }"><router-link class="nav-link" aria-current="page" to="/">Home</router-link></li>
        <li @click="togleClassname($event)" class="nav-item" :class="{ active: isActive }"><router-link class="nav-link" to="/about">About</router-link></li>
        <li @click="togleClassname($event)" class="nav-item" :class="{ active: isActive }"><router-link class="nav-link" to="/voertuigenpage">VoertuigDB overzicht</router-link></li>
      </ul>
    </nav> 
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
  
    },
    data() {
        return {
          isActive: false
        }
    },
     //to comunicate for developers on howmany or wich emit events there are. 
     emits:[
    // 'emit-custom-event',
    // 'delete-event-emit'
    ],
    methods: {
      togleClassname:function($event){  
          // this.isActive = !this.isActive;

          console.log(`toggle ${this.isActive}`);
          console.log(`event target ${$event.target.className}`);
          //$event.target.classList.add("active");
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
       a{
         &.active,
         &.router-link-exact-active{
          color:#35eb9a
        }
        &.nav-link{
          padding: 1rem;
          display: block;
          //border-bottom: solid 1px #484848;
          &:hover{
              color:#f2f2f2
          }
        } 
      }

  nav{
    .nav-item{
        &.active{
            a{
                color:#35eb9a
            }
        }
      }
  }


</style>

