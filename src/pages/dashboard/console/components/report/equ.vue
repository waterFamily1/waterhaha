<template>
    <div class="home-item">
        <div class="item-title">
            <h3>设备情况</h3>
            <span>
                <a href="javascript:;" @click="replace" v-if="isEdit">替换</a>
                <a href="javascript:;" @click="del" v-if="isEdit">删除</a>
            </span>
        </div>
        <div class="home-equ">
            <div class="home-equ-abc" >
                <highcharts :options="pieOptions" ref="pieChart"></highcharts>
            </div>
            <div class="home-equ-state">
                <h4 style="text-align: center;">{{currentEqu}}</h4>
                <highcharts :options="barOptions" ref="barChart"></highcharts>
            </div>
        </div>
    </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
import { equ } from '@/api/home/com'

export default {
    name: 'homeEqu',
    data() {
        return {
            currentEqu: '',
            pieOptions: {
                credits: {
                    enabled: false
                },
                tooltip:{
                    pointFormat: '数量: <b>{point.y}</b><br/>'
                },
                title: { text: null },
                chart: {
                    height: 200
                },
                colors: ['#4b7efe', '#F5C758', '#DBB3F7'],
                plotOptions: {
                    pie: {
                        dataLabels: {
                            connectorWidth: 0,
                            enabled: false
                        },
                        events: {
                            click: (e) => {
                                this.transBarData(e.point);
                            }
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    innerSize: '60%',
                    allowPointSelect: true,
                    data: []
                }],
                legend: {
                    align: 'right',
                    verticalAlign: 'middle',
                    layout: 'vertical',
                    itemMarginBottom: 20
                }
            },
            barOptions: {
                credits: {
                    enabled: false
                },
                tooltip:{
                    pointFormat: '数量: <b>{point.y}</b><br/>'
                },
                title: { text: null },
                chart: {
                    height: 150
                },
                color: ['rgb(132,175,251)', '#FC7775'],
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {text: ''}
                },
                series: [{
                    type: 'bar',
                    data: [{},{}]
                }],
                dataLabels: {
                    enabled: false
                },
                legend: {
                    enabled: false
                }
            }
        }
    },
    components: {
        highcharts: Chart
    },
    props: {
        isEdit: Boolean,
        itemData: Object,
        orgId: {
            type: [String, Number],
            default: -1
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        transBarData(data) {
            this.currentEqu = data.name
            var point = data.data.data
            var barChart = this.$refs['barChart'].chart
            var barData = []
            point.forEach((item)=> {
                barData.push({
                    name: item.name,
                    y: item.value
                })
            })
            barChart.series[0].setData(barData)
        },
        del() {
            this.$emit('on-delete', this.itemData)
        },
        replace() {
            this.$emit('on-replace', this.itemData)
        },
        getData() {
            var orgId = this.orgId
            var pieChart = this.$refs['pieChart'].chart,barChart = this.$refs['barChart'].chart
            equ(orgId).then(res=> {
                if(res) {
                    var pieData = [];
                    res.data.forEach((item, i)=>{
                        pieData.push({
                            y: item.value,
                            name: item.name,
                            data: item,
                            selected: (i==0?true:false),
                            sliced: (i==0?true:false)
                        })
                    })
                    pieChart.series[0].setData(pieData)
                    
                    var barItemDefault = res.data[0].data
                    this.currentEqu = res.data[0].name
                    var barData = []
                    barItemDefault.forEach((bItem)=>{
                        barData.push({
                            name: bItem.name,
                            y: bItem.value
                        })
                    })
                    barChart.series[0].setData(barData)

                    pieChart.reflow()
                    barChart.reflow()
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.home-equ {
	width: 100%;
	overflow: hidden;
}
.home-equ-abc {
	float: left;
	width: 49%;
}
.home-equ-state {
	float: left;
	width: 49%;
}
</style>