<template>
	<div>
		<h1>首页</h1>
		{{ count }}
		{{ list }}
		{{ listCount }}
		<button @click="handleIncrement">+1</button>
		<button @click="handleDecrease">-1</button>
		<button @click="handleIncrementMore">+5</button>
		<button @click="handleActionIncrement">action +1</button>
		<button @click="handleAsyncIncrement">async +1</button>
	</div>
</template>

<script>
	export default {
		computed : {
			count () {
				return this.$store.state.count;
			},
			list () {
				/*return this.$store.state.list.filter(item => item < 10);*/
				return this.$store.getters.filteredList;
			},
			listCount () {
				return this.$store.getters.listCount;
			}
		},
		methods : {
			handleIncrement () {
				this.$store.commit('increment');
			},
			handleDecrease () {
				this.$store.commit('decrease');
			},
			handleIncrementMore () {
				this.$store.commit('increment', 5)
			},
			handleActionIncrement () {
				this.$store.dispatch('increment');
			},
			handleAsyncIncrement () {
				this.$store.dispatch('asyncIncrement').then(() => {
					console.log(this.$store.state.count);
				})
			}
		}
	}
</script>