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
                <Dropdown>
                    <Button type="primary">
                        新增
                        <Icon type="md-arrow-dropdown"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem>单测点计算</DropdownItem>
                        <DropdownItem>多测点计算</DropdownItem>
                        <DropdownItem>自定义型计算</DropdownItem>
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
                        <Button class="action" size="small" style="margin-right: 5px;">编辑</Button>
                        <Button class="action" size="small">计算记录</Button>
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
    </div>
</template>
<script>
import { getListMethod, removeMethod, invokeMethod, recountMethod, regionalCon } from '@/api/dataManage/taskCalc'
import { formatTime } from '@/libs/public'
import createTree from '@/libs/public-util'

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
                },
                {
                    title: '任务编号',
                    key: 'mpointNo'
                },
                {
                    title: '任务名称',
                    key: 'taskname'
                },
                {
                    title: '任务状态',
                    key: 'status'
                },
                {
                    title: '数据时间(最早)',
                    key: 'startdt'
                },
                {
                    title: '计算周期',
                    key: 'cycleName'
                },
                {
                    title: '单位',
                    key: 'unit'
                },
                {
                    title: '任务类型',
                    key: 'ftype'
                },
                {
                    title: '区域位置',
                    key: 'siteName'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
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
            endDT: ''
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getList()
        this.getRegional()
    },
    methods: {
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
                let arr = res.data.items
                arr.map(item=> {
                    if(item.status == 'ON') {
                        item.status = '启用'
                    } else if(item.status == 'OFF') {
                        item.status = '停用'
                    }

                    item.startdt = formatTime(item.startdt, 'HH:mm:ss yyyy-MM-dd')

                    if(item.ftype == 'Simple') {
                        item.ftype = '单测点计算'
                    } else if (item.ftype == 'Complex') {
                        item.ftype = '多测点计算'
                    } else if (item.ftype == 'Custom') {
                        item.ftype = '自定义型计算'
                    }

                    return item
                })
                this.siteTableData = arr
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
            // this.$router.push({
            //     path:'/other/areaUpload',
            //     query: {
            //         uploadName: '批量导入SIM卡'
            //     }
            // })
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
            this.$router.push({
                path: '/task-detail',
                query: {
                    id: id,
                    mpointid: mpointid
                }
            })
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
</style>