<template>
   <div class="c-main-border" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>自动采集型测点详情</h3>
            <div class="c-btns-right">
                <button type="button" ><span>保存</span></button>
                <button type="button" class="cancel"><span>取消</span></button>
            </div>
        </div>
        <div class="c-top-border-gray" >
                <div class="c-form-common">
                    <div class="c-title-css">基础信息</div>
                    <div class="form-content">
                       <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="130">
                           <Row>
                                <Col span="12">
                                    <FormItem label="区域位置:" prop="location">
                                        <Select v-model="formValidate.location" placeholder="请选择" style="width:300px">
                                            <Option value="beijing">New York</Option>
                                            <Option value="shanghai">London</Option>
                                            <Option value="shenzhen">Sydney</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="测点名称:" prop="name">
                                         <Input v-model="formValidate.name" placeholder="请输入测点名称" style="width:300px"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                             <Row>
                                <Col span="12">
                                    <FormItem label="测点类别:" prop="category">
                                        <Select v-model="formValidate.category" placeholder="请选择" style="width:300px">
                                            <Option value="beijing">工艺测点</Option>
                                            <Option value="shanghai">设备测点</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="数据分类:" prop="dataClassification">
                                         <Input v-model="formValidate.name" placeholder="请输入测点名称" style="width:300px"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <FormItem label="信号类型:" prop="signalType">
                                        <Select v-model="formValidate.signalType" placeholder="请选择" style="width:300px">
                                            <Option value="beijing">状态信号</Option>
                                            <Option value="shanghai">数值信号</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="显示小数位:" prop="digit">
                                        <Select v-model="formValidate.digit" placeholder="请选择" style="width:300px">
                                            <Option value="beijing">0</Option>
                                            <Option value="shanghai">1</Option>
                                            <Option value="shanghai">2</Option>
                                            <Option value="shanghai">3</Option>
                                            <Option value="shanghai">4</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                             <Row>
                                <Col span="12">
                                    <FormItem label="单位:" prop="unit">
                                        <Select v-model="formValidate.unit" placeholder="请选择" style="width:300px">
                                            <Option value="beijing">无</Option>
                                            <Option value="shanghai">自定义</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="点位:" prop="PT">
                                         <Input v-model="formValidate.PT" placeholder="请输入点位" style="width:300px"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <FormItem label="所属设备:" prop="unit">
                                        <a href="javascript:;" style="color:#5c51fd;margin-left:10px">[选择设备]</a><a href="javascript:;" style="color:#5c51fd;margin-left:10px">[清除]</a>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="曲线Y轴量程:" prop="Y">
                                         <Input v-model="formValidate.Ymin" placeholder="最小值" style="width:80px"></Input>-
                                         <Input v-model="formValidate.Ymax" placeholder="最大值" style="width:80px"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <FormItem label="备注:" prop="remark">
                                       <textarea name="" id="" cols="30" rows="2" style="height: 94px; min-height: 94px; max-height: 115px;border-color:#eaeaea"></textarea>
                                    </FormItem>
                                </Col>
                                
                            </Row>
                        </form>
                    </div>
                </div>
                <div class="ivu-tabs">
                    <div class="tabs-title">
                      <span>
                          测点设置
                      </span>
                    </div>
                    <div class="tabs-content">
                        <div style="margin-top:16px;padding-left:20px">
                            <label for="" class="label">读写设置:</label>
                            <RadioGroup v-model="vertical" vertical style="margin-left:20px" >
                                <Radio label="reading">
                                    <Icon type="social-apple"></Icon>
                                    <span>只读</span>
                                </Radio>
                                <Radio label="readWrite">
                                    <Icon type="social-android"></Icon>
                                    <span>读写</span>
                                </Radio>
                            </RadioGroup>
                            <div class="jurisdiction">
                                <span>权限：</span>
                                    <Select v-model="model10" multiple style="width:260px" size="small">
                                    <Option v-for="item in jurisdictionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </div>
                        </div>
                        <div style="margin-top:20px;padding-left:20px">
                            <label for="" class="label">推送设置:</label>
                            <RadioGroup v-model="vertical" vertical style="margin-left:20px" @on-change="chooseSetting">
                                <Radio label="change" value="0">
                                    <Icon type="social-apple"></Icon>
                                    <span>变化</span>
                                </Radio>
                                <Radio label="duration" value="1">
                                    <Icon type="social-android"></Icon>
                                    <span>周期</span>
                                </Radio>
                            </RadioGroup>
                            <div class="set-content">
                                <div><InputNumber :max="10" :min="1" v-model="value1"  :disabled="disabled1"></InputNumber></div>
                                <div style="margin-top:6px"><InputNumber :max="10" :min="1" v-model="value2"  :disabled="disabled2"></InputNumber>秒</div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
   </div>
