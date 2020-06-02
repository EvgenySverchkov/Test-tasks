<template>
	<section class="content">
		<div class="content__inner">
			<img :src="infoUser.avatar_url" v-if="infoUser.avatar_url" alt="">
			<AddUserInfo 
			v-bind:userInfo="userInfo" 
			v-bind:objKey="objKey" 
			v-for="(userInfo, objKey) in infoUser"
			/>
		</div>
	</section>
</template>
<script>
	import AddUserInfo from "./AddUserInfo"
	export default{
		props:{
			infoUser:{
				type: Object
			}
		},
		components:{
			AddUserInfo
		}
	}
</script>
<style scoped="">
.content{
	padding-left: 20px;
	padding-top: 40px;
}
.content__inner img{
	width: 220px;
	height: 220px;
	float: left;
	margin-bottom: 20px;
	margin-right: 20px;
}
.content__inner>*{
	margin-bottom: 15px;
	font-size: 15px;
	font-weight: 600;
	font-family: sans-serif;
}
</style>