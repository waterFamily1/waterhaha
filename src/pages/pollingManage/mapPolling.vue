<template>
    <div class="map-box" :style="{height: height+'px'}">
        <div class="index-search">
            <div class="search-main">
                <div class="form-item">
                    <label>所属组织：</label> 
                    <Select v-model="model1" style="width:200px" size="small">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="form-item">
                    <label>时间：</label>
                    <DatePicker type="date" placeholder="Select date" style="width: 200px" size="small"></DatePicker>
                </div>
                  <div class="form-search-btn">
                    <Button>搜索</Button>
                    <Button class="reset">重置</Button>
                </div>
            </div>
        </div>
        <div class="map-content" :style="{height: (height-45)+'px'}">
            <div class="c-scrollbar">
                <Table stripe :columns="tableList" >
                    <template slot-scope="{ row, index }" slot="action">
                        <!-- <Button class="action" size="small" style="margin-right: 5px;">配置</Button> -->
                        <Button class="action" size="small">查看</Button>
                    </template>
                </Table> 
            </div>
            <div class="map-show">
                <baidu-map center="天津" :zoom="13" 
                        :scroll-wheel-zoom="true" style="height:100%">
                        <bm-control >
                            <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 1}">
                                <Input suffix="ios-search" placeholder="" style="width: auto" />
                            </bm-auto-complete>
                        </bm-control>
                    <bm-local-search :keyword="keyword" :auto-viewport="true" ></bm-local-search>
                </baidu-map>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'mapPolling',
    data () {
        return {
            height :'',
            tableList: [
                {
                    type: 'selection',
                    width: 50,
                    align: 'center'
                },
                {
                    title: '巡检任务',
                    key: 'task'
                },
                {
                    title: '任务编号',
                    key: 'number'
                },
                {
                    title: '状态',
                    key: 'state'
                },
                {
                    title: '巡检点',
                    key: 'point'
                },
                {
                    title: '结果记录',
                    key: 'result'
                }
            ],
            model1:'',
            keyword:'',
            cityList: [
                {
                    value: 'New York',
                    label: 'New York'
                }
            ],
        }
    },
    methods: {

    },
    mounted() {
        this.height = document.body.clientHeight-75
    }
}
</script>
<style lang="less" scoped>
.map-box{
    margin: 5px;
    background: #fff;
    overflow: auto;
    .index-search {
        padding: 5px;
        height: 43px;
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
            }
            .form-search-btn {
                float: right;
                margin-top: 4px;
                a {
                    margin: 0 10px 0 0;
                    color: #576374;
                    font-size: 12px;
                }
                .ivu-btn{
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
            }
        }
    }
    .map-content{
        border-top: 5px solid #f0f0f0;
        padding:10px;
        .c-scrollbar{
            float: left;
            overflow: auto;
            width: 50%;
            height: 100%;
        }
        .map-show{
            width: 50%;
            height: 100%;
            float: right;
        }
    }
}
</style>