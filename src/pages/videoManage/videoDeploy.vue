<template>
    <div class="deploy-wrap" :style="{height: height+'px'}">
        <div class="search-header">
            <div class="c-form-item">
                <label>关键词：</label>
                <Input placeholder="视频名称" style="width: 200px" />
            </div>
             <div class="c-form-item">
                <label>区域位置：</label>
                <TreeSelect v-model="value" multiple show-checkbox :data="data" v-width="200" />
            </div>
            <div class="c-adv-search-btn">
                <button type="button">搜索</button>
                <button type="button" class="reset">重置</button>
            </div>
        </div>  
        <div class="c-top-border-gray">
            <div class="c-table-top-btns">
                <button type="button" @click="addHandle">新建</button>
                <button type="button" style="margin-left:10px">删除</button>
            </div>
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table stripe :columns="terminalList" :data="terminalData">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" style="margin-right: 5px;" @click="checkHandle(index)">查看</Button>
                        <Button class="action" size="small" @click="editHandle(index)">编辑</Button>
                    </template>
                </Table>
                <Page :total="100" show-elevator class="page" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'videoDeploy',
    data() {
        return {
            height: '',
            value: [],
                data: [{
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
                        },
                        {
                            title: 'parent 1-2',
                            expand: true,
                            value: 'parent1-2',
                            selected: false,
                            checked: false
                        }
                    ]
                }
            ],
            terminalList: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '区域位置',
                    key: 'area'
                },
                {
                    title: '视频名称',
                    key: 'name'
                },
                {
                    title: 'URL地址',
                    key: 'url'
                },
                {
                    title: '定时抓拍',
                    key: 'zhuapai'
                },
                {
                    title: '定时抓拍周期/分',
                    key: 'zhuapai1'
                },
                {
                    title: '触发报警名称',
                    key: 'name1'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            terminalData: [
                {
                    area: 'kepware1',
                    name: '1',
                    url: 'kepware',
                    zhuapai: '西湖村站点1-1',
                    zhuapai1: 'KepWare',
                    name1: '有线'
                }
            ],
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
    methods: {
        checkHandle(index) {
            this.$router.push({path:'videoD/checkVideo'})
        },
        editHandle(index) {
            this.$router.push({path:'videoD/editVideo'})
        },
        addHandle() {
            this.$router.push({path:'videoD/addVideo'})
        }
    }
}
</script>
<style lang="less" scoped>
.deploy-wrap {
    margin: 5px;
    background: #fff;
    .search-header{
        background: #fff;
        padding: 5px;
        .c-form-item{
            display: inline-block;
            min-height: 33px;
            label{
                width: 100px;
                text-align: right;
                display: inline-block;
                line-height: 35px;
            }
            
        }
        .c-adv-search-btn{
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
    .c-top-border-gray{
        background: #fff;
        margin-top: 5px;
        padding: 10px;
        border-top: 5px solid #f7f7f7;
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
            }
        }
        .table-wrapper{
            .action{
                color:rgb(75, 126, 254);
                border:0;
                font-size:13px;
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