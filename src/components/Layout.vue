<template>
  <div>
    <app-header></app-header>
    <app-main></app-main>
    <app-navbar></app-navbar>
  </div>
</template>
<script>
import AppHeader from "./AppHeader";
import AppMain from "./AppMain";
import AppNavbar from "./AppNavbar";
export default {
  components: {
    AppHeader,
    AppMain,
    AppNavbar
  }
};
</script>>
<style scoped>
.header {
  position: absolute;
  line-height: 50px;
  top: 0px;
  left: 0px;
  right: 0px;
  background-color: turquoise;
}
.navbar {
  position: absolute;
  width: 200px;
  left: 0px;
  top: 50px;
  bottom: 0px;
  background-color: tomato;
  overflow-y: auto;
}
.main {
  position: absolute;
  background-color: white;
  left: 200px;
  top: 50px;
  right: 0px;
  bottom: 0px;
  padding: 10px;
  overflow-y: auto;
}
</style>