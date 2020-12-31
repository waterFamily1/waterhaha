<template>
    <div class="equ-parent">
        <!-- 上级设备 -->
        <div class="attach-btns" v-show="isEdit">
            <Button @click="del" v-show="!!parentEquData.code">删除设备</Button>
            <Button @click="addParentEquModal = true">添加设备</Button>
        </div>
        <div class="equ-no-parent" v-show="!!!parentEquData.code">
            <p style="height:100px;line-height:100px;font-size:13px;text-align:center;">暂无上级设备</p>
        </div>
        <div v-show="!!parentEquData.code" style="margin-top: 20px;">
            <div class="equ-edit-left">
                <div class="equ-edit-img">
                    <div v-if="parentEquData.imageUrl">
                        <img :src="parentEquData" width=100% height=100% />
                    </div>
                    <div v-if="!parentEquData.imageUrl">
                        <img src="../../../assets/images/default.png" width=100% height=100% />
                    </div>
                </div>
            </div>
            <div class="equ-edit-info">
                <div class="c-form-row-2col">
                    <div class="c-form-item">
                        <label>设备编号：</label>{{ parentEquData.code }}
                    </div>
                    <div class="c-form-item">
                        <label>状态：</label>
                        <span v-if="parentEquData.state == 1">启用</span>
                        <span v-if="parentEquData.state == 2">封存</span>
                        <span v-if="parentEquData.state == 3">报废</span>
                    </div>
                </div>
                <div class="c-form-row-2col">
                    <div class="c-form-item">
                        <label>设备名称：</label>{{ parentEquData.name }}
                    </div>
                    <div class="c-form-item">
                        <label>型号：</label>{{ parentEquData.model }}
                    </div>
                 </div>
                 <div class="c-form-row-2col">
                    <div class="c-form-item">
                        <label>设备类型：</label>{{ parentEquData.typeId }}
                   </div>
                    <div class="c-form-item">
                        <label>品牌：</label>{{ parentEquData.brand }}
                    </div>
                 </div>
                 <div class="c-form-row-2col">
                    <div class="c-form-item">
                        <label>区域位置：</label>{{ parentEquData.processName }}
                   </div>
                    <div class="c-form-item">
                        <label>规格：</label>
                        <span 
                            class="ell" 
                            style="vertical-align:middle;display:inline-block;width: 200px;" :title="parentEquData.specification"
                        >{{ parentEquData.specification }}</span>
                    </div>
                 </div>
                 <div class="c-form-row-1col">
                    <div class="c-form-item">
                       <label>保修期限(年)：</label>{{ parentEquData.warrantyPeriod }}
                    </div>
                 </div>
            </div>
        </div>

        <Modal
            v-model="addParentEquModal"
            title="添加上级设备"
            width="940px">
            <div class="equ-parent-search">
                <Form :model="formItem" :label-width="100">
                    <Row>
                        <Col span=8>
                            <FormItem label="关键字：">
                                <Input v-model="formItem.queryName" placeholder="编号/名称/型号/供应商" style="width: 200px;"></Input>
                            </FormItem>
                        </Col>
                        <Col span=8>
                            <FormItem label="所属组织：">
                                <TreeSelect v-model="formItem.org" :data="orgTreeData" v-width="200" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span=8>
                            <FormItem label="区域位置：">
                                <TreeSelect v-model="formItem.relProcess" :data="processTreeData" v-width="200" />
                            </FormItem>
                        </Col>
                        <Col span=8>
                            <FormItem label="设备类型：">
                                <TreeSelect 
                                    v-model="formItem.equTyp" 
                                    :data="equTreeData" 
                                    v-width="200" 
                                    multiple
                                />
                            </FormItem>
                        </Col>
                        <Col span=8 style="text-align:right;">
                            <Button @click="getEqu()">搜索</Button>
                            <Button class="c-btn-reset" @click="searchParamsClean()">重置</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <Table 
                ref="allEquTable" 
                :columns="columns" 
                :data="equList" 
                class="common-table" 
                @on-current-change="equTableSelected" 
                highlight-row 
                style="margin:0;">
                <template slot-scope="{ row, index }" slot="action">
                    <Icon 
                        type="ios-checkmark-circle-outline" 
                        style="font-size:22px;color:#999" 
                        @click="checkThis(row)"
                    />
                </template>
            </Table>
            <Page 
                :total="total" 
                :page-size="formItem.pageSize" 
                class="table-page" 
                show-total 
                @on-change="pageChange"
                style="text-align: right;margin-top: 10px;"
            ></Page>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import { regionalCon, orgMethod, typeMethod, addOrgMethod } from '@/api/deviceManage/equEdit'
import createTree from '@/libs/public-util'
import { typeTreeMethod } from '@/libs/public'

