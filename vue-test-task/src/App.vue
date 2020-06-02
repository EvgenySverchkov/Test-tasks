<template>
  <div id="app">
    <Header @searchUser="searchUser"/>
    <Sidebar 
    v-bind:usersArr="users" 
    @changeChckBx="changeChckBx" 
    @uncheck="uncheck"
    @clickOnUser = "clickOnUser"
    @uncheckAll = "uncheckAll"
    v-bind:listFiltration="listFiltration"
    @filtrationUserList="filtrationUserList"
    />
    <Content v-bind:infoUser="additSelectedUserInfo"/>
    <Footer />
  </div>
</template>

<script>
  import Header from "@/components/Header"
  import Sidebar from "@/components/Sidebar"
  import Content from "@/components/Content"
  import Footer from "@/components/Footer"
  import '../reset.module.css'
  export default {
    name: 'App',
    components: {
      Header,
      Sidebar,
      Content,
      Footer,
    },
    mounted(){
      this.getDataFromServer("https://api.github.com/users")//делаем запрос на сервер
      .catch(()=>{//обработка неуспешного запроса
        this.users=[]
        localStorage.removeItem("selUsers")
        alert("Users did not load, try again later")
        return []
      })
      .then(usersArr=> this.users = usersArr.map(item=>({isChecked: false, ...item})))//модефицируем данные с сервера(добавляем поле состояния чекбокса)
      .then(modifUsersArr=> {
        this.pushAdditUsersInfoToLocalArr(modifUsersArr)//запрашиваем и сохраняем дополнительную информацию о каждом пользователе 
        this.updateUsersFromLocalStorageToLocalArray()//обновляем данные о пользователях которые попали в локальное хранилище(т.е те которые отмечены чекбоксом)
        return modifUsersArr;
      })
    },
    methods:{
      filtrationUserList(typeOfFiltration){//обработчик события когда был изменен тип фильтрации для списка юзеров
        this.listFiltration(typeOfFiltration, this.users)
      },
      listFiltration(typeOfFiltration, arr){//метод фильтрации выбраного массива, выбранным методом
        switch(typeOfFiltration){
          case 'a_z':
          arr = filterArrByLoginInAlphabeticalOrder(arr)
          break;
          case 'z_a':
          arr = filterArrByLoginInAlphabeticalOrder(arr).reverse()
          break;
          case '0_9':
          arr = filteringArrByIdFromSmallerToLarger(arr)
          break;
          case '9_0':
          arr = filteringArrByIdFromSmallerToLarger(arr).reverse()
          break;
        }
        function filterArrByLoginInAlphabeticalOrder(arr){
          return arr.sort((a, b)=>b.login.toLowerCase()<a.login.toLowerCase()?1:-1)
        }
        function filteringArrByIdFromSmallerToLarger(arr){
          return arr.sort((a, b)=>a.id-b.id)
        }
      },
      getDataFromServer(url){//Получение данных с сервера
        return fetch(url, {
          headers: {
            Authorization: "Basic MDE2ZWRlYzdkYTYwYmJhODgwNjk6MGFhYzZhZmZhNmI0ZDgyNTdiODFlOTJlZmJjOGE4OTg2OTIxOGFlYQ=="
          }
        })
        .then(json=> json.json())
      },
      pushAdditUsersInfoToLocalArr(usersArr){//Добавление в массив элемента дополнительной инфорамации о кажом юзере
        return usersArr.forEach((item)=>
          this.getDataFromServer(`https://api.github.com/users/${item.login}`)
          .then(data=>this.additInfoUsersArr=[data, ...this.additInfoUsersArr]))
      },
      updateUsersFromLocalStorageToLocalArray(){//Обновление объектов массива элемента которые лежат в локальном хранилище
        let localStorArr = JSON.parse(localStorage.getItem("selUsers"))
        if(localStorArr){
          localStorArr.forEach((item1)=>{
            this.users = this.users.map(item2=>{
              if(item1.id==item2.id){
                return item1
              }else{
                return item2
              }
            })
          })
        }
      },
      searchUser(userLogin){//поиск юзера по логину (если пользователь нафйден объект данного пользователя присвавается объекту данного элемента(App))
        let foundUser = this.additInfoUsersArr.find((item)=>item.login===userLogin)
        this.additSelectedUserInfo = foundUser || (alert("User not found"), {})
      },
      uncheckAll(){//метод для снятия всех checkbox (вкладка users), если в вкладке "Selected users", была нажата кнопка удаления всех пользователей
      this.users = this.users.map(item=>{return {...item, isChecked:false}})
    },
    clickOnUser(login){//обработчик клика на пользователя (по логину ищется доп. инфо. о пользователе)
      let foundUser = this.additInfoUsersArr.find((item)=>item.login === login)
      this.additSelectedUserInfo = foundUser || (alert("Data has not loaded yet, wait a few seconds and try again"), {})
    },
    uncheck(eventObj){//метод для снятия флага чекбокса
      this.changeChckBx(eventObj)
    },
    changeChckBx(eventObj){//обработчик нажатия на чекбокс
      let newarr= this.users.map((item)=>{
        if(item.id == eventObj.userId){
          if(item.isChecked){
            return {...item, isChecked: false}
          }else{
            return {...item, isChecked: true}
          }
        }else{
          return item
        }
      })
      eventObj.done(newarr)
      this.users = newarr
    }
  },
  data(){
    return {
        users: [],//массив с информацие о всех пользователях
        additInfoUsersArr:[],//массив с дополнительной информацией о каждом пользователе
        additSelectedUserInfo: {},//объект с информацией о пользователе, по которому кликнули
      }
    }
  }
</script>

<style>
#app {
  display: grid;
  grid-row-gap: 5px;
  grid-template-columns: 1fr 2fr;
}
</style>
