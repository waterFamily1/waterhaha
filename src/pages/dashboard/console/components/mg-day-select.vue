<template>
	<div class="cmp-month-select">
		<Button shape="circle" icon="ios-arrow-back" @click="prev"></Button>
		<span class="cmp-month-select-current">{{value}}</span>
		<Button shape="circle" icon="ios-arrow-forward" @click="next" :disabled="disabled"></Button>
	</div>
</template>

<style>
.cmp-month-select {text-align: center;}
.cmp-month-select .ivu-btn {background-color:#FFF;color:#999;border: 1px solid #999;width: 20px;
    height: 20px;line-height: 20px;}
.cmp-month-select-current {margin: 2px 20px;display: inline-block;vertical-align: top;color: #000;font-weight: 700;}
</style>

<script>
	import util from '@/libs/public_js'

	function getSiblingDay(d) {
		var prev = new Date(d)*1 - 24*60*60*1000, next = new Date(d)*1 + 24*60*60*1000;
		return {
			prev: util.F(new Date(prev), 'yyyy-MM-dd'),
			next: util.F(new Date(next), 'yyyy-MM-dd')
		}
	}
	const __NOW = util.F(new Date, 'yyyy-MM-dd');
	export default {
		name: 'mgDaySelect',
		props: {
			loading: false,
			value: String
		},
		data () {
			return {
				disabled: true
			}
		},
		mounted () {
			
		},
		methods:{
			prev () {
				if(!this.loading) {
					var prev = getSiblingDay(this.value).prev;
					this.$emit('input', prev);
					this.$emit('on-change', prev);
				}
				if(prev == __NOW) 
					this.disabled = true;
				else
					this.disabled = false;
			},
			next () {
				if(!this.loading) {
					var next = getSiblingDay(this.value).next;
					this.$emit('input', next);
					this.$emit('on-change', next);
				}
				if(next == __NOW) 
					this.disabled = true;
				else
					this.disabled = false;
			}
		}
	}
</script>