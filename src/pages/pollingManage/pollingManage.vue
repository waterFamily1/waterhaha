<template>
    <div class="map-box" :style="{height: height+'px'}">
        <div class="index-search">
            <div class="search-main">
                <div class="form-item">
                    <label>关键词：</label>
                    <Input v-model="keyword" placeholder="名称" style="width: 200px" size="small" />
                </div>
                <div class="form-item">
                    <label>所属组织：</label> 
                    <Select v-model="model1" style="width:200px" size="small">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                
                  <div class="form-search-btn">
                    <button type="button">搜索</button>
                    <button type="button" class="reset">重置</button>
                </div>
            </div>
        </div>
        <div class="map-content" :style="{height: (height-45)+'px'}">
             <div class="c-table-top-btns">
                 <div style="display:inline-block">
                    <Dropdown>
                        <button type="button" style="margin-right:10px" @click="qrCOde()">
                            导出二维码<Icon type="md-arrow-dropdown" />
                        </button>
                        <DropdownMenu slot="list">
                            <DropdownItem>全部巡检点</DropdownItem>
                            <DropdownItem>选中巡检点</DropdownItem> 
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <button type="button" @click="add()">新增</button>
                <button type="button" @click="cancel()" style="margin-left:10px">删除</button>
                <button type="button" @click="upload()" style="margin-left:10px">导入</button>
                
            </div>
                <Table stripe :columns="tableList" size="small">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <!-- <Button class="action" size="small" style="margin-right: 5px;">配置</Button> -->
                        <Button class="action" size="small">查看</Button>
                    </template>
                </Table>
        </div>
    </div>
</template>
<script>
export default {
    name:'pollingManage',
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
                    title: '巡检点',
                    key: 'point'
                },
                {
                    title: '描述',
                    key: 'describe'
                },
                {
                    title: '巡检步骤',
                    key: 'steps'
                },
                {
                    title: '区域位置',
                    key: 'location'
                },
               
                {
                    title: '编号',
                    key: 'number'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
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
        qrCOde(){
            
        },
        add(){
            this.$router.push({path:'/pollingManage/addPoint'})
        },
        cancel(){

        },
        upload(){
            this.$router.push({
                path:'/other/areaUpload',
                query: {
                    uploadName: '巡检点导入'
                }
            })
        }
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
    .map-content{
        border-top: 5px solid #f0f0f0;
        padding:10px;
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
    }
}
</style>