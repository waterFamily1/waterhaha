<template>
    <div class="home-item">
        <div class="item-title">
            <h3>设备KPI</h3>
            <span>
                <a href="javascript:;" @click="replace" v-if="isEdit">替换</a>
                <a href="javascript:;" @click="del" v-if="isEdit">删除</a>
            </span>
        </div>
        <div style="height: 30px;">
            <mg-month-select v-model="month" @on-change="kpiMonthChange" :loading="loading"></mg-month-select>
        </div>
        <div class="home-kpi-list">
            <div class="home-kpi-flex" v-for="(item, index) in modalItems" :key="index">
                <div class="home-kpi-item" :class="'k-'+item.key" v-if="item.checked">
                    <div class="home-kpi-name">{{item.title}}</div>
                    <div class="home-kpi-value">{{item.kpiValue}}</div>
                </div>
                <div :class="'home-kpi-icon kpi'+index">
                    <img :src="kpiImg[index]" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const __MAP = {
    keyEqu: 'service-important',
    maintain: 'maintain',
    defect: 'fault',
    normalEqu: 'service-normal',
    repair: 'repair',
    patrol: 'avail'
}

const kpiImg = [
    'http://web.tjdeht.cn:8801/images/80db2fa087b7519615851379066a2316.png',
    'http://web.tjdeht.cn:8801/images/f0f266e546f19d029107375f174e7e1d.png',
    'http://web.tjdeht.cn:8801/images/0acfba96fed41dd3d18091db5ca6c0da.png',
    'http://web.tjdeht.cn:8801/images/8b068b01f3db1f12e5beda86d0be7562.png',
    'http://web.tjdeht.cn:8801/images/a18a563aa4a3498a8ab644569b47f9b6.png',
    'http://web.tjdeht.cn:8801/images/723c92fe0a4f180178dd984e195ee643.png'
]

import util from '@/libs/public_js'
import { equKPI } from '@/api/home/com'
import mgMonthSelect from '../mg-month-select'

const __NOW = util.F(new Date, 'yyyy-MM')

export default {
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
            this.month = __NOW
            this.getData()
        }
    },
    components: {
        mgMonthSelect
    },
    data() {
        return {
            loading: false,
            initItems : [],
            modalItems : [],
            kpiModalShown: false,
            month: __NOW,
            kpiImg: kpiImg
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        kpiMonthChange () {
            this.getData()
        },
        getData() {
            this.loading = true
            var siteId = this.orgId,
                date = this.month;
            equKPI({
                siteId,
                date
            }).then(res=> {

                this.loading = false
                res.data.forEach((item)=> {
                    item.key = __MAP[item.kpiName]
                    item.kpiValue = item.kpiValue ? item.kpiValue+'%' : '无记录'
                })
                this.initItems = JSON.parse(JSON.stringify(res.data))
                this.modalItems = res.data
            })
        },
        cancel() {
            this.modalItems = this.initItems
            this.kpiModalShown = false
        },
        add () {
            // this.$http.put(api.editKPI, this.modalItems).then((res)=>{
            //     if(res.count) {
            //         this.$Notice.success({title: '编辑成功！'})
            //         this.kpiModalShown = false
            //     }
            // })
        },
        del() {
            this.$emit('on-delete', this.itemData)
        },
        replace() {
            this.$emit('on-replace', this.itemData)
        }
    }
}
</script>

<style lang="less" scoped>
.home-kpi-list {
    overflow: hidden;
	padding-left: 10px;
    .home-kpi-flex {
        position: relative;
        height: 75px;
        width: 32%;
        margin: 0 1.3% 10px 0;
        float: left;
        .home-kpi-item {
            margin: 0 auto;
            padding-left: 10px;
            height: 75px;
            background-color: #F8F9FB;
            color: #FFF;
            border-radius: 2px;
            overflow: hidden;
            .home-kpi-name {
                height: 20px;
                margin: 12px 0 6px 0;
                color: #8190A5;
                font-size: 12px;
            }
            .home-kpi-value {
                color: #394553;
                font-size: 18px;
                font-family: verdana,arail;
                font-weight: 100;
            }
        }
        .home-kpi-icon {
            position: absolute;
            width: 55px;
            height: 55px;
            top: 10px;
            right: 10px;
            border-radius: 50%;
            img {
                display: block;
                width: 22px;
                height: 22px;
                margin: 14px auto 0;
            }
        }
        .kpi0 {
            border: 2px solid rgb(150, 187, 240);
        }
        .kpi1 {
            border: 2px solid rgb(219, 179, 247);
        }
        .kpi2 {
            border: 2px solid rgb(248, 236, 236);
        }
        .kpi3 {
            border: 2px solid rgb(238, 244, 252);
        }
        .kpi4 {
            border: 2px solid rgb(252, 244, 224);
        }
        .kpi5 {
            border: 2px solid rgb(248, 236, 236);
        }
    }
}
</style>