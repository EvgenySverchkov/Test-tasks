<template>
	<li class="user" @click="clickOnUser">
		<div class="user_inner">
			<UserInfo v-bind:user="user"/>
			<input type="checkbox" @change="changeChckBx" :checked="user.isChecked">
		</div>
	</li>
</template>
<script>
	import UserInfo from "./UserInfo"
	export default{
		props: {
			user:{
				type: Object
			},
		},
		components:{
			UserInfo
		},
		methods: {
			clickOnUser: function(){
				this.$emit("clickOnUser", this.user.login)
			},
			changeChckBx(){
				this.$emit("changeChckBx", this.user.id)
			}
		}
	}
</script>
<style scoped>
	.user{
		cursor: pointer;
		margin-bottom: 10px;
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0px 0px 10px -8px #000;
	}
	.user_inner{
		padding: 5px 30px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>