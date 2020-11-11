<template>
    <div class="tissue-box lay" :style="{height: height+'px'}">
        <div class="tissue-tree">
            <div class="tissue-left" id="J_CURVES_SIDEBAR">
                <div class="search-input">
                    <Select
                        v-model="keyName"
                        filterable
                        placeholder="输入组合/测点名称以检索"
                        :remote-method="remoteMethod"
                        :loading="keyLoading">
                        <Option v-for="(option, index) in options" :value="option.mpointName" :key="index">{{option.mpointName}}</Option>
                    </Select>
                    <Dropdown style="margin-left: 10px;display:inline-block" trigger="click"  @on-click="changeItem">
                        <a href="javascript:void(0)">
                            曲线模版
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="choose">选择模板</DropdownItem>
                            <DropdownItem name="save">保存模板</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <group :groupList="groupList" @addSuccess="showNotice" @child-group="parentGroup"></group>
                <singledata 
                    :singleList="singleList" 
                    @addSuccess="showNotice" 
                    @child-site="parentSite"
                    :site-groupList="siteGroupList"
                ></singledata>
            </div>
            <div class="tissue-right" id="J_CURVES_CHART" style="overflow-x:hidden;overflow-y:auto;">
                <div class="title">
                    <div>
                        <span>{{ siteTitle }}</span>
                        <div class="tag" v-if="siteShow == '1'">
                            <Tag 
                                v-for="(item ,index) in siteGroupList" 
                                :key="index"
                                :name="item.name"
                                closable 
                                @on-close="removeSiteList"
                            >{{ item.name }}</Tag>
                        </div>
                        <div class="tag" v-if="siteShow == '2'">
                            <Tag 
                                v-for="(item ,index) in siteGroupList" 
                                :key="index"
                                :name="item.name"
                            >{{ item.name }}</Tag>
                        </div>

                        <Button type="primary" size="small" style="font-size:12px" v-if="siteShow == '1'">刷新</Button>
                        <div style="float:right" v-if="siteShow == '1'">
                            <Button 
                                type="default" 
                                size="small" 
                                style="font-size:12px;background:#576374;color:#fff"
                                @click="emptyHandle()"
                            >清空</Button>
                            <Button 
                                type="default" 
                                size="small" 
                                style="font-size:12px;background:#576374;color:#fff"
                                @click="saveModalMethod"
                            >保存为组合</Button>
                        </div>
                    </div>
                    <div class="curves-panel">
                        <span>起始时间：</span>
                        <DatePicker 
                            v-model="beginDate"
                            format="yyyy-MM-dd HH:mm:ss"
                            type="date" 
                            placeholder="选择时间" 
                            style="width: 200px"
                        ></DatePicker>
                        <div class="cmp-date-step-icon">
                            <a href="javascript:;" @click="dayBefore"> 
                                <Icon type="ios-play" style="transform:rotate(180deg);" />
                            </a>
                            <a href="javascript:;" @click="dayAfter"> 
                                <Icon type="ios-play" />
                            </a>
                            <a href="javascript:;" @click="dayReset">
                                <Icon type="ios-skip-forward" />
                            </a>
                        </div>
                        <span>时间跨度：</span>
                        <Select 
                            v-model="timeValue"
                            style="width:70px;display:inline-block"
                        >
                            <Option v-for="item in dateList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                        </Select>
                        <div class="action-btn">
                            <div class="dropdown">
                                <a href="javascript:;">
                                    <Icon type="ios-more" style="font-size:25px;color:rgb(75, 126, 254)" />
                                </a>
                            
                            </div>
                            <a href="javascript:;" class="c-icon-export"></a>
                            <a href="javascript:;">
                                <Icon type="ios-sync" />
                            </a>
                            <a href="javascript:;" class="c-icon-table"></a>
                            <a href="javascript:;" class="c-icon-dline"> </a>
                            <a href="javascript:;" style="color:#333">
                                <Icon type="ios-expand" />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="curves-chart-container">
                    <Spin fix v-if="chartLoading"></Spin>
                    <div id="J_CHART" class="curves-chart-left"></div>
                    <div id="J_TABLE" class="curves-table ivu-table ivu-table-stripe">
                            
                    </div>    
                </div>
            </div>
        </div>
        <Modal v-model="curveModal" width="500">
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">添加曲线模版</span>
            </p>
            <div style="text-align:center">
                <input v-model="curveName" type="text" style="width:100%">
            </div>
            <div slot="footer" >
                <Button type="primary" long  @click="saveCurve" style="font-size:12px">保存为新模版</Button>
            </div>
        </Modal>
        <!-- 选择曲线模板 -->
        <Modal v-model="tableModal" width="500" footer-hide>
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">选择曲线模版</span>
            </p>
            <div class="choose-modal">
                <input v-model="tableQueryName" type="text" style="width:200px;color:#495060;font-size:13px;padding:4px 7px;border:1px solid #eaeaea" placeholder="模版名称">
                <div 
                    @click="getCurve()"
                    style="display:inline-block;height: 28px;border: 0;padding: 4px 7px;background:#eee;border-top-right-radius:3px;border-bottom-right-radius:3px;">
                    <Icon type="ios-search-outline" />
                </div>
                <Table stripe :columns="tableList" :data="tableListData">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <a href="javaScript:;" style="margin-right: 10px;" @click="chooseHandle(row.id)">选择</a>
                        <a href="javaScript:;" @click="deleteModalHandle(row.id)">删除</a>
                    </template>
                </Table>
                <Page 
                    :total="tableListTotal" 
                    show-elevator 
                    show-total 
                    size="small" 
                    class="page" 
                    @on-change="changePage1"
                    style="text-align:right;margin-top:20px"  
                />
            </div>
          
        </Modal>
    </div>
    
