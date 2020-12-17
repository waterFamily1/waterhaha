<template>
    <div class="original-attach">
        <!-- 原厂附件 -->
        <div class="attach-btns" v-show="isEdit">
            <Button @click="del()">删除</Button>
            <Button @click="openModal()">添加备件</Button>
        </div>
        <div class="original-attach-content common-table-c clearfix">
            <Table size="small" :columns="columns" :data="attachData" @on-selection-change="changeSelection" stripe></Table>
        </div>
        <!-- 添加备件 -->
        <Modal
            v-model="addAttachmentModal" 
            :closable="true"
            title="备件信息"
            width="520">
            <Form 
                ref="attachForm" 
                :model="attachItem" 
                :label-width="90" 
                :rules="ruleValidate" 
                :show-message="false"
            >
                <Row>
                    <Col span="12">
                        <FormItem label="名称:" prop="name">
                            <Input v-model="attachItem.name"></Input>
                        </FormItem>
                        <FormItem label="计量单位:" prop="unit">
                            <Select v-model="attachItem.unit" placement="top">
                                <Option v-for="item in unitList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="型号:">
                            <Input v-model="attachItem.model"></Input>
                        </FormItem>
                    </Col>
                    <Col span="11" :style="{marginLeft: '10px'}">
                        <FormItem label="类型:" prop="type">
                            <Select v-model="attachItem.type">
                                <Option :value="1">备件</Option>
                                <Option :value="2">耗材</Option>
                                <Option :value="3">工具</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="规格:">
                            <Input v-model="attachItem.specification"></Input>
                        </FormItem>
                        <FormItem label="出厂数量:" prop="quantity">
                            <Input v-model="attachItem.quantity"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="备注:" prop="remarks">
                            <Input v-model="attachItem.remarks"></Input>
                        </FormItem>
                        <FormItem label="备件图片:">
                            <div>
                                <img v-if="attachItem.imageUrl" :src="attachItem.imageUrl" height="100">
                                <Upload
                                    class="avatar-uploader"
                                    action="/zuul/base/api/files/upload"
                                    :show-upload-list="false"
                                    :max-size="2048"
                                    :before-upload="beforeUpload"
                                    :on-success="handleAvatarSuccess"
                                    accept="image/*">
                                    <Button>上传图片</Button>
                                </Upload>
                            </div>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer" >
                <Button type="default" @click="cancel()">取消</Button>
                <Button type="primary" @click="add('attachForm')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import util from '@/libs/public_js'
import _default_img from '../../../assets/images/default.png'

const _typMap = {
    '1': '备件',
    '2': '耗材',
    '3': '工具'
}

function AItem(opt) {
    this.name = opt.name;
    this.code = opt.code;
    this.type = opt.type;
    this.model = opt.model;
    this.specification = opt.specification;
    this.quantity = opt.quantity;
    this.unit = opt.unit;
    this.imageUrl = opt.imageUrl;
    this.tempID = util.guid();
    this.remarks = opt.remarks;
    this.index = opt.index;
}