</template>
<script>
export default {
    name:'addAutomatic',
    data(){
      return {
        value1:"",
        value2:'',
        disabled1: true,
        disabled2: true,
        height:0,
        formValidate: {
            location:'',
            name:"",
            category:"",
            signalType:"",
            PT:"",
            unit:"",
            Ymin:"",
            Ymax:'',
            remark:""
        },
        jurisdictionList:[
            {label:'superuser',value:'0'},
            {label:'运营专员',value:'1'},
            {label:'生产运营组长',value:'2'}
        ],
        ruleValidate: {
            location: [
                { required: true, message: '请选择区域位置', trigger: 'change' }
            ],
            name: [
                { required: true, message: '请输入测点名称', trigger: 'blur' }
            ],
            category: [
                 { required: true, message: '请选择测点类别', trigger: 'change' }
            ],
            signalType: [
                 { required: true, message: '请选择信号类型', trigger: 'change' }
            ],
            PT: [
                { required: true, message: '请输入点位', trigger: 'blur' }
            ],
        }
      }
    },
    mounted() {
        this.height = document.body.clientHeight-64
    },
    mothods:{
        chooseSetting(value){
          console.log(value)
        }
    }
}
</script>
<style lang="less" scoped>
.c-main-border{
    border: 5px solid #f0f0f0;
    background: #fff;
    overflow: auto;
    .c-left-border-blue{
       padding: 5px;
       h3{
        display: inline-block;
        height: 30px;
        line-height: 30px;
        text-indent: 10px;
       }
       .c-btns-right{
           float: right;
           margin-top: 2px;
           button{
                background: #4b7efe;
                font-size: 12px;
                padding: 4px 0;
                min-width: 70px;
                text-align: center;
                color: #fff;
                border: 0;
                border-radius: 3px;
                margin: 0 5px;
           }
           .cancel{
               background: #c8c8c8;
           }
       }
    }
    .c-top-border-gray{
        border-top: 5px solid #f0f0f0;
        padding: 20px 14px;
        .c-form-common{
            .c-title-css{
                height: 40px;
                line-height: 40px;
                background: #f4f4f4;
                font-size: 14px;
                color: #333;
                padding: 0 16px;
            }
            .form-content{
                padding-top: 20px;
                label{
                    display: inline-block;
                    width: 130px;
                    line-height: 1;
                    text-align: right;
                    padding:10px 12px 10px 0;
                }
                .form-line{
                    display: inline-block;
                }
            }
        }
        .ivu-tabs{
            .tabs-title{
                border-bottom: 1px solid #e8e8e8;
                span{
                    display: inline-block;
                    padding:8px 16px ;
                    color: #4b7efe;
                    margin-right: 16px;
                    border-bottom: 2px solid #4b7efe;
                }
            }
            .tabs-content{
                .label{
                    display: inline-block;
                    width: 130px;
                    text-align: right;
                }
                .jurisdiction{
                    display: inline-block;
                    vertical-align: top;
                    margin-left: 30px;
                    select{
                        display: inline-block;
                    }
                }
                .set-content{
                    display: inline-block;
                    margin-left: 30px;
                    vertical-align: middle;
                }
            }
        }
    }
}

</style>