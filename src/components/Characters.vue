<!-- Карточки персонажей -->
<template>
  <div class="cards">
    <div class="null" v-if="currentCharacters.length === 0">Нет любимых персонажей!</div>
    <div class="card" v-for="(character, index) in currentCharacters" :key="index">
      <div class="card-header">
        <div class="heart" @click="toFavorite(index)" :class="{heartOn : currentCharacters[index].favorite}"></div>
      </div>
      <div class="card-img">
        <img :src="character.image" alt="img">
      </div>
      <div class="card-footer">
        <p>
          {{ character.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        methods: {
            // Вызывает изменение любимых по индексу
            toFavorite(index) {
                this.$store.dispatch('changeFavorite', index+this.currentPage*10);
            }
        },
        computed: {
            // Текущие персонажи
            currentCharacters() {
                return this.$store.getters.currentCharacters
            },
            // Текущая страница
            currentPage() {
                return this.$store.getters.currentPage
            }
        },
    }
</script>

<style scoped lang="scss">
  @import "../assets/scss/main.scss";
  .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .card {
    margin: 20px;
    width: 200px;
    height: 300px;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    &-header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    &-img {
      height: 275px;
      img {
        height: 275px;
      }
    }
    &-footer {
      height: 30px;
      color: white;
      background-color: $c-main;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        font-size: 20px;
      }
    }
  }



  /* Базовые стили */
  .heart {
    position: absolute;
    width: 10px;
    height: 15px;
    background-color: grey;
    box-shadow: -1px 0px 2px #444;
    /* Скругляем верхние углы */
    -webkit-border-radius: 50px 50px 0 0;
    -moz-border-radius: 50px 50px 0 0;
    border-radius: 50px 50px 0 0;
    /* Определяем угол наклона */
    -webkit-transform: rotate(315deg);
    -moz-transform: rotate(315deg);
    -ms-transform: rotate(315deg);
    -o-transform: rotate(315deg);
    transform: rotate(315deg);
  }
  /* Формируем правую часть */
  .heart:before {
    position: absolute;
    width: 15px;
    height: 10px;
    left: 0;
    bottom: 0;
    content: "";
    background-color: grey;
    box-shadow: 0px 3px 3px #444444;
    -webkit-border-radius: 50px 50px 0 0;
    -moz-border-radius: 50px 50px 0 0;
    border-radius: 0 50px 50px 0;
  }
  /* Убираем тень при наведении */
  .heart:hover:before, .heart:hover{
    box-shadow:none;
  }

  .heartOn {
    background-color: red;
    &:before {
      background-color: red;
    }
  }
</style>