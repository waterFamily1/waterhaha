<template>
    <div class="takeadd-wrap" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>报警订阅</h3> 
            <div class="c-btns-right">
                <Button type="primary" @click="saveHandle()">保存</Button>
                <Button type="primary" class="c-btn-back" @click="goBack()">取消</Button>
            </div>
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
            <div class="c-top-border-gray">
                <div class="c-form-row-1col">
                    <FormItem label="报警名称：">
                        <span>请选择</span>
                        <!-- <span>{{ formValidate.name }}</span> -->
                        <a href="javascript:;" @click="nameModal = true">[选择]</a>
                    </FormItem>
                </div>
                <div class="c-form-row-1col">
                    <FormItem label="区域位置：">
                        <!-- <Input v-model="formValidate.name" placeholder="Enter your name"></Input> -->
                    </FormItem>
                </div>
                <div class="c-form-row-2col">
                    <div class="c-form-item">
                        <FormItem label="推送频率：">
                            <Select v-model="formValidate.frequency" placeholder="请选择推送频率" style="width:250px">
                               <Option v-for="item in frequencyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </div>
                    <div class="c-form-item">
                        <FormItem label="延迟推送时间：">
                            <Select v-model="formValidate.delayTime" placeholder="请选择延迟推送时间" style="width:250px">
                               <Option v-for="item in delayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </div>
                </div>
                <div class="c-form-row-1col">
                    <FormItem label="推送方式：">
                        <Select v-model="formValidate.way" multiple style="width:250px">
                            <Option v-for="item in wayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </div>
            </div>
            <div class="c-top-border-gray">
                <div class="c-plain-bg-h">
                    <h3>新增接收对象</h3>
                    <Checkbox v-model="formValidate.single">同步接收报警确认消息</Checkbox>
                </div>
                <div class="c-form-row-2col" style="padding-top: 20px;">
                    <div class="c-form-item">
                        <FormItem label="所属组织：">
                            <Select v-model="formValidate.organize" placeholder="请选择所属组织" style="width:300px">
                               <Option v-for="item in organizeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </div>
                    <div class="c-form-item">
                        <FormItem label="用户：">
                            <Select v-model="formValidate.user" placeholder="请选择用户" style="width:300px">
                               <Option v-for="item in userList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </div>
                </div>
                <div class="c-form-row-1col">
                    <FormItem label="已选接收对象：">

                    </FormItem>
                </div>
            </div>
        </Form>
        <!-- 选择报警名称modal -->
        <Modal
            v-model="nameModal"
            width="600"
            title="报警定义列表选择"
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="mg-select-table">
                <div class="mg-select-table-header">
                    <div>
                        <label>关键字：</label>
                        <Input v-model="modalName" placeholder="编号/报警名称" style="width: 150px" />
                        <label style="margin-left: 5px">区域位置：</label>
                        <TreeSelect v-model="modalArea" multiple show-checkbox :data="modalAreaData" v-width="150" />
                        <Button @click="searchHandle()">搜索</Button>
                        <Button class="reset" @click="resetHandle()">重置</Button>
                    </div>
                    <div class="mg-select-table-tip">
                        已选择<strong>2</strong>个
                        <a href="javascript:;" @click="handleClearSelect(false)">[清空]</a>
                    </div>
                </div>
                <div class="model-table">
                    <Table size="small" ref="selection" :columns="modelColumns" :data="modelData"
                        @on-select="handleSelect"
                        @on-select-cancel="handleSelectCancel"
                        @on-select-all="handleSelectAll"
                        @on-select-all-cancel="handleSelectAllCancel">
                    </Table>
                    <Page :total="40" size="small" show-total show-elevator class="modalPage" />
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    name: 'takeAdd',
    data() {
        return {
            height: '',
            nameModal: false,
            formValidate: {
                name: '',
                frequency: '',
                delayTime: '',
                way: '',
                single: true,
                organize: '',
                user: ''
            },
            ruleValidate: {

            },
            frequencyList: [
                {
                    value: '0',
                    label: '5分钟'
                }, {
                    value: '1',
                    label: '10分钟'
                }, {
                    value: '2',
                    label: '15分钟'
                }, {
                    value: '3',
                    label: '30分钟'
                }, {
                    value: '4',
                    label: '1小时'
                }, {
                    value: '5',
                    label: '2小时'
                }, {
                    value: '6',
                    label: '12小时'
                }, {
                    value: '7',
                    label: '24小时'
                }, {
                    value: '8',
                    label: '仅推送1次'
                }
            ],
            delayList: [
                {
                    value: '0',
                    label: '5分钟'
                }, {
                    value: '1',
                    label: '10分钟'
                }, {
                    value: '2',
                    label: '15分钟'
                }, {
                    value: '3',
                    label: '30分钟'
                }, {
                    value: '4',
                    label: '1小时'
                }, {
                    value: '5',
                    label: '2小时'
                }, {
                    value: '6',
                    label: '12小时'
                }, {
                    value: '7',
                    label: '24小时'
                }, {
                    value: '8',
                    label: '立即推送'
                }, {
                    value: '9',
                    label: '不推送'
                }
            ],
            wayList: [
                {
                    value: '0',
                    label: '在线消息'
                }, {
                    value: '1',
                    label: '短信'
                }
            ],
            organizeList: [
                {
                    value: '0',
                    label: '联泰潮英智慧水务'
                }
            ],
            userList: [],
            modalName: '',
            modalArea: [],
            modalAreaData: [],
            modelColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    title: '报警名称',
                    key: 'name'
                }, {
                    title: '报警等级',
                    key: 'department'
                }, {
                    title: '使用状态',
                    key: 'tissue'
                }, {
                    title: '区域位置',
                    key: 'area'
                }
            ],
            modelData: []
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
    methods: {
        ok () {
            this.$Message.info('Clicked ok');
        },
        cancel () {
            this.$Message.info('Clicked cancel');
        },
        searchHandle() {

        },
        resetHandle() {

        },
        // 清空所有已选项
        handleClearSelect (status) {
            this.selectedData = [];
            this.$refs.selection.selectAll(status);
        },
        // 选中一项，将数据添加至已选项中
        handleSelect (selection, row) {
            this.selectedData.push(row);
        },
        // 取消选中一项，将取消的数据从已选项中删除
        handleSelectCancel (selection, row) {
            const index = this.selectedData.findIndex(item => item.name === row.name);
            this.selectedData.splice(index, 1);
        },
        // 当前页全选时，判断已选数据是否存在，不存在则添加
        handleSelectAll (selection) {
            selection.forEach(item => {
                if (this.selectedData.findIndex(i => i.name === item.name) < 0) {
                    this.selectedData.push(item);
                }
            });
        },
        // 取消当前页全选时，将当前页的数据（即 modelData）从已选项中删除
        handleSelectAllCancel () {
            const selection = this.modelData;
            selection.forEach(item => {
                const index = this.selectedData.findIndex(i => i.name === item.name);
                if (index >= 0) {
                    this.selectedData.splice(index, 1);
                }
            });
        }
    }
}
</script>
<style lang="less" scoped>
.takeadd-wrap {
    margin: 5px;
    background: #fff;
    .c-left-border-blue {
        border-radius: 3px;
        padding: 5px;
        h3 {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-indent: 10px;
        }
        .c-btns-right {
            float: right;
            margin-top: 2px;
            button {
                min-width: 70px;
                margin: 0 5px;
                border: none;
                height: 28px;
                background-color: #576374;
            }
            .c-btn-back {
                background: #c8c8c8;
            }
        }
    }
    .c-top-border-gray {
        border-top: 5px solid #f0f0f0;
        padding: 20px 0;
        .c-form-item {
            width: 45%;
            display: inline-block;
        }
        .c-plain-bg-h {
            border-bottom: 1px solid #f0f0f0;
            height: 40px;
            padding-left: 10px;
            display: flex;
            justify-content: space-between;
            h3 {
                font-size: 14px;
                line-height: 30px;
            }
        }
        .c-form-row-1col {
            a {
                display: inline-block;
                margin-left: 10px;
            }
        }
    }
}
.mg-select-table-header {
    button {
        background-color: #838A95;
        border: none;
        color: #fff;
        padding: 4px 12px;
        height: auto;
        border-radius: 2px;
        margin: 0 4px;
    }
    .reset {
        background: #aaafb8;
    }
    .mg-select-table-tip {
        text-align: right;
        margin: 5px;
        font-size: 13px;
        a {
            display: inline-block;
            margin-left: 10px;
        }
    }
}
/deep/.ivu-modal-footer {
    /deep/.ivu-btn-text {
        border: 1px solid #dcdee2;
    }
}
.modalPage {
    text-align: right;
    margin: 10px 0 0;
}
</style>