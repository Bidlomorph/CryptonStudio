export default {
    state:{

    },
    mutations:{

    },
    actions: {
        // Изменение состояния фаворита
        changeFavorite({commit}, index) {
            let currentInfo = {
                which: '',
                person: 'person',
                pageNumber: this.getters.currentPage
            }
            // Для всех
            if (this.getters.currentShow === 'all'){
                currentInfo.which = 'all'
                this.getters.allCharacters[index].favorite = !this.getters.allCharacters[index].favorite
            }
            // Для отображения фаворитов и поиска
            // (у них другие массивы текущих персонажей)
            else if(this.getters.currentShow === 'favorite' || this.getters.currentShow === 'search'){
                for (let i = 0; i < this.getters.allCharacters.length; i++){
                    if (this.getters.allCharacters[i].name === this.getters.currentCharacters[index].name){
                        this.getters.allCharacters[i].favorite = !this.getters.allCharacters[i].favorite
                    }
                }
                if (this.getters.currentShow === 'favorite') {
                    currentInfo.which = 'favorite'
                }
                else if (this.getters.currentShow === 'search') {
                    currentInfo.which = 'search'
                    let person = []
                    person.push(this.getters.currentCharacters[index])
                    currentInfo.person = person
                }
            }
            localStorage.setItem('allCharacters',JSON.stringify(this.getters.allCharacters))
            commit('updateCharacters', this.getters.allCharacters)
            commit('setFavoriteCharacters')
            commit('setCurrentCharacters', currentInfo)
        }
    },
    getters:{

    }
}