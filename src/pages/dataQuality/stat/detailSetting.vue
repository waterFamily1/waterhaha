<template>
    <div class="user-information" :style="{height: height+'px'}">
        <div class="user-title">
            <h3>测点数据质量详情</h3>
            <div>
                <Button type="info" size="small" style="background:#4b7efe" @click="save()">保存</Button>
                <Button type="info" size="small" style="background:#c8c8c8" @click="back()">取消</Button>
            </div>
        </div>
        <div class="con-show padding20-14" :style="{height: (height-45)+'px'}">
            <Form :model="formLeft" label-position="right" :label-width="130">
                <Row>
                    <Col span="8">
                        <FormItem label="测点名称:" style="position:relative">
                            <span>{{currentMpoint.mpointName}}</span>
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
                <div v-if="haveAccuracy">
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
                </div>
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
                    <Row :gutter="20" >
                        <Col span="1" style="width:20px">&nbsp;</Col>
                        <Col span="2" style="width:5%">
                        &nbsp;
                            <Select  size="small" placeholder="" v-if="false">
                                <Option >且</Option>
                                <Option >或</Option>
                            </Select>
                        </Col>
                        <Col span="4" >
                            <Input  placeholder="选择测点" size="small" />
                        </Col>
                        <Col span="4" >
                            <Select  size="small">
                                <!-- <Option v-for="item in symbolList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
                            </Select>
                        </Col>
                        <Col span="1" style="width:20px">
                            <Radio v-model="formLeft.increase" size="small"></Radio>
                        </Col>
                        <Col span="4" >
                            <Input  placeholder="数值" size="small" disabled />
                        </Col>
                        <Col span="1" style="width:20px">
                            <Radio v-model="formLeft.increase" size="small"></Radio>
                        </Col>
                        <Col span="4" >
                            <Input  placeholder="选择测点" size="small" />
                        </Col>
                        <Col span="2" >
                            <Icon type="ios-add-circle" style="font-size:20px;color:rgb(75, 126, 254)" />
                            <Icon type="ios-remove-circle" style="font-size:20px;color:rgb(75, 126, 254);margin-left:8px" />
                        </Col>
                    </Row>
                    <Row :gutter="20" >
                        <Col span="1" style="width:20px">&nbsp;</Col>
                        <Col span="2" style="width:5%;padding:0">
                            <Select  size="small" placeholder="" >
                                <Option >且</Option>
                                <Option >或</Option>
                            </Select>
                        </Col>
                        <Col span="4" >
                            <Input  placeholder="选择测点" size="small" />
                        </Col>
                        <Col span="4" >
                            <Select  size="small">
                                <Option v-for="item in symbolList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>
                        <Col span="1" style="width:20px">
                            <Radio v-model="formLeft.increase" size="small"></Radio>
                        </Col>
                        <Col span="4" >
                            <Input  placeholder="数值" size="small" disabled />
                        </Col>
                        <Col span="1" style="width:20px">
                            <Radio v-model="formLeft.increase" size="small"></Radio>
                        </Col>
                        <Col span="4" >
                            <Input  placeholder="选择测点" size="small" />
                        </Col>
                        <Col span="2" >
                            <Icon type="ios-add-circle" style="font-size:20px;color:rgb(75, 126, 254)" />
                            <Icon type="ios-remove-circle" style="font-size:20px;color:rgb(75, 126, 254);margin-left:8px" />
                        </Col>
                    </Row>
                 </div>
            </Form>
        </div>
          <!-- 测点更换 -->
        <Modal
            v-model="modal"
            title="测点更换"
            width="600" footer-hide>
            <div class="model-box">
                <div class="model-search">
                    <div>
                        <div class="search-item">
                            <label>关键字：</label>
                            <Input v-model="modalKeyword" placeholder="用户名称/手机号" size="small" style="width: 150px" />
                        </div>
                        <div class="search-item">
                            <label>结构组织：</label>
                            <TreeSelect v-model="siteValue" size="small" multiple  :data="areaData" v-width="180" />
                        </div>
                        <div class="search-btn">
                            <Button size="small" @click="searchData()">搜索</Button>
                            <Button size="small" class="reset" @click="resetData()">重置</Button>
                        </div>
                    </div>
                </div>
                <div class="model-table">
                    <Table size="small" ref="selection" :columns="modelColumns" :data="modelData">
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <Icon type="ios-checkmark-circle" style="font-size:22px;color:#999" @click="checkSite(row,index)" />
                        </template>
                    </Table>
                    <Page :total="modelTotal" size="small" show-total show-elevator class="modalPage" @on-change="modelChange" />
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>