export default {
    name: 'parentEqu',
    props: {
        parentEquData: {
            type: Object
        },
        isEdit: {
            type: Boolean
        }
    },
    data() {
        return {
            addParentEquModal: false,
            formItem: {
                queryName: '',
                org: '',
                relProcess: '',
                equTyp: '',
                currentPage: 1,
                pageSize: 6
            },
            orgTreeData: [],
            processTreeData: [],
            equTreeData: [],
            columns: [
                { title: "编号", key: "code", width: 110, align: "center", ellipsis: true },
                { title: "名称", key: "name", ellipsis: true },
                { title: "类型", key: "typeId", width: 100 },
                { title: "型号", key: "model", ellipsis: true },
                { title: "品牌", key: "brand", ellipsis: true },
                { title: "规格", key: "specification", ellipsis: true },
                { title: "位置", key: "processName", ellipsis: true },
                { title: "使用年限", key: "warrantyPeriod", width: 100 },
                { title: "操作", slot: "action", width: 100, align: "center" }
            ],
            equList: [],
            total: 0,
            parentEqu: {}
        }
    },
    mounted () {
        this.getRegional()  
        this.getOrg()
        this.getType()
        this.getEqu()
    },
    methods: {
        getRegional() {
            //所属组织
            regionalCon().then(res => {
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].checked = false
                    treeItem.push(trees[i])
                }
                this.processTreeData = createTree(treeItem,0)
            }).catch(err => {
                // 异常情况
            })
        },
        getOrg() {
            //区域位置
            orgMethod().then(res=> {
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.orgTreeData = createTree(treeItem)
            }).catch(err=> {

            })
        },
        getType() {
            //设备类型
            typeMethod().then(res=> {
                // console.log(res.data)
                let treeItem = []
                let trees = res.data
                this.searchType = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].busId
                    trees[i].expand = false
                    if(trees[i].type == 'org') {
                        trees[i].disabled = true
                    }
                    treeItem.push(trees[i])
                }
                this.equTreeData = typeTreeMethod(treeItem, '0')
            }).catch(err=> {

            })
        },
        getEqu() {
            let queryName = this.formItem.queryName
            let currentPage = this.formItem.currentPage
            let orgIds = this.formItem.org
            let processIds = this.formItem.relProcess
            let typeIds = this.formItem.equTyp
            addOrgMethod({
                queryName,
                currentPage,
                orgIds,
                processIds,
                typeIds
            }).then(res=> {
                // console.log(res)
                this.equList = res.data.items
                this.total = res.data.total
            }).catch(err=> {

            })
        },
        del() {
            this.$Modal.confirm({
                title: '删除上级设备',
                content: '<p>您确定要删除该上级设备吗？</p>',
                onOk: () => {
                    this.$emit('parentDataChange', { code: null })
                    this.addParentEquModal = false
                }
            });
        },
        checkThis(row) {
            // console.log(row)
            this.parentEqu = row
            this.$emit('parentDataChange', this.parentEqu)
            this.addParentEquModal = false
        },
        searchParamsClean() {
            this.formItem = {
                queryName: '',
                org: '',
                relProcess: '',
                equTyp: ''
            }
        },
        pageChange(pageNo) {
            this.formItem.currentPage = pageNo
            this.getEqu()
        },
        equTableSelected(data) {
            this.parentEqu = data;
        }
    }
}
</script>

<style lang="less" scoped>
.equ-parent {
    .equ-edit-left {
        float: left;
        width: 130px;
        position: relative;
    }
    .equ-edit-info {
        float: left;
        width: 800px;
        .c-form-row-2col {
            height: 40px;
            .c-form-item {
                width: 45%;
                display: inline-block;
                min-height: 33px;
                label {
                    display: inline-block;
                    width: 120px;
                    line-height: 35px;
                    text-align: right;
                }
            }
        }
        .c-form-row-1col {
            .c-form-item {
                width: 90%;
                display: inline-block;
                min-height: 33px;
                label {
                    display: inline-block;
                    width: 120px;
                    line-height: 35px;
                    text-align: right;
                }
            }
        }
    }
    .attach-btns {
        margin-bottom: 15px;
        .ivu-btn {
            height: auto;
            color: #fff;
            background-color: #576374;
            border: none;
            padding: 4px 12px;
            font-size: 12px;
            margin-right: 5px;
        }
    }
}
.equ-parent-search {
    .ivu-btn {
        height: auto;
        color: #fff;
        font-size: 12px;
        background-color: #838A95;
        padding: 4px 12px;
        margin-right: 10px;
        border: none;
        min-width: 70px;
        border-radius: 0;
    }
    .c-btn-reset {
        background-color: #aaafb8;
    }
}
</style>