<template>
    <div class="sim-box">
        <div class="sim-search">
            <Form label-position="right" :label-width="100">
                <div class="search-box" :class="{searchTrans:searchShow, searchPack:!searchShow}">
                    <div class="search-main">
                        <div>
                            <div class="form-item">
                                <FormItem label="关键字:">
                                    <Input v-model="keyword" placeholder="测点名称/测点编号/点位"></Input>
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
                                <FormItem label="信号类型:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="signalValue" @on-change="signalChange">
                                            <TagSelectOption name="State">状态信号</TagSelectOption>
                                            <TagSelectOption name="Digtal">数值信号</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="数据来源:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="dataValue" @on-change="dataChange">
                                            <TagSelectOption name="AUTO">自动采集</TagSelectOption>
                                            <TagSelectOption name="INPUT">人工录入</TagSelectOption>
                                            <TagSelectOption name="CALC">数据计算</TagSelectOption>
                                            <TagSelectOption name="ANALYSIS">数据分析</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="数据分类:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="classifyValue"  @on-change="classifyChange">
                                            <TagSelectOption 
                                                v-for="(item, index) in dataKindList" 
                                                :key="index"
                                                :name="item.id"
                                            >
                                                {{item.categoryName}}
                                            </TagSelectOption>
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
                <div class="btn-block">
                    <Dropdown trigger="click"  @on-click="addItem">
                        <Button style="margin-left:10px">
                            新增<Icon type="md-arrow-dropdown" />
                        </Button>
                        <DropdownMenu slot="list" >
                            <DropdownItem name="auto">自动采集型测点</DropdownItem>
                            <DropdownItem name="manual">人工录入型测点</DropdownItem>
                            <Dropdown placement="right-start" >
                                <DropdownItem name="calculation" @on-click="calculationAction">
                                    数据计算
                                    <Icon type="ios-arrow-forward"></Icon>
                                </DropdownItem>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="single">单测点计算任务</DropdownItem>
                                    <DropdownItem name="more">多测点计算任务</DropdownItem>
                                    <DropdownItem name="custom">自定义型计算任务</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div class="btn-block">
                    <Dropdown @on-click="batchsetting">
                        <Button style="margin-left:10px">
                            批量配置<Icon type="md-arrow-dropdown" />
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem name="0">选中测点</DropdownItem>
                            <DropdownItem name="1">全部测点</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div class="btn-block">
                    <Dropdown @on-click="deleteHandle">
                       <Button style="margin-left:10px">
                            批量删除<Icon type="md-arrow-dropdown" />
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem name="0">选中测点</DropdownItem>
                            <DropdownItem name="1">全部测点</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div class="btn-block">
                    <Dropdown @on-click="exportHandle">
                       <Button style="margin-left:10px">
                           导出测点
                            <Icon type="md-arrow-dropdown" />
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem name="0">选中测点</DropdownItem>
                            <DropdownItem name="1">全部测点</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div class="c-right-action" style="margin-top:5px;">
                    <a title="导入" class="c-icon-import" @click="importMpoint">
                        <Icon type="ios-download-outline" />
                    </a>
                    <a title="查看曲线" class="c-icon-chart" @click="routerToChart">
                        <Icon type="md-trending-up" />
                    </a>
                </div>
            </div>
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table 
                    stripe 
                    :columns="siteTableList" 
                    :data="siteTableData"
                    @on-selection-change="siteTableChange"
                >
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" style="margin-right: 5px;" @click="checkHandle(row)">查看</Button>
                        <Button class="action" size="small" v-if="row.datasource != 'ANALYSIS'" @click="editHandle(row)">编辑</Button>
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
            v-model="deleteModal"
            title="删除"
            width="300"
            class="delete-modal"
            :closable="false"
            @on-ok="deleteOk">
            <Icon type="md-help-circle" />
            <p>您确定要删除 {{ idsLength }} 个测点吗？</p>
        </Modal>
    </div>
</template>
<script>
import { getListMethod, regionalCon, dataKindMethod, deleteMethod } from '@/api/dataManage/siteManage'
import { formatTime, isAllEqual, download } from '@/libs/public'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'

