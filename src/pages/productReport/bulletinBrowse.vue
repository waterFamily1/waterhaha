<template>
    <div class="bulletin-box" :style="{height: height+'px'}">
        <div class="bulletin-main">
            <div class="bulletin-left">
                <div class="left-box">
                    <AutoComplete
                        v-model="formName"
                        :data="formData"
                        :clearable="true"
                        @on-search="handleSearch"
                        placeholder="输入智能报表名称以检索"
                        size="small">
                    </AutoComplete>
                    <div class="tree-box">
                        <Tree :data="treeData"></Tree>
                    </div>
                </div>
            </div>
            <div class="bulletin-right">
                <div class="c-left-border-blue">
                    <div class="form-item">
                        <label>业务时间：</label>
                        <DatePicker type="date" placeholder="Select date" style="width: 250px"></DatePicker>
                    </div>
                    <div class="form-item">
                        <label>分组内容：</label>
                        <Select v-model="groupDetail" style="width:200px">
                            <Option v-for="item in groupList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                </div>
                <div class="c-top-border-gray">
                    <div class="table-top-btns">
                        <Button>导出</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'bulletinBrowse',
    data() {
        return {
            height: '',
            formName: '',
            formData: [],
            treeData: [
                {
                    title: 'parent 1',
                    expand: true,
                    children: [
                        {
                            title: 'parent 1-1',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-1-1'
                                },
                                {
                                    title: 'leaf 1-1-2'
                                }
                            ]
                        }
                    ]
                }
            ],
            groupDetail: '',
            groupList: [
                {
                    value: 'New York',
                    label: 'New York'
                },
                {
                    value: 'London',
                    label: 'London'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa'
                },
                {
                    value: 'Paris',
                    label: 'Paris'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra'
                }

            ]
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
    methods: {
        handleSearch (value) {
            this.formData = !value ? [] : [
                value,
                value + value,
                value + value + value
            ];
        }
    }
}
</script>
<style lang="less" scoped>
.bulletin-box {
    margin: 5px;
    background: #fff;
    .bulletin-main {
        width: 100%;
        height: 100%;
        display: flex;
        .bulletin-left {
            width: 300px;
            height: 100%;
            .left-box {
                width: 100%;
                /deep/.ivu-select {
                    padding: 3px;
                }
                .tree-box {
                    border-top: 1px solid rgb(230, 230, 230);
                    width: 100%;
                }
            }
        }
        .bulletin-right {
            width: 100%;
            border-left: 5px solid #f0f0f0;
            .c-left-border-blue {
                border-radius: 3px;
                padding: 5px;
                .form-item {
                    display: inline-block;
                    min-height: 33px;
                    label {
                        display: inline-block;
                        width: 100px;
                        line-height: 35px;
                        text-align: right;
                    }
                }
            }
            .c-top-border-gray {
                border-top: 5px solid #f0f0f0;
                .table-top-btns {
                    padding: 10px;
                    border-bottom: 1px solid #e6e6e6;
                    height: 50px;
                    /deep/.ivu-btn {
                        background: #576374;
                        color: #fff;
                        font-size: 13px;
                    }
                }
            }
        }
    }
}
</style>