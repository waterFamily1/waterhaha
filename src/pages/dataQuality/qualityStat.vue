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
            1
        </div>
        <div class="quality-border">
            2
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
            ]
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
    }
}
</style>