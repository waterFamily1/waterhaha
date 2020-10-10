<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="index-search" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>关键字：</label>
                    <Input v-model="keyword" placeholder="指标名称" style="width: 220px" />
                </div>
                <div class="form-item">
                    <label>区域位置：</label> 
                    <Select v-model="model1" style="width:200px">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
                        <label>指标类型：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="typeValue">
                                <TagSelectOption name="tag1">数据KPI</TagSelectOption>
                                <TagSelectOption name="tag2">设备KPI</TagSelectOption>
                                <TagSelectOption name="tag3">关键指标</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="index-content">
            <div class="c-table-top-btns">
                <button type="button" @click="addNew()">新增</button>
            </div>
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table stripe :columns="tableList" :data="tableData">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" style="margin-right: 5px;">配置</Button>
                        <Button class="action" size="small">测试</Button>
                    </template>
                </Table>
                <Page 
                    :total="allTotal" show-total show-elevator @on-change="changePage" 
                    style="text-align: right;margin-top: 10px;" 
                />
            </div>
        </div>
    </div>
</template>
<script>
import { getListMethod } from '@/api/system/indicator'
export default {
    name: 'indexManage',
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
            typeValue: [],
            tableList: [
                {
                    title: '指标名称',
                    key: 'indexName'
                },
                {
                    title: '指标类型',
                    key: 'indexType'
                },
                {
                    title: '区域位置',
                    key: 'processName'
                },
                {
                    title: '测点名称',
                    key: 'mpointName'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            tableData: [],
            allTotal: 0,
            pageNum: '1',
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getList()
    },
    methods: {
        getList() {
            getListMethod().then(res=> {
                console.log(JSON.stringify(res.data))
                this.tableData = res.data.items
                this.allTotal = res.data.total
            }).catch(err=> {

            })
        },
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
        changePage(index) {
            this.pageNum = index
            this.getList()
        },
        addNew() {
            this.$router.push({path:'/systemManage/index/indexAdd'})
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
                        float: left;
                    }
                }
                .cmp-tab {
                    display: inline-block;
                    /deep/.ivu-tag-text {
                        font-size: 14px;
                    }
                }
                /deep/.ivu-form-item {
                    margin-bottom: 5px;
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