<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div style="position: relative;height: 100%">
            <div id="dispatch-map" :style="{height: height+'px'}"></div>
            <span v-show="mapLoading" style="position: absolute;left: 20px;top: 10px;color: #999;">正在加载地图...</span>

            <div class="dispatch-menu">
	        	<a href="javascript:;" @click="shownId='process'">
                    <img src="../../images/map2.png" />
                    <span>区域位置</span>
                </a>
	        	<a href="javascript:;" @click="shownId='alarm'">
                    <img src="../../images/map3.png" />
                    <span>报警列表</span>
                </a>
	        	<a href="javascript:;" @click="shownId='staff'">
                    <img src="../../images/map1.png" />
                    <span>在线人员</span>
                </a>
	        </div>

            <div class="dispatch-summary">
	        	<div class="dispatch-summary-handle">已处理报警：{{summaryData.handleAlarmCount}}</div>
	        	<div class="dispatch-summary-unhandle">未处理报警：{{summaryData.unhandleAlarmCount}}</div>
	        	<div class="dispatch-summary-onduty">任务中人数：{{summaryData.haveTask}}</div>
	        	<div class="dispatch-summary-offduty">空闲中人数：{{summaryData.nohaveTask}}</div>
	        </div>

            <div class="dispatch-setting">
	        	<Dropdown @on-click="setting">
                    <Icon type="md-settings" size="20" color="rgb(154, 171, 196)"/>
	        		<DropdownMenu slot="list">
						<DropdownItem name="fav">收藏视角</DropdownItem>
					</DropdownMenu>
				</Dropdown>
	        </div>

            <!-- 区域位置 -->
            <transition name="alarm">
                <div class="dispatch-process" v-show="shownId=='process'">
                    <h2 class="dispatch-modal-h">
                        <span class="dispatch-modal-hl">区域位置</span> 
                        <a href="javascript:;" class="dispatch-modal-hr" @click="shownId=''">
                            <Icon type="md-close" />
                        </a>
                    </h2>
                    <div class="dispatch-process-search">
		                <Select
			                placeholder="输入名称以检索"
			                :clearable="true"
			                filterable
			                remote
			                :loading="processSearchLoading"
			                :remote-method="processSearch"
			                @on-change="processItemClick"
			                style="width:100%">
			                <Option v-for="item in processSearchData" :value="JSON.stringify(item)" :key="item.id">{{ item.name }}</Option>
			            </Select>
		            </div>
                    <div class="dispatch-process-tree c-scrollbar">
			            <Tree :data="processTreeData" @on-select-change="processTreeSelect"></Tree>
			        </div>
                </div>
            </transition>
            <!-- 报警列表 -->
            <transition name="alarm">
                <div class="dispatch-alarm" v-show="shownId=='alarm'">
                    <h2 class="dispatch-modal-h">
                        <span class="dispatch-modal-hl">报警列表</span>
                        <a href="javascript:;" class="dispatch-modal-hr" @click="shownId=''">
                            <Icon type="md-close" />
                        </a>
                    </h2>
                    <div class="dispatch-alarm-search">
                        <label>关键字</label>
                        <Input v-model="alarmSearchParams.queryName" size="small" style="width:100px"></Input>
                        <label>区域位置</label>
                        <TreeSelect v-model="alarmSearchParams.siteId" :data="alarmTree" size="small" v-width="120" />
                        <label>处理状态</label>
                        <Select v-model="alarmSearchParams.handleStatus" size="small" style="width:100px" @on-change="alarmSearch">
                            <Option v-for="item in alarmStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <div style="padding: 5px 5px 0px 0px; text-align: right;">
                            <Button @click="alarmSearch">搜索</Button>
                            <Button class="reset" @click="alarmReset">重置</Button>
                        </div>
                    </div>
                    <div class="dispatch-alarm-table">
                        <Table :columns="alarmColumns" :data="alarmListData" stripe size="small"></Table>
                        <div style="margin-top: 10px;">
                            未处理：<span style="color: #E03E3E;margin-right: 10px;">{{alarmInfoData.unhandleAlarmCount}}</span>
                            已处理：<span style="color: #0BB1DF">{{alarmInfoData.handleAlarmCount}}</span>
                        </div>
                        <Page :total="alarmTotal" :page-size="alarmSearchParams.pageSize" :current="alarmSearchParams.currentPage" class="table-page" show-total show-elevator @on-change="alarmPageChange" size="small"></Page>
                    </div>
                </div>
            </transition>
            <!-- 在线人员 -->
            <transition name="alarm">
                <div class="dispatch-alarm" v-show="shownId=='staff'">
                    <h2 class="dispatch-modal-h">
                        <span class="dispatch-modal-hl">在线人员</span>
                        <a href="javascript:;" class="dispatch-modal-hr" @click="shownId=''">
                            <Icon type="md-close" />
                        </a>
                    </h2>
                    <div class="dispatch-alarm-search" style="display: flex;justify-content: space-between;">
                        <Input v-model="staffSearchParams.queryName" size="small" icon="ios-search" style="width: 170px" @on-click="staffSearch" @keyup.enter.native="staffSearch"></Input>
                        <div class="dispatch-alarm-search-state">
                            <label for="">有无任务</label>
                            <Select v-model="staffSearchParams.haveTask" size="small" style="width:100px" @on-change="staffSearch">
                                <Option v-for="item in staffStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </div>
                    </div>
                    <div class="dispatch-alarm-table">
                        <Table :columns="staffColumns" :data="staffListData" stripe size="small"></Table>
                        <div style="margin-top: 10px;">
                            有任务：<span style="color: #0BB1DF;margin-right: 10px;">{{staffInfoData.haveTask}}</span>
                            无任务：<span style="color: #E03E3E">{{staffInfoData.nohaveTask}}</span>
                        </div>
                        <Page :total="staffTotal" :page-size="staffSearchParams.pageSize" :current="staffSearchParams.currentPage" class="table-page" show-total show-elevator @on-change="staffPageChange" size="small"></Page>
                    </div>
                </div>
            </transition>
            <!-- 关键指标 -->
            <transition name="alarm">
	        	<div class="dispatch-key" v-show="shownId=='key'">
                    <h2 class="dispatch-modal-h">
                        <span class="dispatch-modal-hl">关键指标</span>
                        <a href="javascript:;" class="dispatch-modal-hr" @click="shownId=''">
                            <Icon type="md-close" />
                        </a>
                    </h2>
		        	<div class="c-nodata-tip" v-if="keyData.length == 0">暂无数据</div>
		        	<table width="100%" class="dispatch-staff-table" v-else>
		        		<tr v-for="item in keyData" :key="item.id">
		        			<th>{{item.indexName}}</th><td>{{item.value}} {{item.unit}}</td>
		        		</tr>
		        	</table>
	        	</div>
			</transition>
        </div>

        <script id="dispatch-staff-window" type="text/template">
            <div class="dispatch-staff-window">
                <h2>${userName}<a href="javascript:;" data-rel-type="close" class="dispatch-win-close"></a></h2>
                <table class="dispatch-staff-table">
                    <tr>
                        <th width="80">姓名</th><td>${userName}</td>
                        <th width="80">任务名称</th><td>${taskName}</td></tr>
                    <tr>
                        <th>手机号</th><td>${phone}</td>
                        <th>任务类型</th><td>消缺任务</td>
                    </tr>
                    <tr>
                        <th>所属组织</th><td>${orgName}</td>
                        <th>区域位置</th><td>${processName}</td>
                    </tr>
                </table>
                {@if taskId}
                <a href="${taskUrl}" class="dispatch-staff-more">任务详情&gt;&gt;</a>
                {@/if}
                <div class="dispatch-win-arrow"></div>
            </div>
		</script>
		<script id="dispatch-process-window" type="text/template">
			<div class="dispatch-process-window">
				<h2>${processName}<a href="javascript:;" data-rel-type="close" class="dispatch-win-close"></a></h2>
				<div class="dispatch-process-main">
					<div class="dispatch-process-img">
						{@if processImg}
						<img src="${processImg}" alt="" width=180 height=130>
						{@else}
						<div><a href="/#/basic/process/${processId}">请在区域位置信息上传图片</a></div>
						{@/if}
						
						{@if cameraStatus == 1}
						<a class="dispatch-camera-off" href="javascript:;"></a>
						{@else if cameraStatus == 2}
						<a class="dispatch-camera-on" href="javascript:;" data-rel-type="camera"></a>
						{@/if}
						
					</div>
					<div class="dispatch-process-info">
						<p>{@if processDesc}${processDesc}{@else}<a href="/#/basic/process/${processId}">请在区域位置信息配置简介</a>{@/if}</p>
						<table class="dispatch-process-table">
							<tr>
								<th width="70">连线状态</th>
								<td width="50" {@if gatewayStatus == 0}class="dispatch-gateway-offline"{@else}class="dispatch-gateway-online1"{@/if}>${gatewayStatusText}</td>
								<th width="40">报警</th>
								<td class="dispatch-gateway-offline">${alarmCount}</td>
							</tr>
							<tr><th>设备报修</th><td colspan="3" class="dispatch-gateway-online">${repairCount}</td></tr>
						</table>
						<a href="javascript:;" class="dispatch-process-report" data-rel-type="report" data-rel-id="${siteId}">报缺&gt;&gt;</a>
					</div>
				</div>
				<div class="dispatch-process-btns">   
					<a href="javascript:;" {@if screenStatus!=1}class="disabled"{@/if} data-rel-type="processview">监视画面</a>
					<a href="javascript:;" {@if alarmRecordStatus!=1}class="disabled"{@/if} data-rel-type="alarm">历史报警</a>
					<a href="javascript:;" {@if indexStatus!=1}class="disabled"{@/if} data-rel-type="key">关键指标</a>
					<a href="javascript:;" {@if videoClick!=1}class="disabled"{@/if} data-rel-type="monitor">视频监控</a>
				</div>
				<div class="dispatch-win-arrow"></div>
			</div>
		</script>
    </div>
