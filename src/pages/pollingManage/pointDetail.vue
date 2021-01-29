<template>
    <div class="detail-wrap" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <div>
                <h3>巡检点详情</h3>
                <span style="color:rgb(153, 153, 153);font-size:12px;font-weight:100">(编号：{{detailObj.no}})</span>
            </div>
            <div class="c-btns-right">
                <Button @click="edit()">编辑</Button>
                <Button style="background:#c8c8c8" @click="back()">返回</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <Row>
                <Col span="12">
                    <div class="item-form">
                        <label>名称：</label>
                        <span>{{ detailObj.patrolPoint }}</span>
                    </div>
                    <div class="item-form">
                        <label>描述：</label>
                        <span>{{ detailObj.description }}</span>
                    </div>
                </Col>
                <Col span="12">
                    <div class="item-form">
                        <label>区域位置：</label>
                        <span>{{ detailObj.relatedProcessNames }}</span>
                    </div>
                </Col>
            </Row>
        </div>
        <div class="c-top-border-gray">
            <div style="height:50px;border-bottom:1px solid #f0f0f0;padding:10px 0 10px 10px">
                <h3>巡检步骤</h3>
            </div>
            
           <Table stripe :columns="applyColumns" :data="applyData"></Table>
        </div>
       
    </div>
</template>
<script>
import {pointDetail } from '@/api/pollingManage/manage'
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
export default {
    name: 'detail',
    data() {
        return {
            height: '',
            type: '111',
            number: '',
            tissue: '',
            area: '',
            status: '',
            handler: '',
            severity: '',
            polling: '',
            device: '',
            applyColumns: [
                {
                    title: '序号',
                    type: 'index',
                    align: 'center',
                    width: 70
                }, {
                   title: '步骤',
                    key: 'step',
                }, {
                     title: '结果类型',
                    key: 'resultType',
                     render: (h, params) => {
                        let that = this;
                        let text = params.row.resultType==1?'状态':'数据'
                        return h('div',{},text)
                    }
                }, {
                    title: '绑定测点',
                    key: 'mpointName',
                    render: (h,params) =>{
                        let text ;
                        if(params.row.resultType==1){
                            text = "--"
                        }else{
                            text = params.row.mpointName
                        }
                        return h('div',{},text)
                    }
                },
            ],
            applyData: [],
            id:'',
            detailObj:{},
            resultList:[
                {
                    value:'1',
                    name:'状态'
                },
                {
                    value:'2',
                    name:'数据'
                }
            ],
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.id = this.$route.query.id
        this.detail()
    },
    methods:{
        edit(){
             this.$router.push({
                path:'/pointEdit',
                query: {
                    id: this.id
                }
            })
        },
        detail(){
            pointDetail(this.id).then(res=>{
                console.log(res)
                if(res.data){
                    this.detailObj = res.data
                    this.applyData = res.data.patrolSteps
                }
            })
        },
        back(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less" scoped>
.detail-wrap {
    margin: 5px;
    background: #fff;
    .c-left-border-blue {
        border-radius: 3px;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        div {
            a {
                display: inline;
                // color: #4b7efe;
                // font-weight: 700;
            }
            h3 {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                text-indent: 10px;
                margin-right: 20px;
            }
        }
        .c-btns-right {
             float: right;
                margin-top: 4px;
                a {
                    margin: 0 10px 0 0;
                    color: #576374;
                    font-size: 12px;
                }
                .ivu-btn {
                    height: auto;
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
            /deep/.ivu-dropdown {
                .ivu-btn {
                    background: #495566;
                }
            }
            .c-btn-back {
                background: #c8c8c8;
            }
        }
    }
    .c-top-border-gray {
        padding: 20px 10px;
        border-top: 5px solid #f0f0f0;
        /deep/.ivu-row {
            margin-left: 20px;
            .item-form {
                margin-bottom: 15px;
                height: 24px;
                line-height: 24px;
                label {
                    display: inline-block;
                    color: #495060;
                    font-weight: 700;
                    width: 100px;
                    text-align: right;
                }
            }
        }
        /deep/.ivu-tabs-content {
            padding: 10px;
            .tabs-tabpane {
                text-indent: 20px;
                margin-bottom: 20px;
            }
            .fault-detail {
                .c-gray-bg-h {
                    background-color: #f4f4f4;
                    height: 30px;
                    line-height: 30px;
                    text-indent: 20px;
                    font-weight: 100;
                    font-size: 13px;
                }
                .c-nodata-tip {
                    text-align: center;
                    line-height: 50px;
                }
            }
        }
    }
    /deep/.ivu-timeline-item-content {
        div {
            div {
                display: inline-block;
                // color: #4b7efe;
                // font-weight: 700;
                font-size: 13px;
                margin-right: 10px;
            }
            div:first {
                border-right: 2px solid #d8d8d8;
            }
        }
    }
    .active{
        color: #4b7efe;
        font-weight: 700;
    }
}
.btn{
    margin-top:20px;
    width:300px;
    color:#fff;
    span{
        background: #4b7efe;
        display:inline-block;
        width:100%;
        text-align:center;
        line-height:34px;
        border-radius:5px;
    }
}
</style>