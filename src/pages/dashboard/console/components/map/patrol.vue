<template>
    <div class="home-item">
        <div class="item-title">
            <h3>地图巡检跟踪</h3>
            <span>
                <a href="javascript:;" @click="toggle" class="home-fullscreen-trigger">全屏</a>
                <a href="javascript:;" @click="replace" v-if="isEdit">替换</a>
                <a href="javascript:;" @click="del" v-if="isEdit">删除</a>
            </span>
        </div>
        <div style="height: 30px;">
            <mg-day-select v-model="day" @on-change="patrolMonthChange" :loading="loading"></mg-day-select>
            <span v-show="mapLoading" style="position: absolute;left: 10px;top: 0;color: #999;">正在加载地图...</span>
        </div>
        <div style="margin: 0 5px;position: relative;">
            <fullscreen ref="fullscreen" @change="fullscreenChange" class="fullscreen">
                <div id="home-patrol-map" class="home-patrol-map" ></div>
                <div class="bdmap-search">
                    <Input prefix="ios-search" type="text" id="home-bdmap-search-key" class="bdmap-search-key" />
                </div>
            </fullscreen>
        </div>
    </div>
</template>

<script>
var map

import fullscreen from 'vue-fullscreen'
import Vue from 'vue'
Vue.use(fullscreen)
import { mapState } from 'vuex'
import mapUtil from '@/libs/map'
import util from '@/libs/public_js'
import { patrol } from '@/api/home/com'
import mgDaySelect from '../mg-day-select'

const __NOW = util.F(new Date, 'yyyy-MM-dd')

export default {
    components: {
        mgDaySelect
    },
    props: {
        isEdit: Boolean,
        itemData: Object,
        orgId: {
            type: [String, Number],
            default: -1
        }
    },
    data() {
        return {
            mapLoading: true,
            loading: false,
            day: __NOW
        }
    },
    watch: {
        orgId () {
            if(map){
                map.clearOverlays();
            }
            this.day = __NOW;
            this.getData();
        }
    },
    computed: mapState({
        patrol : (state) => state.map.patrol
    }),
    mounted() {
        mapUtil.create(()=> {
            map = new BMap.Map('home-patrol-map', {enableMapClick: false})
            mapUtil.setStyle(map)
            var _navigation = new BMap.NavigationControl()
            map.addControl(_navigation)
            this.getData()
            mapUtil.addSearch(map, 'home-bdmap-search-key')
        })
    },
    methods: {
        toggle () {
            this.$refs['fullscreen'].toggle()
        },
        fullscreenChange(fusren) {
            if(fusren) {
                map.panBy(1,1)
                map.enableScrollWheelZoom()
            } else {
                map.disableScrollWheelZoom()
            }
        },
        patrolMonthChange() {
            map.clearOverlays()
            this.getData()
        },
        getData() {
            var _self = this
            this.loading = true

            var orgId = this.orgId,
                _day = this.day
            
            let executeDate = util.transDateFromLocale(_day+' 00:00:00')
            patrol({
                orgId,
                executeDate
            }).then(res=> {
                if(res.data.items && res.data.items.length) {
                    _self.mapLoading = false
                    res.data.items.forEach((item)=> {
                        item.executeStatus = this.patrol.task.state[item.executeStatus]
                        mapUtil.drawPatrol(map, item)
                    })
                } else {
                    _self.mapLoading = false
                    mapUtil.placePoint(map, ()=> {
                        _self.mapLoading = false
                    })							
                }
                this.loading = false
            })
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
.home-fullscreen-trigger {
    font-weight: 100;
    font-size: 13px;
    width: 34px;
    text-align: center;
    float: right;
    margin-right: 10px;
    color: #333;
    line-height: 40px;
}
.bdmap-search {
    position: absolute;
    top: 0;
    right: 0;
    width: 306px;
    height: 36px;
    background-color: #FFFFFF;
    opacity: .7;
    /deep/.ivu-input-with-prefix {
        border: 3px solid #CCCCCC;
        height: 36px;
    }
    .ivu-icon {
        margin: 5px 6px 0 6px;
    }
}
.home-patrol-map {
	width: 100%;
	height: 410px
}
</style>