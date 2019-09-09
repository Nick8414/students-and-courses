<template>
  <div id="app">
    <AppHeader />
    <div class="container" >
      <router-view/>
    </div>
    
  </div>
</template>

<script>
  import AppHeader from '@/components/AppHeader';

  export default {
    components: {
      AppHeader
    }
  }
  
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
#nav a {
  font-weight: bold;
  color: #fff;
  padding: 5px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
