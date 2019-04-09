Vue.component('vTable', {
	props : {
		columns: {
			type : Array,
			default : function () {
				return [];
			}
		},
		data : {
			type : Array,
			default : function () {
				return [];
			}
		}
	},
	data : function () {
		return {
			currentColumns : [],
			currentData : []
		}
	},
	template :'\
	<div>\
		<table>\
			<thead>\
				<tr>\
					<th v-for="column in currentColumns">\
					<span>{{ column.title }}</span>\
					<a v-if="column.sortable" :class="{on : column._sortType === \'asc\'}" @click="handleSortByAsc(column._index)">↑</a>\
					<a v-if="column.sortable" :class="{on : column._sortType === \'desc\'}" @click="handleSortByDesc(column._index)">↓</a>\
					</th>\
				</tr>\
			</thead>\
			<tbody>\
				<tr v-for="data in currentData">\
					<td v-for="column in currentColumns">\
						{{data[column.key]}}\
					</td>\
				</tr>\
			</tbody>\
		</table>\
	</div>',
	// render 和 teamplate 方法互换
	/*render : function (h) {
		var _this = this;
		var ths = [];

		this.currentColumns.forEach((col, index) => {
			if (col.sortable) {
				ths.push(h('th', [
					h('span', col.title),
					h('a', {
						class : {
							on : col._sortType === 'asc'
						},
						on : {
							click : function () {
								_this.handleSortByAsc(index)
							}
						}
					}, '↑'),
					h('a', {
						class : {
							on : col._sortType === 'desc'
						},
						on : {
							click : function () {
								_this.handleSortByDesc(index)
							}
						}
					}, '↓')
				]));
			} else {
				ths.push(h('th', col.title));
			}
		})

		var trs = [];
		this.currentData.forEach((row) => {
			var tds = [];
			_this.currentColumns.forEach((cell) => {
				tds.push(h('td', row[cell.key]));
			});

			trs.push(h('tr', tds));
		})
		
		return h('table', [
			h('thead', [
				h('tr', ths)
			]),
			h('tbody', trs)
		])
	},*/
	methods : {
		makeColumns : function () {
			this.currentColumns = this.columns.map(function (col, index) {
				col._sortType = 'normal';
				col._index = index;
				return col;
			})
		},
		makeData : function () {
			this.currentData = this.data.map(function (row, index) {
				row._index = index;
				return row;
			})
		},
		handleSortByAsc : function (index) {
			var key = this.currentColumns[index].key;
			this.currentColumns.forEach(function (col) {
				col._sortType = 'normal';
			});
			this.currentColumns[index]._sortType = 'asc';

			this.currentData.sort(function (a, b) {
				return a[key] > b[key] ? 1 : -1;
			});
		},
		handleSortByDesc : function (index) {
			var key = this.currentColumns[index].key;
			this.currentColumns.forEach((col) => {
				col._sortType = 'normal';
			});
			this.currentColumns[index]._sortType = 'desc';

			this.currentData.sort((a, b) => {
				return a[key] < b[key] ? 1 : -1;
			});
		}
	},
	watch : {
		data : function () {
			this.makeData();
			var sortedColumn = this.currentColumns.filter((col) => {
				return col._sortType !== 'normal';
			});

			if (sortedColumn.length > 0) {
				if (sortedColumn[0]._sortType === 'asc') {
					this.handleSortByAsc(sortedColumn[0]._index);
				} else {
					this.handleSortByDesc(sortedColumn[0]._index);
				}
			}
		}
	},
	mounted () {
		this.makeColumns();
		this.makeData();
	}
})