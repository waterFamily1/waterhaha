<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>仓库新增</h3> 
            <div class="c-btns-right">
                <Button type="primary" @click="save()">保存</Button>
                <Button type="primary" class="c-btn-back" @click="cancel()">取消</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <Row>
                    <Col span="12">
                        <FormItem label="所属组织：" prop="tissue">
                            <Select v-model="formValidate.tissue" placeholder='请选择' style="width:300px">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="仓库名称：" prop="warehouse">
                            <Input v-model="formValidate.warehouse"  style="width: 300px" />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="负责人：" prop="person">
                            <Select v-model="formValidate.person" placeholder='请选择' style="width:300px">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                         <FormItem label="仓库地址：" prop="location">
                            <Input v-model="formValidate.location"  style="width: 300px" />
                        </FormItem>
                    </Col>
                </Row>
             </Form>
        </div>
        <div class="c-top-border-gray table-wrapper">
            <div class="table-title">
                <h3>库位新增</h3>
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
    name:'warehouseAdd',
    data (){
        return {
            height:'',
            formValidate:{
               person:'',
               tissue:'',
               warehouse:'',
               remark:''
            },
            ruleValidate:{
                tissue: [
                    { required: true, message: '请选择组织信息', trigger: 'change' }
                ],
                 person: [
                    { required: true, message: '请选择组织信息', trigger: 'change' }
                ],
                warehouse: [
                    { required: true, message: '请选择组织信息', trigger: 'change' }
                ],
               
            },
            value:'',
            tableList: [
                {
                    title: '库位编号',
                    key: 'number',
                    render:(h,params) => {
                              return h('Input',{
                                  props: {
                                    value:'',
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
                    title: '描述',
                    key: 'describe',
                    render:(h,params) => {
                              return h('Input',{
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