Vue.directive('clickoutside', {
	//参数依次返回el,binding,vnode
	bind : function (el, binding, vnode) {
		function documentHandler (e) {
			if (el.contains(e.target)) {
				//结束函数
				return false
			}

			//判断有没有写表达式,自定义指令中，表达式应该是一个函数，如 handleClose
			if (binding.expression) {
				//binding.value() 就是用来 行当前上下文 methods 中指定的函数的
				//因为 binding.value 会运算 表达式，所以 binding.value() = handleClose()
				binding.value(e);
			}
		}

		//按 ESC 关闭下拉菜单
		function documentEsc (e) {
			if (e.keyCode == 27) {
				binding.value(e);
			} 
		}

		el.__vueClickOutSide__ = documentHandler;
		el.__vueEscKeyDown__ = documentEsc;
		document.addEventListener('click', documentHandler);
		document.addEventListener('keydown', documentEsc);
	},
	//unbind 钩子只有在你的 DOM 元素被 VUE 删除（自己手动删除也不行）时才会被调用
	unbind : function (el, bingding) {
		document.removeEventListener('click', el.__vueClickOutSide__);
		document.removeEventListener('keydown', el.__vueEscKeyDown__);
		delete el.__vueClickOutSide__;
		delete el.__vueEscKeyUp__;
	}
});