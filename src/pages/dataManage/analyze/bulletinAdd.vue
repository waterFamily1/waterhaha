<template>
    <div class="user-information" :style="{height: height+'px'}">
        <div class="user-title">
            <h3>简报数据采集</h3>
            <div>
                <Button type="primary" size="small" style="background:#4b7efe" @click="save()">保存</Button>
                <Button type="primary" size="small" style="background:#c8c8c8" @click="cancel()">取消</Button>
            </div>
        </div>
        <div class="con-show" >
           <div class="search-con">
                <Form ref="formInline" label-position="right" :label-width="100" :model="formInline" :rules="ruleValidate">
                    <Row>
                        <Col span="12">
                            <FormItem label="区域位置：" prop="location">
                                <Select v-model="formInline.location" placeholder="请选择"  style="width:250px">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="简报名称：" prop="name">
                                <Input v-model="formInline.name" placeholder="简报名称："  style="width:250px"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="录入周期：" prop="name">
                        <Select v-model="formInline.duration" placeholder="请选择"  style="width:250px">
                             <Option v-for="item in dateList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                        </Select>
                     </FormItem>
                </Form>
           </div>
           <div class="data-table" :style="{height: (height-80)+'px'}">
               <div class="action-btn">
                   <Button type="info" size="small"  @click="add()">新增</Button>
                   <Button type="info" size="small" @click="channel()">导入</Button>
               </div>
                <Table stripe :columns="columns1" :data="data1" >
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" style="margin-right: 5px;" @click="checkUser(index)">查看</Button>
                        <Button class="action" size="small" @click="remove(index)">删除</Button>
                    </template>
                </Table>
           </div>
        </div>
         <Modal v-model="modal" width="600" class="model-box"> 
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">测点列表选择</span>
            </p>
            <div>
                <div>
                    <input type="text" name="" id="" placeholder="测点编号/名称" style="margin-right:8px;border:1px solid #eaeaea;outline:0;padding-left:10px">
                     <Button type="primary" size="small" @click="search()">搜索</Button>
                </div>
                     <div class="model-table">
                    <Table size="small" ref="selection" :columns="modelColumns" :data="modelData"
                        @on-select="handleSelect"
                        @on-select-cancel="handleSelectCancel"
                        @on-select-all="handleSelectAll"
                        @on-select-all-cancel="handleSelectAllCancel">
                    </Table>
                    <Page :total="100" show-elevator size="small" class="page" style="text-align:right;margin-top:20px"  />
                     <div class="btn-group">
                        <span>取消</span>
                        <span style="background: #4b7efe;">确定</span>
                     </div>
                </div>
            </div>
            <div slot="footer" >
                <!-- <Button type="primary"  long  @click="save" style="font-size:12px">保存为新模版</Button> -->
            </div>
        </Modal>
    </div>
</template>
<script>
  export default {
      name:'bulletinAdd',
      data(){
        return {
            formInline: {
                location: '',
                name:'',
                duration:''
             },
             ruleValidate:{
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                location: [
                    { required: true, message: '请输入名称', trigger: 'change' }
                ],
                 duration: [
                    { required: true, message: '请输入采集周期', trigger: 'blur' }
                ],
             },
            height:0,
            cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                 columns1: [
                    {
                        title: '测点名称',
                        key: 'name'
                    },
                    {
                        title: '文本类型',
                        key: 'type'
                    },
                     {
                        title: '自动填充上次数据',
                        key: 'autofull'
                    },
                    {
                        title: '分组名称',
                        key: 'groupname'
                    },
                    {
                        title: '组序号',
                        key: 'number'
                    },
                    {
                        title: '组内序号',
                        key: 'inlinenumber'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
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
                      name:'季度',
                      value:'quarter'
                    },
                    {
                      name:'年',
                      value:'year'
                    }
                ],
                model1: '',
                modal:false,
                modelColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '测点编号',
                    key: 'number'
                },
                {
                    title: '区域位置',
                    key: 'location'
                },
                {
                    title: '测点名称',
                    key: 'name'
                }
            ],
            modelData: [
                {
                    number: '吴镕譞0',
                    location: '技术部0',
                    name: '易烊千玺老婆团'
                },
                {
                    number: '吴镕譞1',
                    location: '技术部1',
                    name: '易烊千玺老婆团'
                },
                {
                    number: '吴镕譞2',
                    location: '技术部2',
                    name: '易烊千玺老婆团'
                }
            ],
        }
      },
      mounted() {
        this.height = document.body.clientHeight-70
    },
    methods: {
       add(){
           this.modal=true
       }
    }
  }
</script>
<style lang="less" scoped>
/deep/.ivu-modal-header{
    padding: 0;
    border-bottom: 0;
}
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
        // background: #fff;
        margin-top: 5px;
        // padding: 10px;
        .search-con{
            background: #fff;
            padding-top: 10px;
        }
        .ivu-form-item{
            margin-bottom: 24px;
            display: inline-block;
            .ivu-input{
                width: 350px;
            }
        }
        .data-table{
            background: #fff;
            margin-top: 5px;
            padding:10px;
            .action-btn{
                 margin-bottom: 10px;
                button{
                    background: #576374;
                    font-size: 12px;
                    box-shadow: 0;
                    margin-right: 8px;
                }
            }
        }
    }
}
.model-table{
    margin-top: 20px;
    .btn-group{
        margin-top: 20px;
        text-align:center;
        span{
            display: inline-block;
            min-width: 130px;
            margin: 0 15px;
            padding: 4px 12px;
            font-size: 12px;
            background: #c8c8c8;
            color: #fff;
            border-radius: 3px;
        }
    }
}
input::-webkit-input-placeholder{
        color:#999;
        font-size: 13px;
    }
</style>
