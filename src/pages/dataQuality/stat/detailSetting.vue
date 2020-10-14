<template>
    <div class="user-information" :style="{height: height+'px'}">
        <div class="user-title">
            <h3>测点数据质量详情</h3>
            <div>
                <Button type="info" size="small" style="background:#4b7efe" @click="save()">保存</Button>
                <Button type="info" size="small" style="background:#c8c8c8" @click="cancel()">取消</Button>
            </div>
        </div>
        <div class="con-show padding20-14" :style="{height: (height-45)+'px'}">
            <Form :model="formLeft" label-position="right" :label-width="130">
                <Row>
                    <Col span="8">
                        <FormItem label="测点名称:" style="position:relative">
                            <span>2</span>
                            <a href="javascript:;" class="change-mpoint-btn" @click="change()">[更换]</a>
                            <!-- <Input v-model="formLeft.input1"></Input> -->
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="信号类型:">
                             <span>状态信号</span>
                        </FormItem>
                    </Col>
                </Row>
                <h4>准确性</h4>
                 <Row>
                    <Col span="8">
                        <FormItem label="合理范围:" >
                           <InputNumber  v-model="formLeft.min" style="width:80px" size="small"></InputNumber>
                           -
                           <InputNumber  v-model="formLeft.max" style="width:80px" size="small"></InputNumber>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="单调递增:">
                            <Radio v-model="formLeft.increase"></Radio>
                        </FormItem>
                    </Col>
                </Row>
                 <Row>
                    <Col span="8">
                        <FormItem label="3σ原则:" >
                          <Checkbox v-model="formLeft.principle"></Checkbox>
                        </FormItem>
                    </Col>
                </Row>
                 <Row>
                    <Col span="8">
                        <FormItem label="箱型图:" >
                           <Checkbox v-model="formLeft.principle"></Checkbox>
                        </FormItem>
                    </Col>
                </Row>
                 <Row>
                    <Col span="8">
                        <FormItem label="异常值处理:" >
                           <Select v-model="formLeft.dispose" style="width:280px" size="small">
                                <Option v-for="item in disposeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                 <h4>完整性</h4>
                  <Row>
                    <Col span="8">
                        <FormItem label="是否校验:" >
                          <Checkbox v-model="formLeft.completeCheck"></Checkbox>
                        </FormItem>
                    </Col>
                     <Col span="8">
                        <FormItem label="缺失值处理:" >
                           <Select v-model="formLeft.lose" style="width:280px" size="small">
                                <Option v-for="item in loseList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                 <h4>及时性</h4>
                  <Row>
                    <Col span="8">
                        <FormItem label="是否校验:" >
                          <Checkbox v-model="formLeft.timeCheck"></Checkbox>
                        </FormItem>
                    </Col>
                </Row>
                 <h4>一致性</h4>
                 <div class="consistency-wrap">
                    <Button type="info" size="small" style="background:#576374" @click="add()">添加</Button>
                    <Button type="info" size="small" style="background:#576374" @click="deleteCon()">删除</Button>
                 </div>
                 <div class="symbol-con">
                     <Row>
                        <Col span="1" style="width:20px">&nbsp;</Col>
                        <Col span="2" style="width:5%">
                        &nbsp;
                            <Select  size="small" placeholder="" v-if="false">
                                <Option >且</Option>
                                <Option >或</Option>
                            </Select>
                        </Col>
                        <Col span="1" style="width:20px">&nbsp;</Col>
                        <Col span="4" >
                            <Input  placeholder="选择测点" size="small" />
                        </Col>
                         <Col span="1" style="width:20px">&nbsp;</Col>
                        <Col span="4" >
                            <Select  size="small">
                                <Option v-for="item in symbolList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>
                        <Col span="1" style="width:20px">&nbsp;</Col>
                        <Col span="1" style="width:20px">
                                <Radio v-model="formLeft.increase" size="small"></Radio>
                        </Col>
                        <Col span="4" >
                           <Input  placeholder="数值" size="small" disabled />
                        </Col>
                         <Col span="1" style="width:20px">&nbsp;</Col>
                        <Col span="1" style="width:20px">
                                <Radio v-model="formLeft.increase" size="small"></Radio>
                        </Col>
                        <Col span="4" >
                           <Input  placeholder="选择测点" size="small" />
                        </Col>
                        <Col span="1" style="width:20px">&nbsp;</Col>
                        <Col span="2" >
                           <Icon type="ios-add-circle" style="font-size:20px;color:rgb(75, 126, 254)" />
                           <Icon type="ios-remove-circle" style="font-size:20px;color:rgb(75, 126, 254);margin-left:8px" />
                        </Col>
                    </Row>
                 </div>
            </Form>
        </div>
    </div>
</template>
<script>
export default {
    name:'detailSetting',
    data (){
        return {
            height : 0,
            formLeft:{
                input1:'',
                input2:'状态信号',
                max:'',
                min:'',
                increase:false,
                principle:false,
                dispose:1,
                completeCheck:false,
                timeCheck:false
            },
            disposeList:[
                {
                    value: '1',
                    label: '前值替换'
                },
                {
                    value: '2',
                    label: '不处理'
                },
            ],
            loseList:[
                {
                    value: '3',
                    label: '前值填充'
                },
                {
                    value: '4',
                    label: '不处理'
                },
            ],
            symbolList :[
                 {
                    value: '==',
                    label: '等于'
                },
                {
                    value: '>',
                    label: '大于'
                },
                {
                    value: '<',
                    label: '小于'
                },
                {
                    value: '>=',
                    label: '大于等于'
                },
                {
                    value: '<=',
                    label: '小于等于'
                },
            ]
            
        }
    },
    mounted (){
        this.height = document.body.clientHeight-80
    },
    methods :{
        save(){

        },
        cancel(){

        }
    }
}
</script>
<style lang="less" scoped>
.user-information{
    margin: 5px;
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
    .con-show{
        background: #fff;
        margin-top: 5px;
        padding: 10px;
        .padding20-14{
            padding:20px 14px;
        }
        .change-mpoint-btn{
            position: absolute;
            right: 0;
            top: 0;
            color: #4b7efe;
        }
        /deep/.ivu-form .ivu-form-item-label{
            font-size: 13px;
        }
        .consistency-wrap{
            text-align: right;
            height: 30px;
            button{
                min-width: 70px;
                margin: 0 5px;
                color: #fff;
                border: 0;
                font-size: 12px;
            }
        }
        .symbol-con{
            /deep/.ivu-row{
                background: #f0f0f0;
                height: 38px;
                line-height: 38px;
            }
        }
       
    }
}
</style>
