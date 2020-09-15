<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>出库新增</h3> 
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
                            <Select v-model="formValidate.tissue" placeholder='请选择' style="width:300px" size="small">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="出库仓库：" prop="warehouse">
                            <Select v-model="formValidate.person" placeholder='请选择' style="width:300px" size="small">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="出库人员：" prop="person">
                            <Select v-model="formValidate.warehouse" placeholder='请选择' style="width:300px" size="small">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="申请人员：" prop="person">
                            <Select v-model="formValidate.person" placeholder='请选择' style="width:300px" size="small">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    
                </Row>
                 <Row>
                   <Col span="12">
                        <FormItem label="出库时间：" prop="time">
                           <DatePicker v-model="formValidate.time" type="date" placeholder="请选择入库时间" style="width: 300px" size="small"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="申请用途：" prop="purpose">
                          <Input v-model="formValidate.purpose"  type="textarea" style="width:300px"></Input>
                        </FormItem>
                    </Col>
                </Row>
             </Form>
        </div>
        <div class="c-top-border-gray table-wrapper">
            <div class="table-title">
                <h3>入库明细</h3>
                <button>新增</button>
            </div>
            <Table stripe :columns="tableList" >
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <!-- <Button class="action" size="small" style="margin-right: 5px;">配置</Button> -->
                    <Button class="action" size="small">查看</Button>
                </template>
            </Table>
              <Page :total="100" show-elevator class="page" />
        </div>
    </div>
</template>
<script>
export default {
    data (){
        return {
            height:'',
            formValidate:{
               person:'',
               tissue:'',
               warehouse:'',
               time:'',
               purpose:''
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
                time: [
                    { required: true, message: '请选择组织信息', trigger: 'change' }
                ],
                purpose: [
                    { required: true, message: '请选择组织信息', trigger: 'change' }
                ],
            },
             tableList: [
                {
                    title: '物料编号',
                    key: 'number'
                },
                {
                    title: '物料名称',
                    key: 'name'
                },
                {
                    title: '物料类别',
                    key: 'type'
                },
                {
                    title: 'ABC分类',
                    key: 'ABC'
                },
                {
                    title: '品牌',
                    key: 'branch'
                },
                {
                    title: '型号',
                    key: 'model'
                },
                
                {
                    title: '规格',
                    key: 'specification'
                },
                {
                    title: '库位',
                    key: 'sLocation'
                },
                {
                    title: '出库数量',
                    key: 'outNumber'
                },
            ],
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
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
                font-size: 12px;
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
                 font-size: 12px;
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