</template>

<script>
var map, winOverlay, winTpl , compiledTpl, staffTpl, compiledStaffTpl
import { treeMethod, coorMethod, promptMethod, setMethod, treeMethod2, searchProcess, alarmsData, staffsData, mapMethod, keyMethod, staffDetail } from '@/api/supervise/dispatch'
import { mapState } from 'vuex'
import util from '@/libs/public_js'
import mapUtil from '@/libs/map'
import createTree from '@/libs/public-util'

var juicer = require('juicer')

function CustomInfoWindow(point, html, options, data) {
    this._point = point
    this._html = html
    this._width = options.width
    this._height = options.height
    this._data = data
}

var infoWindow = {
    create: function(map, _BMap, vueIns) {
        CustomInfoWindow.prototype = new _BMap.Overlay()
        CustomInfoWindow.prototype.initialize = function(map){
            var data = this._data
            this._map = map
            var div = this._div = document.createElement("div")
            div.style.position = "absolute"
            div.style.zIndex = _BMap.Overlay.getZIndex(this._point.lat)
            div.style.width = this._width + 'px'
            div.style.height = this._height + 'px'
            div.innerHTML = this._html
            div.addEventListener('click', function(event) {
                event.stopPropagation()
                var target = event.target
                if(target.tagName.toLowerCase() == 'a') {
                    var _type = target.getAttribute('data-rel-type')
                    switch(_type) {
                        case 'close' : 
                            if(winOverlay) {
                                map.removeOverlay(winOverlay)
                                winOverlay = null
                            }
                        break
                        case 'report' :
                            vueIns.$router.push({path: '/defect/declare'})
                        break
                        case 'processview':
                            if(!target.classList.contains('disabled')) {
                                if(data.parentId == 0) {
                                    vueIns.$router.push({
                                        name: 'process-view-monitor-detail',
                                        params: {
                                            parentId: data.processId
                                        }
                                    })
                                } else {
                                    vueIns.$router.push({
                                        name: 'process-view-monitor-detail',
                                        params: {
                                            parentId: data.parentId,
                                            id: data.processId
                                        }
                                    });
                                }
                            }
                        break
                        case 'alarm' :
                            if(!target.classList.contains('disabled'))
                            vueIns.$router.push({
                                path: '/alarm/history',
                                query: {
                                    id: data.siteId
                                }
                            })
                        break
                        case 'key' :
                            if(!target.classList.contains('disabled'))
                            vueIns.getKeys(data.processId)
                        break
                        case 'monitor' :
                            if(!target.classList.contains('disabled'))
                            vueIns.$router.push({
                                path: '/monitor-screen/monitor',
                                query: { id: data.defaultVideo }
                            })
                        break
                        case 'camera' :
                            vueIns.$router.push({
                                path: '/monitor-screen/capture',
                                query: { id: data.defaultCamera }
                            })
                        break
                    }
                }
            })
            map.getPanes().floatPane.appendChild(div)
            return div
        }
        CustomInfoWindow.prototype.draw = function() {
            var map = this._map
            var pixel = map.pointToOverlayPixel(this._point)
            this._div.style.left = pixel.x - this._width/2 + "px"
            this._div.style.top  = pixel.y - this._height - 23 + "px"
        }
    }
}

