<template>
	<div>
		<span>header</span>
		<div class="wrapper">
			<div class="table-cell" v-for="itm in arr" :key="itm">{{ itm }}</div>
		</div>
	</div>

	<div class="container">
		<header>Header</header>
		<nav>Navigation</nav>
		<main>Main area</main>
		<footer>Footer</footer>
	</div>
</template>
<script setup lang="ts">
const arr = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];
</script>
<style lang="less" scoped>
.wrapper {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 100px 100px;
	.table-cell {
		background-color: lightblue;
		border: 1px solid black;
		text-align: center;
		border-radius: 5px;
	}
}

.container {
	display: grid;
	width: 100%;
	height: 250px;
	grid-template-areas:
		'head head'
		'nav main'
		'nav footer';
	grid-template-columns: 150px 1fr;
	grid-template-rows: 50px 1fr 30px;
	& > header {
		grid-area: head;
		background-color: #8ca0ff;
	}
	& > nav {
		grid-area: nav;
		background-color: #ffa08c;
	}
	& > main {
		grid-area: main;
		background-color: #ffff64;
	}
	& > footer {
		grid-area: footer;
		background-color: #ffcc80;
	}
}
</style>
