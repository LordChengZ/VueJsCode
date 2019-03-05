var app = new Vue({
	el : '#app',
	data : {
		list : [
			{
				id : 1,
				name : 'iPhone 7',
				price : 6188,
				count : 1,
				check : false

			},
			{
				id : 2,
				name : 'iPad Pro',
				price : 5888,
				count : 1,
				check : false
			},
			{
				id : 3,
				name : 'MacBook Pro',
				price : 21488,
				count : 1,
				check : false
			}
		]
	},
	computed : {
		totalPrice : function () {
			var total = 0;
			for (var i = 0; i < this.list.length; i++) {
				var item = this.list[i];
				if (item.check) {
					total += item.price * item.count;
				}
			}

			return total.toString().replace(/\B(?=(\d{3}))+$/g, ',');
		}
	},
	methods : {
		handleReduce : function (index) {
			if (this.list[index].count === 1) return;
			this.list[index].count--;
		},
		handleAdd : function (index) {
			this.list[index].count++;
		},
		handleRemove : function (index) {
			this.list.splice(index, 1);
		},
		handleCheck :function (index) {
			if (this.list[index].check == true) {
				this.list[index].check = false;
			} else {
				this.list[index].check = true;
			}
		}
	}
});