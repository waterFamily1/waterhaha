<template>
    <div class="map-box" :style="{height: height+'px'}">
        <div class="index-search">
            <div class="search-main">
                <div class="form-item">
                    <label>所属组织：</label> 
                    <TreeSelect 
                        v-model="orgId" 
                        :data="orgList" 
                        v-width="200" 
                    />
                </div>
                <div class="form-item">
                    <label>时间：</label>
                    <DatePicker type="date" placeholder="请选择日期" format="yyyy-MM-dd" style="width: 200px" v-model="executeDate" :clearable="false"></DatePicker>
                </div>
                  <div class="form-search-btn">
                    <Button @click="search()">搜索</Button>
                    <Button class="reset" @click="searchParamsClean">重置</Button>
                </div>
            </div>
        </div>
        <div class="map-content" :style="{height: (height-45)+'px'}">
            <div class="c-scrollbar">
                <Table :columns="columns" :data="listData" @on-select-cancel="onSelect" @on-selection-change="onSelect" stripe :loading="loading" width="900"></Table>
            </div>

            <div class="map-show">
                <div id="patrol-trace-map" style="margin-left: 10px;" :style="{height: H+'px'}"></div>
                <span v-show="mapLoading" style="position: absolute;left: 20px;top: 10px;color: #999;">正在加载地图...</span>
                <div class="bdmap-search">
                    <Icon type="ios-search" size="20" color="#CCCCCC"></Icon>
                    <input type="text" id="bdmap-search-key" class="bdmap-search-key" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { orgMethod, tableMethod } from '@/api/pollingManage/map'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'
import { mapState } from 'vuex'
import mapUtil from '@/libs/map'

var map
const _LOCAL_NOW = util.F(new Date)+' 00:00:00'

export default {
    name:'mapPolling',
    data () {
        return {
            height :'',
            H: '300px',
            orgId: '',
            orgList: [],
            executeDate: _LOCAL_NOW,
            columns: [
                { type: "selection", width: 30, align: "center" },
                {
                    title: "巡检任务",
                    key: "name",
                    ellipsis: true
                }, {
                    title: "任务编号",
                    key: "no",
                    ellipsis: true
                }, {
                    title: "状态",
                    key: "executeStatus",
                    width:80
                }, {
                    title: "巡检点",
                    key: "inspectedCount",
                    width: 80,
                    render: (h, data) => {
                        return h(
                            "span",
                            data.row.inspectedCount +
                                "/" +
                                data.row.patrolPointCount
                        );
                    }
                }, {
                    title: "结果记录",
                    key: "hasResultCount",
                    width: 120,
                    renderHeader: (h) => {
                            return h('span', {
                                attrs:{
                                    title: '结果记录'
                                }
                            }, '结果记录')
                        },
                    render: (h, data) => {
                        return h(
                            "span",
                            data.row.hasResultCount + "/" + data.row.stepCount
                        );
                    }
                }, {
                    title: "报缺", 
                    key: "faultCount",
                    width: 60
                }, {
                    title: "执行人", 
                    key: "executorName", 
                    width: 120
                }, {
                    title: "结束时间",
                    key: "endTime",
                    width: 120,
                    render: (h, data) => {
                        return h("span", util.transDateFromServer(data.row.endTime, "hh:mm:ss"));
                    }
                }
            ],
            listData: [],
            currentPage: 1,
            loading: false,
            mapLoading: false
        }
    },
    computed: mapState({
        patrol : (state) => state.map.patrol
    }),
    mounted() {
        this.height = document.body.clientHeight-75
        this.getOrg() 

        var layHeight = document.querySelector('.lay').offsetHeight - 103
        this.H = this.height-110 
        mapUtil.create(()=>{
            map = new BMap.Map('patrol-trace-map')
            map.enableScrollWheelZoom(true)
            mapUtil.setStyle(map)
            this.getTable()
            mapUtil.addSearch(map)
        });
    },
    methods: {
        getOrg() {
            orgMethod().then(res=> {
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.orgList = createTree(treeItem, 0)
            }).catch(err=> {

            })
        },
        getTable() {
            this.loading = true
            const _STATE = this.patrol.task.state
            let orgId = this.executeDate
            let executeDate = util.transDateFromLocale(this.executeDate)
            let currentPage = this.currentPage
            tableMethod({
                orgId,
                executeDate,
                currentPage
            }).then(res=> {
                this.loading = false
                if(res.data) {
                    res.data.items.forEach((item)=>{
                        item._checked = true
                        item.executeStatus = _STATE[item.executeStatus]
                    })
                    this.listData = res.data.items
                    this.onSelect(res.data.items)
                    if(res.data.total == 0) {
                        mapUtil.placePoint(map, ()=>{ 
                            this.mapLoading = false 
                        })
                        return
                    } else {
                        this.mapLoading = false
                    }
                }
            }).catch(err=> {

            })
        },
        onSelect(selection) {
            //取同一计划下，最后一个任务
            map.clearOverlays(); 
            if(!selection.length) return
            let selected = []
            let beforeRow = selection[0]
            for (let i = 0; i < selection.length; i++) {
                let obj = selection[i]
                if (obj.patrolPlanId != beforeRow.patrolPlanId) {
                    selected.push(beforeRow)
                    beforeRow = obj
                }
            }
            selected.push(selection[selection.length - 1]) //最后一行
            selected.forEach((item)=>{
                mapUtil.drawPatrol(map, item)
            })
        },
        search() {
            this.currentPage = 1
            this.getTable()
        },
        searchParamsClean() {
            this.orgId = ''
            this.executeDate = _LOCAL_NOW
        }
    }
}
</script>
<style lang="less" scoped>
.map-box{
    margin: 5px;
    background: #fff;
    overflow: auto;
    .index-search {
        padding: 5px;
        height: 43px;
        .search-main {
            height: 33px;
            .form-item {
                display: inline-block;
                min-height: 33px;
                label {
                    display: inline-block;
                    width: 100px;
                    line-height: 35px;
                    text-align: right;
                    color: #576374;
                }
            }
            .form-search-btn {
                float: right;
                margin-top: 4px;
                a {
                    margin: 0 10px 0 0;
                    color: #576374;
                    font-size: 12px;
                }
                .ivu-btn{
                    height: auto;
                    background: #4b7efe;
                    font-size: 12px;
                    padding: 4px 12px;
                    color: #fff;
                    border: 0;
                    border-radius: 3px;
                    margin: 0 5px;
                }
                .reset{
                    background: #495566;
                }
            }
        }
    }
    .map-content{
        border-top: 5px solid #f0f0f0;
        padding:10px;
        .c-scrollbar{
            float: left;
            overflow: auto;
            width: 50%;
            height: 100%;
        }
        .map-show{
            width: 50%;
            height: 100%;
            float: right;
            position: relative;
        }
    }
}
.bdmap-search {
    position: absolute;
    top: 17px;
    right: 20px;
}
</style>