<template>
	<div class="mg-calendar" :class="{'mg-calendar-multi': multi}">
		<div class="mg-calendar-item mg-calendar-prev" v-if="multi">
			<div class="mg-calendar-header">
				<a href="javascript:;" @click="prev">
					<Icon type="md-arrow-dropleft-circle" size="20" color="#CCC"/>
				</a>
				<span class="mg-calendar-focus">{{prevMonth}}</span>
				<!-- <a href="javascript:;" @click="next" v-if="!multi"><Icon type="android-arrow-dropright-circle" size="20" color="#CCC"></Icon></a>
				<a href="javascript:;" @click="prev" v-if="!multi"><Icon type="android-arrow-dropleft-circle" size="20" color="#CCC"></Icon></a>
				<a href="javascript:;" @click="next" ><Icon type="android-arrow-dropright-circle" size="20" color="#CCC"></Icon></a> -->
			</div>
			<div class="mg-calendar-body">
				<table width="100%">
					<thead>
						<tr><th v-for="(week, index) in weeks" :key="index">{{week}}</th></tr>
					</thead>
					<tbody>
						<tr v-for="pRow in pRowsCount">
							<td v-for="pDay in 7">
								<div class="mg-calendar-day" :class="{'mg-calendar-today': pDays[(pDay-1)+(pRow-1)*7].today, 'mg-calendar-event': pDays[(pDay-1)+(pRow-1)*7].eData, 'active': activeDay == pDays[(pDay-1)+(pRow-1)*7].date}" @click="dayClick(pDays[(pDay-1)+(pRow-1)*7])">{{pDays[(pDay-1)+(pRow-1)*7].day}}</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="mg-calendar-item">
			<div class="mg-calendar-header">
				<span class="mg-calendar-focus">{{ currentMonth }}</span>
				<a href="javascript:;" @click="next">
					<Icon type="md-arrow-dropright-circle" size="20" color="#CCC"/>
				</a>
			</div>
			<div class="mg-anaounce-body">
				<table width="100%">
					<thead>
						<tr><th v-for="(week, index) in weeks" :key="index">{{week}}</th></tr>
					</thead>
					<tbody>
						<tr v-for="pRow in rowsCount">
							<td v-for="pDay in 7">
								<div class="mg-calendar-day" :class="{'mg-calendar-today': days[(pDay-1)+(pRow-1)*7].today, 'mg-calendar-event': days[(pDay-1)+(pRow-1)*7].eData, 'active': activeDay == days[(pDay-1)+(pRow-1)*7].date}" @click="dayClick(days[(pDay-1)+(pRow-1)*7])">{{days[(pDay-1)+(pRow-1)*7].day}}</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		
	</div>
</template>

<style>
.mg-calendar-item {
	display: inline-block;
	width: 100%;
}
.mg-calendar-multi .mg-calendar-item {
	float: left;
	width: 49%;
}
.mg-calendar-header {
	text-align: center;
}
.mg-anaounce-body{
	overflow: auto;
	height: 176px;
}
.mg-anaounce-header {
	text-align: center;
}
.mg-calendar-focus {
	font-size: 14px;
	display: inline-block;
	vertical-align: top;
	margin: 0 7px;
}
.mg-calendar-day {
	width: 25px;
	height: 22px;
	text-align: center;
	line-height: 25px;
	color: #999;
	margin: 0 auto;
}
.mg-calendar-today {
	background-color: #EEE;
	color: #CCC;
	border-radius: 20px;
}
.mg-calendar-event {
	/* background: url(../images/home/dot.png) no-repeat top right; */
	cursor: pointer;
	color: #333;
	font-weight: 700;
}
.mg-calendar-event.active {
	background-color: #0BB1DF;
	border-radius: 20px;
	color: #FFF;	
}
.mg-calendar-body {
    border-right: 1px solid #CCC;
    height: 100%;
}
</style>

