<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="index-search" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>关键字：</label>
                    <Input v-model="searchParams.queryName" placeholder="库存调整单号" style="width: 300px" />
                </div>
                <div class="form-item">
                    <label>所属组织：</label> 
                    <TreeSelect 
                        v-model="searchParams.orgId" 
                        multiple 
                        :data="orgList" 
                        :max-tag-count="2"
                        v-width="240" 
                    />
                </div>
                <div class="form-search-btn">
                    <a href="javascript:;" @click="higherSearch()">
                        <Icon type="ios-arrow-up" v-if="searchShow"/>
                        <Icon type="ios-arrow-down" v-else />
                        高级搜索
                    </a>
                    <Button @click="getTable">搜索</Button>
                    <Button class="reset" @click="resstHandle">重置</Button>
                </div>
            </div>
            <div class="c-adv-search">
                <div class="c-adv-search-row">
                    <div class="form-item" style="display: flex;">
                        <label>审核状态：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="searchParams.auditedFlag">
                                <TagSelectOption name="1">已审核</TagSelectOption>
                                <TagSelectOption name="2">未审核</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
                 <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>调整仓库：</label>
                        <Select v-model="searchParams.warehouseId" style="width:200px">
                            <Option v-for="item in warehouseList" :value="item.id" :key="item.id">{{ item.warehouseName }} - {{ item.warehouseNo }}</Option>
                        </Select>
                    </div>
                </div>
                <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>创建时间：</label>
                        <DatePicker 
                            type="date" 
                            placeholder="开始日期" 
                            style="width: 200px"
                            :options="startDate"
                            v-model="startTime"
                            format="yyyy-MM-dd"
                            @on-change="startTimeChange"
                        ></DatePicker> - 
                        <DatePicker 
                            type="date" 
                            placeholder="结束日期" 
                            style="width: 200px"
                            @on-change="endTimeChange" 
                            v-model="endTime"
                            format="yyyy-MM-dd"
                            :options="endDate"
                        ></DatePicker>
                    </div>
                </div>
            </div>
        </div>
        <div class="index-content">
            <div class="c-table-top-btns">
                <Button @click="linkToAdd()">库存调整新增</Button>
                <Button @click="modal = true">库存物料移库</Button>
                <Button @click="exportData()">导出库存记录</Button>
            </div> 
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table stripe :columns="tableList" :data="tableData">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" @click="detailHandle(row.id)">查看</Button>
                        <Button class="action" size="small" v-if="row.auditedFlag == 0" @click="cancleHandle(row.id)">删除</Button>
                    </template>
                </Table>
                <Page 
                    :total="total" 
                    show-total 
                    show-elevator 
                    @on-change="pageChange" 
                    class="page" 
                />
            </div>
        </div>

        <Modal
            v-model="modal"
            width="450" 
            title="物料移库"
            >
            <Form ref="formItem" :model="formItem" :rules="ruleFormItem" :show-message="false" :label-width="100">
                <FormItem label="关键字：" prop="queryName">
                    <Select
                        v-model="formItem.queryName"
                        placeholder="物料名称或物料编号"
                        filterable
                        :remote-method="remoteMethod"
                        :loading="loading"
                        @on-change="queryChange"
                        style="width: 220px"
                    >
                        <Option v-for="(option, index) in options" :value="option.id" :key="index">{{option.materielName}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="当前仓库：" prop="warehouse">
                    <Select 
                        v-model="formItem.warehouse" 
                        palceholder="请选择" 
                        style="width: 220px"
                        @on-change="wareChange"
                    >
                        <Option v-for="item in wareList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="当前库位：" prop="location">
                    <Select 
                        v-model="formItem.location" 
                        palceholder="请选择" 
                        style="width: 220px"
                    >
                        <Option v-for="item in locationList" :value="item.id" :key="item.id">{{ item.locationNo }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="目标库位：" prop="targetLocation">
                    <Select
                        v-model="formItem.targetLocation"
                        placeholder="目标库位"
                        filterable
                        :remote-method="remoteMethod1"
                        :loading="loading1"
                        style="width: 220px"
                    >
                        <Option v-for="(option, index) in options1" :value="option.id" :key="index">{{option.locationNo}}</Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer" >
                <Button @click="cancleModal('formItem')">取消</Button>
                <Button type="primary" @click="sureModal('formItem')">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import { tableMethod, orgMethod, wareMethod, keywordMethod, wareMethod1, locatMethod, targetMethod, inventMethod, cancleMethod } from '@/api/store/adjust'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'

export default {
    name: 'storeAdjust',
    data() {
        return {
            height: '',
            searchParams: {
                queryName: '',
                orgId: [],
                auditedFlag: [],
                warehouseId: '',
                startDate: '',
                endDate: '',
                pageSize: 10,
                currentPage: 1
            },
            orgList: [],
            warehouseList: [],
            startTime: '',
            startDate: {},
            start: '',
            endTime: '',
            endDate: {},
            end: '',
            searchShow: false, 
            tableList: [
                {
                    title: '库存调整单',
                    key: 'storeAdjustmentNumber',
                    ellipsis: true
                }, {
                    title: '所属组织',
                    key: 'orgName',
                    ellipsis: true
                }, {
                    title: '调整仓库',
                    key: 'warehouseName',
                    ellipsis: true
                }, {
                    title: '操作人员',
                    key: 'userName',
                    ellipsis: true
                }, {
                    title: '创建时间',
                    key: 'createDate',
                    render(h, data) {
                	    return util.tableDatetime(h, data.row.createDate)
                    } 
                }, {
                    title: '审核状态',
                    key: 'auditedFlag',
                    ellipsis: true
                }, {
                    title: '备注',
                    key: 'remark',
                    ellipsis: true
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            tableData: [],
            total: 0,

            modal: false,
            formItem: {
                queryName: '',
                warehouse: '',
                location: '',
                targetLocation: ''
            },
            ruleFormItem: {
                queryName: [
                    { required: true, trigger: 'blur', type: 'number' }
                ],
                warehouse: [
                    { required: true, trigger: 'blur', type: 'number' }
                ],
                location: [
                    { required: true, trigger: 'blur', type: 'number' }
                ],
                targetLocation: [
                    { required: true, trigger: 'blur', type: 'number' }
                ]
            },
            loading: false,
            options: [],
            wareList: [],
            locationList: [],
            loading1: false,
            options1: []
        }
    },
    mounted() {
        this.height = document.body.clientHeight-130
        this.getTable()
        this.getOrg()
        this.getWare()
    },
    methods: {
        getTable() {
            let queryName = this.searchParams.queryName
            let orgId = this.searchParams.orgId
            let auditedFlag = this.searchParams.auditedFlag
            let warehouseId = this.searchParams.warehouseId
            let currentPage = this.searchParams.currentPage
            let startDate
            let endDate
            if(this.startTime == '') {
                startDate = ''
            } else {
                startDate = this.$moment(this.startTime).utc().format()
            }
            if(this.endTime == '') {
                endDate = ''
            } else {
                endDate = this.$moment(this.endTime).utc().format()
            }
            this.searchParams.startDate = startDate
            this.searchParams.endDate = endDate
            tableMethod({
                queryName,
                orgId,
                auditedFlag,
                warehouseId,
                startDate,
                endDate,
                currentPage
            }).then(res=> {  
                this.tableData = res.data.items
                this.total = res.data.total
            }).catch(err=> {

            })
        },
        pageChange(index) {
            this.searchParams.currentPage = index
            this.getTable()
        },
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
        getWare() {
            wareMethod().then(res=> {
                this.warehouseList = res.data
            }).catch(err=> {

            })
        },
        startTimeChange(day) {
            this.start = day
            this.endDate = {
                disabledDate (date) {
                    return date && date.valueOf() <=new Date(day).getTime()- 86400000
                }
            }
        },
        endTimeChange(day) {
            this.end = day
            this.startDate = {
                disabledDate (date) {
                    return date && date.valueOf() >=new Date(day)
                }
            }
        },
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        resstHandle() {
            this.orgList = []
            this.warehouseList = []
            this.startTime = ''
            this.startDate = {}
            this.start = ''
            this.endTime = ''
            this.endDate = {}
            this.end = ''
            const defaultParams = {
                queryName: '',
                orgId: [],
                auditedFlag: [],
                warehouseId: '',
                startDate: '',
                endDate: '',
                pageSize: 10,
                currentPage: 1
            }
            this.searchParams = Object.assign({}, this.searchParams, defaultParams)
        },
        linkToAdd() {
            this.$router.push({
                path:'/childPage/adjustAdd'
            })
        },
        exportData() {
            util.download('/inventory/api/store-adjustment/export')
        },
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true
                keywordMethod(query).then(res=> {
                    // console.log(res)
                    if(res.status == 200) {
                        this.loading = false
                        this.options = res.data
                    }
                }).catch(err=> {

                })
            } else {
                this.options = []
            }
        },
        queryChange(id) {
            wareMethod1(id).then(res=> {
                this.wareList = res.data
            }).catch(err=> {

            })
        },
        wareChange(id) {
            let materielId = this.formItem.queryName
            let warehouseId = id
            locatMethod({
                materielId,
                warehouseId
            }).then(res=> {
                this.locationList = res.data
            }).catch(err=> {

            })
        },
        remoteMethod1(query) {
            if (query !== '') {
                this.loading1 = true
                let queryName = query
                let warehouseId = this.formItem.warehouse
                let warehousePositionId = this.formItem.location
                targetMethod({
                    queryName,
                    warehouseId,
                    warehousePositionId
                }).then(res=> {
                    // console.log(res)
                    if(res.status == 200) {
                        this.loading1 = false
                        this.options1 = res.data
                    }
                }).catch(err=> {

                })
            } else {
                this.options1 = []
            }
        },
        cancleModal(name) {
            this.$refs[name].resetFields();
        },
        sureModal(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    inventMethod({
                        currentWarehousePositionId: this.formItem.location,
                        materielId: this.formItem.queryName,
                        targetWarehousePositionId: this.formItem.targetLocation,
                        warehouseId: this.formItem.warehouse,
                    }).then(res=> {
                        if(res.status == 200) {
                            this.modal = false
                            this.$Notice.success({
                                title: '移库成功！'
                            });
                        }
                    }).catch(err=> {

                    })
                }
            })
        },
        detailHandle(id) {
            this.$router.push({
                path: '/childPage/adjustDetail',
                query: {
                    id: id
                }
            })
        },
        cancleHandle(id) {
            this.$Modal.confirm({
                title: '删除',
                content: '确定要删除吗？',
                onOk: () => {
                    cancleMethod(id).then(res=> {
                        this.$Notice.success({
                            title: '删除成功'
                        })
                        this.getTable()
                    }).catch(err=> {

                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.index-box {
    margin: 5px;
    background: #fff;
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
                .ivu-btn {
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
        .c-adv-search {
            margin-top: 10px;
            padding-top: 5px;
            border-top: 1px solid #ececec;
            .c-adv-search-row {
                margin: 10px 0;
                .form-item {
                    display: inline-block;
                    height: 33px;
                    label {
                        display: inline-block;
                        width: 100px;
                        line-height: 35px;
                        text-align: right;
                        color: #576374;
                    }
                }
                .cmp-tab {
                    display: inline-block;
                    /deep/.ivu-tag-text {
                        font-size: 14px;
                    }
                }
            }
        }
    }
    .searchTrans {
        height: 200px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .searchPack {
        height: 43px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .index-content {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            .ivu-btn {
                height: auto;
                min-width: 50px;
                background: #576374;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                border: 0;
                border-radius: 3px;
                margin-right: 10px;
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
/deep/.ivu-tag {
    .ivu-tag-text {
        margin-right: 0;
    }
    .ivu-icon {
        display: none;
    }
}
</style>