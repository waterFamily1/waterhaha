<template>
    <div class="index-add" :style="{height: height+'px'}">
        <div class="index-title">
            <h3>新增指标</h3>
            <div>
                <Button type="info" size="small" style="background:#4b7efe" @click="save()">保存</Button>
                <Button type="info" size="small" style="background:#c8c8c8" @click="cancel()">取消</Button>
            </div>
        </div>
        <div class="index-content">
            <Form :model="formItem" :label-width="150">
                <div class="c-form-row">
                    <div class="c-form-item">
                        <FormItem label="指标名称：">
                            <Input v-model="formItem.name"></Input>
                        </FormItem>
                    </div>
                    <div class="c-form-item">
                        <FormItem label="指标类型：">
                            <Select v-model="formItem.type" style="width:300px">
                                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </div>
                </div>
                <div class="c-form-row">
                    <div class="c-form-item">
                        <FormItem label="区域位置：">
                            <Input v-model="formItem.location"></Input>
                        </FormItem>
                    </div>
                    <div class="c-form-item">
                        <FormItem label="测点名称：">
                            <Input v-model="formItem.sightName" disabled></Input>
                            <Button type="primary" class="sight-btn" @click="addModal = true">添加</Button>
                        </FormItem>
                    </div>
                </div>
            </Form>
        </div>
        <!-- 添加 -->
        <Modal
            v-model="addModal"
            title="添加测点"
            width="650px"
            :footer-hide="true">
            <div class="mg-single-select-table">
                <div class="mg-single-select-table-header">
                    <div class="mg-single-select-table-search">
                        <Input v-model="name" placeholder="测点编号/名称" style="width: 200px;">
                            <Button slot="append" icon="ios-search"></Button>
                        </Input>
                    </div>
                </div>
                <div class="mg-single-table" style="margin-top: 10px">
                    <Table :columns="columns" :data="data">
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <a href="javascript:;" class="table-icon">
                                <Icon type="md-checkmark-circle-outline" style="font-size: 22px;color: #999;" />
                            </a>
                        </template>
                    </Table>
                    <Page :total="40" size="small" show-total show-elevator style="text-align: right;margin-top: 10px;"/>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    name: 'indexAdd',
    data() {
        return {
            height: '',
            formItem: {
                name: '',
                type: '',
                location: '',
                sightName: ''
            },
            typeList: [
                {
                    label: '数据KPI',
                    value: '0'
                },
                {
                    label: '设备KPI',
                    value: '1'
                },
                {
                    label: '关键指标',
                    value: '2'
                }
            ],
            addModal: false,
            name: '',
            columns: [
                {
                    title: '区域位置',
                    key: 'location'
                },
                {
                    title: '测点名称',
                    key: 'name'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data: [
                {
                    location: 'John Brown',
                    name: 18
                }
            ]
        }
    },
    mounted() {
        this.height = document.body.clientHeight-130
    },
    methods: {
        save() {

        },
        cancel() {
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less" scoped>
.index-add {
    margin: 5px;
    background: #fff;
    .index-title {
        padding: 5px;
        h3{
            display: inline-block;
            line-height: 30px;
            text-indent: 10px;
        }
        div{
            float: right;
            button{
                min-width: 70px;
                margin: 0 5px;
                color: #fff;
                border: 0;
            }
        }
    }
    .index-content {
        border-top: 5px solid #f0f0f0;
        padding: 30px 10px 10px;
        .c-form-row {
            .c-form-item {
                width: 45%;
                display: inline-block;
                min-height: 33px;
                /deep/.ivu-form-item-content {
                    /deep/.ivu-input-wrapper {
                        width: 300px;
                    }
                    .ivu-checkbox-wrapper {
                        margin-left: 20px;
                    }
                }
                .sight-btn {
                    margin-left: 20px;
                    height: 28px;
                }
            }
        }
    }
    .mg-single-select-table {
        .mg-single-select-table-header {
            min-height: 40px;
            .mg-single-select-table-search {
                width: 250px;
            }
        }
    }
}
</style>