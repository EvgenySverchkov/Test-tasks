<template>
	<form class="filter" @change="selectionOfFilterOption">
		<div><input type="radio" name="filter" value="a_z":id="`filterByLog${idd}`">Filter by login [a-z]</div> 
		<div><input type="radio" name="filter" value="z_a":id="`filterByLog2${idd}`">Filter by login [z-a] </div> 
		<div><input type="radio" name="filter" value="0_9":id="`filterById${idd}`">Filter by id [0-9] </div> 
		<div><input type="radio" name="filter" value="9_0":id="`filterById2${idd}`">Filter by id [9-0] </div> 
	</form>
</template>
<script>
	export default{
		props:["idd"],
		methods:{
			selectionOfFilterOption(e){
				this.$emit("selectionOfFilterOption", e.target.value)
			}
		}
	}
</script>
<style>
.filter{
	background: #f1f1f1;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 10px 30px;
}
</style>