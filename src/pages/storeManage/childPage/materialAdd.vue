<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>物料新增</h3> 
            <div class="c-btns-right">
                <Button type="primary" @click="save()">保存</Button>
                <Button type="primary" class="c-btn-back" @click="cancel()">取消</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <Row>
                    <Col span="12">
                        <FormItem label="组织信息：" prop="tissue">
                            <Select v-model="formValidate.tissue" placeholder='请选择' style="width:300px" size="small">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="物料名称：" prop="name">
                            <Input v-model="formValidate.name"  style="width: 300px" size="small"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="物料类别：" prop="category">
                            <Select v-model="formValidate.category" placeholder='请选择' style="width:300px" size="small">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                         <FormItem label="ABC分类：" prop="ABC">
                             <Select v-model="formValidate.category" placeholder='请选择' style="width:300px" size="small">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="计量单位：" prop="unit">
                            <Select v-model="formValidate.unit" placeholder='请选择' style="width:300px" size="small">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                         <FormItem label="规格：" prop="specification">
                             <Input v-model="formValidate.specification"  style="width: 300px" size="small" />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="品牌：" prop="brand">
                            <Input v-model="formValidate.brand"  style="width: 300px"  size="small"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                         <FormItem label="型号：" prop="model">
                             <Input v-model="formValidate.model"  style="width: 300px" size="small" />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="备注：" prop="remark">
                            <Input v-model="formValidate.remark"  style="width: 300px" type="textarea" size="small"/>
                        </FormItem>
                    </Col>
                    
                </Row>
             </Form>
        </div>
        <div class="c-top-border-gray table-wrapper">
            <div class="table-title">
                <h3>存储上下限</h3>
                <button @click="add()">新增</button>
            </div>
            <Table stripe :columns="tableList"  :data="tableData">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <!-- <Button class="action" size="small" style="margin-right: 5px;">配置</Button> -->
                    <Button class="action" size="small">查看</Button>
                </template>
            </Table>
        </div>
    </div>
</template>
<script>
export default {
    name:'materialAdd',
    data (){
        return {
            height:'',
            formValidate:{
               tissue:'',
               name:'',
               category:'',
               ABC:'',
               unit:'',
               specification:'',
               brand:'',
               model:'',
               remark:''
            },
            ruleValidate:{
                tissue: [
                    { required: true, message: '请选择组织信息', trigger: 'change' }
                ],
                 name: [
                    { required: true, message: '请选择组织信息', trigger: 'change' }
                ],
                category: [
                    { required: true, message: '请选择组织信息', trigger: 'change' }
                ],
                ABC: [
                    { required: true, message: '请选择组织信息', trigger: 'change' }
                ],
                unit: [
                    { required: true, message: '请选择组织信息', trigger: 'change' }
                ],
                specification: [
                    { required: true, message: '请选择组织信息', trigger: 'change' }
                ],
               
            },
            value:'',
            tableList: [
                {
                    title: '仓库名称',
                    key: 'name',
                    render:(h,params) => {
                              return h('Input',{
                                  props: {
                                    value:'0.00',
                                      size:'small',
                                  },
                                 on: {
                                      input: (val) => {
                                        this.tableData[params.index].number = val
                                     }
                                },
                             })
                         }
                },
                {
                    title:'下限',
                    key: 'lowerLimit',
                    render:(h,params) => {
                              return h('InputNumber',{
                                  props: {
                                    value:'0.00',
                                      size:'small',
                                  },
                                 on: {
                                      input: (val) => {
                                         this.tableData[params.index].describe = val
                                     }
                                },
                             })
                         }
                },
                {
                    title:'上限',
                    key: 'upperLimit',
                    render:(h,params) => {
                              return h('InputNumber',{
                                  props: {
                                    value:'',
                                      size:'small',
                                  },
                                 on: {
                                      input: (val) => {
                                         this.tableData[params.index].describe = val
                                     }
                                },
                             })
                         }
                },
                 {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        console.log(
                            params.index
                        )
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'default',
                                    size: 'small'
                                },
                                style: {
                                    color:'rgb(75, 126, 254)',
                                    border:'0'
                                },
                                on: {
                                    click: () => {
                                       this.tableData.splice(params.index,1)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            tableData:[]
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
    methods:{
         add(){
            console.log("1")
            let obj= {
                number:'',
                describe:''
            };
            this.tableData.push(obj)
            console.log(this.tableData)
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
            button {
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