<script>
	// import util from "@utils/util"
	import DTU from '@/libs/datetime'
	function filled(num) {
        if(num.toString().length < 2)
            return '0'+num;
        else {
            return num;
        }
    }
    function siblingDateByMonth(date, director) {
        var date = DTU.str2Date(date);
        var iYear = date.getFullYear(); // 当前年
        var iMonth = date.getMonth() + director; // 当前月
        return new Date(iYear, iMonth, 1);
    }
	
	export default {
		name: 'mg-calendar',
		props: {
			offset: Number,
			eventsData: {
				type: Array,
				default: []
			},
			anaounceDetail: {
				default: {}
			},
			multi: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			eventsData(edata) {
				var days = this.days, pDays = this.pDays;
				days.forEach((item)=>{
					edata.forEach((eD)=>{
                		if(item.date == eD.date)
                			item.eData = eD.event;
                	})
				})
				pDays.forEach((item)=>{
					edata.forEach((eD)=>{
                		if(item.date == eD.date)
                			item.eData = eD.event;
                	})
				})
			}
		},
		data() {
			return  {
				weeks: ['日', '一', '二', '三', '四', '五', '六'],
				activeDay: '',

				currentDate: siblingDateByMonth(new Date(), +1),
				days: this.createDays(siblingDateByMonth(new Date(), +1)),
				currentMonth: DTU.F(siblingDateByMonth(new Date(), +1), 'yyyy-MM'),

				prevDate: siblingDateByMonth(new Date(), -1),
				pDays: this.createDays(siblingDateByMonth(new Date(), -1)), 
				prevMonth: DTU.F(siblingDateByMonth(new Date(), -1), 'yyyy-MM')

			}
		},
		computed: {
			rowsCount() {
				return Math.ceil(this.days.length/7);
			},
			pRowsCount() {
				return Math.ceil(this.pDays.length/7);
			}
		},
		methods: {
			prev() {
				this.currentDate = siblingDateByMonth(this.currentDate, -1);
				this.currentMonth = DTU.F(this.currentDate, 'yyyy-MM');
				this.days = this.createDays(this.currentDate);

				this.prevDate = siblingDateByMonth(this.currentDate, -1);
				this.prevMonth = DTU.F(this.prevDate, 'yyyy-MM');
				this.pDays = this.createDays(this.prevDate);
			},
	        next() {
				this.prevMonth = DTU.F(this.currentDate, 'yyyy-MM');
				this.pDays = this.createDays(this.currentDate);

				this.currentDate = siblingDateByMonth(this.currentDate, 1);
				this.currentMonth = DTU.F(this.currentDate, 'yyyy-MM');
				this.days = this.createDays(this.currentDate);		
	        },
	        createDays(date) {
				var cdate = DTU.str2Date(date) || new Date();
				var iYear = cdate.getFullYear(); // 当前年
		        var iMonth = cdate.getMonth(); // 当前月
		        var firstDays = new Date(iYear, iMonth, 1).getDay(); // 当前月第一天星期几
		        var monthDays = new Date(iYear, iMonth + 1, 0).getDate(); // 当前月共多少天

		        var today = new Date();

		        var days_array = [];
		        var monthsData = [];

		        var eventsData = this.eventsData;

		        // 上个月补位
		        for (; firstDays--;) {
		            days_array.push(0);
		        }
		        for (var i = 1; i <= monthDays; i++) {
		            days_array.push(i);
		        }

		        // 行数
		        var rows = Math.ceil(days_array.length / 7);
		        for (var i = 0; i < rows; i++) {
		            for (var j = 0; j <= 6; j++) {
		                var days = days_array[j + 7 * i] || '';
		                var date = days ? iYear + '-' + filled(iMonth+1) + '-' + filled(days) : '';
		                var isToday = false;
		                var eData = "";
		                if(days) {
		                    isToday = (new Date(iYear, iMonth, days) * 1 - DTU.midnightMill() == 0 );
		                } 
		                if(eventsData.length) {
		                	eventsData.forEach((eD)=>{
		                		if(date == eD.date)
		                			eData = eD.event;
		                	})
		                }
		                monthsData.push({
		                    'day': days,
		                    'date': date,
		                    'today' : isToday,
		                    'eData' : eData
		                })
		            }
		        }
		        return monthsData;
			},
			dayClick(data) {
				if(data.eData) {
					this.activeDay = data.date;
					this.$emit('on-click', data);
				}
				
			}
		},
		mounted() {
			if(this.offset && this.multi) {
				this.currentDate = siblingDateByMonth(new Date, this.offset);
				this.currentMonth = DTU.F(this.currentDate, 'yyyy-MM');
				this.days = this.createDays(this.currentDate);

				this.prevDate = siblingDateByMonth(this.currentDate, -1);
				this.prevMonth = DTU.F(this.prevDate, 'yyyy-MM');
				this.pDays = this.createDays(this.prevDate);

			}
	    }
	}
</script>