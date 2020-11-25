<template>
   <div class="c-main-border" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>设备详情</h3>
            <div class="c-btns-right">
                <Button><span>保存</span></Button>
                <Button class="cancel"><span>取消</span></Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <div class="c-form-common">
                <div class="c-title-css">基础信息</div>
                <div class="form-content">
                    <div class="equ-edit-left">
                        <div class="equ-edit-img"> 
                            <img src="http://chaoying.tjdeht.cn:8803/group1/M00/00/C6/wKgyr19EzmmAXwYVAAEOTz1qhuA14.jpeg" alt="">
                        </div>
                        <div class="equ-edit-upload">
                            <Button>上传图片</Button>
                        </div>
                    </div>
                    
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" class="form-module">
                        <Row>
                            <Col span="12">
                                <FormItem label="设备名称:" prop="name">
                                    <Select v-model="formValidate.name" placeholder="请选择" style="width:200px" size="small">
                                        <Option value="beijing">New York</Option>
                                        <Option value="shanghai">London</Option>
                                        <Option value="shenzhen">Sydney</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="设备类型:" prop="">
                                    <a href="javascript:;" class="c-btn-text">[选择]</a>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="设备编号:" prop="number">
                                    <Input v-model="formValidate.number" placeholder="请输入测点名称" style="width:200px"></Input>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="区域位置:" prop="location">
                                    <Select v-model="formValidate.location" placeholder="请选择" style="width:200px" size="small">
                                        <Option value="beijing">New York</Option>
                                        <Option value="shanghai">London</Option>
                                        <Option value="shenzhen">Sydney</Option>
                                    </Select>
                                </FormItem>
                            </Col>  
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="资产状态:" prop="state">
                                        <Select v-model="formValidate.state" placeholder="请选择" style="width:200px" size="small">
                                        <Option value="beijing"> 启用</Option>
                                        <Option value="shanghai">封存</Option>
                                        <Option value="shenzhen">报废</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="ABC类:" prop="location">
                                    <Select v-model="formValidate.location" placeholder="请选择" style="width:200px" size="small">
                                        <Option value="beijing">A</Option>
                                        <Option value="shanghai">B</Option>
                                        <Option value="shenzhen">C</Option>
                                    </Select>
                                </FormItem>
                            </Col>  
                        </Row>
                            <Row>
                            <Col span="12">
                                <FormItem label="所属组织:" prop="tissue">
                                        <Select v-model="formValidate.tissue" placeholder="请选择" style="width:200px" size="small">
                                        <Option value="beijing"> 启用</Option>
                                        <Option value="shanghai">封存</Option>
                                        <Option value="shenzhen">报废</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="责任人:" prop="person">
                                    <Select v-model="formValidate.person" placeholder="请选择" style="width:200px" size="small">
                                        <Option value="beijing">A</Option>
                                        <Option value="shanghai">B</Option>
                                        <Option value="shenzhen">C</Option>
                                    </Select>
                                </FormItem>
                            </Col>  
                        </Row>
                    </Form>
                    <div class="equ-edit-right">
                        <a href="javascript:;" class="equ-add-icon-ar">
                        </a>
                    </div>
                    
                </div>
            </div>
            <div class="ivu-tabs"></div>
        </div>
        <div class="c-top-border-gray">
            <Tabs value="name1" :animated="false">
                <TabPane label="附属信息" name="name1">
                    <div class="equ-attach-info">
                        <form action="">
                            <h3 class="c-gray-bg-h">设备信息</h3>
                            <div class="c-form-item">
                                <Row>
                                    <Col span="12">
                                        <label for="">设备型号：</label>
                                        <input type="text">
                                    </Col>
                                    <Col span="12">
                                       <label for="">规格：</label>
                                        <input type="text">
                                    </Col>
                                </Row>
                            </div>
                             <div class="c-form-item">
                                <Row>
                                    <Col span="12">
                                        <label for="">品牌：</label>
                                        <input type="text" >
                                    </Col>
                                    <Col span="12">
                                       <label for="">安装位置：</label>
                                        <input type="text">
                                    </Col>
                                </Row>
                            </div>
                             <div class="c-form-item">
                                <Row>
                                    <Col span="12">
                                        <label for="">安装日期：</label>
                                       <DatePicker type="date" placeholder="安装日期" style="width: 186px"></DatePicker>
                                    </Col>
                                </Row>
                            </div>
                        </form>
                        <form action="">
                            <h3 class="c-gray-bg-h">厂家信息</h3>
                            <div class="c-form-item">
                                <Row>
                                    <Col span="12">
                                        <label for="">供应商名称：</label>
                                        <input type="text">
                                    </Col>
                                    <Col span="12">
                                       <label for="">生产厂家：</label>
                                        <input type="text">
                                    </Col>
                                </Row>
                            </div>
                             <div class="c-form-item">
                                <Row>
                                    <Col span="12">
                                        <label for="">出厂日期：</label>
                                        <DatePicker type="date" placeholder="出厂日期" style="width: 186px"></DatePicker>
                                        
                                    </Col>
                                    <Col span="12">
                                       <label for="">出场编号：</label>
                                        <input type="text">
                                    </Col>
                                </Row>
                            </div>
                             <div class="c-form-item">
                                <Row>
                                    <Col span="12">
                                        <label for="">保修期限(年)：</label>
                                       <input type="text" >
                                    </Col>
                                </Row>
                            </div>
                        </form>
                    </div>
                </TabPane>
                <TabPane label="原厂附件" name="name2">标签二的内容</TabPane>
                <TabPane label="相关资料" name="name3">标签三的内容</TabPane>
                <TabPane label="设备参数" name="name4">标签三的内容</TabPane>
                <TabPane label="上级设备" name="name5">标签三的内容</TabPane>
                <TabPane label="相关测点" name="name6">标签三的内容</TabPane>
            </Tabs>
        </div>
   </div>
