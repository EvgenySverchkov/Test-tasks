<template>
	<div class="selected-users">
		<button class="btn" @click="deleteSelectedUsersList">Сlear the list</button>
		<ul>
			<SelectedUser
			v-for="user in selectedUsers"
			v-bind:user="user"
			@deleteYourself="deleteYourself"
			/>
		</ul>
	</div>
</template>
<script>
	import SelectedUser from "./SelectedUser"
	export default{
		props: {
			selectedUsers: {
				type: Array
			},
		},
		components: {
			SelectedUser,
		},
		methods:{
			deleteSelectedUsersList: function(){
				this.$emit("deleteSelectedUsersList")
			},
			deleteYourself: function(id){
				this.$emit("deleteYourself", id)
			}
		},
	}
</script>
<style scoped>
.selected-users{
	text-align: center;
	overflow-y: scroll;
	height: 75vh;
	padding: 15px 10px;
	background-color: #f1f1f1;
}
.selected-users ul{
	list-style: none;
}
.selected-users button{
	padding: 10px 20px;
	background-color: #E34234;
	border: none;
	border-radius: 10px;
	font-size: 20px;
	outline-style: none;
	box-shadow: 0px 5px 25px -11px #000;
	margin-bottom: 20px;
	cursor: pointer;
}
.selected-users button:active{
	box-shadow: none;
	color: #fff;
}
</style>