</template>
<script>
import{ dataGroupMethod, singleDataMethod, searchMethod, changeCurverMethod, sureChangeCurveMethod, deleteChangeCurveMethod, saveCurveMethod, saveGroupMethod, chartMethod } from '@/api/dataManage/curve'
import createNameTree from '@/libs/log-util'
import group from './curve/datagroup'
import singledata from './curve/singleData'

var chartCache = [] , chartDataCache = [], 
    RTH_1 = 70, RTH_2 = 50, RTH = RTH_1+RTH_2, //lay层顶部二行的高度
    TDW = 100; // 表格宽

export default {
    name: 'curveAnalysis',
    data () {
        return {
            keyName: '',
            keyLoading: false,
            options: [],
            height: 0,
            curveModal: false,
            curveName: '',
            tableModal: false,
            tableList: [
                {
                    title: '模版名称',
                    key: 'name'
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            tableListData: [],
            tableListTotal: 0,
            tableListPage: '1',
            tableQueryName: '',
            groupList: [], //数据组合
            singleList: [], //单组和
            saveModal: false,
            siteShow: '0',
            siteTitle: '您还没有选择测点',
            siteGroupList:[],
            startTime:'',
            dateList:[
                {
                    name:'天',
                    value:'day'
                },
                {
                    name:'周',
                    value:'week'
                },
                {
                    name:'月',
                    value:'month'
                },
                {
                    name:'年',
                    value:'year'
                }
            ],
            timeValue: 'day',
            beginDate: '',
            combineName: '',
            addSuccess: '',
            chartLoading: false,
            chartConHeight: '',
            chartConWidth: '',
        }
    },
    components: {
        group,
        singledata
    },
    mounted() {
        this.height = document.body.clientHeight
        this.getDatagroup()
        this.getSingleData()

        const myDate = new Date();
        const year = myDate.getFullYear(); // 获取当前年份
        const month = myDate.getMonth() + 1; // 获取当前月份(0-11,0代表1月所以要加1);
        const day = myDate.getDate(); // 获取当前日（1-31）
        this.beginDate = `${year}-${month}-${day} 00:00:00`;

        var h = document.querySelector('.lay').offsetHeight,
            C = document.querySelector('#J_CURVES_CHART'),
            B = document.querySelector('#J_CURVES_SIDEBAR'),
            A = document.querySelector('#J_CHART'),
            w = A.offsetWidth;
        this.chartConHeight = h - RTH;
        this.chartConWidth = w;
        B.style.height = h - 10 + 'px';
        C.style.height = h + 'px';
        A.style.height = this.chartConHeight + 'px';

        A.addEventListener('mousemove', function (e) {
            var chart,
                point,
                i,
                event;
            for (i = 0; i < chartCache.length; i++) {
                chart = chartCache[i];
                point = chart.series[0].searchPoint(e, true); 
                if (point) {
                    point.highlight(e);
                }
            }
        });
    },
    methods: {
        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                },
                on: {
                    //鼠标进入
                    'mouseenter': () => {
                        data.is_show = true;
                    },
                    //鼠标离开
                    'mouseleave': () => {
                        data.is_show = false;
                    }
                }
            }, [
                h('span', [
                    h('span', data.title)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right'
                    }
                }, [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary'
                        }),
                        style: {
                            marginRight: '4px',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            // click: () => { this.append(data) }
                        }
                    },'编辑'),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary'
                        }),
                        style: {
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            // click: () => { this.remove(root, node, data) }
                        }
                    },'删除')
                ])
            ]);
        },
        renderContentList (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                },
                on: {
                    //鼠标进入
                    'mouseenter': () => {
                        data.is_show = true;
                    },
                    //鼠标离开
                    'mouseleave': () => {
                        data.is_show = false;
                    }
                }
            }, [
                h('span', [
                    h('span', data.title),
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right'
                    }
                }, [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary'
                        }),
                        style: {
                            marginRight: '4px',
                            fontSize:'13px',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            // click: () => { this.append(data) }
                        }
                    },'编辑'),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary'
                        }),
                        style: {
                            marginRight: '4px',
                            fontSize:'13px',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            // click: () => { this.remove(root, node, data) }
                        }
                    },'删除'),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary'
                        }),
                        style: {
                            fontSize:'13px',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            // click: () => { this.remove(root, node, data) }
                        }
                    },'新建')
                ])
            ]);
        },
        append (data) {
            const children = data.children || [];
            children.push({
                title: 'appended node',
                expand: true
            });
            this.$set(data, 'children', children);
        },
        remove (root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
        },
        newFun() {
            let self = this
            self.appear = true
            self.listshow = false
        },
        cancel() {
            let self = this
            self.appear = false
            self.appearOther = true
            
        },
        changeItem(name) {
            if(name == 'save') {
                this.curveModal = true
            } else {
                this.getCurve()
                this.tableModal = true
            }
        },
        getCurve() {
            let currentPage = this.tableListPage
            let queryName = this.tableQueryName
            changeCurverMethod({
                queryName,
                currentPage
            }).then(res=> {
                console.log(res)
                this.tableListData = res.data.items
                this.tableListTotal = res.data.total
            })
        },
        changePage1(index) {
            this.tableListPage = index
            this.getCurve()
        },
        chooseHandle(id) {
            sureChangeCurveMethod({
                id: id
            }).then(res=> { 
                if(res.status == 200) {
                    this.tableModal = false
                    this.$Notice.success({
                        title: '设置成功'
                    });
                    this.getDatagroup()
                    this.getSingleData()
                }
            }).catch(err=> {

            })
        },
        deleteModalHandle(id) {
            deleteChangeCurveMethod(id).then(res=> {
                if(res.status == 200) {
                    this.$Notice.success({
                        title: '删除成功'
                    });
                    this.getCurve()
                }
            }).catch(err=> {

            })
        },
        saveCurve(){
            saveCurveMethod({
                name: this.curveName
            }).then(res=> {
                if(res.status == 200) {
                    this.$Notice.success({
                        title: '保存成功'
                    });
                    this.curveModal = false
                    this.getSingleData()
                }
            })

        },
        remoteMethod(query) {
            console.log(query)
            if (query !== '') {
                this.keyLoading = true
                searchMethod(query).then(res=> {
                    if(res.status = 200) {
                        this.keyLoading = false
                        this.options = res.data.items
                    }
                }).catch(err=> {

                })
            } else {
                this.options = []
            }
        },
        getDatagroup() {
            dataGroupMethod().then(res=> {
                // console.log(JSON.stringify(res.data.items))
                this.groupList = res.data.items
            }).catch(err=> {

            })
        },
        getSingleData() {
            singleDataMethod().then(res=> {
                let treeItem = []
                let trees = res.data.items
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].expand = true
                    if(trees[i].parentId != 0 && trees[i].type != 9) {
                        trees[i].children = []
                        trees[i].loading = false
                    }
                    treeItem.push(trees[i])
                }
                this.singleList = createNameTree(treeItem)
            }).catch(err=> {

            })
        },
        showNotice(value) {
            if(value == 1) {
                this.$Notice.success({
                    title: '添加成功'
                });
                this.getDatagroup()
            } else if (value == 2) {
                this.$Notice.success({
                    title: '删除成功'
                });
                this.getDatagroup()
            } else if(value == 3) {
                this.$Notice.success({
                    title: '添加成功'
                });
                this.getSingleData()
            } else if(value == 4) {
                this.$Notice.success({
                    title: '删除成功'
                });
                this.getSingleData()
            }
        },
        parentGroup(data) {
            this.siteGroupList = data
            this.siteShow = '2'
            this.siteTitle = '您选择的组合测点：'
            this.getcharts(data[0].id)
        },
        parentSite(data) {
            this.siteGroupList = data
            this.siteShow = '1'
            this.siteTitle = '您选择的测点：'
        },
        removeSiteList(event, name){
            this.siteGroupList = this.siteGroupList.filter(item=> item.name != name)
            //删除后,传给chartShow
        },
        emptyHandle() {
            this.siteTitle = '您还没有选择测点'
            this.siteShow = '0'
            this.siteGroupList = []
        },
        saveModalMethod() {
            if(this.siteGroupList.length <= 1) {
                this.$Notice.info({
                    title: '请选择至少两个测点进行组合'
                });
            } else {
                this.saveModal = true
            }
        },
        saveGroup() {
            let ids = []
            this.siteGroupList.map(item=> {
                ids.push(item.id)
            })
            saveGroupMethod({
                combineName: this.combineName,
                mpointIds: ids.toString()
            }).then(res=> {
                // console.log(res)
                if(res.status == 200) {
                    this.saveModal = false
                    this.combineName = ''
                    this.addSuccess = '1'
                    this.$emit('addSuccess', this.addSuccess)
                }
            }).catch(err=> {

            })
        },
        // 获取指定日期得前几天
        getNextDate(date,day) {  
            var dd = new Date(date);
            dd.setDate(dd.getDate() + day);
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
            var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
            return y + "-" + m + "-" + d;
        },
        dayBefore() {
            let time = this.getNextDate(this.beginDate,-1)+' '+'00:00:00'
            this.beginDate = time
        },
        dayAfter() {
            let time = this.getNextDate(this.beginDate,1)+' '+'00:00:00'
            this.beginDate = time
        },
        dayReset() {
            const myDate = new Date();
            const year = myDate.getFullYear(); // 获取当前年份
            const month = myDate.getMonth() + 1; // 获取当前月份(0-11,0代表1月所以要加1);
            const day = myDate.getDate(); // 获取当前日（1-31）
            this.beginDate = `${year}-${month}-${day} 00:00:00`;
        },
        renderChart(data) {
            //渲染charts

        },
        getcharts(id) {
            console.log(id)
            let ids = id
            let beginDate = this.$moment(this.beginDate).utc().format()
            chartMethod({
                ids,
                beginDate
            }).then(res=> {
                // console.log(JSON.stringify(res.data))
                console.log（）
            }).catch(err=> {

            })
        }
    }
}
</script>
<style lang="less" scoped>
 /deep/.ivu-modal-header{
        padding: 0;
        border-bottom: 0;
    }
    
