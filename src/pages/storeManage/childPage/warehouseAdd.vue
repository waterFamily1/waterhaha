<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>仓库新增</h3> 
            <div class="c-btns-right">
                <Button type="primary" :loading="saveLoading" @click="save()">保存</Button>
                <Button type="primary" class="c-btn-back" @click="backClick()">取消</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <Row>
                    <Col span="12">
                        <FormItem label="所属组织：" prop="orgId">
                            <TreeSelect v-model="formValidate.orgId" :data="orgList" v-width="300" @on-change="orgChange" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="仓库名称：" prop="name">
                            <Input v-model="formValidate.name" @on-blur="nameBlur" style="width: 300px" />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="负责人：" prop="personInCharge">
                            <Select 
                                v-model="formValidate.personInCharge" 
                                :label-in-value="true" 
                                @on-change="personChange"
                                style="width:300px"
                            >
								<Option v-for="(item, index) in personInCharge" :value="item.id" :key="index">{{ item.name }}</Option>
							</Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="仓库地址：">
                            <Input v-model="formValidate.address"  style="width: 300px" />
                        </FormItem>
                    </Col>
                </Row>
             </Form>
        </div>
        <div class="c-top-border-gray table-wrapper">
            <div class="table-title">
                <h3>库位新增</h3>
                <Button @click="addRow()">新增</Button>
            </div>
            <Table stripe :columns="tableList"  :data="formValidate.warehousePositions" :loading="loading">
            </Table>
        </div>
    </div>
</template>
<script>
import { orgMethod, personMethod, wareMethod, saveMethod } from '@/api/store/ware'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'
import { mapState } from 'vuex'