export default {
    data() {
        var _self = this
        return {
            height: '',
            H: 500,
            mapLoading: true,
            shownId: '',

            processTreeData: [],
            processSearchData: [],
            processSearchLoading: false,

            alarmSearchParams: {
                queryName: '',
                handleStatus: '',
                siteId: '',
                currentPage: 1,
                pageSize: 8
            },
            alarmListData: [],
            alarmInfoData: {
                handleAlarmCount: 0,
                UnhandleAlarmCount: 0
            },
            alarmColumns: [
                { title: '名称',  key: 'alarmName', width: 100 },
                { title: '区域位置',  key: 'siteName'},
                { title: '处理状态',  key: 'alarmStatus', width: 85, render(h, data){
                    var color = '#0BB1DF';
                    if(data.row.handleStatus == 1) color = '#E03E3E';
                    return h('span', {style:{color: color}}, _self.alarmStatusText[data.row.handleStatus])
                }},
                { title: '报警时间',  key: 'alarmTriggerTime', width: 100,
                    render(h, data) {
                        return util.tableDatetime(h, data.row.alarmTriggerTime)
                    } 
                },
                { title: '操作',  key: 'siteName', width: 60,render(h, data){
                    if(data.row.handleStatus == 1)
                        return h('a', {
                            style: {
                                color: '#E03E3E'
                            },
                            on: {
                                click: ()=>{
                                    _self.$router.push({path: '/defect/declare',query:{type:'alarm',id: data.row.id}})
                                }
                            }
                        }, '报缺');
                    else if(data.row.handleStatus == 2) {
                        return h('a', {
                            style: {
                                color: '#346C93'
                            },
                            on: {
                                click: ()=>{
                                    _self.$router.push({path: '/defect/detail', query: {id: data.row.faultId}})
                                }
                            }
                        }, '查看');
                    }
                }},
            ],
            alarmTotal: 0,
            alarmTree: [],

            staffSearchParams: {
                queryName: '',
                haveTask: '',
                currentPage: 1,
                pageSize: 8
            },
            staffInfoData: {
                nohaveTask: 0,
                haveTask: 0
            },
            staffListData: [],
            staffColumns: [
                { title: '姓名',  key: 'userName', render(h,data){
                    if(data.row.longitude && data.row.latitude) {
                        return h('a', {
                            style: {
                                color: 'rgb(75, 126, 254)'
                            },
                            on: {
                                click(){
                                    var _data = data.row;
                                    map.centerAndZoom(new BMap.Point(_data.longitude, _data.latitude), 18);
                                }
                            }
                        }, data.row.userName);
                    } else {
                        return h('span',  data.row.userName)
                    }
                } },
                { title: '手机号',  key: 'phone'},
                { title: '任务',  key: 'siteName', width: 60, render(h, data){
                    return h('span', _self.staffStatusText[data.row.haveTask])
                }},
                { title: '任务名称',  key: 'taskName'},
                { title: '操作',  key: 'siteName', width:80, render(h, data){
                    if(data.row.haveTask)
                        return h('a', {
                            style: {
                                color: '#346C93'
                            },
                            on: {
                                click: ()=>{
                                    _self.$router.push({name: 'fault-detail', params: {id: data.row.taskId}})
                                }
                            }
                        }, '查看任务');
                    else
                        return h('span', '')
                }},
            ],
            staffTotal: 0,

            summaryData: {
                unhandleAlarmCount: 0, 
                handleAlarmCount: 0, 
                haveTask: 0, 
                nohaveTask: 0
            },

            keyData: []
        }
    },
    computed : mapState({
        gatewayStatusText: state => state.map.dispatch.gatewayStatusText,
        alarmStatus: state => state.map.dispatch.alarmStatus,
        alarmStatusText: state => state.map.dispatch.alarmStatusText,
        staffStatus: state => state.map.dispatch.staffStatus,
        staffStatusText: state => state.map.dispatch.staffStatusText
    }),
    created () {
        util.initTableColumnTitle(this.alarmColumns) 
        util.initTableColumnTitle(this.staffColumns)       
    },
    mounted() {
        this.height = document.body.clientHeight-75

        mapUtil.create(()=> {
            map = new BMap.Map('dispatch-map', {enableMapClick: false}); 
            map.enableScrollWheelZoom()
            mapUtil.setStyle(map)
            this.mapLoading = false

            infoWindow.create(map, BMap, this)
            
            this.getSetting((r)=>{
                this.getProcess((points)=>{
                    if(!r) {
                        if(points.length)
                            map.setViewport(points)
                        else
                            mapUtil.placePoint(map)
                    }
                })
            })
            this.getStaffsData()
        })
        
        winTpl = document.querySelector('#dispatch-process-window').innerHTML
        staffTpl = document.querySelector('#dispatch-staff-window').innerHTML
        compiledTpl = juicer(winTpl)
        compiledStaffTpl = juicer(staffTpl)

        this.getAlarmsData()
        this.getSummaryData()
    },
    methods: {
        // 区域位置
        processSearch(v) {
            if(this.processSearchLoading) return
            this.processSearchLoading = true
            let queryName = v
            let location = true
            searchProcess({
                queryName,
                location
            }).then(res=> {
                if(res) {
                    this.processSearchData = res.data
                }
                this.processSearchLoading = false
            })
        },
        processItemClick(data) {
            this.processTreeSelect([JSON.parse(data)])
        },
        processTreeSelect(data) {
            var data = data[0]
            if(data.longitude && data.latitude) {
                map.centerAndZoom(new BMap.Point(data.longitude, data.latitude), 18)
                if(winOverlay) {
                    map.removeOverlay(winOverlay)
                    winOverlay = null
                }
                this.getProcessDetail(data, null, {lng: data.longitude, lat: data.latitude})
            } else {
                this.$Notice.info({title: '当前位置没有地图信息'})
            }
        },
        getProcess(callback) {
            treeMethod2().then((res)=>{
                var processData = []
                res.data.forEach((item)=>{
                    item.title = item.name
                    if(item.longitude && item.latitude) processData.push(item)
                })
                this.processTreeData = util.transDataToTree(processData)
                mapUtil.hitProcess(map, processData, (marker, point, pData)=>{
                    this.getProcessDetail(pData, marker, point)
                })
                callback && callback(mapUtil.getBDPoints(processData))
            })
        },
        getProcessDetail(pData, marker, point) {
            if(winOverlay) {
                if(winOverlay._point.lng == marker.point.lng && winOverlay._point.lat == marker.point.lat) {
                    map.removeOverlay(winOverlay);
                    winOverlay = null;
                    return;
                }
            }
            mapMethod(pData.id).then(res=> {
                res.data.siteId = pData.id;
                res.data.gatewayStatusText = this.gatewayStatusText[res.data.gatewayStatus]
                var html = compiledTpl.render(res.data)
                if(winOverlay) {
                    map.removeOverlay(winOverlay)
                    winOverlay = null
                }
                
                winOverlay = new CustomInfoWindow(point, html, {width: 410, height: 260}, res.data)
                map.addOverlay(winOverlay)

                var pointPixel = map.pointToPixel(point),
                    cornerL = {x: pointPixel.x - 205, y:pointPixel.y - 260},
                    cornerR = {x: pointPixel.x + 205, y:pointPixel.y - 260},
                    cornerLPoint = map.pixelToPoint(cornerL),
                    cornerRPoint = map.pixelToPoint(cornerR);
                var moveMapX,moveMapY=0;
                    if(cornerL.y < 0) {
                        moveMapY=Math.abs(cornerL.y)+60
                    }
                    if(cornerL.x < 0) {
                        moveMapX=Math.abs(cornerL.x)+60
                    }
                    map.panBy(moveMapX, moveMapY)
            })
        },
        // 报警列表
        getAlarmsData() {
            treeMethod().then(res=> {
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].expand = false
                    treeItem.push(trees[i])
                }
                this.alarmTree = createTree(treeItem,0)
            })
            let queryName = this.alarmSearchParams.queryName
            let handleStatus = this.alarmSearchParams.handleStatus
            let siteId = this.alarmSearchParams.siteId
            let currentPage = this.alarmSearchParams.currentPage
            alarmsData({
                queryName,
                handleStatus,
                siteId,
                currentPage
            }).then((res)=>{
                this.alarmTotal = res.data.total
                this.alarmListData = res.data.items
                this.alarmInfoData.handleAlarmCount = res.data.handleAlarmCount
                this.alarmInfoData.unhandleAlarmCount = res.data.unhandleAlarmCount
            })
        },
        alarmPageChange(pageNo) {
            this.alarmSearchParams.currentPage = pageNo
            this.getAlarmsData()
        },
        alarmSearch() {
            this.getAlarmsData()
        },
        alarmReset() {
            this.alarmSearchParams = {
                queryName: '',
                handleStatus: '',
                siteId: '',
                currentPage: 1,
                pageSize: 8
            }
        },
        //在线人员
        getStaffsData(){
            console.log('在线人员')
            let queryName = this.staffSearchParams.queryName
            let haveTask = this.staffSearchParams.haveTask
            let currentPage = this.staffSearchParams.currentPage
            staffsData({
                queryName,
                haveTask,
                currentPage
            }).then((res)=>{
                this.staffTotal = res.data.total
                this.staffListData = res.data.items
                this.staffInfoData.haveTask = res.data.haveTask
                this.staffInfoData.nohaveTask = res.data.nohaveTask

                mapUtil.hitStaff(map, res.data.items, (marker, point, pData)=> {
                    this.getStaffDetail(marker, point, pData)
                })
            })
        },
        getStaffDetail(marker, point, pData) {
            staffDetail(pData.userId).then((res)=>{
                res.data.taskUrl = '/#/fault/'+res.data.taskId;
                var html = compiledStaffTpl.render(res.data);
                if(winOverlay) {
                    map.removeOverlay(winOverlay);
                    winOverlay = null;
                }
                winOverlay = new CustomInfoWindow(point, html, {width: 410, height: 190});
                map.addOverlay(winOverlay);

                var pointPixel = map.pointToPixel(point),
                    cornerL = {x: pointPixel.x - 205, y:pointPixel.y - 190},
                    cornerR = {x: pointPixel.x + 205, y:pointPixel.y - 190},
                    cornerLPoint = map.pixelToPoint(cornerL),
                    cornerRPoint = map.pixelToPoint(cornerR);
                    
                    if(cornerL.y < 0) {
                        map.panBy(0, Math.abs(cornerL.y)+60)
                    }
            })
        },
        staffPageChange(pageNo) {
            this.staffSearchParams.currentPage = pageNo
            this.getStaffsData()
        },
        staffSearch() {
            this.getStaffsData()
        },
        getSetting(callback) {
            var r = false
            coorMethod().then((res)=>{
                if(res.data.longitude && res.data.latitude) {
                    map.centerAndZoom(new BMap.Point(res.data.longitude , res.data.latitude), parseInt(res.zoom)||16);
                    r = true
                }
                callback && callback(r)
            })
        },
        setting() {
            var point = map.getCenter(), zoom = map.getZoom()
            setMethod({
                latitude: point.lat,
                longitude: point.lng,
                zoom: zoom
            }).then(res=> {
                this.$Notice.success({
                    title: '收藏成功',
                    desc: '当前地图已收藏，下次登录默认显示当前地图'
                })
            })
        },
        getSummaryData() {
            promptMethod().then((res)=>{
                this.summaryData = res.data
            })
        },
        getKeys(id) {
            keyMethod(id).then((res)=>{
                this.keyData = res.data
                this.shownId = 'key'
            })
        }
    }
}
</script>

