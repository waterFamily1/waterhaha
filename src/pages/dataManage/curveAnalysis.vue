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
                        @on-change="keyNameChange"
                        :label-in-value="true"
                        :loading="keyLoading">
                        <Option v-for="(option, index) in options" :value="option.mpointName" :key="index">
                            {{option.mpointName}}
                        </Option>
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
                            <Dropdown>
                               <a href="javascript:;">
                                    <Icon type="ios-more" style="font-size:25px;color:rgb(75, 126, 254)" />
                                </a>
                               <DropdownMenu slot="list">
                                    <DropdownItem>
                                        <Checkbox >环比</Checkbox>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Checkbox >年同比</Checkbox>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Checkbox >单图显示</Checkbox>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Checkbox >多Y轴</Checkbox>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <a href="javascript:;" @click="exportChart" class="c-icon-export" title="导出"></a>
                            <a href="javascript:;" @click="refreshChart" title="刷新">
                                <Icon type="ios-sync" />
                            </a>
                            <a href="javascript:;" class="c-icon-table" @click="openDrawer" title="表格数据"></a>
                            <Dropdown>
                                <a href="javascript:;">
                                    <Icon type="md-trending-up" />   
                                </a>
                               <DropdownMenu slot="list">
                                    <DropdownItem>
                                        <Checkbox @on-change="addLineAverage" v-model="lineRef.avg">显示平均线</Checkbox>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Checkbox @on-change="addLineAlarm" v-model="lineRef.alarm">显示报警线</Checkbox>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Checkbox @on-change="addLineMax" v-model="lineRef.max">显示最大值</Checkbox>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Checkbox @on-change="addLineMin" v-model="lineRef.min">显示最小值</Checkbox>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <a href="javascript:;" style="color:#333">
                                <Icon type="ios-expand" />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="curves-chart-container">
                    <Spin fix v-if="chartLoading"></Spin>
                    <div id="J_TABLE" class="curves-table ivu-table ivu-table-stripe"  style="margin-top:50px">
                        <highcharts 
                            :options="chartOptions" 
                            ref="lineChart" 
                            v-if="show" 
                            style="height:294px"
                        ></highcharts>
                        <highcharts 
                            :options="chartOptionsSec" 
                            ref="lineChartSec" 
                            v-if="show" 
                            style="height:294px"
                        ></highcharts>
                        <div id="J_TABLE" class="curves-table">
                            <Drawer 
                                :mask="false"
                                :closable="false" 
                                :width="370"
                                v-model="drawerTable"
                            >
                                <table border="0" align="left" style="background: #fff;">
                                    <thead style="position:fixed;z-index: 100;background: #fff;">
                                        <tr>
                                            <th width="160" align="left">时间</th>
                                            <th width="94" align="left">{{ drawerColumns1 }}</th>
                                            <th width="94" align="left">{{ drawerColumns2 }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in drawerData" :key="index">
                                            <td width="170" align="left">{{ item.dataDate | formatDate }}</td>
                                            <td width="94" align="left">{{ item.dataValue }}</td>
                                            <td width="94" align="left">{{ drawerData2[index].dataValue }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Drawer>
                        </div>
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
        <!-- 测点备注信息 -->
        <Modal v-model="remarkModal" width="300" class="remark-modal">
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">测点备注信息</span>
            </p>
             <Form ref="updateFormCustom" :model="updateFormCustom" :rules="ruleCustom" :label-width="80">
                <FormItem label="时间:" prop="time">
                    <span>{{updateFormCustom.time}}</span>
                </FormItem>
                <FormItem label="测点名:" prop="name">
                    <span>{{updateFormCustom.name}}</span>
                </FormItem>
                <FormItem label="测点值:" prop="value">
                    <span>{{updateFormCustom.value}}</span>
                </FormItem>
                <FormItem label="备注:" prop="remark">
                    <Input   placeholder="请输入" style="width: 180px" v-model="updateFormCustom.remark"  size="small" />
                </FormItem>
            </Form>
            <div slot="footer" >
                <Button type="primary" long  @click="saveRemark('updateFormCustom')" style="font-size:12px">保存</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import{ dataGroupMethod, singleDataMethod, searchMethod, changeCurverMethod, sureChangeCurveMethod, deleteChangeCurveMethod, saveCurveMethod, saveGroupMethod, chartMethod,getAlarm,addRemark } from '@/api/dataManage/curve'
import createNameTree from '@/libs/log-util'
import group from './curve/datagroup'
import singledata from './curve/singleData'
import util from '@/libs/public_js'

var chartCache = [] , chartDataCache = [], 
    RTH_1 = 70, RTH_2 = 50, RTH = RTH_1+RTH_2, //lay层顶部二行的高度
    TDW = 100; // 表格宽

export default {
    name: 'curveAnalysis',
    data () {
        let that = this
        return {
            keyName: '',
            keyLoading: false,
            options: [],
            height: 0,
            curveModal: false,
            curveName: '',
            tableModal: false,
            remarkModal: false,
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
            drawerTable: false,
            drawerColumns1: '', //table表头
            drawerColumns2: '', //table表头
            drawerData: [],
            drawerData2: [],
            chartOptions: {
                
                chart: {
                    type: 'line'
                },
                legend:{
                    enabled:false
                },
                title: {
                    verticalAlign: 'bottom',
                    style: {
                        color: '#333',
                        fontWeight: 'bold',
                        fontSize:'12'
                    },
                    text:''//表头文字
                },
                xAxis: {//x轴显示的内容
                    categories: [],
                    visible: false
                },
                yAxis: {//y轴显示的内容
                    title: {
                        text: ''
                    },
                     startOnTick: false,
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: false
                                // 开启数据标签
                        },
                        enableMouseTracking: true // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                    },
                    series:{
                        cursor: 'pointer', 
                        point: {
                            events: {
                                // 数据点点击事件
                                // 其中 e 变量为事件对象，this 为当前数据点对象
                                click: function (e) {
                                    console.log(e.point)
                                    that.remarkModal = true
                                    that.updateFormCustom = {
                                        time:e.point.category,
                                        name:e.point.series.name,
                                        value:e.point.options.y
                                    }
                                }
                            }
                        },
                       
                    }
                },
                series: [{//两条数据
                    name: '',
                    data: [],
                //     marker: { 
                //         enabled: false, 
                //         radius: 3, 
                //         symbol: 'circle'
                //  } 
                    // data :[ '1','2']
                }],
                 credits: {
                    enabled: false
                },
                
            },
            chartOptionsSec: {
                chart: {
                    type: 'line'
                },
                legend:{
                    enabled:false
                },
                title: {
                    verticalAlign: 'bottom',
                    style: {
                        color: '#333',
                        fontWeight: 'bold',
                        fontSize:'12'
                    },
                    // y:-40,
                    text:''//表头文字
                },
                xAxis: {//x轴显示的内容
                    categories: [],
                    visible: false
                },
                yAxis: {//y轴显示的内容
                    title: {
                        text: ''
                    },
                    endOnTick:false
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: false
                                // 开启数据标签
                        },
                        enableMouseTracking: true // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                    },
                    series:{
                        cursor: 'pointer', 
                        point: {
                            events: {
                                // 数据点点击事件
                                // 其中 e 变量为事件对象，this 为当前数据点对象
                                click: function (e) {
                                    console.log(e.point)
                                    that.remarkModal = true
                                    that.updateFormCustom = {
                                        time:e.point.category,
                                        name:e.point.series.name,
                                        value:e.point.options.y
                                    }
                                }
                            }
                        },
                    }
                },
                series: [{//两条数据
                    name: '',
                    data: [],
                    
                }],
                credits: {
                    enabled: false
                },
            },
            firstChart:{},
            show:false,
            showUpdatePointModal:true,
            updateFormCustom: {
                time: "",
                value: "",
                remark: "",
                id:""
            },
            ruleCustom: {
                remark: [
                  { required: true, message: "备注信息不能为空" }
                ]
            },
            lineRef: {
                avg: false,
                alarm: false,
                min: false,
                max: false,
            },
            mpointIds:'',
            allData:[],
            chain: false,
            YOY: false,
        }
    },
    filters: {
        formatDate(value) {
            let date = new Date(value);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
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
        keyNameChange(val) {
            console.log(JSON.stringify(val))
            this.siteGroupList = []
            this.siteTitle = '您选择的组合测点：'
            this.siteShow = '2'
            let name = val.value
            let data = {
                name: '',
                id: ''
            }
            this.groupList.map(item=> {
                if(item.combineName == name) {
                    data.name = name
                    data.id = item.mpointIds
                }
            })
            this.siteGroupList.push(data)
            this.getcharts(data.id)
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
            console.log(JSON.stringify(data))
            this.mpointIds = data[0].id
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
            let id = this.mpointIds
            this.getcharts(id)
        },
        dayAfter() {
            let time = this.getNextDate(this.beginDate,1)+' '+'00:00:00'
            this.beginDate = time
            let id = this.mpointIds
            this.getcharts(id)
        },
        dayReset() {
            const myDate = new Date();
            const year = myDate.getFullYear(); // 获取当前年份
            const month = myDate.getMonth() + 1; // 获取当前月份(0-11,0代表1月所以要加1);
            const day = myDate.getDate(); // 获取当前日（1-31）
            this.beginDate = `${year}-${month}-${day} 00:00:00`;
            let id = this.mpointIds
            this.getcharts(id)
        },
        renderChart(data) {
            //渲染charts

        },
        getcharts(id) { 
            let ids = id
            let beginDate = this.$moment(this.beginDate).utc().format()
            chartMethod({
                ids,
                beginDate
            }).then(res=> {
                console.log(res.data)
                this.allData = res.data.items
                this.drawerColumns1 = res.data.items[0].mpointName
                this.drawerColumns2 = res.data.items[1].mpointName
                this.drawerData = res.data.items[0].data
                this.drawerData2 = res.data.items[1].data
                let firstChart = res.data.items[0]
                let secChart = res.data.items[1]
                this.chartOptions.title.text = firstChart.mpointName+"-"+firstChart.siteName
                let xData = [],yData = []
                firstChart.data.map(ele=>{
                    xData.push(this.timeFormat(ele.dataDate))
                    yData.push(Number(ele.dataValue))
                })
                this.chartOptions.xAxis.categories = xData
                this.chartOptions.series[0].name = firstChart.mpointName+"-"+firstChart.siteName
                this.chartOptions.series[0].data = yData
                this.chartOptionsSec.title.text = secChart.mpointName+"-"+secChart.siteName
                let xDataSec = [],yDataSec = []
                secChart.data.map(ele=>{
                    xDataSec.push(this.timeFormat(ele.dataDate))
                    yDataSec.push(Number(ele.dataValue))
                })
                this.chartOptionsSec.xAxis.categories = xDataSec
                this.chartOptionsSec.series[0].name = secChart.mpointName+"-"+secChart.siteName
                this.chartOptionsSec.series[0].data = yDataSec
                this.show = true
            }).catch(err=> {

            })
        },
        add0(m){
            return m<10?'0'+m:m 
        },
        timeFormat(timestamp){
            //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
            var time = new Date(timestamp);
            var year = time.getFullYear();
            var month = time.getMonth()+1;
            var date = time.getDate();
            var hours = time.getHours();
            var minutes = time.getMinutes();
            var seconds = time.getSeconds();
            return year+'-'+this.add0(month)+'-'+this.add0(date)+' '+this.add0(hours)+':'+this.add0(minutes)+':'+this.add0(seconds);
        },
        saveRemark(name){
            this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log(this.updateFormCustom)
                        let a = this.updateFormCustom.name.split("-")[0]
                        let pointId = this.allData.filter(ele=>{
                            return ele.mpointName == a
                        })
                        let data = {
                            point: pointId[0].mpointId,
                            remark: this.updateFormCustom.remark,
                            time: this.$moment(this.updateFormCustom.time).utc().format(),
                            value: this.updateFormCustom.value,
                        }
                        addRemark(data).then(res=>{
                            console.log()
                            if(res.data.id){
                                this.remarkModal = false
                                this.getcharts(this.mpointIds)
                            }
                        })
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
        },
        addLineAverage(isAdd){
            var _self = this;
            let sum1 = 0,sum2=0,len = this.drawerData.length,v1,v2;
            this.drawerData.forEach(cData=>{
                // console.log(cData)
                sum1+= Number(cData.dataValue)
            })
            this.drawerData2.forEach(ele=>{
                sum2+= Number(ele.dataValue)
            })
             v1 = (sum1/len).toFixed(2)
             v2 = (sum2/len).toFixed(2)
             if(isAdd){
                 _self.$refs.lineChart.chart.yAxis[0].addPlotLine({
                    id: 'line_avg_1' ,
                    width: 1,
                    color: '#3385ff',
                    value: v1,
                    label: {
                        text: '平均值: ' + v1,
                        style: {color: 'red'}
                    }
                })
                 _self.$refs.lineChartSec.chart.yAxis[0].addPlotLine({
                    id: 'line_avg_2' ,
                    width: 1,
                    color: '#3385ff',
                    value: v2,
                    label: {
                        text: '平均值: ' + v2,
                        style: {color: 'red'}
                    }
                })
             }else{
                _self.$refs.lineChart.chart.yAxis[0].removePlotLine('line_avg_1')
                _self.$refs.lineChartSec.chart.yAxis[0].removePlotLine('line_avg_2')
             }
        },
        addLineAlarm(isAdd){
           getAlarm(this.mpointIds).then(res=>{
               console.log(res)
           })
        },
        addLineMax(isAdd){
            var _self = this;
            let max1 = Number(this.drawerData[0].dataValue),max2 = Number(this.drawerData2[1].dataValue)
            this.drawerData.forEach(cData=>{
                if(Number(cData.dataValue) > max1) {
                    max1 = cData.dataValue;
                }
            })
            this.drawerData2.forEach(ele=>{
                if(Number(ele.dataValue) > max2) {
                    max2 = ele.dataValue;
                }
            })
            if(isAdd){
                 _self.$refs.lineChart.chart.yAxis[0].addPlotLine({
                    id: 'line_max_1' ,
                    width: 1,
                    color: '#3385ff',
                    value: max1,
                    label: {
                        text: '最大值: ' + max1,
                        style: {color: '#3385ff'}
                    }
                })
                 _self.$refs.lineChartSec.chart.yAxis[0].addPlotLine({
                     id: 'line_max_2' ,
                    width: 1,
                    color: '#3385ff',
                    value: max2,
                    label: {
                        text: '最大值: ' + max2,
                        style: {color: '#3385ff'}
                    }
                })
             }else{
                _self.$refs.lineChart.chart.yAxis[0].removePlotLine('line_max_1')
                _self.$refs.lineChartSec.chart.yAxis[0].removePlotLine('line_max_2')
             }
           
        },
        addLineMin(isAdd){
            var _self = this;
            let min1 = Number(this.drawerData[0].dataValue),min2 = Number(this.drawerData2[1].dataValue)
            this.drawerData.forEach(cData=>{
                if(Number(cData.dataValue) < min1) {
                    min1 = cData.dataValue;
                }
            })
            this.drawerData2.forEach(ele=>{
                if(Number(ele.dataValue) < min2) {
                    min2 = ele.dataValue;
                }
            })
            if(isAdd){
                 _self.$refs.lineChart.chart.yAxis[0].addPlotLine({
                    id: 'line_min_1' ,
                    width: 1,
                    color: '#3385ff',
                    value: min1,
                    label: {
                        text: '最小值: ' + min1,
                        style: {color: '#3385ff'}
                    }
                })
                 _self.$refs.lineChartSec.chart.yAxis[0].addPlotLine({
                     id: 'line_min_2' ,
                    width: 1,
                    color: '#3385ff',
                    value: min2,
                    label: {
                        text: '最小值: ' + min2,
                        style: {color: '#3385ff'}
                    }
                })
             }else{
                _self.$refs.lineChart.chart.yAxis[0].removePlotLine('line_min_1')
                _self.$refs.lineChartSec.chart.yAxis[0].removePlotLine('line_min_2')
             }
        },
        openDrawer() {
            if(this.drawerTable == false) {
                this.drawerTable = true 
            } else {
                this.drawerTable = false
            }
        },
        exportChart() {
            var params
            let length = this.siteGroupList.length
            if(length == 0) {
                this.$Notice.info({
                    title: '警告',
                    desc: '当前没有测点，请先选择测点'
                });
            } else {
                params = {
                    ids: this.siteGroupList[0].id,
                    beginDate: this.$moment(this.beginDate).utc().format(),
                    cycle: this.timeValue,
                    ring: this.chain ? 1 : 0,
                    year: this.YOY ? 1 : 0
                };
                let exportChart = '/loong/api/curves/export'
                util.download(exportChart, params);
            }
        },
        refreshChart() {
            let id = this.mpointIds
            const myDate = new Date();
            const year = myDate.getFullYear(); // 获取当前年份
            const month = myDate.getMonth() + 1; // 获取当前月份(0-11,0代表1月所以要加1);
            const day = myDate.getDate(); // 获取当前日（1-31）
            this.beginDate = `${year}-${month}-${day} 00:00:00`;
            this.getcharts(id)
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
/deep/.ivu-drawer {
    top: 170px;
}
/deep/.ivu-drawer-body {
    padding: 0 0 0 10px;
}
tbody {
    tr:first-child {
        td {
            padding-top: 25px;
        }   
    }
}
.remark-modal {
    font-size: 12px;
    /deep/.ivu-form-item{
        margin-bottom: 0;
    }
}
.mark-flag {
  width: 15px;
  height: 15px;
  background: url(../../assets/images/red.png) no-repeat center center;
  cursor: pointer;
}
</style>