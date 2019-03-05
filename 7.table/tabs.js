Vue.component('tabs', {
	template : '\
		<div class="tabs"> \
			<div class="tabs-bar"> \
				<!-- 标签页标题，这里要用 v-for --> \
				<div :class="tabCls(item)" v-for="(item, index) in navList" @click="handleChange(index)"> \
				 	<span v-if="isShown(item)" @clcik="deleteTab(index, event)">x</span>\
					{{ item.label }} \
				</div> \
			</div> \
			<div class="tabs-content"> \
				<!-- 这里的 slot 就是嵌套的 pane --> \
				<slot></slot> \
			</div> \
		</div>',
	props : {
		value : {
			type : [String, Number]
		}
	},
	data : function () {
		return {
			currentValue : this.value,
			navList : []
		}
	},
	methods : {
		tabCls : function (item) {
			return [
				'tabs-tab',
				{
					'tabs-tab-active' : item.name === this.currentValue
				}
			]
		},
		getTabs : function () {
			return this.$children.filter(function (item) {
				return item.$options.name === 'pane';
			});
		},
		updateNav : function () {
			this.navList = [];
			var _this = this;

			this.getTabs().forEach(function (pane, index) {
				_this.navList.push({
					label : pane.label,
					name : pane.name || index
				});
				if (!pane.name) pane.name = index;
				if (index === 0) {
					if (!_this.currentValue) {
						_this.currentValue = pane.name || index;
					}
				}
			});

			this.updateStatus();
		},
		updateStatus : function () {
			var tabs = this.getTabs();
			var _this = this;

			tabs.forEach(function (tab) {
				return tab.show = tab.name === _this.currentValue;
			})
		},
		handleChange : function (index) {
			var nav = this.navList[index];
			var name = nav.name;

			this.currentValue = name;
			this.$emit('input', name);
			this.$emit('on-click', name);
		},
		isShown : function (item) {
			console.log(item.closable);
			var flag = item.closable == 'true';
			console.log("-------------");
			console.log(flag);
			return flag;
		},
		deleteTab : function (index, event) {
			if (this.navList[index].name === this.currentValue) {
				if (index > 0) {
					
				}
			}
		}
	},
	watch : {
		value : function (val) {
			this.currentValue = val;
		},
		currentValue : function () {
			this.updateStatus();
		}
	}
})