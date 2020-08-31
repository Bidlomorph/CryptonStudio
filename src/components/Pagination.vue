<!-- Пагинация -->
<template>
  <div class="paginate">
    <ul class="pagination">
      <li class="page-item">
        <button class="page-link" v-for="(number, index) in numberOfPages" :key="index" @click="changePage(index)">
          {{number}}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        methods: {
            // Измененеие страницы по номеру
            changePage(pageNumber) {
                let currentInfo = {
                    which: '',
                    person: 0,
                    pageNumber: pageNumber
                }
                if (this.currentShow === 'all') {
                    currentInfo.which = 'all'
                }
                else if (this.currentShow === 'favorite') {
                    currentInfo.which = 'favorite'
                }
                this.$store.commit('setCurrentCharacters', currentInfo);
            }
        },
        computed: {
            // Номера всех страниц(их колличество)
            numberOfPages() {
                return this.$store.getters.numberOfAllPages
            },
            // Текущий показ (все/любимые/поиск)
            currentShow() {
                return this.$store.getters.currentShow
            }
        },
    }
</script>

<style scoped lang="scss">
  @import "../assets/scss/main.scss";

  button.page-link {
    padding: 20px;
    font-size: 20px;
    color: white;
    background-color: $c-main;
    font-weight: 500;
    border: none;
    transition: .1s;
    &:hover {
      background-color: $c-secondary;
    }
  }

  @media (max-width: 550px) {
    button.page-link {
      padding: 10px;
      font-size: 14px;
    }
  }
</style>