</template>
<script>
export default {
    name:'addBook',
    data(){
      return {
        height: 0,
        dateList:[
            {
                name:'天',
                value:'day'
            },
            {
                name:'周',
                value:'week'
            },
            {
                name:'月',
                value:'month'
            },
            {
                name:'年',
                value:'year'
            }
        ],
        formValidate: {
            location:'',
            name:"",
            category:""
        },
        ruleValidate: {
            location: [
                { required: true, message: 'Please select the city', trigger: 'change' }
            ],
            name: [
                { required: true, message: '', trigger: 'blur' }
            ],
        }
      }
    },
    mounted() {
        this.height = document.body.clientHeight-46
    },
}
</script>
<style lang="less" scoped>
/deep/.ivu-form .ivu-form-item-label{
  font-size:13px;
}
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
            /deep/.ivu-btn {
                height: auto;
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
                display: flex;
                .equ-edit-left{
                    width: 130px;
                    .equ-edit-img{
                        width: 130px;
                        height: 150px;
                        text-align: center;
                        display: table-cell;
                        vertical-align: middle;
                        img{
                            width: 130px;
                            height: 150px;
                            max-width: 130px;
                            max-height: 150px;
                            margin-top: 10px;
                        }
                    }
                    .equ-edit-upload{
                        text-align: center;
                        margin-top: 20px;
                        /deep/.ivu-btn {
                            height: auto;
                            background: #576374;
                            font-size: 12px;
                            padding: 4px 0;
                            min-width: 70px;
                            text-align: center;
                            color: #fff;
                            border: 0;
                            border-radius: 3px;
                            margin: 0 5px;
                        }
                    }
                }
                
                .form-module{
                    width:800px;
                    height: 177px;
                    display: inline-block;
                    .ivu-form-item{
                        margin-bottom: 12px;
                    }
                    .c-btn-text{
                        color: #5c51fd;
                        margin-left: 10px;
                        text-decoration: underline;
                    }
                    label{
                        display: inline-block;
                        width: 130px;
                        line-height: 1;
                        text-align: right;
                        padding:10px 12px 10px 0;
                        font-size: 13px;
                    }
                    .form-line{
                        display: inline-block;
                    }
                }
                .equ-edit-right{
                    position: absolute;
                    right: 30px;
                    .equ-add-icon-ar{
                        display: block;
                        width: 30px;
                        height: 30px;
                        background: url(../../assets/images/AR.png) no-repeat 0 0;
                        margin: 30px;
                    }
                }
                
            }
        }
        .equ-attach-info{
            .c-gray-bg-h{
                background-color: #f4f4f4;
                height: 30px;
                line-height: 30px;
                text-indent: 20px;
                font-weight: 100;
                font-size: 13px;
            }
            .c-form-item{
                margin-top: 20px;
                label{
                    display: inline-block;
                    width: 100px;
                    text-align: right;
                    font-size: 13px;
                    color: #495060;
                    line-height: 1;
                    padding: 10px 12px 10px 0;
                    box-sizing: border-box;
                }
                input{
                    height: 28px;
                    line-height: 28px;
                    border: 1px solid #eaeaea;
                    color: #495060;
                    width: 208px;
                }
            }
        }
    }
}

</style>