Vue.component('vInput', {
	props : {
		value : {
			type : [String, Number],
			default : ''
		}
	},
	template : '<div>\
		<span>昵称： </span>\
		<input type="text" :value="value" @input="input">\
	</div>',
	/*render : function (h) {
		var _this = this;
		return h('div', [
			h('span', '昵称： '),
			h('input', {
				attrs : {
					type : 'text'
				},
				domProps : {
					value : this.value
				},
				on : {
					input : function (event) {
						_this.value = event.target.value;
						_this.$emit('input', event.target.value);
					}
				}
			})
		]);
	},*/
	methods : {
		input : function (event) {
			this.value = event.target.value;
			this.$emit('input', event.target.value);
		}
	}
});

Vue.component('vTextarea', {
	props : {
		value : {
			type : String,
			default : ''
		}
	},
	template : '<div>\
		<span>留言内容： </span>\
		<textarea placeholder="请输入留言内容" :value="value" @input="input" ref="message"></textarea>\
	</div>',
	/*render : function (h) {
		var _this = this;
		return h('div', [
			h('span', '留言内容： '),
			h('textarea', {
				attrs : {
					placeholder : '请输入留言内容'
				},
				domProps : {
					value : this.value
				},
				//如果在普通的DOM上使用，引用就指向DOM元素
				ref : 'message',
				on : {
					input : function (event) {
						_this.value = event.target.value;
						_this.$emit('input', event.target.value);
					}
				}
			})
		])
	},*/
	methods : {
		focus : function () {
			this.$refs.message.focus();
		},
		input : function (event) {
			this.value = event.target.value;
			this.$emit('input', event.target.value);
		}
	}
});