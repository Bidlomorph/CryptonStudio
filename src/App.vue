<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Pagination></Pagination>
  </div>
</template>

<script>
import Header from "./components/Header";
import Pagination from "./components/Pagination";
export default {
  name: 'App',
  components: {
    Header,
    Pagination
  },
  // Установка всех персонажей и текущих персонажей по запуску приложения
  async mounted(){
      let currentInfo = {
          which: 'all',
          name: 'paginate',
          person: 'person',
          pageNumber: 0
      }
    await this.$store.dispatch('getAllCharacters');
    await this.$store.commit('setCurrentCharacters', currentInfo);
  }
}
</script>

<style lang="scss">
  @import "./assets/scss/main.scss";
  #app {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
  }
</style>
