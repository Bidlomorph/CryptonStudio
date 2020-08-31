<!-- Хедер с навигацией и поиском -->
<template>
  <div class="header">
    <button @click="whichShow('all')">Все герои</button>
    <button @click="whichShow('favorite')">Любимые герои</button>
    <input type="text" v-model="searchingName" @keyup.enter="searchName(searchingName)">
    <button @click="searchName(searchingName)">Search</button>
  </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                searchingName: null
            }
        },
        methods: {
            // Навигация по всем/любимым
            whichShow(current) {
                let currentInfo = {
                    which: current,
                    person: 'person',
                    pageNumber: 0
                }
                this.$store.commit('setCurrentCharacters', currentInfo);
            },
            // Поиск по параметру и дальнейший вызов изменения текущих персонажей
            searchName(searchingName) {
                let person = this.allCharacters.filter(
                    (el) => {return el.name === searchingName}
                )
                if (person.length === 0){
                    alert(`Персонажа "${searchingName}" нет в списке`)
                }
                else {
                    let currentInfo = {
                        which: 'search',
                        person: person,
                        pageNumber: 0
                    }
                    this.$store.commit('setCurrentCharacters', currentInfo);
                }
            }
        },
        computed: {
            // Все персонажи (нужно для поиска по всем)
            allCharacters() {
                return this.$store.getters.allCharacters
            },
        }
    }
</script>

<style scoped lang="scss">
  @import "../assets/scss/main.scss";
  .header {
    height: 60px;
    display: flex;
    background-color: $c-main;
    button {
      padding: 0 20px 0 20px;
      width: auto;
      font-size: 20px;
      border: none;
      background-color: $c-main;
      color: white;
      transition: .3s;
      &:hover {
        background-color: $c-secondary;
      }
    }
    input {
      outline: none;
    }
  }
  @media (max-width: 550px) {
    .header {
      button {
        padding: 0 10px 0 10px;
        font-size: 14px;
      }
      input {
        width: 20%;
      }
    }
  }
</style>