import { regionalCon,changeTableData,modelData} from '@api/dataQuality/sample';
import createTree from '@/libs/public-util'
export default {
    name:'detailSetting',
    data (){
        return {
            height : 0,
            modalKeyword:'',
            siteValue:[],
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
            ],
            condition:[1,2],
            modal:false,
            modelColumns: [
                {
                    title: '测点编号',
                    key: 'mpointId'
                },
                {
                    title: '区域位置',
                    key: 'siteName'
                },
                {
                    title: '测点名称',
                    key: 'mpointName'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            modelData: [],
            modelTotal:0,
            haveAccuracy:false,
            areaData:[],
            currentMpoint:{}
        }
    },
    mounted (){
        this.height = document.body.clientHeight-80
        this.getRegional()
        this.getTable('',1,1,'AUTO')
    },
    methods :{
        save(){

        },
        cancel(){

        },
        back(){
          this.$router.go(-1)
        },
        change(){
            this.modal = true
        },
        searchData(){
            console.log(this.siteValue)
            this.getModelData(this.modalKeyword,this.siteValue.join(','),1,1,'AUTO')
        },
        resetData(){
            this.modalKeyword = ''
            this.siteValue = []
        },
        getRegional() {
            regionalCon().then(res => {
                // console.log(JOSN.stringify(res.data))
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].expand = true
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.baseData = treeItem
                this.areaData= createTree(treeItem)
            }).catch(err => {
                // 异常情况
            })
        },
        getTable(queryName,page,confDataQuality,datasource){
            changeTableData(queryName,page,confDataQuality,datasource).then(res=>{
                console.log(res)
                 if(res.data){
                    this.modelData = res.data.items
                    this.modelTotal = res.data.total
                }
            })
        },
        getModelData(queryName,siteId,page,confDataQuality,datasource){
            modelData(queryName,siteId,page,confDataQuality,datasource).then(res=>{
              console.log(res)
                if(res.data){
                    this.modelData = res.data.items
                    this.modelTotal = res.data.total
                }
            })
        },
        checkSite(row,index){
            console.log(row)
            this.currentMpoint = row
            this.haveAccuracy = true
            this.modal = false
        },
        modelChange(size){
            this.getTable('',size,1,'AUTO')
        }
    }
}
</script>
<style lang="less" scoped>
.user-information{
    margin: 5px;
    overflow:scroll;
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
            margin-left: 60px;
            /deep/.ivu-row{
                background: #f0f0f0;
                height: 38px;
                width: 100%;
                padding: 5px 0;
            }
        }
       
    }
}
.model-box {
    .model-search {
        .search-item {
            display: inline-block;
            label {
                font-size: 13px;
                margin-left: 10px;
            }
            /deep/.ivu-input,
            /deep/.ivu-select {
                font-size: 13px;
            }
        }
        .search-btn {
            display: inline-block;
            float: right;
            /deep/.ivu-btn {
                height: auto;
                font-size: 12px;
                background: #838A95;
                color: #fff;
                margin-right: 10px;
                border-radius: 1px;
                padding: 2px 0;
                width: 40px;
                box-sizing: border-box;
                text-align: center;
            }
            .reset {
                background: #aaafb8;
            }
        }
        .tabel-num {
            text-align: right;
            font-size: 13px;
            color: #999;
            line-height: 30px;
            margin-top: 10px;
            /deep/.ivu-btn {
                font-size: 12px;
                background: #57a3f3;
                color: #fff;
            }
        }
    }
    .model-table {
        margin-top: 10px;
    }
}
/deep/.ivu-modal-footer {
    /deep/.ivu-btn-text {
        border: 1px solid #dcdee2;
    }
}
.modalPage {
    text-align: right;
    margin: 10px 0 0;
}
.action-btn{
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
</style>
