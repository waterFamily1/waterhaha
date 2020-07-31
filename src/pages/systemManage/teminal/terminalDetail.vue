<template>
    <div class="user-information" :style="{height: height+'px'}">
        <div class="user-title">
            <h3>终端详情</h3>
            <div>
                <Button type="info" size="small" style="background:#4b7efe" @click="save()">保存</Button>
                <Button type="info" size="small" style="background:#c8c8c8" @click="goBack()">返回</Button>
            </div>
        </div>
        <div class="user-table">
            <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="150">
                <div class="c-form-row">
                    <div class="c-form-item">
                        <FormItem label="终端名称：" prop="name">
                        <Input v-model="formItem.name"></Input>
                    </FormItem>
                    </div>
                </div>
                <div class="c-form-row">
                    <div class="c-form-item">
                        <FormItem label="终端类型：" prop="type">
                            <Input v-model="formItem.type"></Input>
                        </FormItem>
                    </div>
                    <div class="c-form-item">
                        <FormItem label="型号：" prop="model">
                            <Input v-model="formItem.model"></Input>
                        </FormItem>
                    </div>
                </div>
                <div class="c-form-row">
                    <div class="c-form-item">
                        <FormItem label="协议解析方法：" prop="analysis">
                            <Input v-model="formItem.analysis"></Input>
                        </FormItem>
                    </div>
                    <div class="c-form-item">
                        <FormItem label="设备编号：">
                            <Input v-model="formItem.number" :disabled="single"></Input>
                            <Checkbox v-model="single" @on-change="create()">自动生成</Checkbox>
                        </FormItem>
                    </div>
                </div>
                <div class="c-form-row">
                    <div class="c-form-item">
                        <FormItem label="区域位置：">
                            <Input v-model="formItem.area"></Input>
                        </FormItem>
                    </div>
                    <div class="c-form-item">
                        <FormItem label="安装位置：" prop="loaction">
                            <Input v-model="formItem.loaction"></Input>
                        </FormItem>
                    </div>
                </div>
                <div class="c-form-row">
                    <div class="c-form-item">
                        <FormItem label="网络方式：" prop="network">
                            <Input v-model="formItem.network"></Input>
                        </FormItem>
                    </div>
                    <div class="c-form-item">
                        <FormItem label="SIM卡号：">
                            <Input v-model="formItem.sim"></Input>
                        </FormItem>
                    </div>
                </div>
                <div class="c-form-row">
                    <div class="c-form-item">
                        <FormItem label="监控设备型号：">
                            <Input v-model="formItem.deviceNum"></Input>
                        </FormItem>
                    </div>
                </div>
                <div class="c-plain-bg-h">
                    <h3>心跳测点</h3>
                </div>
                <div class="c-form-row">
                    <div class="c-form-item c-form-item-special">
                        <FormItem label="心跳周期：">
                            <Input v-model="formItem.heartbeat" style="width:80px;"></Input>秒
                        </FormItem>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
  export default {
      data(){
        return {
            height:'',
            single: false,
            formItem: {
                name: '',
                type: '',
                model: '',
                analysis: '',
                number: '',
                numberId: '',
                area: '',
                loaction: '',
                network: '',
                sim: '',
                deviceNum: '',
                heartbeat: '30'
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入终端名称', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择终端类型', trigger: 'blur' }
                ],
                model: [
                    { required: true, message: '请输入型号', trigger: 'blur' }
                ],
                analysis: [
                    { required: true, message: '请选择解析方法', trigger: 'blur' }
                ],
                loaction: [
                    { required: true, message: '请输入安装位置', trigger: 'blur' }
                ],
                network: [
                    { required: true, message: '请选择网络方式', trigger: 'blur' }
                ]
            }
        }
      },
      mounted() {
        this.height = document.body.clientHeight - 75
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        create() {
            console.log(this.single)
        }
    }
  }
</script>
<style lang="less" scoped>
.user-information{
    margin: 5px;
    background: #fff;
    .user-title{
        background: #fff;
        padding: 5px;
        h3{
            display: inline-block;
            line-height: 30px;
            text-indent: 10px;
        }
        div{
            float: right;
            button{
                min-width: 70px;
                margin: 0 5px;
                color: #fff;
                border: 0;
            }
        }
    }
    .user-table {
        width: 100%;
        border-top: 5px solid #f0f0f0;
        padding: 30px 10px 10px;
        .c-form-row {
            .c-form-item {
                width: 45%;
                display: inline-block;
                min-height: 33px;
                /deep/.ivu-form-item-content {
                    /deep/.ivu-input-wrapper {
                        width: 280px;
                    }
                    .ivu-checkbox-wrapper {
                        margin-left: 20px;
                    }
                }
            }
            .c-form-item-special {
                margin-top: 20px;
                /deep/.ivu-input-wrapper {
                    width: 80px;
                    /deep/.ivu-input {
                        height: 30px;
                    }
                }
            }
        }
        .c-plain-bg-h {
            border-bottom: 1px solid #f0f0f0;
            height: 50px;
            padding: 10px 0 10px 10px;
        }
    }
}
</style>
