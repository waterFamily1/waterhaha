<template>
    <div class="sim-box" :style="{height: height+'px'}">
        <div class="sim-search">
            <Form :model="simSearchList" label-position="right" :label-width="100">
                <div class="search-box" :class="{searchTrans:searchShow, searchPack:!searchShow}">
                    <div class="search-main">
                        <div class="form-item">
                            <FormItem label="关键字:">
                                <Input v-model="simSearchList.name" placeholder="租户名称/ICCID"></Input>
                            </FormItem>
                        </div>
                        <div class="form-search-btn">
                            <a href="javascript:;" @click="higherSearch()">
                                <Icon type="ios-arrow-down" v-if="searchShow" />
                                <Icon type="ios-arrow-up" v-else />
                                高级搜索
                            </a>
                            <Button @click="getList">搜索</Button>
                            <Button @click="handleReset" class="reset">重置</Button>
                        </div>
                    </div>
                    <div class="c-adv-search">
                        <div class="c-adv-search-row">
                            <div class="form-item">
                                <FormItem label="ICCID号段:">
                                    <Input v-model="simSearchList.number1"></Input> -
                                    <Input v-model="simSearchList.number2"></Input>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="运营商:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="operatorValue" @on-change="operarChange">
                                            <TagSelectOption name="telcom">电信</TagSelectOption>
                                            <TagSelectOption name="cmcc">移动</TagSelectOption>
                                            <TagSelectOption name="unicom">联通</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="SIM卡状态:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="simValue" @on-change="simChange">
                                            <TagSelectOption name="0">在用</TagSelectOption>
                                            <TagSelectOption name="1">停机</TagSelectOption>
                                            <TagSelectOption name="2">待激活</TagSelectOption>
                                            <TagSelectOption name="3">销户</TagSelectOption>
                                            <TagSelectOption name="4">未知</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="剩余百分比:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="residueValue" @on-change="residueChange">
                                            <TagSelectOption name="100">≤100%</TagSelectOption>
                                            <TagSelectOption name="80">≤80%</TagSelectOption>
                                            <TagSelectOption name="60">≤60%</TagSelectOption>
                                            <TagSelectOption name="40">≤40%</TagSelectOption>
                                            <TagSelectOption name="20">≤20%</TagSelectOption>
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
                <Button @click="addModal = true">添加SIM卡</Button>
                <Button style="margin-left:10px" @click="uploadArea()">批量导入SIM卡</Button>
                <Button style="margin-left:10px" @click="deleteModal = true">删除</Button>
                <span class="refresh-btn" @click="refreshHandle">
                    <Icon type="md-refresh" />
                </span>
            </div>
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table 
                    stripe 
                    :columns="simTableList" 
                    :data="simTableData"
                    @on-selection-change="handleSelectRow"
                >
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" style="margin-right: 5px;" @click="handleDetail(row.iccid)">
                            查看
                        </Button>
                    </template>
                </Table>
                <Page 
                    :total="allTotal" show-total show-elevator @on-change="changePage" 
                    style="text-align: right;margin-top: 10px;" 
                />
            </div>
        </div>
        <!-- 删除 -->
        <Modal v-model="deleteModal" title="删除" width="300" :closable="false" @on-ok="deleteOK" class="delete-modal">
            <Icon type="md-help-circle" />
            <p>您确定要删除吗？</p>
        </Modal>
        <!-- 添加SIM卡 -->
        <Modal
            v-model="addModal"
            title="添加SIM卡"
            width="400"
            @on-ok="addOK('modalValidate')"
            @on-cancel="addCancel('modalValidate')">
            <Form ref="modalValidate" :model="modalValidate" :rules="modalRule" :label-width="80">
                <div class="c-top-border-gray-sim">
                    <FormItem label="租户名称" prop="name">
                        <Select v-model="modalValidate.name" @on-change="nameChange" placeholder="请选择">
                            <Option v-for="(item, index) in nameList" :value="item.id" :key="index">
                                {{item.name}}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="ICCID" prop="iccid">
                        <Input type="text" v-model="modalValidate.iccid"></Input>
                        <Tooltip content="Top Center text" placement="top">
                            <Icon type="ios-help-circle" style="font-size:18px;color: rgb(0, 151, 207);vertical-align:middle;margin-left:6px" @click="disabled = true" />
                            <div slot="content">
                                <p>多个ICCID请用分号(;)隔开</p>
                            </div>
                        </Tooltip>
                    </FormItem>
                    <FormItem label="备注" prop="remark">
                        <Input v-model="modalValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" 
                        placeholder="请填写备注"></Input>
                    </FormItem>
                </div>
            </Form>
        </Modal>
    </div>