<style lang="less" scoped>
.index-box {
    margin: 5px;
    background: #fff;
}
/deep/.dispatch-process-window {
	width: 410px;
	height: 260px;
	background: #FFF;
	box-shadow:0px 2px 6px 0px rgba(0,0,0,0.2);
	border-radius:2px;
}
/deep/.dispatch-process-window h2, /deep/.dispatch-staff-window h2{
	height: 35px;
	background: #F1F1F1;
	border-left: 2px solid #0BB1DF;
	padding-left: 10px;
	font-size: 14px;
	line-height: 35px;
}
/deep/.dispatch-process-main {
	padding: 10px;
	height: 170px;
}
/deep/.dispatch-process-img {
	position: relative;
	display: inline-block;
	width: 180px;
	height: 130px;
	background-color: #EFEFEF;
}
/deep/.dispatch-process-info {
	display: inline-block;
	width: 200px;
	margin-left: 5px;
	vertical-align: top;
	position: relative;
}
/deep/.dispatch-process-info p {
	color: #666666;
	height: 80px;
	overflow-y: auto;
	line-height: 20px;
    font-size: 13px;
}
/deep/.dispatch-process-table {
	width: 100%;
	border-collapse: collapse;
    border-spacing: 0;
}
/deep/.dispatch-process-table tr {
	height: 28px;
}
/deep/.dispatch-process-table th{
	text-align: left;
	font-size: 14px;
	font-weight: 100;
}
/deep/.dispatch-process-table td {
	text-align: left;
}
/deep/.dispatch-process-report {
	position: absolute;
    right: 36px;
    bottom: 5px;
    font-size: 14px;
    color: #4b7efe;
}
/deep/.dispatch-process-btns {
	display: flex;
	justify-content: space-between;
	padding: 0 10px;
}
/deep/.dispatch-process-btns a {
	width: 80px;
    height: 30px;
    border: 1px solid #4b7efe;
    color: #4b7efe;
    text-align: center;
    line-height: 30px;
    border-radius: 4px;
    font-size: 13px;
}
/deep/.dispatch-process-btns .disabled {
	background-color: #F1F1F1;
	border-color: rgba(180,180,180,0.09);
	color: #C0BEBE;
}
/deep/.dispatch-win-close {
	float: right;
	width: 20px;
	height: 20px;
	margin: 10px 5px 0 0;
	background: url(../../images/dispatch/close.png) no-repeat 0 0;
}
/deep/.dispatch-win-arrow {
	border: 8px solid transparent;
    border-top: 8px solid #fff;
    width: 0;
    height: 0;
    position: absolute;
    bottom: -16px;
    left: 198px;
    content: " ";
}
/deep/.dispatch-camera-on, /deep/.dispatch-camera-off {
	display: block;
	width: 29px;
	height: 21px;
	position: absolute;
	bottom: 5px;
	right: 5px;
}
/deep/.dispatch-camera-on {
	background: url('../../images/dispatch/camera_on.png') no-repeat 0 0;
}
/deep/.dispatch-camera-off {
	background: url(../../images/dispatch/camera_off.png) no-repeat 0 0;
}
/deep/.dispatch-gateway-offline {
	color: #E03E3E;
	font-weight: 700;
}
/deep/.dispatch-gateway-online1 {
    color: #a8a8a8;
    font-weight: 700;
}
/deep/.dispatch-gateway-online {
	color: #25924a;
    font-weight: 700;
}
/deep/.dispatch-staff-window {
	position: relative;
	width: 410px;
	height: 190px;
	background-color: #FFF;
	box-shadow:0px 2px 6px 0px rgba(0,0,0,0.2);
	border-radius:2px;
}
/deep/.dispatch-staff-table {
	width: 100%;
	margin-top: 10px;
}
/deep/.dispatch-staff-table tr {
	height: 30px;
}
/deep/.dispatch-staff-table th {
	text-align: left;
	padding-left: 10px;
	font-weight: 100;
}
/deep/.dispatch-staff-more {
	display: block;
	text-align: center;
	line-height: 40px;
	color: #0BB1DF;
}
/*WindowInfo ENd*/

