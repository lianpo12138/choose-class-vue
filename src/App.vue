<template>
    <div id="app">
        <router-view/>
      <div class="footer"> 2022 &copy; create by 吴林峰</div>
    </div>
</template>

<script>
export default {
    name: 'App',

}
</script>

<style>
body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
li, ul, p, div, body, html, table {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html, body {
    height: 100%;
    overflow: hidden;
}
li {
    list-style: none;
}
#app {
    height: 100%;
}
:root{
  --footer-height: 10px;
}
.footer{
  font-size: medium;
  position: fixed;
  text-align: center;
  width: 100%;
  bottom: 0;
  color: #fff;
}
</style>
