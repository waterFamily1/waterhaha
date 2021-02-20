<template>
    <div class="sim-box" :style="{height: height+'px'}">
        <div class="sim-search">
            <Form label-position="right" :label-width="100">
                <div class="search-box" :class="{searchTrans:searchShow, searchPack:!searchShow}">
                    <div class="search-main">
                        <div>
                            <div class="form-item">
                                <FormItem label="关键字:">
                                    <Input v-model="keyword" placeholder="任务名称/任务编号"></Input>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <label>区域位置：</label> 
                                <TreeSelect 
                                    v-model="areaSite" 
                                    :data="processList"
                                    @on-change="treeChange"
                                    v-width="200" 
                                />
                            </div>
                        </div>
                        <div class="form-search-btn">
                            <a href="javascript:;" @click="higherSearch()">
                                <Icon type="ios-arrow-up" v-if="searchShow"/>
                                <Icon type="ios-arrow-down" v-else />
                                高级搜索
                            </a>
                            <Button @click="getList()">搜索</Button>
                            <Button class="reset" @click="resetHandle()">重置</Button>
                        </div>
                    </div>
                    <div class="c-adv-search">
                        <div class="c-adv-search-row">
                            <div class="form-item">
                                <FormItem label="任务状态:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="operatorValue" @on-change="operatorChange">
                                            <TagSelectOption name="ON">启用</TagSelectOption>
                                            <TagSelectOption name="OFF">停用</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
        <div class="sim-content">
            <div class="c-table-top-btns">
                <Dropdown @on-click="addTask">
                    <Button type="primary"> 新增 <Icon type="md-arrow-dropdown"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name='simple'>单测点计算</DropdownItem>
                        <DropdownItem name='complex'>多测点计算</DropdownItem>
                        <DropdownItem name='custom'>自定义型计算</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Button style="margin-left:10px" @click="removeHandle()">删除</Button>
                <Button style="margin-left:10px" @click="invokeHandle()">启用</Button>
                <Button style="margin-left:10px" @click="blockupHandle()">停用</Button>
                <Button style="margin-left:10px" @click="recountHandle()">重新计算</Button>
            </div>
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table 
                    stripe 
                    :columns="siteTableList" 
                    :data="siteTableData"
                    @on-selection-change="siteTableChange"
                >
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" style="margin-right: 5px;" @click="detailHandle(row)">查看</Button>
                        <Button class="action" size="small" style="margin-right: 5px;" @click="editHandle(row)">编辑</Button>
                        <Button class="action" size="small" @click="jisuan(row)">计算记录</Button>
                    </template>
                </Table>
                <Page 
                    :total="allTotal" show-total show-elevator @on-change="changePage" 
                    style="text-align: right;margin-top: 10px;" 
                />
            </div>
        </div>
        <!-- 删除 -->
        <Modal
            v-model="removeModal"
            title="提示"
            width="300"
            class="modal-box"
            :closable="false"
            @on-ok="removeOk">
            <Icon type="md-help-circle" />
            <p>确定要删除？</p>
        </Modal>
        <!-- 启用 -->
        <Modal
            v-model="invokeModal"
            title="提示"
            width="300"
            class="modal-box"
            :closable="false"
            @on-ok="invokeOk">
            <Icon type="md-help-circle" />
            <p>确定要启用？</p>
        </Modal>
        <!-- 停用 -->
        <Modal
            v-model="blockupModal"
            title="提示"
            width="300"
            class="modal-box"
            :closable="false"
            @on-ok="blockupOk">
            <Icon type="md-help-circle" />
            <p>确定要停用？</p>
        </Modal>
        <!-- 重新计算 -->
        <Modal
            v-model="recountModal"
            title="重新计算"
            width="520"
            class="recount-box"
            :loading="recountLoading"
            @on-ok="recountOk">
            <div class="form-item">
                <label>时间范围：</label>
                <DatePicker 
                    @on-change="timeChange"
                    type="datetimerange" 
                    placeholder="选择时间范围" 
                    style="width: 320px"
                ></DatePicker>
            </div>
            <div class="form-item" style="display: flex;">
                <label>任务状态：</label>
                <TagSelect v-model="taskTypeValue" @on-change="tagChange">
                    <TagSelectOption name="Normal">正常</TagSelectOption>
                    <TagSelectOption name="Error">异常</TagSelectOption>
                    <TagSelectOption name="Recalced">重新计算</TagSelectOption>
                </TagSelect>
            </div>
        </Modal>
        <!-- 重新计算=>提示 -->
        <Modal
            v-model="recountTipModal"
            title="提示"
            width="300"
            class="modal-box"
            :closable="false"
            @on-ok="recountTipOk"
            @on-cancel="recountTipCancel">
            <Icon type="md-help-circle" />
            <p>重新计算将覆盖当前值，请确认是否要重新计算？</p>
        </Modal>
        <!-- 计算记录 -->
        <Modal ref="modal1" v-model="showDetail" title="计算记录" width="700" closable>
            <div>
                <div class="log-search">
                    <div class="c-adv-search-row">
                        <label>计算时间：</label>
                        <div class="search-item">
                            <DatePicker type="date" format="yyyy-MM-dd" v-model="logSearchParam.dateRange.start" placeholder="开始时间" style="width: 200px" ></DatePicker> -
                            <DatePicker type="date" v-model="logSearchParam.dateRange.end" format="yyyy-MM-dd" placeholder="结束时间" style="width: 200px"></DatePicker>
                        </div>
                    </div>
                    <div class="c-adv-search-row">
                        <label>执行状态：</label>
                        <div class="search-item">
                            <TagSelect v-model="logSearchParam.status" @on-change="logSearch">
                                <TagSelectOption name="Normal">正常</TagSelectOption>
                                <TagSelectOption name="Error">异常</TagSelectOption>
                                <TagSelectOption name="Recalced">重新计算</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
                <Table :columns="columnsLog" :data="dataLog" :loading="loading1" size="small" @on-selection-change="selectChange"></Table>
                <Page :total="totalLog" :page-size="logSearchParam.pageSize" :current="logSearchParam.currentPage" class="table-page" show-total show-elevator size="small" @on-change="logPageChange"></Page>
                <div class="task-log">
                    <div class="task-log-span log-left">
                        <span>正常：<i>{{ntotal}}</i></span>
                        <span class="task-log-span-left">异常：<i>{{etotal}}</i></span>
                    </div>
                    <div class="log-right">
                        <a @click="refreshTalc">
                            <Icon type="md-refresh" size="16" color="rgb(75, 126, 254)"></Icon>
                            <span>重新计算</span>
                        </a>
                    </div>
                </div>
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
import { getListMethod, removeMethod, invokeMethod, recountMethod, regionalCon, jisuanMethod, jisuanMethod1 } from '@/api/dataManage/taskCalc'
import { formatTime } from '@/libs/public'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'