export default {
    name:'warehouseAdd',
    data (){
        var _self = this
        return {
            height:'',
            formValidate:{
                // 组织信息
                orgId: '',
                orgName: '',
                // 仓库名称
                name: '',
                // 负责人
                personInCharge: '',
                personInChargeName: '',
                // 仓库地址
                address:'',
                // 库位
                warehousePositions:[]
            },
            ruleValidate:{
                orgId: [
                    { required: true, message: '请选择组织', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '仓库名称不能为空', trigger: 'change' }
                ],
                personInCharge: [
                    { required: true, message: '请选择负责人', trigger: 'change', type: 'number' }
                ]
            },
            orgList: [],
            personInCharge: [],
            trees: [],
            saveLoading: false,
            tableList: [
                {
                    title: '库位编号',
                    key: 'locationNo',
                    render:(h, data) => {
                        return h("div", [
                            h("Input", {
                                props: {
                                    ref: 'locationNo',
                                    value: data.row.locationNo,
                                    disabled: data.row.disabled
                                },
                                on: {
                                    input: newValue => {
                                        data.row.locationNo = newValue
                                        _self.formValidate.warehousePositions[data.index] = data.row
                                    }
                                }
                            })
                        ]);
                    }
                }, {
                    title: '描述',
                    key: 'description',
                    render:(h, data) => {
                        return h("div", [
                            h("Input", {
                                props: {
                                    value: data.row.description,
                                    disabled: data.row.disabled
                                },
                                on: {
                                    input: newValue => {
                                        data.row.description = newValue
                                        _self.formValidate.warehousePositions[data.index] = data.row
                                    }
                                }
                            })
                        ])
                    }
                }, {
                    title: '操作',
                    key: "act",
                    width:200,
                    render: (h, data) => {
                        return h("div", [h("a",{
                            attrs: { href: "javascript:;" },
                            style: {
                                color: "#346C93",
                                margin: "0 10px 0 0"
                            },
                            on: {
                                click: () => {
                                    _self.formValidate.warehousePositions.splice(data.index, 1)
                                }
                            }
                        },"删除")])
                    }
                }
            ],
            tableData:[],
            loading: false,
            isExist: false
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getOrg()
    },
    methods:{
        getOrg() {
            orgMethod().then(res=> {
                let treeItem = []
                let trees = res.data
                this.trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id.toString()
                    treeItem.push(trees[i])
                }
                this.orgList = createTree(treeItem, 0)
            }).catch(err=> {

            })
        },
        orgChange(id) {
            this.formValidate.personInCharge = ''
            this.trees.map(item=> {
                if(item.id == id) {
                    this.formValidate.orgName = item.name
                }
            })

            personMethod(id).then(res=> {
                this.personInCharge = res.data.items
            })
        },
        personChange(item) {
            this.formValidate.personInCharge = item.value
            this.formValidate.personInChargeName = item.label
        },
        nameBlur() {
            if(this.formValidate.name) {
                wareMethod(this.formValidate.name).then(res=> {
                    this.isExist = res.data.isExist
                })
            }
        },
        addRow() {
            this.formValidate.warehousePositions.push({
                locationNo: '',
                description : ''
            })
        },
        save() {
            this.$refs['formValidate'].validate(valid => {
                if (valid) {
                    if(this.formValidate.warehousePositions.length == 0) {
                        this.$Modal.confirm({
                            title: "提示",
                            content: "尚未增加仓库库位，确认提交吗？",
                            onOk: () => {
                                this.saveLoading = true
                                saveMethod(this.formValidate).then((res) => {
                                    this.saveLoading = false;
                                    if(res.data.id){
                                        this.$Notice.success({
                                            title: '保存成功！',
                                        });
                                        // 跳转到详情页
                                        this.$router.push({
                                            path: '/childPage/warehouseDetail',
                                            query: { id: res.data.id }
                                        })
                                    }
                                }).catch(()=>{
                                    this.saveLoading = false
                                })
                            },
                            onCancel:()=>{
                            }
                        });
                    } else {
                        var hasNoSubmitRow = false
                        var hasNoSubmitRow = this.formValidate.warehousePositions.some((element,index) => {
                            if (!element.locationNo) {
                                this.$Notice.warning({ title:"请输入第"+(index+1)+"行中的库位编号"})
                                return true
                            }
                            return false
                        })
                        // 库位是否每行都验证通过
                        if (hasNoSubmitRow) {
                            return false
                        }
                        this.saveLoading = true
                        saveMethod(this.formValidate).then((res) => {
                            this.submsaveLoadingtLoading = false
                            if(res.data.id) {
                                this.$Notice.success({
                                    title: '保存成功！',
                                })
                                // 跳转到详情页
                                this.$router.push({
                                    path: '/childPage/warehouseDetail',
                                    query: { id: res.data.id }
                                })
                            }
                        }).catch(()=>{
                            this.saveLoading = false
                        })
                    }
                }
            })
        },
        backClick() {
            this.$router.back()
        }
    }
}
</script>
<style lang="less" scoped>
.index-box{
     margin: 5px;
    background: #fff;
    .c-left-border-blue {
        border-radius: 3px;
        padding: 5px;
        h3 {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-indent: 10px;
            font-size: 15px;
        }
        .c-btns-right {
            float: right;
            margin-top: 2px;
            .ivu-btn {
                min-width: 70px;
                margin: 0 5px;
                border: none;
                height: 28px;
            }
            .c-btn-back {
                background: #c8c8c8;
            }
        }
    }
    .c-top-border-gray {
        padding: 20px 0;
        border-top: 5px solid #f0f0f0;
        /deep/.ivu-row {
            padding-left: 20px;
        }
        .table-title{
            display:flex;
            justify-content: space-between;
            font-size: 14px;
            height: 40px;
            h3{
                text-indent: 10px;
                line-height: 30px;
                font-size: 15px;
            }
            .ivu-btn {
                height: auto;
                min-width: 70px;
                margin: 0 2px;
                border: none;
                background: #576374;
                color:#fff;
                border-radius: 3px;
                height: 25px;
            }
        }
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
</style>