.tissue-box {
    margin-top: 5px;
   
    .choose-modal{
        height: 28px;
    }
    input::-webkit-input-placeholder{
        color:#999;
    }
    .tissue-tree {
        display: flex;
        min-height: 100%;
        height: 100%;
        .search-input{   
            padding: 2px;
            border-bottom: 1px solid #f0f0f0;
            height: 34px;
            /deep/.ivu-select {
                width: 195px;
                color: #495060;
                font-size: 13px;
                height: 28px;
                vertical-align: middle;
            }
            /deep/.ivu-select-single {
                /deep/.ivu-select-selection {
                    height: 28px;
                }   
            }
            a {
                font-size:12px;
                height:26px;
                line-height: 26px;
                background:#576374;
                color: #fff;
                margin-left: 5px;
                vertical-align: middle;
                display: inline-block;
                padding: 0 10px;
                border-radius: 3px;
            }
        }
        
        .tissue-left {
            width: 300px;
            background: #FFF;
            height: 100%;
            .tissue-list {
                width: 100%;
                padding: 0 10px;
                
            }
        }
        .tissue-right {
            flex: 1;
            min-height: 100%;
            height: 100%;
            width: 100%;
            background: #FFF;
            border-left: 5px solid #f5f7f9;
            border-right: 5px solid #f5f7f9;
            .tissue-content {
                padding: 20px 50px;
                /deep/.ivu-input {
                    width: 300px;
                }
                /deep/.ivu-form .ivu-form-item-label {
                    padding-right: 0;
                }
                .form-li {
                    border-bottom: 1px dashed #f0f0f0;
                    font-size: 13px;
                    h4 {
                        height: 40px;
                        margin-top: 20px;
                    }
                    /deep/.ivu-form-item {
                        margin-bottom: 14px;
                    }
                    
                }
                .form-box {
                    .form-title {
                        background-color: #f4f4f4;
                        height: 30px;
                        line-height: 30px;
                        text-indent: 20px;
                        font-weight: 100;
                        font-size: 13px;
                        margin: 10px 0px;
                    }
                }
                .form-other {
                    .other-li {
                        display: flex;
                        font-size: 13px;
                        line-height: 30px;
                        span:nth-of-type(1) {
                            width: 70px;
                            text-align: right;
                        }
                    }
                }
            }
            .title{
                height: 50px;
                border-bottom: 1px solid #EEE;
                padding: 10px;
                font-size: 13px;
                line-height: 40px;
                .tag{
                    display: inline-block;
                    padding:0 3px;
                    height: 27px;
                    line-height: 27px;
                    position: relative;
                    .ivu-icon{
                        position: absolute;
                        right: -6px;
                        top: -10px;
                        font-size: 18px;
                        background: #fff;
                    }
                }
                .cmp-date-step-icon{
                    display: inline-block;
                    vertical-align: bottom;
                    .ivu-icon{
                        font-size: 20px;
                        color: rgb(75, 126, 254);
                    }
                }
                .action-btn{
                    float: right;
                    margin-top: 5px;
                    .dropdown{
                        display: inline-block;
                    }
                    a {
                        display: inline-block;
                        width: 25px;
                        vertical-align: top;
                        margin-right: 5px;
                    }
                    .ivu-icon{
                        font-size: 25px;
                        vertical-align: top;
                    }
                    .c-icon-export{     
                        display: inline-block;
                        background: url('../../assets/images/split_icon.png') no-repeat -4px -42px;
                        width: 25px;
                        height: 25px;
                    }
                    .c-icon-dline{
                        display: inline-block;
                        background: url('../../assets/images/split_icon.png') no-repeat -5px -7px;
                        width: 25px;
                        height: 25px;
                    }
                    .c-icon-table{
                        display: inline-block;
                        background: url('../../assets/images/table.png') no-repeat 0 2px;
                        width: 25px;
                        height: 25px;
                    }
                }
                .curves-panel {
                    height: 30px;
                    margin: 5px;
                }
            }
            .curves-chart-container {
                position: relative;
            }
        }
    }
    /deep/.ivu-row {
        margin: 0!important;
        /deep/.ivu-col{
            background: #fff;
            padding: 0!important;
        }
        /deep/.ivu-col-span-xl-6 {
            width: 24%;
            margin-right: 1%;
        
        }
    }
}
</style>