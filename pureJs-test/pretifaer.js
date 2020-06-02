function pretifaer(sum){
	alert(sum.replace(/(\d)(?=(\d\d\d)+([^\d]))/g, '$1 '));
}

pretifaer("3123123.00")
