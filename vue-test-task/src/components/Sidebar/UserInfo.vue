<template>
	<div class="global_user">
		<img :src="user.avatar_url" alt="">
		{{user.login}}
		<!--{{user.id}}-->
	</div>
</template>
<script>
	export default{
		props: ['user']
	}
</script>
<style scoped>
.global_user{
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 60%;
}
.global_user img{
	width: 50px;
	height: 50px;
	border-radius: 50%;
}
</style>