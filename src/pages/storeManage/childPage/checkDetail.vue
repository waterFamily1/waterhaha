<template>
    <div class="index-box">
        <div class="c-main-border">
            <div class="c-left-border-blue">
                <h3>盘点信息</h3>
                <div class="c-btns-right">
                    <Button style="background: #2d8cf0;" @click="audit" :loading="auditLoading" v-if="detailInfo.auditedFlag == 0">审核</Button>
                    <Button v-if="detailInfo.auditedFlag == 0" @click="back">取消</Button>
                    <Button @click="back">返回</Button>
                </div>
            </div>
            <div class="c-top-border-gray">
                <Row>
                    <Col span="12">
                        <div class="c-form-item">
                            <label>盘点单号：</label>
                            <span>{{ detailInfo.materielInventoryNumber }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>盘点人员：</label>
                            <span>{{ detailInfo.userName }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>创建时间：</label>
                            <span>{{ detailInfo.createDate }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>备注：</label>
                            <span>{{ detailInfo.applicantName }}</span>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="c-form-item">
                            <label>组织信息：</label>
                            <span>{{ detailInfo.orgName }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>盘点仓库：</label>
                            <span>{{ detailInfo.warehouseName }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>审核状态：</label>
                            <span>{{ auditStateText[detailInfo.auditedFlag] }}</span>
                        </div>
                    </Col>
                </Row>
            </div>
            <div class="c-top-border-gray" style="padding: 10px">
                <div class="c-plain-bg-h">
                    <h3>盘点明细</h3>
                    <div class="c-btns-right take-stock-detail-btns" v-if="detailInfo.auditedFlag == 0">
                        <Button class="c-btn-add" v-show="status == 'info'" @click="exportData">导出库存盘点单</Button>
                        <Upload 
                            ref = "upload"
                            name = "file"
                            accept = ".xls,.xlsx"
                            :data = "uploadParams"
                            :format = "['xls', 'xlsx']"
                            :on-success = "uploadSucess"
                            :on-error = "uploadError"
                            :action="importUrl"
                            :show-upload-list="false"
                            v-show="status == 'info'"
                        >
                            <Button class="c-btn-add">导入库存盘点单</Button>
                        </Upload>
                        
                        <Button class="c-btn-add" @click="editTable" v-show="status == 'info' && tableDatas.length">编辑</Button>
                        <Button class="c-btn-add" @click="updateTable" v-show="status == 'edit'" :loading="updateLoading">提交</Button>
                        <Button class="c-btn-back" @click="cancelEditTable" v-show="status == 'edit'">取消</Button>
                    </div>
                </div>
                <div style="padding: 10px 0;">
                    <Input v-model="searchParams.queryName" placeholder="物料编号或物料名称" style="width: 180px" clearable></Input>
                    <Button type="primary" @click="search" class="c-btn-add">搜索</Button>
                </div>
                <Table :columns="columns" :data="tableDatas" :loading="loading" stripe></Table>
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
import { detailMethod, listMethod, takeStock, auditMethod } from '@/api/store/check'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'
import { mapState } from 'vuex'

export default {
    data() {
        var _self = this
        return {
            height: '',
            id: '',
            auditLoading: false,
            status: 'info',
            detailInfo: {},
            searchParams: {
                id: _self.$route.query.id,
                queryName: '',
                pageSize: 10,
                currentPage: 1
            },
            uploadParams: {id: _self.$route.query.id},
            columns: [
                { 
                    title: '物料编号', 
                    key: 'materielNumber'
                }, { 
                    title: '物料名称', 
                    key: 'materielName'
                }, { 
                    title: '型号', 
                    key: 'model'
                }, { 
                    title: '规格', 
                    key: 'standard'
                }, { 
                    title: '库位', 
                    key: 'warehousePositionName'
                }, { 
                    title: '账面数量', 
                    key: 'storageAmount'
                }, { 
                    title: '计量单位', 
                    key: 'measurementUnit'
                }, { 
                    title: '盘点数量', 
                    key: 'amount',
                    render(h, data) {
                        if(_self.status == 'info') {
                            data.row.amount = data.row.amountCache
                            return h('span', data.row.amount)
                        } else if(_self.status == 'edit') {
                            return h('input', {
                                style: {width: '50px'},
                                attrs: {
                                    type: 'text',
                                    maxlength: '5',
                                    id: 'storage_invertory_item_'+data.row.id
                                },
                                domProps: {
                                    value: data.row.amount
                                },
                                on: {
                                    input: function(event) {
                                        var v = event.target.value
                                        if(isNaN(v)) v = event.target.value = 0
                                        data.row.amount = v
                                    }
                                }
                            })
                        }
                    }
                }, { 
                    title: '盈亏数量', 
                    key: '',
                    render(h, data) {
                        var offset = Number(data.row.amount) - Number(data.row.storageAmount),
                            color = '#333'
                        if(offset > 0) color = '#b32f2f'
                        else if(offset < 0) color = '#2f7b34'
                        return h('span', {style: {color: color}}, offset)
                    }
                }, { 
                    title: '描述', 
                    key: 'remark',
                }
            ],
            tableDatas: [],
            loading: false,
            auditLoading: false,
            updateLoading: false,
            importUrl: '/inventory/api/materiel-inventory/import',
            total: 0
        }
    },
    computed: mapState({
        auditState: state => state.map.storage.inventory.auditState,
        auditStateText: state => state.map.storage.inventory.auditStateText,
    }),
    mounted() {
        this.id = this.$route.query.id
        this.height = document.body.clientHeight-80 
        this.getDetail()
        this.getList()
    },
    methods: {
        getDetail() {
            detailMethod(this.id).then(res=> {
                this.detailInfo = res.data
                this.detailInfo.createDate = util.transDateFromServer(res.data.createDate)
            })
        },
        getList() {
            this.loading = true
            let id = this.$route.query.id
            let queryName = this.searchParams.queryName
            let currentPage = this.searchParams.currentPage
            listMethod({
                id,
                queryName,
                currentPage
            }).then(res=> {
                this.loading = false
                res.data.items.forEach((item)=>{
                    item.amountCache = item.amount
                })
                this.tableDatas = res.data.items
                this.total = res.data.total
                this.status = 'info'
            })
        },
        search() {
            this.getList()
        },
        pageChange(index) {
            this.searchParams.currentPage = index
            this.getList()
        },
        editTable() {
            this.status = 'edit'
        },
        cancelEditTable() {
            this.status = 'info'
        },
        checkAmount() {
            var datas = this.tableDatas
            var valid = true
            datas.forEach((item)=> {
                if(item.amount === '') valid = false
            })
            return valid
        },  
        updateTable() {
            var datas = this.tableDatas
            datas.forEach((item)=> {
                item.amount = document.querySelector('#storage_invertory_item_'+item.id).value
            })
            if(!datas.length) {
                this.$Notice.warning({title: '请新增盘点明细'})
                return
            }
            if(!this.checkAmount()) {
                this.$Notice.warning({title: '您有库存数量为空'})
                return
            }
            this.updateLoading = true
            takeStock({
                id: this.$route.query.id,
                details: this.tableDatas
            }).then(res=> {
                this.updateLoading = false
                this.$Notice.success({title: '修改成功'})
                this.getList()
            }).catch(()=>{
                this.updateLoading = false
            })
        },
        exportData() {
            util.download('/inventory/api/materiel-inventory/export', {id: this.$route.query.id})
        },
        uploadSucess(res) {
            if(res.errNum == 0) {
                this.$Notice.success({title:'导入成功！'})
                this.searchParams.queryName = ''
                this.searchParams.currentPage = 1
                this.getList();
            } else {
                this.$Notice.error({title:'导入失败！', desc:'发现校验错误:'+ res.data.errNum + '处'})
            }
        },
        uploadError() {
            this.$Notice.error({title:'导入失败！'})
        },
        audit() {
            var id = this.$route.query.id
            if(!id) return
            if(this.tableDatas.length == 0) {
                this.$Notice.warning({title: '请先添加盘点明细'})
                return
            }
            this.$Modal.confirm({
                title: '审核提示',
                content: '<p class="confirm-modal-p">请确认该盘点单所有物料已盘点并完成导入，审核后将根据导入的库存盘点单对物料库存数量调整</p>',
                onOk: () => {
                    this.auditLoading = true
                    auditMethod(this.id).then(res=> {
                        this.$Notice.success({title: '审核成功'})
                        this.auditLoading = false
                        this.getDetail()
                    }).catch(()=>{
                        this.auditLoading = false
                    })
                }
            })
        },
        back() {
            this.$router.back()
        }
    }
}
</script>

<style lang="less" scoped>
.index-box {
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
                display: inline-block;
            }
            .ivu-upload {
                display: inline-block;
            }
        }
    }
}
.table-page {
    text-align: right;
    margin: 10px 0 0;
}
</style>