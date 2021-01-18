<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>盘点信息</h3> 
            <div class="c-btns-right">
                <Button type="primary" :loading="saveLoading" @click="save()">保存</Button>
                <Button type="primary" class="c-btn-back" @click="cancel()">取消</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <Row>
                    <Col span="12">
                        <FormItem label="组织信息：" prop="orgId">
                            <TreeSelect 
                                v-model="formValidate.orgId" 
                                :data="orgList" 
                                @on-change="orgChange"
                                v-width="300" 
                            />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="盘点人员：" prop="userId">
                            <Select v-model="formValidate.userId" placeholder='请选择' style="width:300px">
                                <Option v-for="item in userList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="盘点仓库：" prop="warehouseId">
                            <Select v-model="formValidate.warehouseId" placeholder='请选择' style="width:300px">
                                <Option v-for="item in warehouseList" :value="item.id" :key="item.id">{{ item.warehouseName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="备注：" prop="remark">
                            <Input v-model="formValidate.remark"  type="textarea" style="width:300px"></Input>
                        </FormItem>
                    </Col>
                </Row>
             </Form>
        </div>
    </div>
</template>
<script>
import { orgMethod, personMethod, wareMethod1, addMethod } from '@/api/store/check'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'
import { mapState } from 'vuex'

export default {
    name:'checkAdd',
    data (){
        return {
            height:'',
            formValidate:{
               orgId:'',
               orgName: '',
               userId:'',
               warehouseId:'',
               remark:''
            },
            ruleValidate:{
                orgId: [
                    { required: true, message: '请选择组织', trigger: 'change' }
                ],
                userId: [
                    { required: true, message: '请选择人员', trigger: 'change', type: 'number' }
                ],
                warehouseId: [
                    { required: true, message: '请选择仓库', trigger: 'change', type: 'number' }
                ]
            },
            saveLoading: false,
            trees: [],
            orgList: [],
            userList: [],
            warehouseList: []
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getOrg()
    },
    methods: {
        getOrg() {
            orgMethod().then(res=> {
                let treeItem = []
                let trees = res.data
                this.trees =res.data
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
            this.trees.some(item=> {
                if(item.id == id) {
                    this.formValidate.orgName = item.name
                }
            })

            this.formValidate.warehouseId = ''
            this.formValidate.userId = ''
            this.userList = []
            this.warehouseList = []

            personMethod(id).then(res=> {
                this.userList = res.data.items
            })

            wareMethod1(id).then(res=> {
                this.warehouseList = res.data
            })
        },
        save() {
            this.$refs['formValidate'].validate((valid) => {
                if(valid) {
                    this.saveLoading = true
                    addMethod(this.formValidate).then(res=> {
                        this.$Notice.success({title: '添加成功！'})
                        this.$router.push({
                            path: '/childPage/checkDetail', 
                            query: {id: res.data.id}
                        })
                        this.saveLoading = false
                    }).catch(()=>{
                        this.saveLoading = false
                    })
                }
            })
        },
        cancel() {
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
            button {
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
        border-top: 5px solid #f0f0f0;
        padding: 20px 0;
    }
}
</style>