</template>
<script>
import { getListMethod, deleteList, nameMethod, addSim, syncMethod } from '@/api/system/sim'
import { formatTime } from '@/libs/public'
export default {
    name: 'SIMManage',
    data() {
        return {
            height: '',
            simSearchList: {
                name: '',
                number1: '',
                number2: '',
                operator: ''
            },
            deleteModal: false,
            searchShow: false,
            addModal: false,
            operatorValue: [],
            simValue: [],
            residueValue: [],
            simTableList: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    title: '租户名称',
                    key: 'userName'
                }, {
                    title: 'ICCID',
                    key: 'iccid',
                    ellipsis: true
                }, {
                    title: 'SIM卡状态',
                    key: 'cardStatus'
                }, {
                    title: '总流量(MB)',
                    key: 'totalFlow'
                }, {
                    title: '已用流量(MB)',
                    key: 'usedFlow',
                    width: 130
                }, {
                    title: '剩余流量',
                    key: 'leftFlow'
                }, {
                    title: '运营商',
                    key: 'operator'
                }, {
                    title: '数据更新时间',
                    key: 'updateTime'
                }, {
                    title: '备注',
                    key: 'remark'
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            simTableData: [],
            modalValidate: {
                name: '',
                iccid: '',
                remark: ''
            },
            modalRule: {
                iccid: [
                    {required: true, message: '请输入ICCID', trigger: 'blur' },
                    {
                        validator(rule, value, callback, source, options) {
                            let errors = []
                            if(!/^[0-9]{19};$/.test(value)) {
                                callback('ICCID格式不正确')
                            }
                            callback(errors)
                        },
                        trigger: 'blur'
                    }
                ]
            },
            allTotal: 0,
            pageNum: '1',
            iccids: '',
            nameList: []
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getList()
        this.getName()
    },
    methods: {
        getList() {
            let queryName = this.simSearchList.name
            let iccidStart = this.simSearchList.number1
            let iccidEnd = this.simSearchList.number2
            let cardStatus = this.operatorValue
            let operator = this.simValue
            let percentage = this.residueValue
            let pageNum = this.pageNum
            getListMethod({
                queryName,
                iccidStart,
                iccidEnd,
                cardStatus,
                operator,
                percentage,
                pageNum
            }).then(res=> {
                // console.log(JSON.stringify(res.data))
                let arr = res.data.items
                let list = arr.map((item) => {
                    item.updateTime = formatTime(item.updateTime, 'HH:mm:ss yyyy-MM-dd')
                    if(item.operator == 'telcom') {
                        item.operator = '电信'
                    } else if(item.operator == 'cmcc') {
                        item.operator = '移动'
                    } else if(item.operator == 'unicom') {
                        item.operator = '联通'
                    }
                    
                    if(item.cardStatus == '0') {
                        item.cardStatus = '在用'
                    }else if(item.cardStatus == '1') {
                        item.cardStatus = '停机'
                    }else if(item.cardStatus == '2') {
                        item.cardStatus = '待激活'
                    }else if(item.cardStatus == '3') {
                        item.cardStatus = '销户'
                    }else if(item.cardStatus == '4') {
                        item.cardStatus = '未知'
                    }
                    return item
                })
                this.simTableData = list
                this.allTotal = res.data.total
            }).catch(err=> {

            })
        },
        handleReset() {
            this.simSearchList.name = ''
            this.simSearchList.number1 = ''
            this.simSearchList.number2 = ''
            this.operatorValue = []
            this.simValue = ''
            this.residueValue = ''
            this.pageNum = 1
            this.getList()
        },
        getName() {
            nameMethod().then(res=> {
                // console.log(res.data)
                this.nameList = res.data
            }).catch(err=> {

            })
        },
        operarChange(checkedNames, name) {
            if(name == '' || name == undefined || name == null) {
                this.operatorValue = []
            }
        },
        simChange(checkedNames, name) {
            if(name == '' || name == undefined || name == null) {
                this.simValue = []
            }
        },
        residueChange(checkedNames, name) {
            if(name == '' || name == undefined || name == null) {
                this.residueValue = []
            }
        },  
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        changePage(index) {
            this.pageNum = index
            this.getList()
        },
        handleSelectRow(selection) {
            let arr = selection
            let idArr = []
            arr.forEach(item => {
                idArr.push(item.iccid)
                return
            })
            let ids1 = JSON.stringify(idArr).replace("[","").replace("]","")
            this.iccids = ids1
        },
        deleteOK() {
            let iccids = this.iccids.replace("\"","").replace("\"","")
            deleteList(iccids).then(res => {
                if(res.data == '1') {
                    this.success()
                }
            }).catch(err => {
                // 异常情况
            })
        },
        nameChange(value) {
            // console.log(value)
            this.modalValidate.name = value
        },  
        success() {
            this.$Notice.success({
                title: '删除成功'
            });
            this.getList()
        },
        uploadArea() {
            this.$router.push({
                path:'/other/areaUpload',
                query: {
                    uploadName: '批量导入SIM卡'
                }
            })
        },
        handleDetail(id) {
            this.$router.push({
                path:'/sim/simDetail',
                query: {
                    iccid: id
                }
            })
        },
        addOK(name) {
            this.addModal = true
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.addModal = true
                    let iccid = this.modalValidate.iccid
                    let name = this.modalValidate.name
                    let remark = this.modalValidate.remark
                    addSim({
                        iccid,
                        name,
                        remark
                    }).then(res=> {   
                        // console.log(res)
                        if(res == undefined){
                            this.addModal = true
                            this.$Message.error('ICCID已经存在');
                        }
                        if(res.data == 1) {
                            this.addModal = false
                            this.getListMethod()
                        } 
                    }).catch(err=> {

                    })
                }
            })
        },
        addCancel(name) {
            this.$refs[name].resetFields();
        },
        refreshHandle() {
            if(this.iccids == '') {
                this.$Notice.warning({
                    title: '警告',
                    desc: '请选中后同步!'
                });
            } else {
                let iccid = this.iccids.replace("\"","").replace("\"","")
                syncMethod(iccid).then(res=> {
                    if(res.data == '1') {
                        this.$Notice.success({
                            title: '成功',
                            desc: '同步数据成功！'
                        });
                        this.getList()
                    }
                }).catch(err=> {

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
                    /deep/.ivu-input {
                        height: 28px;
                        font-size: 13px;
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
                        margin-left: 10px;
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
            height: 210px;
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
                background: #495566;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                border: 0;
                border-radius: 3px;
                margin: 0 5px;
                height: auto;
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
    .refresh-btn {
        float: right;
        /deep/.ivu-icon {
            color: rgb(75, 126, 254);
            font-size: 24px;
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
.delete-modal {
    /deep/.ivu-modal-body {
        /deep/.ivu-icon {
            font-size: 30px;
            color: #f90;
            display: inline-block;
        }
        p {
            display: inline-block;
            font-size: 14px;
            line-height: 30px;
            margin: 0 15px;
        }
    }
}
/deep/.ivu-modal-footer {
    .ivu-btn-text {
        border: 1px solid #e8eaec;
    }
}
</style>