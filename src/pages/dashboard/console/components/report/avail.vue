<template>
    <div class="home-item">
        <div class="item-title">
            <h3>设备利用分析</h3>
            <span>
                <a href="javascript:;" @click="replace" v-if="isEdit">替换</a>
                <a href="javascript:;" @click="del" v-if="isEdit">删除</a>
            </span>
        </div>
        <Tabs value="month" :animated="false">
            <TabPane label="月分析" name="month">
                <highcharts :options="monthOptions" ref="monthChart"></highcharts>
            </TabPane>
            <TabPane label="周分析" name="week">
                <highcharts :options="weekOptions" ref="weekChart"></highcharts>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
import { equAvail } from '@/api/home/com'

const chartOption = {
    credits: {
        enabled: false
    },
    tooltip:{
        pointFormat: '<b>{point.y}</b><br/>'
    },
    color: ['rgb(115,154,251)'],
    title: { text: null },
    chart: {
        height: 150
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        visible: false
    },
    plotOptions: {
        
    },
    legend: {
        enabled: false,
        title: {
            text: ''
        }
    }
}

export default {
    data() {
        return {
            monthOptions: Object.assign({}, chartOption, {series: [{
                type: 'column',
                data: []
            }]}),
            weekOptions: Object.assign({}, chartOption, {series: [{
                type: 'column',
                data: []
            }]})
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
    watch: {
        orgId () {
            this.getData()
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        del() {
            this.$emit('on-delete', this.itemData)
        },
        replace() {
            this.$emit('on-replace', this.itemData)
        },
        getData() {
            this. getMonth()
            this.getWeek()
        },
        getMonth() {
            var monthChart = this.$refs['monthChart'].chart
            let siteId = this.orgId
            let cycle = 'month'
            equAvail({
                siteId,
                cycle
            }).then(res=> {
                // console.log(res)
                var mData = []
                res.data.forEach((item)=> {
                    mData.push({
                        y:item.counts,
                        name: item.equDate
                    })
                })
                monthChart.series[0].setData(mData)
                monthChart.reflow()
            })
        },
        getWeek() {
            var weekChart = this.$refs['weekChart'].chart
            let siteId = this.orgId
            let cycle = 'week'
            equAvail({
                siteId,
                cycle
            }).then(res=> {
                // console.log(res)
                var mData = []
                res.data.forEach((item)=> {
                    mData.push({
                        y:item.counts,
                        name: item.equDate
                    })
                })
                weekChart.series[0].setData(mData)
                weekChart.reflow()
            })
        }
    }
}
</script>

<style lang="less" scoped>

</style>