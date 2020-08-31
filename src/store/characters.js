import axios from 'axios';

export default {
    state:{
        // Все персонажи
        allCharacters: [],
        // Номера всех страниц(их колличество)
        numberOfAllPages: [],
        // Текущие персонажи(которые отображены)
        currentCharacters: [],
        // Любимые персонажи
        favoriteCharacters: [],
        // Текущая страница
        currentPage: 0,
        // Текущий показ (все/любимые/поиск)
        currentShow: 'all'
    },
    mutations:{
        // Обновляет всех персонажей
        updateCharacters(state, allCharacters) {
            state.allCharacters = allCharacters
        },
        // Устанавливает любимых
        setFavoriteCharacters(state) {
            state.favoriteCharacters = this.getters.allCharacters.filter(el => el.favorite === true);
        },
        // Установка текщих персонажей
        setCurrentCharacters(state, currentInfo) {
            state.numberOfAllPages = null
            // Поиск
            if (currentInfo.which === 'search') {
                state.currentPage = 0
                state.currentCharacters = currentInfo.person
                state.currentShow = 'search'
                state.numberOfAllPages = 0
            }
            // Ниже осуществляется пагинация, и отображение текущих персонажей
            // в зависимости от отображения
            else {
                let perPage = 10
                let allCharacters = null
                if (currentInfo.which === 'all') {
                    allCharacters = this.getters.allCharacters
                    state.currentShow = 'all'
                }
                else if(currentInfo.which === 'favorite') {
                    allCharacters = this.getters.favoriteCharacters
                    state.currentShow = 'favorite'
                }
                let length = allCharacters.length
                let page = currentInfo.pageNumber ? currentInfo.pageNumber+1 : 1
                let numberOfAllPages = Math.ceil(length / perPage)
                if (numberOfAllPages != 1) {
                    state.numberOfAllPages = numberOfAllPages
                }
                state.currentPage = currentInfo.pageNumber ? currentInfo.pageNumber : 0
                let from = (page * perPage) - perPage
                let to = (page * perPage)
                state.currentCharacters = allCharacters.slice(from, to)
            }
        }
    },
    actions: {
        // Получение всех персонажей
        async getAllCharacters({commit}) {
            // Если уже есть в сторадж
            if (localStorage.getItem('allCharacters')) {
                let allCharacters = JSON.parse(localStorage.getItem('allCharacters'))
                commit('updateCharacters', allCharacters)
                commit('setFavoriteCharacters')
            }
            // Если получаем первый раз
            else {
                let allCharacters = []
                for (let i = 1; i < 10; i++){
                    let requestParams = {
                        url: `http://swapi.dev/api/people/?page=${i}`,
                        method: 'GET',
                        mode: "no-cors",
                    }
                    await axios(requestParams).then(
                        resp => {
                            for (let j = 0;j < resp.data.results.length; j++){
                                resp.data.results[j].image =
                                    `https://starwars-visualguide.com/assets/img/characters/${j+1+((i-1)*10)}.jpg`
                                resp.data.results[j].favorite = false
                                allCharacters.push(resp.data.results[j])
                                localStorage.setItem('allCharacters',JSON.stringify(allCharacters))
                            }
                        },
                        err => {
                            console.log(err)
                        }
                    )
                }
                commit('updateCharacters', allCharacters)
                commit('setFavoriteCharacters', allCharacters)
            }
        },
    },
    getters:{
        allCharacters(state){
            return state.allCharacters
        },
        numberOfAllPages(state){
            return state.numberOfAllPages
        },
        currentCharacters(state){
            return state.currentCharacters
        },
        currentPage(state){
            return state.currentPage
        },
        currentShow(state){
            return state.currentShow
        },
        favoriteCharacters(state){
            return state.favoriteCharacters
        },
    }
}