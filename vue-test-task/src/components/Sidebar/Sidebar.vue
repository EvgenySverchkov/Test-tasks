<template>
	<section class="sidebar">
		<Tabs>
			<Tab name="Users" selected="true">
				<UserFilter v-bind:idd="1" @selectionOfFilterOption="filtrationUserList"/>
				<UsersList 
				v-bind:usersArr="usersArr"
				@changeChckBx="changeChckBx"
				@clickOnUser="clickOnUser"
				/>
			</Tab>
			<Tab name="Selected_users">
				<UserFilter v-bind:idd="2" @selectionOfFilterOption="filtrationSelectedUserList"/>
				<SelectedUsersList
				v-bind:selectedUsers="selectedUsers"
				@deleteSelectedUsersList="deleteSelectedUsersList"
				@deleteYourself="deleteYourself"
				/>
			</Tab>
		</Tabs>
	</section>
</template>
<script>
	import UsersList from "./UsersList"
	import SelectedUsersList from "./SelectedUsersList"
	import Tabs from "./Tabs"
	import Tab from "./Tab"
	import UserFilter from "./UserFilter"
	export default{
		props: {
			usersArr: {
				type: Array
			},
			listFiltration:{
				type: Function
			}
		},
		mounted(){
			if(localStorage.getItem("selUsers")){
				this.selectedUsers = JSON.parse(localStorage.getItem("selUsers"))
			}
		},
		methods:{
			filtrationUserList(typeOfFiltration){
				this.$emit("filtrationUserList", typeOfFiltration)
			},
			filtrationSelectedUserList(typeOfFiltration){
				this.listFiltration(typeOfFiltration, this.selectedUsers);
				this.filterState = typeOfFiltration
			},
			clickOnUser:function(login){
				this.$emit("clickOnUser", login)
			},
			saveToLocalStorage(){
				if(!!this.selectedUsers.length){
					let jsonDataArr = JSON.stringify(this.selectedUsers)
					localStorage.setItem('selUsers', jsonDataArr)
				}else{
					localStorage.removeItem('selUsers')
				}
			},
			deleteSelectedUsersList(){
				this.selectedUsers = [];
				localStorage.removeItem("selUsers")
				this.$emit("uncheckAll")
			},
			deleteYourself(id){
				this.$emit("uncheck", {userId: id, done:(arr)=>{
					this.selectedUsers = this.selectedUsers.filter(item=>item.id!==id)
				}})
				this.saveToLocalStorage()
			},
			changeChckBx(id){//обработка нажатия на чекбокс
				this.$emit("changeChckBx", {userId: id, done:(arr)=>{
					let selectUser = arr.find((item)=>item.id==id)
					if(selectUser.isChecked){
						this.selectedUsers.push(selectUser)
						this.filtrationSelectedUserList(this.filterState)
					}else{
						this.selectedUsers = this.selectedUsers.filter(item=>item.id!=id)
					}
				}})
				this.saveToLocalStorage()
			}
		},
		data(){
			return {
				selectedUsers: [],//массив с объектами пользователей у которых чекбокс отмечен
				filterState: ''
			}
		},
		components: {
			UsersList,
			SelectedUsersList,
			Tab,
			Tabs,
			UserFilter,
		}
	}
</script>
<style scoped>
.sidebar{
	padding: 10px 0 10px 10px;
}
</style>