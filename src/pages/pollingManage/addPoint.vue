<template>
    <div class="add-box" :style="{height: height+'px'}">
         <div class="index-search">
            <div class="search-main">
                <h3>巡检点</h3>
                <div class="form-search-btn">
                    <button type="button">搜索</button>
                    <button type="button" class="reset">重置</button>
                </div>
            </div>
        </div>
        <div class="c-main-border" >
             <Form :model="formItem" :label-width="100" :rules="ruleValidate">
                <Row>
                    <Col span="12">
                        <FormItem label="名称："  prop="name">
                            <Input v-model="formItem.name" placeholder="Enter something..." style="width:300px"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="区域位置：" prop="location">
                        <Select v-model="formItem.location" style="width:300px">
                            <Option value="beijing">New York</Option>
                            <Option value="shanghai">London</Option>
                            <Option value="shenzhen">Sydney</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="描述："  prop="describe">
                            <Input v-model="formItem.describe" type="textarea" placeholder="请输入描述" style="width:300px"></Input>
                        </FormItem>
                    </Col>
                </Row>
             </Form>
        </div>
        <div class="table-define">
            <div class="info">
                <h3>巡检步骤</h3>
                <button @click="add()">新增</button>
            </div>
            <Table stripe :columns="columns7" :data="data6"></Table>
        </div>
    </div>
</template>
<script>
export default {
    data () {
       return {
           height :'',
            formItem: {
                name: '',
                location: '',
                describe:''
            },
            ruleValidate:{
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                location: [
                    { required: true, message: '请选择位置', trigger: 'change' }
                ],

            },
            columns7: [
                {
                    title: '序号',
                    // key: 'number',
                    type: 'index',
                    align: 'center'
                },
                {
                    title: '步骤',
                    key: 'steps',
                    render:(h,params) => {
                              return h('Input',{
                                  props: {
                                    value:'',
                                      size:'small',
                                  },
                                 on: {
                                      input: (val) => {
                                         t.data[params.index].estimateTime = val
                                     }
                                },
                             })
                         }
                },
                {
                    title: '结果类型',
                    key: 'result',
                    render: (h, params) => {
                        return h('Select',{
                            props:{
                                size: 'small',
                                transfer:true
                            },
                            on: {
                            'on-change':(event) => {
                                    this.data[params.index].volumeType = event;
                                }
                            },
                            style:{
                                width:'80px'
                            }
                        },
                            params.row.result.map((item) =>{
                                return h('Option', {
                                    props: {
                                        value: item.value,
                                        label: item.name
                                    }
                                })
                            })
                        )
                    }
                },
                {
                    title: '绑定测点',
                    key: 'point'
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
                                       this.data6.splice(params.index,1)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            data6: [
                {
                    steps: '',
                    result: [
                        {
                            value:'0',
                            name:'状态'
                        },
                        {
                            value:'0',
                            name:'数据'
                        }
                    ],
                    point:'--'
                },
            ],
            

       }
    },
    mounted() {
        this.height = document.body.clientHeight-75
    },
    methods:{      
        add(){
            let obj= {
                steps: '',
                result: [
                    {
                        value:'0',
                        name:'状态'
                    },
                    {
                        value:'0',
                        name:'数据'
                    }
                ],
                point:'--'
            };
            this.data6.push(obj)
        }
    }
}
</script>
<style lang="less" scoped>
.add-box{
    margin: 5px;
    background: #fff;
    overflow: auto;
    .index-search {
        padding: 5px;
        height: 43px;
        .search-main {
            height: 33px;
            h3{
                float: left;
            }
             .form-search-btn {
                float: right;
                margin-top: 4px;
                a {
                    margin: 0 10px 0 0;
                    color: #576374;
                    font-size: 12px;
                }
                button{
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
    }
    .c-main-border{
        border-top: 5px solid #f0f0f0;
        width: 100%;
        padding-top: 20px;
        
    }
    .table-define{
         border-top: 5px solid #f0f0f0;
         padding: 10px;
        .info{
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #f0f0f0;
            height: 50px;
            padding: 10px 0 10px 10px;
            button{
                background:#576374;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                border: 0;
                border-radius: 3px;
                margin: 0 5px;
            }
        }
    }
}    
</style>