<template>
    <div class="service-box" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>维修工单详情</h3>
            <span>添加关注</span>
            <div class="c-btns-right">
                <button style="background:#495566">任务分派</button>
                <div style="display:inline-block">
                    <Dropdown>
                        <button type="button" style="margin-right:10px" @click="qrCOde()">
                            处理<Icon type="md-arrow-dropdown" />
                        </button>
                        <DropdownMenu slot="list">
                            <DropdownItem>挂起</DropdownItem>
                            <DropdownItem>关闭</DropdownItem> 
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <button style="background:#c8c8c8">返回</button>
            </div>
        </div>
        <div class="form-data-show">
            <Row>
                <Col span="12">
                   <label for="">故障设备：</label>
                   <span>测试3</span>
                </Col>
                <Col span="12">
                   <label for="">维修编号：</label>
                   <span>R20200807001</span>
                </Col>
            </Row>
             <Row>
                <Col span="12">
                   <label for="">所属组织：</label>
                   <span>联泰潮英智慧水务</span>
                </Col>
                <Col span="12">
                   <label for="">设备编号：</label>
                   <span>R20200807001</span>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                   <label for="">当前状态：</label>
                   <span>待处理</span>
                </Col>
                <Col span="12">
                   <label for="">当前处理人：</label>
                   <span>xxxx</span>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                   <label for="">区域位置：</label>
                   <span>沙陂村150吨巡检点</span>
                </Col>
                <Col span="12">
                   <label for="">紧急程度：</label>
                   <span>紧急</span>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                   <label for="">故障原因：</label>
                   <span>人为破坏</span>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                   <label for="">备注：</label>
                   <span></span>
                </Col>
            </Row>
        </div>
        <div class="form-data-show">
            <Tabs value="name1">
                <TabPane label="缺陷详情" name="name1">
                   <Row>
                        <Col span="12">
                            <label for="">缺陷类型：</label>
                            <span>设备缺陷</span>
                        </Col>
                        <Col span="12">
                            <label for="">缺陷编号：</label>
                            <span>R20200807001</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <label for="">严重程度：</label>
                            <span>轻微</span>
                        </Col>
                        <Col span="12">
                            <label for="">相关设备：</label>
                            <span>测试3</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <label for="">相关巡检：</label>
                            <span></span>
                        </Col>
                        <Col span="12">
                            <label for="">申报人员：</label>
                            <span>休闲鞋</span>
                        </Col>
                    </Row>
                     <Row>
                        <Col span="12">
                            <label for="">申报时间：</label>
                            <span>2020-08-07 08:54</span>
                        </Col>
                        <Col span="12">
                            <label for="">缺陷备注</label>
                            <span>测试</span>
                        </Col>
                    </Row>
                    <div class="record">
                        <div class="title">现场缺陷记录</div>
                        <div class="img">
                            <img src="http://chaoying.tjdeht.cn:8803/group1/M00/00/10/wKgyrl8spimAPA7iAAFAyODEmsA51.jpeg" alt="">
                        </div>                       
                    </div>
                </TabPane>
                <TabPane label="维修记录" name="name2">
                     <Timeline>
                        <TimelineItem>
                            <div>
                                <div>2020-08-25 17:52</div>
                                <div>蔡键彬 发现缺陷 任务分派 蔡键彬</div>
                                <div>
                                    待处理
                                    <span></span>
                                </div>
                            </div>
                        </TimelineItem>
                    </Timeline>
                </TabPane>
                <TabPane label="备件申请" name="name3">
                    <Table stripe :columns="tableList" >
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <!-- <Button class="action" size="small" style="margin-right: 5px;">配置</Button> -->
                            <Button class="action" size="small">查看</Button>
                        </template>
                    </Table>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            height:0,
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
                    title: '品牌',
                    key: 'brand'
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
                    title: '计量单位',
                    key: 'unit'
                },
                {
                    title: '申请数量',
                    key: 'applicationNum'
                },
                {
                    title: '申请人',
                    key: 'proposer'
                },
                {
                    title: '申请日期',
                    key: 'applicationDate'
                },
                {
                    title: '审核人',
                    key: 'auditor'
                },
                {
                    title: '审核日期',
                    key: 'approvalDate'
                },
                {
                    title: '结果',
                    key: 'result'
                }
            ],
        }
    },
    methods :{

    },
    mounted() {
        this.height = document.body.clientHeight-70
    }
}
</script>
<style lang="less" scoped>
.service-box{
    margin: 5px;
    background: #fff;
    overflow: auto;
    .c-left-border-blue{
        border-radius: 3px;
        padding: 5px;
        h3{
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-indent: 10px;
        }
        span{
            color: #4b7efe;
            margin-left: 20px;
            font-weight: 700;
        }
        .c-btns-right {
            float: right;
            margin-top: 2px;
            button{
                background: #4b7efe;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                border: 0;
                border-radius: 3px;
                margin: 0 5px;
            }
        }
    }
    .form-data-show{
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        label{
            display: inline-block;
            width: 100px;
            text-align: right;
            line-height: 35px;
            font-weight: 700;
        }
        .record{
            margin-top: 10px;
            .title{
                background-color: #f4f4f4;
                height: 30px;
                line-height: 30px;
                text-indent: 20px;
                font-weight: 100;
                font-size: 13px;
            }
            .img{
                position: relative;
                display: inline-block;
                width: 130px;
                height: 130px;
                background: #EEE;
                margin: 20px 10px 10px 0;
                overflow: hidden;
                cursor: pointer;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
 /deep/.ivu-timeline-item-content {
        div {
            div {
                display: inline-block;
                color: #4b7efe;
                font-weight: 700;
                font-size: 13px;
                margin-right: 10px;
            }
            div:first {
                border-right: 2px solid #d8d8d8;
            }
        }
    }
</style>