<template>
    <div class="log-wrap" :style="{height: height+'px'}">
        <div class="log-search">
            <div class="search-main">
                <div class="form-item">
                    <label>区域位置：</label>
                    <Select v-model="state" style="width:220px">
                        <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="search-btn">
                    <Button size="small" type="primary">搜索</Button>
                    <Button size="small" class="reset">重置</Button>
                </div>
            </div>
        </div>
        <div class="log-table">
            <Table stripe :columns="logColumns" :data="logData"></Table>
            <div class="log-page">
                <Page :total="100" show-total show-elevator style="text-align: right;" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'recountLog',
    data() {
        return {
            height: '',
            state: '',
            stateList: [
                {
                    label: '成功',
                    value: '0'
                }, {
                    label: '失败',
                    value: '1'
                }
            ],
            logColumns: [
                {
                    title: '序号',
                    key: 'number'
                },
                {
                    title: '测点名称',
                    key: ''
                },
                {
                    title: '区域位置',
                    key: 'locaiton'
                },
                {
                    title: '重算时间',
                    key: 'recountTime'
                },
                {
                    title: '重算范围',
                    key: 'recountScope'
                },
                {
                    title: '耗时（s）',
                    key: 'timeConsuming'
                },
                {
                    title: '执行人',
                    key: 'executor'
                },
                {
                    title: '状态',
                    key: 'state'
                }
            ],
            logData: []
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
}
</script>
<style lang="less" scoped>
.log-wrap {
    margin: 5px;
    background: #fff;
    .log-search {
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
            .search-btn {
                float: right;
                margin-top: 4px;
                button{
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
    .log-table {
        border-top: 5px solid #f0f0f0;
        .log-page {
            margin-top: 20px;
        }
    }
}
</style>