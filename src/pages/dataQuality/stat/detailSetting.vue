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
                             <span>{{currentMpoint.datype=='Digtal'?'数值信号':'状态信号'}}</span>
                        </FormItem>
                    </Col>
                </Row>
                <h4>准确性</h4>
                <div v-if="currentMpoint.datype=='Digtal'">
                    <Row>
                        <Col span="8">
                            <FormItem label="合理范围:" >
                            <InputNumber  v-model="formLeft.min" style="width:80px" size="small" @on-change="rangeminChange"></InputNumber>
                            -
                            <InputNumber  v-model="formLeft.max" style="width:80px" size="small"  @on-change="rangemaxChange"></InputNumber>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="单调递增:" >
                                <Radio v-model="formLeft.increase" @on-change="changeIncrease"></Radio>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <FormItem label="3σ原则:" >
                            <Checkbox v-model="formLeft.sigma" @on-change="sigmaChange"></Checkbox>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <FormItem label="箱型图:" >
                            <Checkbox v-model="formLeft.principle" @on-change="boxChange"></Checkbox>
                            </FormItem>
                        </Col>
                    </Row>
                    </div>
                    <div v-else>
                        
                        <Row>
                            <Col span="8">
                                <FormItem label="是否校验:" >
                                  <Checkbox v-model="formLeft.enumCheck" @on-change="enumChange"></Checkbox>
                                </FormItem>
                            </Col>
                        </Row>
                         <Row>
                            <Col span="8">
                            <div style="margin-left:60px;margin-bottom:24px">
                                <Icon type="ios-information-circle" style="color:rgb(75, 126, 254);font-size:20px" /> 使用测点状态值校验   
                            </div>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col span="8">
                            <FormItem label="异常值处理:" >
                            <Select v-model="formLeft.dispose" style="width:280px" size="small" :disabled="disposeDisabled">
                                    <Option v-for="(item,index) in disposeList" :value="index" :key="index">{{ item}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                
                 <h4>完整性</h4>
                  <Row>
                    <Col span="8">
                        <FormItem label="是否校验:" >
                          <Checkbox v-model="formLeft.completeCheck" @on-change="completeChange"></Checkbox>
                        </FormItem>
                    </Col>
                     <Col span="8">
                        <FormItem label="缺失值处理:" >
                           <Select v-model="formLeft.lose"  style="width:280px" size="small" :disabled="loseDisabled">
                                <Option v-for="(item,index) in loseList" :value="index" :key="index">{{ item }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                 <h4>及时性</h4>
                  <Row>
                    <Col span="8">
                        <FormItem label="是否校验:" >
                          <Checkbox v-model="formLeft.timeCheck" ></Checkbox>
                        </FormItem>
                    </Col>
                </Row>
                 <h4>一致性</h4>
                 <div class="consistency-wrap">
                    <Button type="info" size="small" style="background:#576374" @click="add()">添加</Button>
                    <Button type="info" size="small" style="background:#576374" @click="deleteCon()">删除</Button>
                 </div>
                 <div class="symbol-con">
                    <div  v-for="(item ,index) in symbolArr" :key="index" >
                         <div @click="getOutIndex(index)" v-if="index!=0"  style="width:7%;margin:20px 0">
                            <Select  size="small" placeholder="" @on-change="chooseOutSymbol"  v-model="item.outSymbol"  >
                                <Option value="&&">且</Option>
                                <Option value="||">或</Option>
                            </Select>
                        </div>
                        <div>
                            <Row :gutter="20" v-for="(ele,idx) in item.listItem" :key="idx">
                                <Col span="1" style="width:20px">&nbsp;</Col>
                                <Col span="2" style="width:7%">
                                    <span v-if="idx==0">&nbsp;</span>
                                    <div @click="getIndex(index,idx)" v-else>
                                        <Select  size="small" placeholder="" @on-change="chooseRelative"  v-model="ele.relation"  >
                                            <Option value="&&">且</Option>
                                            <Option value="||">或</Option>
                                        </Select>
                                    </div>
                                    
                                </Col>
                                <Col span="4" >
                                    <div  @click="getPre(index,idx)" > 
                                        <Input  placeholder="选择测点" size="small" v-model="ele.preItem" />
                                    </div>
                                </Col>
                                <Col span="4" >
                                    <div @click="getIndex(index,idx)">
                                        <Select  size="small" v-model="ele.symbol"  @on-change="chooseSymbol">
                                            <Option v-for="item in symbolList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </div>
                                    
                                </Col>
                                <Col span="1" style="width:20px">
                                    <Radio v-model="ele.numBollean" size="small" @on-change="chooseData" ></Radio>
                                </Col>
                                <Col span="4" >
                                   <div @click="getIndex(index,idx)">
                                        <Input  placeholder="数值" size="small" :disabled="ele.dataDisabled" :value="ele.num" v-model="ele.num"  />
                                   </div>
                                   
                                </Col>
                                <Col span="1" style="width:20px">
                                    <Radio v-model="ele.siteBollean" size="small" :value="ele.site" @on-change="chooseNextSite"></Radio>
                                </Col>
                                <Col span="4" >
                                    <div @click="getNext(index,idx)" >
                                        <Input  placeholder="选择测点" size="small" v-model="ele.nextItem" :disabled="ele.siteDisabled"/>
                                    </div>   
                                </Col>
                                <Col span="2" >
                                    <Icon type="ios-add-circle" style="font-size:20px;color:rgb(75, 126, 254)"  @click="addPlus(index)"/>
                                    <Icon type="ios-remove-circle" style="font-size:20px;color:rgb(75, 126, 254);margin-left:8px" @click="removeMinus(index,idx)" />
                                </Col>
                            </Row>
                        </div>  
                        
                    </div>
                    
                    
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

import { regionalCon,changeTableData,modelData,cateValue,getDetail,settingSample} from '@api/dataQuality/sample';
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
                sigma:false,
                dispose:'',
                lose:'',
                completeCheck:false,
                timeCheck:false,
                enumCheck:false
            },
            disposeList:[],
            loseList:[],
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
            areaData:[],
            currentMpoint:{},
            testId:'',
            disposeDisabled:true,
            loseDisabled:true,
            symbolArr :[],
            preItem:'',
            chooseSite:[],
            curIndex:0,
            curIdx:0,
            
            textValue:'',
            pre:false,
            next :false,
            dataNum:'',
            changeTest:false
        }
    },
    mounted (){
        this.height = document.body.clientHeight-80
        this.testId = this.$route.query.id
        this.getRegional()
        this.getTable('',1,1,'AUTO')
        this.getDetail()
        this.getOption('outerlier')
        this.getOption('missing')
    },
    methods :{
        save(){
            let arr = this.symbolArr
            console.log(arr)
            let str = ""
            arr.forEach(ele=>{
                let itemRela = ''
                ele.listItem.forEach((item,index)=>{
                    let numOrSite = item.num?item.num: "("+item.site+")";
                    let a = "("+item.pre+")" + item.symbol+numOrSite
                    if(index == 0) item.relation = ''
                    itemRela+=item.relation+a
                })
                 str+=ele.outSymbol+"("+itemRela+")"
            })
            let data = {
                boxPlot: this.formLeft.principle?1:'',
                completeness: this.formLeft.completeCheck?1:'',
                consistency: str,
                datype: this.currentMpoint.datype,
                enumCheck: this.formLeft.enumCheck?1:'',
                id: this.currentMpoint.id,
                increase: this.formLeft.increase?1:'',
                lowerRange: this.formLeft.min,
                missingProcess: this.formLeft.lose,
                missingProcessText: null,
                mpointId: this.currentMpoint.mpointId,
                mpointName: this.currentMpoint.mpointName,
                mpoints: null,
                outlierProcess: this.formLeft.dispose,
                outlierProcessText: null,
                point: null,
                sigma3: this.formLeft.sigma?1:'',
                siteId: 1,
                timeliness: this.formLeft.timeCheck?1:'',
                upperRange: this.formLeft.max,
            }
            settingSample(data).then(res=>{
                if(res.data.count){
                    this.$Message.success('数据保存成功');
                    this.$router.go(-1)
                }
            })
        },
        cancel(){

        },
        back(){
          this.$router.go(-1)
        },
        change(){
            this.modal = true
            this.changeTest = true
        },
        searchData(){
            this.getModelData(this.modalKeyword,this.siteValue.join(','),1,1,'AUTO')
        },
        resetData(){
            this.modalKeyword = ''
            this.siteValue = []
        },
        getRegional() {
            regionalCon().then(res => {
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
        async getTable(queryName,page,confDataQuality,datasource){
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
            //   console.log(res)
                if(res.data){
                    this.modelData = res.data.items
                    this.modelTotal = res.data.total
                }
            })
        },
        checkSite(row,index){
            if(this.changeTest){
                this.currentMpoint = row
            }else{
                this.chooseSite = row
            }
            this.modal = false
            if(this.pre){
                this.symbolArr[this.curIndex].listItem[this.curIdx].preItem = this.chooseSite.mpointName
                this.symbolArr[this.curIndex].listItem[this.curIdx].pre = this.chooseSite.id
            }else{
                this.symbolArr[this.curIndex].listItem[this.curIdx].nextItem = this.chooseSite.mpointName
                this.symbolArr[this.curIndex].listItem[this.curIdx].site = this.chooseSite.id 
            }
            
        },
        modelChange(size){
            this.getTable('',size,1,'AUTO')
        },
        async getDetail(){
            getDetail(this.testId).then(res=>{
                this.currentMpoint = res.data
                this.formLeft = {
                    min : res.data.lowerRange,
                    max : res.data.upperRange,
                    increase:res.data.increase==1?true:false,
                    principle :res.data.boxPlot==1?true:false, 
                    completeCheck :res.data.completeness ==1 ?true:false,
                    lose: res.data.missingProcess,
                    dispose: res.data.outlierProcess,
                    sigma :res.data.sigma3 == 1?true:false,
                    timeCheck :res.data.timeliness==1?true:false,
                    enumCheck: res.data.enumCheck == 1?true:false
                }
                this.loseDisabled = res.data.completeness ==1 ?false:true
                this.disposeDisabled = res.data.outlierProcess ?false:true
                let consistency = res.data.consistency
                let mpoints = res.data.mpoints
                let symbolSplit = consistency.match(/\&\&\(\(|\|\|\(\(/g)
                symbolSplit.unshift('')
                for(let m=0;m<symbolSplit.length;m++){
                    this.symbolArr.push({
                        listItem:[],
                        outSymbol:""
                    })
                    if(m==0){
                        this.symbolArr[m].outSymbol = ""
                    } else{
                        this.symbolArr[m].outSymbol = symbolSplit[m].slice(0,2)
                    }
                }
                let arr = consistency.split(/\&\&\(\(|\|\|\(\(/) ;
                for(let i=0;i<arr.length;i++){
                    let inlineRel = arr[i].match(/\|\||&&/g)
                    if(inlineRel){
                       inlineRel.unshift("")
                    }
                    let child = arr[i].split(/\|\||&&/)
                    for(let j=0;j<child.length;j++){ 
                        this.symbolArr[i].listItem.push({
                            pre:'',
                            preItem:'',
                            symbol:'',
                            numBollean:false,
                            num:'',
                            site:'',
                            nextItem:'',
                            siteBollean:false,
                            dataDisabled:true,
                            siteDisabled:true,
                            relation:''
                        })
                        this.symbolArr[i].listItem[j].relation = inlineRel?inlineRel[j]:''
                       this.symbolArr[i].listItem[j].symbol = child[j].match(/==|>=|<=|>|</)[0]
                       let inlineItem = child[j].split(/==|>=|<=|>|</)
                       this.symbolArr[i].listItem[j].pre = inlineItem[0]
                       let preId=inlineItem[0].replace("((",'').replace('(','').replace(")",'')
                       this.symbolArr[i].listItem[j].pre = preId
                       this.symbolArr[i].listItem[j].preItem = mpoints[preId] 
                       if(inlineItem[1].indexOf("(")!=-1){
                           let id = inlineItem[1].replace(')','').replace('(','')
                           this.symbolArr[i].listItem[j].site = id
                           this.symbolArr[i].listItem[j].nextItem = mpoints[id]
                           this.symbolArr[i].listItem[j].siteBollean = true
                            this.symbolArr[i].listItem[j].siteDisabled =false
                       }else{
                           let num = inlineItem[1].replace(')','')
                           this.symbolArr[i].listItem[j].num = num
                           this.symbolArr[i].listItem[j].numBollean = true
                           this.symbolArr[i].listItem[j].dataDisabled = false
                       }
                    }
                }
            })
        },
        getOption(type){
            cateValue(type).then(res=>{
                if(type == 'outerlier'){
                  this.disposeList = res.data
                }else{
                  this.loseList = res.data
                }
            })
        },
        changeIncrease(e){
            if(e){
               this.formLeft.max = ''
               this.formLeft.min = ''
               this.formLeft.principle = false
               this.formLeft.sigma = false 
            }
        },
        sigmaChange(e){
            if(e){
                this.formLeft.increase = false
                this.disposeDisabled = false
            }else{
                this.disposeDisabled = true
            }
        },
        boxChange(e){
            if(e){
                this.formLeft.increase = false
                this.disposeDisabled = false
            }else{
                this.disposeDisabled = true
            }
        },
        rangeminChange(e){
            if(e){
                this.formLeft.increase = false
                this.disposeDisabled = false
            }else{
                this.disposeDisabled = true
            }
        },
        rangemaxChange(e){
            if(e){
                this.formLeft.increase = false
                this.disposeDisabled = false
            }else{
                this.disposeDisabled = true
            }
        },
        completeChange(e){
            if(e){
                this.loseDisabled = false
            }else{
                this.loseDisabled = true
            }
        },
        add(){
            let arr = { 
                listItem:[{
                    pre:'',
                    preItem:'',
                    symbol:'',
                    numBollean:false,
                    num:'',
                    site:'',
                    nextItem:'',
                    siteBollean:false,
                    dataDisabled:true,
                    siteDisabled:true,
                    relation:''
                },
                ] ,
                outSymbol:''
            }
            this.symbolArr.push(arr)
        },
        deleteCon(){
            this.symbolArr = []
        },
        addPlus(index){
            this.symbolArr[index].listItem.push({
                pre:'',
                preItem:'',
                symbol:'',
                numBollean:false,
                num:'',
                site:'',
                nextItem:'',
                siteBollean:false,
                dataDisabled:true,
                siteDisabled:true,
                relation:''
            })
        },
        removeMinus(index,idx){
            this.symbolArr[index].listItem.splice(idx,1)
        },
        getPre(index,idx,e){
            this.modal = true
            this.pre = true
            this.curIdx = idx
            this.curIndex = index
            this.next = false
            this.changeTest = false
        },
        getNext(index,idx,e){
            this.modal = true
            this.next = true
             this.pre = false
            this.curIdx = idx
            this.curIndex = index
            this.changeTest = false
        },
        getIndex(index,idx){
            console.log(index,idx)
            this.curIndex = index
            this.curIdx = idx
        },
        chooseSymbol(e){
            this.symbolArr[this.curIndex].listItem[this.curIdx].symbol = e
        },
        chooseData(e){
            if(e){
                this.symbolArr[this.curIndex].listItem[this.curIdx].dataDisabled = false
                this.symbolArr[this.curIndex].listItem[this.curIdx].num = ''
                this.symbolArr[this.curIndex].listItem[this.curIdx].siteDisabled = true
                this.symbolArr[this.curIndex].listItem[this.curIdx].siteBollean = false
                this.symbolArr[this.curIndex].listItem[this.curIdx].site = ''
            }
        },
        chooseNextSite(e){
            if(e){
                this.symbolArr[this.curIndex].listItem[this.curIdx].dataDisabled = true
                this.symbolArr[this.curIndex].listItem[this.curIdx].num = ''
                this.symbolArr[this.curIndex].listItem[this.curIdx].numBollean = false
                this.symbolArr[this.curIndex].listItem[this.curIdx].siteDisabled = false
            }
        },
        chooseRelative(e){
            this.symbolArr[this.curIndex].listItem[this.curIdx].relation = e
        },
        getOutIndex(index){
            this.curIndex = index
        },
        enumChange(e){
            if(e){
                this.formLeft.enumCheck = true
            }else{
                this.formLeft.enumCheck = false
            }
        }
    }
}
</script>
<style lang="less" scoped>
.user-information{
    margin: 5px;
    overflow:scroll;
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