.dispatch-menu {
	position: absolute;
	top: 10px;
	left: 10px;
	height: 30px;
	background:rgba(255,255,255,0.7);
	box-shadow:0px 2px 6px 0px rgba(0,0,0,0.25);
	border-radius:2px;
	padding: 0 10px;
    a {
        display: inline-block;
        width: 86px;
        line-height: 30px;
        font-size: 13px;
    }
    img {
        display: inline-block;
        width: 15px;
        height: 16px;
        vertical-align: middle;
    }
    span {
        display: inline-block;
        color: #4A4A4A;
        margin-left: 3px;
    }
}
.dispatch-summary {
	position: absolute;
    top: 0;
    right: 45px;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    background: #fff;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    text-align: center;
    div {
        display: inline-block;
        margin: 0 10px;
        padding-left: 22px;
        background-size: 18px auto;
        font-size: 13px;
    }
    .dispatch-summary-handle {
        background: url('../../images/map4.png') no-repeat 0 5px;
    }
    .dispatch-summary-unhandle {
        background: url('../../images/map5.png') no-repeat 0 5px;
    }
    .dispatch-summary-onduty {
        background: url('../../images/map6.png') no-repeat 0 5px;
    }
    .dispatch-summary-offduty {
        background: url('../../images/map7.png') no-repeat 0 5px;
    }
}

