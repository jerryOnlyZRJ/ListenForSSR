<template>
  <div id="app">
    <div class="main">
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
ul li {
  list-style: none;
}
a {
  text-decoration: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.main {
  height: 100vh;
  overflow: hidden;
}
.mui-content {
  height: 100vh;
}
</style>
