<template>
 
    <button type="button"
            class="btn btn-sm" 
            :class="[themes[theme], sizes[size]]"
            @click="clicked"
          >  
           <slot />
            
     </button>
    <!--button type="button" class="btn btn-primary btn-circle">  <i class="material-icons">delete</i></button>
    <button type="button" class="btn btn-primary btn-circle">  <i class="material-icons">add</i></button>
    <button type="button" class="btn btn-primary btn-circle">  <i class="material-icons">search</i></button-->
 
    
 
</template>

<script>
  export default {
    props: {
      text: {
        required: false,
        type: String,
        default: '' 
      },
      theme: {
        required: false,
        type: String,
        default: 'primary'
      },
      size: {
        required: false,
        type: String,
        default: 'normal'
      },
      icon: {
        required: false,
        type: String,
        default: ''
      }

    },
    data () {
      return {
        themes : {
          primary: 'btn-primary',
          edit : 'btn-success',
          delete: 'btn-danger',
          add: 'btn-danger'
        },
        sizes : {
          normal : '',
          large: 'btn-lg'
        },
      
      }
    },
    methods: {
      clicked(e) {
        this.$emit('click', e)
      }
    }
  }
</script>

<style scoped>
  .btn {
    margin: 3px;
  }
  .btn-circle {
    width: 30px;
    height: 30px;
    text-align: center;
    padding: 0;
    border-radius: 50%;
  }
  .btn-circle.btn-lg {
    width: 40px;
    height: 40px;
    padding: 0;
    border-radius: 50%;
  }
</style>
  