export default {
    name: 'SiteManage',
    data() {
        return {
            height: '',
            keyword: '',
            processList: [],
            areaSite: '',
            dataKindList: [],
            searchShow: false,
            signalValue: [],
            dataValue: [],
            classifyValue: [],
            siteTableList: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    title: '测点编号',
                    key: 'mpointId'
                }, {
                    title: '区域位置',
                    key: 'siteName'
                }, {
                    title: '测点名称',
                    key: 'mpointName'
                }, {
                    title: '当前值',
                    key: 'value'
                }, {
                    title: '业务时间',
                    key: 'datadt'
                }, {
                    title: '信号类型',
                    key: 'datype',
                    width: 100,
                    render: (h, params) => {
                        let text= params.row.datype =='Digtal'?'A':'D'
                        let color = params.row.datype =='Digtal'?'#7ED321':'#4A90E2'
                        return h('div',{
                            style:{
                                background:color,
                                width:'20px',
                                height:'20px',
                                lineHeight:'20px',
                                color:'#fff',
                                fontSize:'12px',
                                borderRadius:'50%',
                                textAlign:'center'
                            }
                        },text);
                    }
                }, {
                    title: '数据来源',
                    key: 'datasourceName',
                    width: 110
                }, {
                    title: '数据分类',
                    key: 'categoryId',
                    width: 110
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 140,
                    align: 'center'
                }
            ],
            siteTableData: [],
            arrAllList: [],
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
            deleteModal: false,
            idsLength: '',
            ids: '',
            idsType: []
        }
    },
    created() {
        let goBack = this.$route.query.goBack
        if(goBack == '1') {
            this.$Notice.success({
                title: '成功',
                desc: '数据保存成功！'
            });
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getList()
        this.getRegional()
        this.getDataKind()
    },
    methods: {
        getList() {
            let queryName = this.keyword
            let datype = this.signalValue
            let datasource = this.dataValue
            let categoryId = this.classifyValue
            let currentPage = this.pageNum
            let pageSize = 10
            getListMethod({
                queryName,
                datype,
                datasource,
                categoryId,
                pageSize,
                currentPage
            }).then(res=> {
                // console.log(JSON.stringify(res.data.items))
                let arr = res.data.items
                arr.map(item=> {
                    if(item.datasource == 'AUTO') {
                        item.datasourceName = '自动采集'
                    } else if(item.datasource == 'INPUT') {
                        item.datasourceName = '人工录入'
                    } else if(item.datasource == 'CALC') {
                        item.datasourceName = '数据计算'
                    } else if(item.datasource == 'ANALYSIS') {
                        item.datasourceName = '数据分析'
                    }

                    if(item.categoryId == '0') {
                        item.categoryId = '水位'
                    } else if(item.categoryId == '1') {
                        item.categoryId = '水质'
                    } else if(item.categoryId == '2') {
                        item.categoryId = '水量'
                    } else if(item.categoryId == '3') {
                        item.categoryId = '能耗'
                    } else if(item.categoryId == '4') {
                        item.categoryId = '物耗'
                    } else if(item.categoryId == '5') {
                        item.categoryId = '药耗'
                    } else if(item.categoryId == '6') {
                        item.categoryId = '压力'
                    } else if(item.categoryId == '7') {
                        item.categoryId = '消防'
                    } else if(item.categoryId == '8') {
                        item.categoryId = '电流'
                    } else if(item.categoryId == '9') {
                        item.categoryId = '电压'
                    } else if(item.categoryId == '10') {
                        item.categoryId = '温度'
                    } else if(item.categoryId == '11') {
                        item.categoryId = '震动'
                    } else if(item.categoryId == '12') {
                        item.categoryId = '状态'
                    }

                    item.datadt = formatTime(item.datadt, 'HH:mm:ss yyyy-MM-dd')

                    item.value = item.value+item.unit

                    return
                })
                this.siteTableData = arr
                this.allTotal = res.data.total
            }).catch(err=> {

            })
        },
        changePage(index) {
            this.pageNum = index
            this.getList()
        },
        getDataKind() {
            dataKindMethod().then(res=> {
                this.dataKindList = res.data
                // console.log(res)
            }).catch(err=> {

            })
        },
        signalChange(checkedNames, name) {
            if(name == '' || name == undefined || name == null) {
                this.signalValue = []
            }
        },
        dataChange(checkedNames, name) {
            if(name == '' || name == undefined || name == null) {
                this.dataValue = []
            }
        },
        classifyChange(checkedNames, name) {
            if(name == '' || name == undefined || name == null) {
                this.classifyValue = []
            }
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
        resetHandle() {
            this.keyword = ''
            this.signalValue = []
            this.dataValue = []
            this.classifyValue = []
            this.pageNum = '1'
            this.getList()
        },
        siteTableChange(selection) {
            let arr = selection
            // console.log(arr)
            let idArr = []
            let idType = []
            arr.forEach(item => {
                idArr.push(item.id)
                idType.push(item.datasource)
                return
            })
            this.idsLength = idArr.length
            this.idsType = idType
            let ids1 = JSON.stringify(idArr).replace("[","").replace("]","")
            this.ids = ids1
        },
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        batchsetting(val) {
            let ids = this.ids
            let idsType = this.idsType
            if(val == 0) {
                if(this.idsLength < 2) {
                    this.$Notice.warning({
                        title: '警告',
                        desc: '请选中两条测点进行批量配置。'
                    });
                } else {
                    let isSame = isAllEqual(idsType)
                    if(isSame == false) {
                        this.$router.push({
                            path: '/analyze/synthesiSite',
                            query: {
                                ids: ids,
                                type: 'COMPLEX'
                            }
                        })
                    } else if (isSame == true) {
                        if(idsType[0] == 'AUTO') {
                            //自动采集型
                            this.$router.push({
                                path: '/analyze/automaticSite',
                                query: {
                                    ids: ids,
                                    type: 'AUTO'
                                }
                            })
                        } else if (idsType[0] == 'INPUT') {
                            //人工录入型
                            this.$router.push({
                                path: '/analyze/artificialSite',
                                query: {
                                    ids: ids,
                                    type: 'INPUT'
                                }
                            })
                        } else if (idsType[0] == 'CALC') {
                            //数据计算
                            this.$router.push({
                                path: '/analyze/dataSite',
                                query: {
                                    ids: ids,
                                    type: 'CALC'   
                                }
                            })
                        }
                    }
                }
            } else if(val == 1) {
                let queryName = ''
                let datype = ''
                let datasource = ''
                let categoryId = ''
                let pageSize = this.allTotal
                let currentPage = '1'
                getListMethod({
                    queryName,
                    datype,
                    datasource,
                    categoryId,
                    pageSize,
                    currentPage
                }).then(res=> {
                    this.arrAllList = res.data.items
                    let arr = this.arrAllList
                    let list = []
                    arr.map(item=> {
                        list.push(item.id)
                    })
                    let ids = JSON.stringify(list).replace("[","").replace("]","")
                    this.idsLength
                    this.$router.push({
                        path: '/analyze/synthesiSite',
                        type: 'COMPLEX'
                    })  
                }).catch(err=> {

                })
            }
        },
        deleteHandle(val) {
            let ids = this.ids
            if(val == 0) {
                if(ids == '') {
                    this.$Notice.info({
                        title: '请选择要删除的测点'
                    });
                } else {
                    this.deleteModal = true
                }
            } else if(val == 1) {
                this.idsLength = this.allTotal
                this.deleteModal = true
                let queryName = ''
                let datype = ''
                let datasource = ''
                let categoryId = ''
                let pageSize = this.allTotal
                let currentPage = '1'
                getListMethod({
                    queryName,
                    datype,
                    datasource,
                    categoryId,
                    pageSize,
                    currentPage
                }).then(res=> {
                    this.arrAllList = res.data.items
                    let arr = this.arrAllList
                    let list = []
                    arr.map(item=> {
                        list.push(item.id)
                    })
                    let ids = JSON.stringify(list).replace("[","").replace("]","")
                    this.ids = ids
                    this.idsLength = ''
                }).catch(err=> {

                })
            }
        },
        exportHandle(val) {
            let ids = this.ids
            let _params = {
                ids: ''
            }
            if(val == 0) {
                if(ids == '') {
                    this.$Notice.info({
                        title: '请选择导出测点！'
                    });
                } else {
                    util.download('/loong/api/mpoints/export', _params, ()=>{});
                }
            } else if(val == 1) {
                util.download('/loong/api/mpoints/export', _params, ()=>{});
            }
        },
        deleteOk() {
            let ids = this.ids
            deleteMethod(ids).then(res=> {
                if(res.status == 200) {
                    this.$Notice.success({
                        title: '成功',
                        desc: '测点删除成功！'
                    });
                    this.getList()
                }
            }).catch(err=> {

            })
        },
        addItem(name){
            console.log(name)
            if(name == 'auto'){
                this.$router.push({
                    path: '/analyze/addAutomatic'
                })
            } else if (name == 'manual') {
                this.$router.push({
                    path: '/analyze/addLabour'
                })
            } else if (name == 'single') {
                this.$router.push({
                    path: '/analyze/addSinglePoint'
                })
            } else if (name == 'more') {
                this.$router.push({
                    path: '/analyze/addMorePoint'
                })
            } else if (name == 'custom') {
                this.$router.push({
                    path: '/analyze/addcustomPoint'
                })
            }
        },
        calculationAction(name){
            console.log(name)
        },
        checkHandle(row) {
            let rows = row
            let type = ''
            // console.log(JSON.stringify(row))
            if(row.datasource === 'CALC') {
                type = row.ftype
            } else {
                type = row.datasource
            }
            console.log(type)
            if(type == 'ANALYSIS') {
                //数据分析
                this.$router.push({
                    path: '/analyze/checkDataAnalysis',
                    query: {
                        ids: row.id
                    }
                })
            } else if (type == 'AUTO') {
                //自动采集
                this.$router.push({
                    path: '/analyze/checkAutomatic',
                    query: {
                        ids: row.id
                    }
                })
            } else if (type == 'INPUT') {
                //人工录入
                this.$router.push({
                    path: '/analyze/checkLabour',
                    query: {
                        ids: row.id
                    }
                })
            } else if (type == 'Simple') {
                //单测点
                this.$router.push({
                    path: '/analyze/checkOneSite',
                    query: {
                        ids: row.id
                    }
                })
            } else if (type == 'Complex') {
                //多测点
                this.$router.push({
                    path: '/analyze/checkMoreSite',
                    query: {
                        ids: row.id
                    }
                })
            } else if (type == 'Custom') {
                //自定义
                this.$router.push({
                    path: '/analyze/checkCustom',
                    query: {
                        ids: row.id
                    }
                })
            }
        },
        editHandle(row) {
            let rows = row
            let type = ''
            // console.log(JSON.stringify(row))
            if(row.datasource === 'CALC') {
                type = row.ftype
            } else {
                type = row.datasource
            }
            
            if (type == 'INPUT') {
                //人工录入
                this.$router.push({
                    path: '/analyze/editLabour',
                    query: {
                        ids: row.id
                    }
                })
            } else if (type == 'Simple') {
                //单测点
                this.$router.push({
                    path: '/analyze/editOneSite',
                    query: {
                        ids: row.id
                    }
                })
            } else if (type == 'Complex') {
                //多测点
                this.$router.push({
                    path: '/analyze/editMoreSite',
                    query: {
                        ids: row.id
                    }
                })
            } else if (type == 'Custom') {
                //自定义
                this.$router.push({
                    path: '/analyze/editcustomPoint',
                    query: {
                        ids: row.id
                    }
                })
            } else if (type == 'AUTO') {
                //自动采集
                this.$router.push({
                    path: '/analyze/editAutomatic',
                    query: {
                        ids: row.id
                    }
                })
            }
        },
        importMpoint() {
            //导入
            this.$router.push({
                path: '/mpointImport'
            })
        },
        routerToChart() {
            //查看曲线
            console.log(this.idsLength)
            if (this.idsLength && this.idsLength > 0 && this.idsLength < 9) {
                var ids = [];
                // console.log(this.ids)
                this.$router.push({
                    path: '/data-analysis',
                    query: { id: this.ids }
                });
            } else {
                this.$Notice.warning({
                    title: '警告',
                    desc: '请选择一条至八条测点数据',
                    duration: 3
                });
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
                    /deep/.ivu-btn {
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
            height: 180px;
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
            position: relative;
            .btn-block{
                display: inline-block;
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
            }
            .c-right-action {
                display: inline-block;
                position: absolute;
                right: 0;
                top: -5px;
                a {
                    display: inline-block;
                    margin-right: 10px;
                    /deep/.ivu-icon {
                        font-size: 28px;
                    }
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
.delete-modal {
    /deep/.ivu-icon {
        color: #f90;
        font-size: 30px;
    }
    p {
        display: inline-block;
        margin-left: 10px;
    }
}
</style>