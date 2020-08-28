<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="index-search" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>关键字：</label>
                    <Input v-model="keyword" placeholder="编号/名称/型号/供应商" style="width: 200px" />
                </div>
                <div class="form-item">
                    <label>区域位置：</label> 
                    <Select v-model="model1" style="width:200px">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="form-item">
                    <label>设备类型：</label> 
                    <Select v-model="model1" style="width:200px">
                        <Option v-for="item in genreList " :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="form-search-btn">
                    <a href="javascript:;" @click="higherSearch()">
                        <Icon type="ios-arrow-down" v-if="searchShow" />
                        <Icon type="ios-arrow-up" v-else />
                        高级搜索
                    </a>
                    <button type="button">搜索</button>
                    <button type="button" class="reset">重置</button>
                </div>
            </div>
            <div class="c-adv-search">
                <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>ABC类：</label>
                        <div class="cmp-tab">
                            <a href="javascript:;" @click="typeCheckAll()" :class="{checked:typeCheckedAll}">全部</a>
                            <a href="javascript:;" v-for="(item, index) in typeList" 
                            :key="index" @click="typeCheck(item.id)" 
                            :class="{checked:typeBox.includes(item.id)}">{{ item.label }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="index-content">
            <div class="c-table-top-btns">
                <button type="button" @click="addDevice()">添加设备</button>
                <button type="button" @click="msgUpload()" style="margin-left:10px">信息导入</button>
                <div style="display:inline-block">
                    <Dropdown>
                        <button type="button" style="margin-left:10px" @click="batchsetting()">
                            批量删除<Icon type="md-arrow-dropdown" />
                        </button>
                        <DropdownMenu slot="list">
                            <DropdownItem>选中设备</DropdownItem>
                            <DropdownItem>全部设备</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table stripe :columns="tableList" :data="tableData">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <!-- <Button class="action" size="small" style="margin-right: 5px;">配置</Button> -->
                        <Button class="action" size="small">查看</Button>
                    </template>
                </Table>
                 <Page :total="100" show-elevator class="page" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'deviceBook',
    data() {
        return {
            height: '',
            keyword: '',
            cityList: [
                {
                    value: 'New York',
                    label: 'New York'
                }
            ],
            model1: '',
            searchShow: false, 
            typeCheckedAll: false,
            typeBox: [],
            genreList: [
                {label: '在线仪表',id: 1},
                {label: '泵',id: 2},
                {label: '阀门',id: 3},
                {label: '控制柜',id: 4},
                {label: '浮球',id: 5}
            ],
            typeList: [
                {label: 'A',id: 1},
                {label: 'B',id: 2},
                {label: 'C',id: 3},
            ],
            tableList: [
                {
                    type: 'selection',
                    width: 50,
                    align: 'center'
                },
                {
                    title: '设备名称',
                    key: 'name'
                },
                {
                    title: '设备编号',
                    key: 'number'
                },
                {
                    title: '设备类型',
                    key: 'type'
                },
                {
                    title: '型号',
                    key: 'Version'
                },
                {
                    title: '所属组织',
                    key: 'tissue'
                },
                {
                    title: 'ABC类',
                    key: 'tissue'
                },
                 {
                    title: '区域位置',
                    key: 'location'
                },
                {
                    title: '状态',
                    key: 'state'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ]
        }
    },
    mounted() {
        this.height = document.body.clientHeight-130
    },
    methods: {
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        typeCheckAll() {
            this.typeBox = []
            this.typeCheckedAll = true
        },
        typeCheck(i) {
            this.typeCheckedAll = false
            if(this.typeBox.includes(i)) {
                this.typeBox = this.typeBox.filter((ele) => {
                    return ele != i
                });
            } else {
                this.typeBox.push(i);
            }
        },
        addDevice() {
             this.$router.push({path:'/deviceManage/addBook'})
        },
        msgUpload(){
             this.$router.push({
                path:'/other/areaUpload',
                query: {
                    uploadName: '信息导入'
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.index-box {
    margin: 5px;
    background: #fff;
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
        .c-adv-search {
            margin-top: 10px;
            padding-top: 5px;
            border-top: 1px solid #ececec;
            .c-adv-search-row {
                margin: 5px 0;
                .form-item {
                    display: inline-block;
                    height: 33px;
                    label {
                        display: inline-block;
                        width: 100px;
                        line-height: 35px;
                        text-align: right;
                        color: #576374;
                    }
                }
                .cmp-tab {
                    display: inline-block;
                    a {
                        margin-right: 20px;
                        color: #576374;
                    }
                    .checked {
                        color: #4B7EFE;
                    }
                }
            }
        }
    }
    .searchTrans {
        height: 100px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .searchPack {
        height: 43px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .index-content {
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
            }
        }
        .table-wrapper{
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