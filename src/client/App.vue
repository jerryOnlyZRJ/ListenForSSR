<template>
  <div id="app">
    <div class="main">
       <router-link to="/">Go to index</router-link>
       <router-link to="/dashboard">Go to dashboard</router-link>
       <router-link to="/editor">Go to editor</router-link>
       <router-link to="/register">Go to register</router-link>
       <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
:root{
  --mainColor: #188eee;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  margin: 1rem;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
