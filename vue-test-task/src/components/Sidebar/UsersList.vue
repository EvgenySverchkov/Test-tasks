<template>
	<div class="user-list">
		<ul>
			<User 
				v-for="user in usersArr" 
				v-bind:user="user" 
				@changeChckBx="changeChckBx" 
				@clickOnUser="clickOnUser"
			/>
		</ul>
	</div>
</template>

<script>
	import User from "./User"
	export default{
		props: {
			usersArr: {
				type: Array
			},
			chekboxes: {
				type: Array
			},
		},
		methods: {
			clickOnUser:function(login){
				this.$emit("clickOnUser", login)
			},
			changeChckBx(id){
				this.$emit("changeChckBx", id)
			}
		},
		components: {
			User,
		}
	}
</script>

<style scoped> 
.user-list ul{
	overflow-y: scroll;
	list-style: none;
	height: 75vh;
	padding: 15px 10px;
	background-color: #f1f1f1;
}
</style>