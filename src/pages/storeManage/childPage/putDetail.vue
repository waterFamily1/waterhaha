<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="c-main-border">
            <div class="c-left-border-blue">
                <h3>入库详细</h3>
                <div class="c-btns-right">
                    <Button style="background: #2d8cf0;" @click="audit" :loading="auditLoading" v-if="detailInfo.auditedFlag == 0">审核</Button>
                    <Button @click="back">返回</Button>
                </div>
            </div>
            <div class="c-top-border-gray">
                <Row>
                    <Col span="12">
                        <div class="c-form-item">
                            <label>入库单号：</label>
                            <span>{{ detailInfo.no }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>入库仓库：</label>
                            <span>{{ detailInfo.warehouseName }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>入库人员：</label>
                            <span>{{ detailInfo.userName }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>审核状态：</label>
                            <span>{{ detailInfo.auditedFlag == '0'?'未审核':'已审核' }}</span>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="c-form-item">
                            <label>所属组织：</label>
                            <span>{{ detailInfo.orgName }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>入库时间：</label>
                            <span>{{ detailInfo.checkinDate }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>创建时间：</label>
                            <span>{{ detailInfo.createDate }}</span>
                        </div>
                    </Col>
                </Row>
            </div>
            <div class="c-top-border-gray" style="padding: 10px">
                <div class="c-plain-bg-h">
                    <h3>入库信息</h3>
                    <div class="c-btns-right">
                        <Button 
                            class="c-btn-add" 
                            @click="editTable" 
                            v-if="detailInfo.auditedFlag == 0 && !isEdit && listData != 0"
                        >编辑</Button>
                        <Button 
                            class="c-btn-add" 
                            @click="updateTable" 
                            v-if="isEdit"
                        >提交</Button>
                        <Button 
                            class="cancle-btn" 
                            @click="cancelEditTable" 
                            v-if="isEdit"
                        >取消</Button>
                    </div>
                </div>
                <div style="padding: 10px 0;">
                    <Input v-model="searchParams.queryName" placeholder="物料编号或物料名称" style="width: 200px" />
                    <Button type="primary" @click="search" class="c-btn-add">搜索</Button>
                </div>
                <Table :columns="columns" :data="listData" :loading="loading" stripe></Table>
                <Page 
                    :total="total" 
                    :page-size="searchParams.pageSize" 
                    :current="searchParams.currentPage" 
                    class="table-page" 
                    show-total 
                    show-elevator 
                    @on-change="pageChange"
                ></Page>
            </div>
        </div>
    </div>
</template>

<script>
import { detailMethod, detailListMethod, chooseMethod, editMethod, auditMethod } from '@/api/store/put'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'
var currentCacheDataArr = []

export default {
    data() {
        var _self = this
        return {
            height: '',
            detailInfo: {},
            id: '',
             // 入库信息列表
            searchParams: {
                id: '',
                queryName: '',
                currentPage: 1,
                pageSize: 5
            },
            auditLoading: false,
            isEdit: false,
            loading: false,
            loading1: false,
            storagePos: [],
            columns: [
                {
                    title: "物料编号",
                    key: "materielNumber",
                    ellipsis: true
                }, {
                    title: "物料名称",
                    key: "materielName",
                    ellipsis: true
                }, {
                    title: "物料类别",
                    key: "categoryName",
                    ellipsis: true
                }, {
                    title: "ABC分类",
                    key: "abc"
                }, {
                    title: "品牌",
                    key: "brand",
                    ellipsis: true
                }, {
                    title: "型号",
                    key: "model",
                    ellipsis: true
                }, {
                    title: "规格",
                    key: "standard",
                    ellipsis: true
                }, {
                    title: "库位",
                    key: "warehouseLocationNo",
                    render: (h, data) => {
                        if (!_self.isEdit) {
                            return h("div", _self.listData[data.index].warehouseLocationNo)
                        }
                        return h("div", [
                            h(
                                "Select", {
                                    props: {
                                        "label-in-value":true,
                                        value: _self.listData[data.index].warehouseLocationNo || '',
                                        filterable: true,
                                        remote: true,
                                        "remote-method": _self.remoteMethodByPosition,
                                        loading: _self.loading1
                                    },
                                    on: {
                                        "on-change": item => {
                                            Object.assign(_self.listData[data.index],{
                                                warehouseLocationNo: item.label,
                                                warehouseLocationNoId: item.value
                                            })
                                        },
                                        "on-open-change":status=>{
                                            if(status){
                                                _self.storagePos = []
                                                _self.remoteMethodByPosition(_self.listData[data.index].warehouseLocationNo)
                                            }
                                        }
                                    }
                                },
                                _self.storagePos.map(function(item) {
                                    return h("Option", {
                                        props: {
                                        value: item.id,
                                        label: item.locationNo
                                        }
                                    });
                                })
                            )
                        ]);
                    }
                },{
                    title: "入库数量",
                    key: "amount",
                    render: (h, data) => {
                        if (!_self.isEdit) {
                            return h("div", data.row.amount)
                        }
                        return h("div", [
                            h("InputNumber", {
                                props: {
                                    value: data.row.amount || 0,
                                    disabled: !_self.isEdit
                                },
                                on: {
                                    input: newValue => {
                                        _self.listData[data.index].amount = newValue                 
                                    }
                                }
                            })
                        ])
                    }
                }
            ],
            listData: [],
            total: 0
        }
    },
    mounted() {
        this.id = this.$route.query.id
        this.height = document.body.clientHeight-80
        this.getDetail()
        this.getList()
    },
    methods: {
        back() {
            this.$router.back()
        },
        getDetail() {
            detailMethod(this.id).then(res=> {
                // console.log(res)
                this.detailInfo = res.data
                this.detailInfo.createDate = util.transDateFromServer(res.data.createDate)
                this.detailInfo.checkinDate = util.transDateFromServer(res.data.createDate).split(' ')[0]
                this.searchParams.id = id
            }).catch(err=> {

            })
        },
        getList() {
            this.loading = true
            let id = this.id
            let queryName = this.searchParams.queryName
            let currentPage = this.searchParams.currentPage
            detailListMethod({
                id,
                queryName,
                currentPage
            }).then(res=> {
                currentCacheDataArr = []
                this.listData = []
                res.data.items.forEach(element => {
                    if(!element.amount) {
                        element.amount = 0
                    }
                    element.warehouseLocationNoId = Number(element.warehouseLocationNoId)
                    currentCacheDataArr.push(Object.assign({},element))
                    this.listData.push(Object.assign({},element))
                })
                this.listData.forEach(element => {
                    var amount = element.amount
                    delete element.amount
                    element.amount = amount
                });
                this.loading = false
                this.total = res.data.total
            }).catch(err=> {

            })
        },
        pageChange(index) {
            this.searchParams.currentPage = index
            this.getList() 
        },
        search() {
            this.searchParams.currentPage = 1
            this.getList()
        },
        editTable() {
            this.isEdit = true
        },
        updateTable() {
            var flag = this.listData.every((element,index) => {
                if(!element.warehouseLocationNoId) {
                    this.$Notice.warning({title:"请选择第"+(index+1)+"行中入库库位"})
                    return false
                } else {
                    return true
                }
            })
            if(!flag) {
                return false
            }
            editMethod({
                inboundDetails: this.listData
            }).then(res=> {
                this.isEdit = false
                this.$Notice.success({
                    title: '保存成功！',
                })
                this.getList()
            }).catch(err=> {

            })
        },
        cancelEditTable() {
            this.isEdit = false
            this.listData = []
            currentCacheDataArr.forEach(element=>{
                this.listData.push(Object.assign({},element))
            })
            this.listData.forEach(element => {
                var amount = element.amount
                delete element.amount
                element.amount = amount
            })
        },
        // 远程获取库位信息
        remoteMethodByPosition(query) {
            this.getPositionComboxList({
                warehouseNo: this.detailInfo.warehouseNo,
                queryName: query
            })
        },
        // 查询指定仓库下以关键字开头的五个库位信息
        getPositionComboxList(params) {
            this.loading1 = true
            chooseMethod(params.warehouseNo).then(res=> {
                this.loading1 = false
                this.storagePos = res.data
            })
        },
        audit() {
            this.$Modal.confirm({
                title: "审核提示",
                content: "请确认该入库单所有物料已入库完成，审核后将对物料库存数量调整",
                onOk: () => {
                    auditMethod({
                        id: this.id
                    }).then(res=> {
                        this.$Notice.success({
                            title: "成功",
                            desc: "审核成功！"
                        })
                        this.$router.back()
                    }).catch(err=> {

                    })
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.index-box{
    margin: 5px;
    background: #fff;
    .c-main-border {
        border: 5px solid #f0f0f0;
        min-height: 100%;
        width: 100%;
        .c-left-border-blue {
            border-radius: 3px;
            padding: 5px;
            display: flex;
            justify-content: space-between;
            h3 {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                text-indent: 10px;
            }
            .ivu-btn {
                height: 28px;
                min-width: 70px;
                margin: 0 5px;
                background-color: #c8c8c8;
                border: none;
                color: #fff;
                padding: 4px 12px;
                font-size: 13px;
            }
        }
        .c-top-border-gray {
            border-top: 5px solid #f0f0f0;
            padding: 20px 0;
            .c-form-item {
                line-height: 24px;
                vertical-align: top;
                padding-left: 20px;
                padding-top: 9px;
                position: relative;
                display: flex;
                label {
                    width: 100px;
                    text-align: right;
                    font-weight: bold;
                }
            }
            .c-plain-bg-h {
                border-bottom: 1px solid #f0f0f0;
                height: 45px;
                padding: 10px 0 5px 10px;
                display: flex;
                justify-content: space-between;
                .c-btns-right {
                    .ivu-btn {
                        height: auto;
                        min-width: 70px;
                        padding: 4px 12px;
                        margin-right: 10px;
                    }
                    .cancle-btn {
                        background: #d8d5d5;
                        color: #fff;
                        border: none;
                        font-size: 13px;
                    }
                }
            }
            .c-btn-add {
                background-color: #576374;
                border: none;
                color: #fff;
                padding: 6px 15px;
                font-size: 13px;
                height: auto;
                margin-left: 5px;
            }
        }
    }
    .table-page {
        text-align: right;
        margin: 10px 0;
    }
}
</style>