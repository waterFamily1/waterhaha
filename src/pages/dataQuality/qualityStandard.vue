<template>
    <div class="quality-wrap" :style="{height: height+'px'}">
        <div class="log-content">
            <div class="c-table-top-btns">
                <button type="button">编辑</button>
                <button type="button">默认恢复</button>
            </div>
            <div class="table-wrapper">
                <Table stripe size="small" :columns="tableList" :data="tableData">
                    <!-- <template slot-scope="{ row, index }" slot="level">
                        <Input type="text" v-model="editName" v-if="editIndex === index" />
                        <InputNumber :max="10" :min="1" v-model="value1"></InputNumber>
                        <span v-else>{{ row.name }}</span>
                    </template> -->
                </Table>
                 <Page :total="100" show-elevator class="page" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'qualityStandard',
    data() {
        return {
            height: '',
            tableList: [
                {
                    title: ' ',
                    key: 'level',
                    width: '80'
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
                    key: 'timely'
                },
                {
                    title: '一致性',
                    key: 'accordance'
                },
            ],
            tableData: [

            ]
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
    methods: {
        
    }
}
</script>
<style lang="less" scoped>
.quality-wrap {
    margin: 5px;
    background: #fff;
    .log-content {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            button{
                min-width: 50px;
                background: #576374;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                border: 0;
                border-radius: 3px;
                margin-right: 10px;
            }
        }
        .table-wrapper {
            .action{
                color:rgb(75, 126, 254);
                border:0;
                font-size:12px;
                background:transparent
            }
            .page{
                text-align: right;
                margin-top: 10px;
            }
        }
    }
}
</style>