export default {
    name: 'originalAttach',
    props: {
        attachData: {
            type: Array
        },
        isEdit: {
            type: Boolean
        },
        isView: {
            type: Boolean,
            default: false
        }
    },
    data() {
        let columns = [
            {
                type: 'selection',
                width: 60,
                align: 'center'
            }, {
                title: '备件图片',
                key: 'img',
                width: 100,
                render: (h, data) => {
                    return h('img', {
                        attrs: {
                            src: data.row.imageUrl?data.row.imageUrl:_default_img,
                            width: 80,
                            height: 80
                        }
                    });
                }
            }, {
                title: '备件编号',
                key: 'code',
                width: 150
            }, {
                title: '备件名称',
                key: 'name'
            }, {
                title: '类型',
                key: 'typ',
                width: 80,
                render: (h, data) => {
                    return h('span', [_typMap[data.row.type]])
                }
            }, {
                title: '型号',
                key: 'model'
            }, {
                title: '规格',
                key: 'specification'
            }, {
                title: '出厂数量',
                key: 'quantity',
                width: 100
            }, {
                title: '单位',
                key: 'unit',
                width: 60
            }, {
                title: '备注',
                key: 'remarks'
            }
        ];

        if(this.isEdit){
            columns.push({
                title: '操作',
                key: 'action',
                render: (h,data)=> {
                    return h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size: 'small'
                        }),
                        style: {
                            marginRight: '2px',
                            fontSize: '12px',
                            zIndex: '999'
                        },
                        on: {
                            click: () => { this.edit(data) }
                        }
                    }, '编辑')
                }
            })
        }
        return {
            selectedIds: [],
            isAdd: true,
            addAttachmentModal: false,
            unitList: [
                {
                    value: '个',
                    label: '个'
                },
                {
                    value: '盒',
                    label: '盒'
                },
                {
                    value: '台',
                    label: '台'
                },
                {
                    value: '套',
                    label: '套'
                },
                {
                    value: '件',
                    label: '件'
                },
                {
                    value: '箱',
                    label: '箱'
                }
            ],
            attachItem: {
                name: '',
                type: '',
                model: '',
                specification: '',
                quantity: '',
                unit: '',
                imageUrl: '',
                remarks: ''
            },
            ruleValidate: {
                name: [{ required: true, trigger: 'blur' }],
                type: [{ required: true, trigger: 'change',
                    validator(rule, value, callback, source, options) {
                        if (!value)
                            callback(new Error());
                        else callback();
                    }
                }],
                unit: [{ required: true, trigger: 'change' }],
                quantity: [
                    {
                        validator(rule, value, callback, source, options) {
                            if (value && isNaN(parseInt(value)))
                                callback(new Error());
                            else callback();
                        }
                    }
                ]
            },
            columns: this.isView ? columns.slice(1) : columns
        }
    },
    methods: {
        del() {
            var _self = this
            if (this.selectedIds.length) {
                this.$Modal.confirm({
                    title: '删除附件',
                    content: '<p>您确定要删除吗？</p>',
                    onOk: () => {
                        var selected = this.selectedIds,
                            attachData = this.attachData;
                        for (var i = 0, len = selected.length; i < len; i++) {
                            innerLoop: for (
                                var j = 0, jlen = attachData.length;
                                j < jlen;
                                j++
                            ) {
                                if (
                                    selected[i].id == attachData[j].id ||
                                    selected[i].tempID == attachData[j].tempID
                                ) {
                                    _self.$emit(
                                        'delAttaItem',
                                        selected[i].id || selected[i].tempID
                                    );
                                    break innerLoop
                                }
                            }
                        }
                    }
                })
            } else {
                this.$Notice.warning({
                    title: '请选择',
                    desc: '请至少选择一个附件'
                })
            }
        },
        openModal() {
            this.isAdd = true;
            this.attachItem = {
                name: '',
                type: '',
                model: '',
                specification: '',
                quantity: '',
                unit: '',
                imageUrl: '',
                remarks: ''
            };
            this.$refs['attachForm'].resetFields();
            this.addAttachmentModal = true;
        },
        add(name) { 
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$emit(this.isAdd ? 'addAttaItem': 'editAttaItem', new AItem(this.attachItem));
                    this.cancel();
                }
            });
        },
        cancel() {
            this.addAttachmentModal = false
        },
        changeSelection(data) {
            this.selectedIds = data;
        },
        edit(data){
            this.isAdd = false
            this.$refs['attachForm'].resetFields()           
            this.attachItem = JSON.parse(JSON.stringify(data.row))
            this.attachItem.index = data.index
            this.addAttachmentModal = true          
        },
         // 上传图片
        beforeUpload(file) {
            const isLt10M = file.size / 1024 / 1024 < 2;
            if (!isLt10M) {
                this.$Message.error("上传图片大小不能超过 2MB!");
            }
            return isLt10M;
        },
        handleAvatarSuccess(res, file) {
            this.attachItem.imageUrl = res.fullPath;
        }
    }
}
</script>

<style lang="less" scoped>
.original-attach {
    .original-attach-content {
        /deep/.ivu-table-row {
            img {
                display: block;
                margin: 5px 0;
            }
        }
    }
    .attach-btns {
        margin-bottom: 15px;
        .ivu-btn {
            height: auto;
            color: #fff;
            background-color: #576374;
            border: none;
            padding: 4px 12px;
            font-size: 12px;
            margin-right: 5px;
        }
    }
}
.avatar-uploader {
    /deep/.ivu-btn {
        height: auto;
        color: #fff;
        background-color: #576374;
        border: none;
        padding: 4px 12px;
        font-size: 12px;
    }
}
</style>