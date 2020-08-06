<template>
    <div class="quality-box" :style="{height: height+'px'}">
        <div class="quality-search">
            <div class="search-main">
                <div class="form-item">
                    <label>区域位置：</label>
                    <TreeSelect v-model="areaLocation" multiple :data="areaData" v-width="200" />
                </div>
                <div class="date-step">
                    <label>起始时间：</label>
                    <DatePicker size="small" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                    <div class="date-step-icon">
                        <Icon type="md-arrow-dropleft-circle" />
                        <Icon type="md-arrow-dropright-circle" />
                    </div>
                    <label>时间跨度：</label>
                    <Select v-model="date" style="width:70px">
                        <Option v-for="item in dateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="search-btn">
                    <Button size="small" type="primary">搜索</Button>
                    <Button size="small" class="reset">重置</Button>
                </div>
            </div>
        </div>
        <div class="quality-border">
            <div class="box">
                <div class="title">总体评价</div>
                <div class="content">
            
                </div>
            </div>
            <ul class="evaluate-list">
                <li>
                    <div class="content">
                        <span class="evaluate-result"></span>
                        <div class="right-content">
                            <span class="title">准确性</span>
                            <div title="%" class="evaluate-index ell">%</div>
                        </div>
                    </div>
                    <p>准确数据量/实际总数据量</p>
                </li>
                <li>
                    <div class="content">
                        <span class="evaluate-result"></span>
                        <div class="right-content">
                            <span class="title">完整性</span>
                            <div title="%" class="evaluate-index ell">%</div>
                        </div>
                    </div>
                    <p>实际数据量/理论数据量</p>
                </li>
                <li>
                    <div class="content">
                        <span class="evaluate-result"></span>
                        <div class="right-content">
                            <span class="title">及时性</span>
                            <div title="%" class="evaluate-index ell">%</div>
                        </div>
                    </div>
                    <p>平均采集延时</p>
                </li>
                <li>
                    <div class="content">
                        <span class="evaluate-result"></span>
                        <div class="right-content">
                            <span class="title">一致性</span>
                            <div title="%" class="evaluate-index ell">%</div>
                        </div>
                    </div>
                    <p>一致数据量/实际总数据量</p>
                </li>
            </ul>
            <div class="box">
                <div class="title">样本占比</div>
            </div>
        </div>
        <div class="quality-border">
            <div class="c-table-top-btns">
                <Button>重新计算</Button>
                <Button>重算日志</Button>
            </div>
            <Table ref="selection" :columns="columns" :data="data"></Table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'qualityStat',
    data() {
        return {
            height: '',
            areaLocation: [],
            areaData: [
                {
                    title: 'parent1',
                    expand: true,
                    value: 'parent1',
                    selected: false,
                    checked: false,
                    children: [
                        {
                            title: 'parent 1-1',
                            expand: true,
                            value: 'parent1-1',
                            selected: false,
                            checked: false,
                            children: [
                                {
                                    title: 'leaf 1-1-1',
                                    value: 'leaf1',
                                    selected: false,
                                    checked: false,
                                }
                            ]
                        }
                    ]
                }
            ],
            date: '',
            dateList: [
                {
                    value: '0',
                    label: '天'
                },{
                    value: '1',
                    label: '周'
                },{
                    value: '2',
                    label: '月'
                },{
                    value: '3',
                    label: '年'
                }
            ],
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    key: 'number'
                },
                {
                    title: '测点名称',
                    key: 'stationName'
                },
                {
                    title: '区域位置',
                    key: 'location'
                },
                {
                    title: '数据量',
                    key: 'dataSize'
                },
                {
                    title: '准确性',
                    key: 'accuracy'
                },
                {
                    title: '完整性',
                    key: 'integrity'
                },
                {
                    title: '及时性',
                    key: 'timeliness'
                },
                {
                    title: '一致性',
                    key: 'consistency'
                },
                {
                    title: '所属设备',
                    key: 'facility'
                },
                {
                    title: '统计时间',
                    key: 'statisticsTime'
                }
            ],
            data: []
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
}
</script>
<style lang="less" scoped>
.quality-box {
    margin: 5px;
    background: #fff;
    .quality-search {
        padding: 5px;
        .search-main {
            height: 33px;
            .form-item {
                display: inline-block;
                min-height: 33px;
                label {
                    display: inline-block;
                    width: 100px;
                    line-height: 35px;
                    text-align: right;
                    color: #576374;
                }
                /deep/.ivu-select-selection {
                    height: 33px;
                }
            }
            .date-step {
                display: inline-block;
                margin-left: 40px;
                .date-step-icon {
                    display: inline-block;
                    vertical-align: bottom;
                    margin: 0 5px;
                    /deep/.ivu-icon {
                        font-size: 22px;
                        color: rgb(75, 126, 254);
                        margin: 0 5px;
                    }
                }
            }
            .search-btn {
                float: right;
                margin-top: 4px;
                /deep/.ivu-btn {
                    font-size: 13px;
                    margin: 0 5px;
                    height: auto;
                    padding: 2px 12px;
                }
                .reset {
                    color: #fff;
                    background: #5a6779;
                }
            }
        }
    }
    .quality-border {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .box {
            width: 20%;
            color: #576374;
            background-color: #f1f3f8;
            display: inline-block;
            vertical-align: top;
            position: relative;
            .title {
                height: 80px;
                width: 40px;
                word-break: break-all;
                line-height: 20px;
                padding-left: 15px;
                padding-right: 10px;
                margin-top: 8px;
                margin-bottom: 8px;
                font-size: 12px;
                color: #333E4E;
                border-right: 1px solid #e4e9f1;
            }
            .content {
                position: absolute;
                height: 96px;
                display: inline-block;
                left: 50px;
                right: 0;
                top: 0;
            }
        }
        .evaluate-list {
            display: inline-block;
            width: 58%;
            margin: 0 0.5%;
            background-color: #f1f3f8;
            overflow: hidden;
            height: 96px;
            vertical-align: top;
            li {
                list-style: none;
                float: left;
                width: 25%;
                position: relative;
                text-align: center;
                .content {
                    min-width: 120px;
                    height: 57px;
                    margin: 8px auto 0;
                    .evaluate-result {
                        display: inline-block;
                        width: 36px;
                        height: 36px;
                        border-radius: 18px;
                        text-align: center;
                        line-height: 36px;
                        font-size: 16px;
                        margin: 10px 10px 10px 0px;
                    }
                    .right-content {
                        display: inline-block;
                        vertical-align: top;
                        margin-top: 10px;
                        text-align: left;
                        .title {
                            color: #333E4E;
                        }
                        .evaluate-index {
                            font-size: 16px;
                            font-weight: bold;
                            height: 22px;
                            line-height: 22px;
                            width: 95px;
                            color: #333E4E;
                        }
                    }
                }
                p {
                    font-size: 10px;
                    color: #686F7B;
                }
            }
            li:before {
                content: "";
                position: absolute;
                left: 0;
                top: 18px;
                height: 60px;
                width: 1px;
                background-color: #e4e9f1;
            }
        }
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            /deep/.ivu-btn {
                background-color: #576374;
                height: auto;
                color: #fff;
                padding: 4px 12px;
                font-size: 13px;
                margin-right: 5px;
            }
        }
    }
    .ell {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>