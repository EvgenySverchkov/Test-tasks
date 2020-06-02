<template>
	<div class='user-info-field' v-if="userInfo && filter(objKey)">
		{{stringNormalize(objKey)}}: 
		<div v-if="strTolink(userInfo)">
			<a :href="userInfo">{{userInfo}}</a>
		</div> 
		<div v-else>
			{{userInfo}}
		</div>
	</div>
</template>
<script>
	export default{
		props:["userInfo", "objKey"],
		methods:{
			strTolink(info){
				let reg = info.toString().match(/^http/)
				if(!!reg){
					return true
				}
				return false
			},
			filter(key){
				switch(key){
					case "avatar_url":
					return false
					case "node_id":
					return false	
					case "following_url":
					return false
					case "gists_url":
					return false
					case "starred_url":
					return false
					case "events_url":
					return false
					case "created_at":
					return false
					case "updated_at":
					return false
				}
				return true
			},
			stringNormalize(str){
				let a = str.charAt(0).toUpperCase()
				return str.replace(/^\w/, a).replace(/_/g, " ")
			}
		}
	}
</script>
<style scoped>
.user-info-field>div{
	display: inline-block;
}
</style>