.dispatch-setting {
	position: absolute;
	top: 0;
	right: 10px;
    width: 30px;
	height: 30px;
	line-height: 30px;
	background:rgba(255,255,255,0.7);
	box-shadow:0px 2px 6px 0px rgba(0,0,0,0.25);
	border-radius:2px;
	text-align: center;
    .ivu-icon {
        vertical-align: middle;
    }
}
.dispatch-modal-h {
	height: 40px;
	line-height: 40px;
	padding: 0 10px;
	border-bottom: 1px solid #E6E6E6;
}
.dispatch-modal-hl {
	font-size: 15px;
}
.dispatch-modal-hr {
	float: right;
    .ivu-icon {
        color: #333;
    }
}
.dispatch-alarm {
	position: absolute;
	bottom: 0;
	width: 505px;
	height: 550px;
	background-color: #FFF;
}
.dispatch-alarm-search {
	padding: 5px;
    border-bottom: 1px solid #EEE;
    label {
        font-size: 13px;
        margin: 0 3px;
    }
    .ivu-btn {
        border: none;
        color: #fff;
        background: #838A95;
        height: auto;
        padding: 4px 12px;
        font-size: 12px;
        border-radius: 1px;
    }
    .reset {
        background: #aaafb8;
        margin: 0 10px 0 5px;
    }
}
.dispatch-search-input .ivu-input {
	border-radius: 15px;
	background-color: #F0F0F0;
}
.dispatch-alarm-search-state {
	float: right;
}
.dispatch-alarm-table {
	clear: both;
	padding: 0 10px;
}
.alarm-enter-active, .alarm-leave-active {
 	transition: left .5s;
}
.alarm-enter, .alarm-leave-to {
	left: -460px;
}
.alarm-enter-to, .alarm-leave {
	left: 0;
}
.dispatch-process {
	position: absolute;
	bottom: 0;
	width: 300px;
	height: 550px;
	background-color: #FFF;
	z-index: 10;
}
.dispatch-process-search .ivu-select-dropdown {
	max-height: 300px;
}
.dispatch-process-search {
	padding: 10px;
}
.dispatch-process-tree {
	overflow-y: auto;
	height: 460px;
	padding-left: 10px;
}
.dispatch-key {
	position: absolute;
	bottom: 0;
	width: 300px;
	height: 550px;
	background-color: #FFF;
	overflow-y: auto;
}
.table-page {
    text-align: right;
    margin-top: 10px;
}
</style>