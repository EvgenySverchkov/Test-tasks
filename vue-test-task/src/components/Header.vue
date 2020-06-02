<template>
	<header>
		<form class="header-form" @submit="searchUser">
			<label for="search">Search:</label>
			<input type="text" id="search">
			<button type="submit">&#128269;</button>
		</form>
	</header>
</template>
<script>
	export default{
		methods:{
			searchUser(e){//обработчик события submit на формке
				e.preventDefault()
				let login = e.target.elements.search.value
				this.$emit("searchUser", login)
			}
		}
	}
</script>
<style scoped>
header{
	grid-column: 1/4;
	padding: 20px 35%;
	box-shadow: 0px 0px 6px -3px #000;
}
.header-form{
	font-size: 16px;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.header-form input{
	padding: 5px 10px;
}
.header-form button{
	padding: 15px 15px;
	font-size: 15px;
	line-height: 0;
}
.header-form label{
	font-size: 20px;
	font-family: sans-serif;
}
</style>