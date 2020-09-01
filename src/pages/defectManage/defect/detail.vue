<template>
    <div class="detail-wrap" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <div>
                <h3>缺陷详情</h3>
                <a href="javascript:;">取消关注</a>
            </div>
            <div class="c-btns-right">
                <Button type="primary">任务分派</Button>
                <Dropdown trigger="click" style="margin-left: 10px">
                    <Button type="primary">
                        处理
                        <Icon type="ios-arrow-down"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem>挂起</DropdownItem>
                        <DropdownItem>关闭</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
        <div class="c-top-border-gray">
            <Row>
                <Col span="12">
                    <div class="item-form">
                        <label>缺陷类型：</label>
                        <span>{{ type }}</span>
                    </div>
                    <div class="item-form">
                        <label>所属组织：</label>
                        <span>{{ tissue }}</span>
                    </div>
                    <div class="item-form">
                        <label>当前状态：</label>
                        <span>{{ status }}</span>
                    </div>
                    <div class="item-form">
                        <label>严重程度：</label>
                        <span>{{ severity }}</span>
                    </div>
                    <div class="item-form">
                        <label>相关巡检：</label>
                        <span>{{ polling }}</span>
                    </div>
                </Col>
                <Col span="12">
                    <div class="item-form">
                        <label>缺陷编号：</label>
                        <span>{{ number }}</span>
                    </div>
                    <div class="item-form">
                        <label>区域位置：</label>
                        <span>{{ area }}</span>
                    </div>
                    <div class="item-form">
                        <label>当前处理人：</label>
                        <span>{{ handler }}</span>
                    </div>
                    <div class="item-form">
                        <label>相关设备：</label>
                        <span>{{ device }}</span>
                    </div>
                </Col>
            </Row>
        </div>
        <div class="c-top-border-gray">
            <Tabs value="name1" :animated="false">
                <TabPane label="缺陷详情" name="name1">
                    <div class="tabs-tabpane">
                        <label>缺陷备注：</label>
                        <span></span>
                    </div>
                    <div class="fault-detail">
                        <h3 class="c-gray-bg-h">现场缺陷记录</h3>
                        <div class="c-nodata-tip">暂无记录</div>
                    </div>
                </TabPane>
                <TabPane label="消缺记录" name="name2">
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
                    <Table stripe :columns="applyColumns" :data="applyData"></Table>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
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
                    title: '物料编号',
                    key: 'name'
                }, {
                    title: '物料名称',
                    key: 'name'
                }, {
                    title: '品牌',
                    key: 'name'
                }, {
                    title: '型号',
                    key: 'name'
                }, {
                    title: '规格',
                    key: 'name'
                }, {
                    title: '计量单位',
                    key: 'name'
                }, {
                    title: '申请数量',
                    key: 'name'
                }, {
                    title: '申请人',
                    key: 'name'
                }, {
                    title: '申请日期',
                    key: 'name'
                }, {
                    title: '审核人',
                    key: 'name'
                }, {
                    title: '审核日期',
                    key: 'name'
                }, {
                    title: '结果',
                    key: 'name'
                }
            ],
            applyData: []
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
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
                color: #4b7efe;
                font-weight: 700;
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
            margin-top: 2px;
            button {
                min-width: 70px;
                margin: 0 5px;
                border: none;
                height: 28px;
            }
            /deep/.ivu-dropdown {
                button {
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
}
</style>