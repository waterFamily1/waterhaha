<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>盘点信息</h3> 
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
                            <Select v-model="formValidate.tissue" placeholder='请选择' style="width:300px">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="盘点人员：" prop="person">
                            <Select v-model="formValidate.person" placeholder='请选择' style="width:300px">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="盘点仓库：" prop="warehouse">
                            <Select v-model="formValidate.outwarehouse" placeholder='请选择' style="width:300px">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
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
export default {
    name:'checkAdd',
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
                ]
            },
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
            }
            .c-btn-back {
                background: #c8c8c8;
            }
        }
    }
}
</style>