<template>
	<div class="selUser">
		<UserInfo v-bind:user="user"/>
		<button @click="deleteYourself">&times;</button>
	</div>
</template>
<script>
	import UserInfo from "../UserInfo"
	export default{
		name:"SelectedUser",
		props:{
			user: {
				type: Object
			}
		},
		components:{
			UserInfo
		},
		methods:{
			deleteYourself: function(){
				this.$emit("deleteYourself", this.user.id)
			}
		}
	}
</script>
<style>
.selUser{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px 30px;
	margin-bottom: 10px;
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0px 0px 10px -8px #000;
}
.selUser button{
	font-size: 25px;
	padding: 7px 0px;
	line-height: 0;
	cursor: pointer;
}
</style>