export default {
    name: 'SiteManage',
    data() {
        return {
            height: '',
            processList: [],
            areaSite: '',
            keyword: '',
            searchShow: false,
            addModal: false,
            loading: true,
            operatorValue: [],
            simValue: [],
            residueValue: [],
            siteTableList: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    title: '任务编号',
                    key: 'mpointNo',
                    width: 90,
                    ellipsis: true
                }, {
                    title: '任务名称',
                    key: 'taskname',
                    ellipsis: true
                }, {
                    title: '任务状态',
                    key: 'status',
                    width: 100,
                    render: (h, data) => {
                        return h( "span", data.row.status === 'ON' ? '启用' : '停用' )
                    }
                }, {
                    title: '数据时间(最早)',
                    key: 'startdt',
                    width: 160,
                    render(h, data) {
                        return util.tableDatetime(h, data.row.startdt)
                    } 
                }, {
                    title: '计算周期',
                    key: 'cycleName',
                    width: 100,
                    ellipsis: true
                }, {
                    title: '单位',
                    key: 'unit',
                    width: 80
                }, {
                    title: '任务类型',
                    key: 'ftype',
                    width: 120,
                    render: (h, data) => {
                        return h( "span", { attrs: { title: data.row.ftype === 'Simple' ? '单测点计算' : (data.row.ftype === 'Custom' ? '自定义型计算' : '多测点计算') } }, 
                        data.row.ftype === 'Simple' ? '单测点计算' : data.row.ftype === 'Custom' ? '自定义型计算' : '多测点计算' );
                    }
                }, {
                    title: '区域位置',
                    key: 'siteName',
                    ellipsis: true
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 200,
                    align: 'center'
                }
            ],
            siteTableData: [],
            modalValidate: {
                name: '',
                ICCID: '',
                remark: ''
            },
            modalRule: {
                ICCID: [
                    {required: true, message: '请输入ICCID', trigger: 'blur' }
                ]
            },
            allTotal: 0,
            pageNum: '1',
            removeModal: false,
            invokeModal: false,
            blockupModal: false,
            recountModal: false,
            recountTipModal: false,
            recountLoading: true,
            taskTypeValue: [],
            ids: '',
            startDT: '',
            endDT: '',
            showDetail: false,
            columnsLog: [
                { type: 'selection', width: 60 },
                { title: '数据时间', key: 'datadt',
                    render(h, data) {
                        return util.tableDatetime(h, data.row.datadt)
                    } 
                },
                { title: '计算时间', key: 'finishdt',
                    render(h, data) {
                        return util.tableDatetime(h, data.row.finishdt)
                    } 
                },
                { title: '值', key: 'excuteVal',
                    render: (h, data) => {
                        if(data.row.status === 'Error') {
                            return h("div", [
                                util.tableBtnStyle(
                                    h, () => {
                                        this.$Modal.confirm({
                                            title: '提示',
                                            content: '<p>'+ data.row.error +'</p>'
                                        });
                                    }, "查看原因"
                                )
                            ]);
                        } else {
                            return h( "span", data.row.excuteVal );
                        }
                    }
                }, { title: '执行状态', key: 'status', 
                    render: (h, data) => {
                        return h( "span", data.row.status === 'Recalced' ? '重新计算' : data.row.status === 'Normal' ? '正常' : '异常' );
                    }
                }
            ],
            dataLog: [],
            selectData: [],
            loading1: false,
            totalLog: 0,
            ntotal: 0,
            etotal: 0,
            logSearchParam: {
                pageSize: 10,
                currentPage: 1,
                id: null,
                dateRange:{
                    start: '',
                    end: util.formatDateTime(new Date(),'yyyy-MM-dd hh:mm:ss'),
                },
                status: []
            },
            jisuanStar: ''
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getList()
        this.getRegional()
    },
    methods: {
        // 添加
        addTask(name) {
            if(name == 'simple') {
                //单测点
                this.$router.push({
                    path: '/simpleForm'
                })
            } else if(name == 'complex') {
                //多测点
                this.$router.push({
                    path: '/complexForm'
                })
            } else {
                //多测点
                this.$router.push({
                    path: '/customForm'
                })
            }
        },
        getList() {
            let queryName = this.keyword
            let status = this.operatorValue
            let siteId = this.areaSite
            let currentPage = this.pageNum

            getListMethod({
                queryName,
                status,
                siteId,
                currentPage
            }).then(res=> {
                // console.log(JSON.stringify(res.data))
                this.siteTableData = res.data.items
                this.allTotal = res.data.total
            }).catch(err=> {

            })
        },
        resetHandle() {
            this.keyword = ''
            this.operatorValue = ''
            this.areaSite = ''
            this.pageNum = '1'
            this.getList()
        },
        changePage(index) {
            this.pageNum = index
            this.getList()
        },
        operatorChange(checkedNames, name) {
            if(name == '' || name == undefined || name == null) {
                this.operatorValue = []
            }
        },
        siteTableChange(selection) {
            let arr = selection
            let idArr = []
            arr.forEach(item => {
                idArr.push(item.id)
                return
            })
            let id = JSON.stringify(idArr).replace("[","").replace("]","")
            this.ids = id
        },
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        //删除
        removeHandle() {
            console.log(this.ids)
            if(this.ids == '' || this.ids == null || this.ids == undefined) {
                this.$Notice.warning({
                    title: '警告',
                    desc: '请选中计算任务后删除。'
                });
            } else {
                this.removeModal = true
            }
        },
        removeOk() {
            let ids = this.ids
            removeMethod(ids).then(res=> {
                // console.log(res)
                if(res.status == 200) {
                    this.$Notice.success({
                        title: '成功',
                        desc: '计算任务删除成功！'
                    });
                    this.getList()
                }
            }).catch(err=> {

            })
        },
        //启用
        invokeHandle(){
            if(this.ids == '' || this.ids == null || this.ids == undefined) {
                this.$Notice.warning({
                    title: '警告',
                    desc: '请选中后启用。'
                });
            } else {
                this.invokeModal = true
            }
        },
        invokeOk() {
            invokeMethod({
                ids: this.ids,
                status: 'ON'
            }).then(res=> {
                // console.log(res)
                if(res.status == 200) {
                    this.$Notice.success({
                        title: '成功',
                        desc: '操作成功！'
                    });
                    this.getList()
                }
            }).catch(err=> {

            })
        },
        //停用
        blockupHandle(){
            if(this.ids == '' || this.ids == null || this.ids == undefined) {
                this.$Notice.warning({
                    title: '警告',
                    desc: '请选中后停用。'
                });
            } else {
                this.blockupModal = true
            }
        },
        blockupOk() {
            invokeMethod({
                ids: this.ids,
                status: 'OFF'
            }).then(res=> {
                // console.log(res)
                if(res.status == 200) {
                    this.$Notice.success({
                        title: '成功',
                        desc: '操作成功！'
                    });
                    this.getList()
                }
            }).catch(err=> {

            })
        },
        //重新计算
        recountHandle(){
            if(this.ids == '' || this.ids == null || this.ids == undefined) {
                this.$Notice.warning({
                    title: '警告',
                    desc: '请先勾选要重新计算的任务。'
                });
            } else {
                this.recountModal = true
            }
        },
        recountOk() {
            this.recountTipModal = true
        },
        recountTipOk() {
            let ids = this.ids
            if(this.taskTypeValue.length == 0) {
                this.$Notice.warning({
                    title: '警告',
                    desc: '请先选择任务状态！'
                });
            } else if (this.startDT == '') {
                this.$Notice.warning({
                    title: '警告',
                    desc: '请先选择时间范围！'
                });
            } else {
                recountMethod({
                    endDT: this.endDT,
                    ids: ids,
                    startDT: this.startDT,
                    status: JSON.stringify(this.taskTypeValue).replace("\"","").replace("\"","").replace("[","").replace("]",""),
                }).then(res=> {
                    this.recountLoading = false
                    if(res.status == 200) {
                        this.recountModal = false
                        this.$Notice.success({
                            title: '成功',
                            desc: '补算任务添加成功，五分钟之后查询结果。'
                        });
                    }
                }).catch(err=> {

                })
            }
        },
        recountTipCancel() {
            this.recountLoading = false
        },
        tagChange(checkedNames, name) {
            if(name == '' || name == undefined || name == null) {
                this.taskTypeValue = []
            }
        },
        timeChange(date) {
            this.endDT = this.$moment(date[1]).utc().format()
            this.startDT = this.$moment(date[0]).utc().format()
        },
        getRegional() {
            regionalCon().then(res => {
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].checked = false
                    treeItem.push(trees[i])
                }
                this.processList = createTree(treeItem, 0)
            }).catch(err => {
                // 异常情况
            })
        },
        treeChange(value) {
            this.areaSite = value
        },
        asyncOK () {
            setTimeout(() => {
                this.addModal = false;
            }, 2000);
        },
        detailHandle(row) {
            let id = row.id
            let mpointid = row.mpointid
            if(row.ftype == 'Custom') {
                this.$router.push({
                    path: '/task-detailCustom',
                    query: {
                        id: id,
                        mpointid: mpointid,
                        type: row.ftype
                    }
                })
            } else if (row.ftype == 'Simple') {
                this.$router.push({
                    path: '/task-detailSimple',
                    query: {
                        id: id,
                        mpointid: mpointid,
                        type: row.ftype
                    }
                })
            } else if (row.ftype == 'Complex') {
                this.$router.push({
                    path: '/task-detailComplex',
                    query: {
                        id: id,
                        mpointid: mpointid,
                        type: row.ftype
                    }
                })
            }
        },
        // 计算日志搜索
        logSearch(item) {
            this.getTaskLogData()
        },
        jisuan(row) {
            this.logSearchParam.currentPage = 1;
            this.logSearchParam.status = '';
            this.logSearchParam.dateRange.start = util.formatDateTime(row.startdt,'yyyy-MM-dd 00:00:00')
            this.logSearchParam.dateRange.end = util.formatDateTime(new Date(),'yyyy-MM-dd hh:mm:ss')
            this.logSearchParam.id = row.id
            this.showDetail = true
            this.getTaskLogData()
        },
        // 计算日志数据
        getTaskLogData() {
            this.dataLog = []
            this.loading1 = true
            this.logSearchParam.startDT = this.$moment(this.logSearchParam.dateRange.start).utc().format()
            this.logSearchParam.endDT = this.$moment(this.logSearchParam.dateRange.dateRange).utc().format()
            let currentPage = this.logSearchParam.currentPage
            let id = this.logSearchParam.id
            let status = this.logSearchParam.status
            let startDT = this.logSearchParam.startDT
            let endDT = this.logSearchParam.endDT
            jisuanMethod({
                currentPage,
                id,
                status,
                startDT,
                endDT
            }).then(res=> {
                if(res.data.items) {
                    this.dataLog = res.data.items
                    this.totalLog = res.data.total
                    this.ntotal = res.data.ntotal
                    this.etotal = res.data.etotal
                    this.loading1 = false
                }
            })
        },
        // 选中值
        selectChange(data) {
            this.selectData = data
        },
        // 计算日志切换页码
        logPageChange(currentPage) {
            this.logSearchParam.currentPage = currentPage
            this.logSearch()
        },
        // 重新计算
        refreshTalc() {
            if(this.selectData.length == 0) {
                this.$Notice.warning({
                    title: "警告",
                    desc: "请选择计算任务进行重新计算",
                    duration: 3
                });
            } else {
                let paramsData = [];
                this.selectData.forEach(v => {
                    if(v.status == 'Recalced') {
                        this.$Notice.warning({
                            title: "警告",
                            desc: "只有执行状态为正常或异常的才能重新计算",
                            duration: 3
                        });
                        return;
                    }
                    let paramsObj = {
                        taskid: v.taskid,
                        status: 'Waitting',
                        datadt: v.datadt
                    }
                    paramsData.push(paramsObj);
                })
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>重新计算将覆盖当前值，请确认是否重新计算？</p>',
                    onOk: () => {
                        jisuanMethod1(paramsData).then(res=> {
                            if(res.data.count) {
                                this.$Notice.success({
                                    title: "成功",
                                    desc: "补算任务添加成功，五分钟之后查询结果！"
                                });
                                this.selectData = []
                                this.showDetail = false
                            }
                        })
                    },
                    onCancel: () => {
                        
                    }
                });
            }
        },
        editHandle(row) {
            if(row.ftype == 'Simple') {
                this.$router.push({
                    path: '/simpleFormEdit',
                    query: {
                        id: row.mpointid,
                        type: row.ftype
                    }
                })
            } else if(row.ftype == 'Complex') {
                this.$router.push({
                    path: '/complexFormEdit',
                    query: {
                        id: row.mpointid,
                        type: row.ftype
                    }
                })
            } else {
                this.$router.push({
                    path: '/customFormEdit',
                    query: {
                        id: row.mpointid,
                        type: row.ftype
                    }
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.sim-box {
    margin: 5px;
    background: #fff;
    .sim-search {
        .search-box {
            padding: 5px;
            height: 43px;
            .search-main {
                height: 33px;
                display: flex;
                justify-content: space-between;
                .form-item {
                    min-height: 33px;
                    display: inline-block;
                    /deep/.ivu-input {
                        height: 28px;
                        font-size: 13px;
                    }
                    label{
                        width: 100px;
                        display: inline-block;
                        text-align: right;
                    }
                }
                .form-search-btn {
                    margin-top: 4px;
                    a {
                        margin: 0 10px 0 0;
                        color: #576374;
                        font-size: 12px;
                    }
                    /deep/.ivu-btn{
                        background: #4b7efe;
                        font-size: 12px;
                        padding: 4px 12px;
                        color: #fff;
                        border: 0;
                        border-radius: 3px;
                        margin: 0 5px;
                        height: auto;
                    }
                    .reset{
                        background: #495566;
                    }
                }
            }
            .c-adv-search {
                margin-top: 10px;
                padding-top: 5px;
                border-top: 1px solid #ececec;
                .c-adv-search-row {
                    margin: 5px 0;
                    /deep/.ivu-input-wrapper {
                        width: 180px;
                        /deep/.ivu-input {
                            height: 28px;
                            font-size: 13px;
                        }
                    }
                    .cmp-tab {
                        display: inline-block;
                        /deep/.ivu-tag-text {
                            font-size: 14px;
                        }
                    }
                    /deep/.ivu-form-item {
                        margin-bottom: 5px;
                    }
                }
                /deep/.ivu-form-item-content {
                    line-height: 6px;
                }
            }
        }
        .searchTrans {
            height: 100px;
            overflow: hidden;
            transition: 0.5s height;
        }
        .searchPack {
            height: 43px;
            overflow: hidden;
            transition: 0.5s height;
        }
    }
    .sim-content {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            /deep/.ivu-btn {
                min-width: 50px;
                background: #576374;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                border: 0;
                border-radius: 3px;
                height: auto;
            }
            .add-btn {
                /deep/.ivu-select-selection {
                    display: none;
                }
            }
        }
        .table-wrapper{
            .action{
                color:rgb(75, 126, 254);
                border:0;
                font-size:12px;
                background:transparent
            }
            .page{
                text-align: right;
                margin-top: 10px;
            }
        }
    }
}
.c-top-border-gray-sim {
    padding: 0 30px;
    /deep/.ivu-tooltip {
        position: absolute;
        top: 3px;
        right: -20px;
    }
}
/deep/.ivu-modal-footer {
    /deep/.ivu-btn-text {
        border: 1px solid #dcdee2;
    }
}
.modal-box {
    /deep/.ivu-icon {
        color: #f90;
        font-size: 30px;
    }
    p {
        display: inline-block;
        color: #495060;
        font-size: 14px;
        margin-left: 10px;
        width: 80%;
    }
}
.recount-box {
    .form-item {
        display: inline-block;
        min-height: 40px;
        margin-bottom: 10px;
        label {
            display: inline-block;
            width: 110px;
            line-height: 35px;
            text-align: right;
        }
        /deep/.ivu-tag-select {
            /deep/.ivu-tag-text {
                font-size: 14px;
            }
        }
    }
}
.log-search {
    .c-adv-search-row {
        margin: 5px 0;
        display: flex;
        height: 32px;
        label {
            display: inline-block;
            width: 100px;
            line-height: 32px;
            text-align: left;
        }
        /deep/.ivu-tag-text {
            font-size: 14px;
        }
    }
}
.table-page {
    text-align: right;
    margin: 10px 0;
}
.task-log-span-left {
    margin-left: 40px;
}
.task-log {
    padding: 10px 20px;
    background: #f4f4f4;
    font-size: 14px;
    color: #333;
    height: 40px;
    display: flex;
    justify-content: space-between;
}
</style>