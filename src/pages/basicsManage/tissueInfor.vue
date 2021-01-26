<template>
    <div class="tissue-box" :style="{height: height+'px'}">
        <div class="tissue-tree">
            <div class="tissue-left">
                <div class="tissue-title">
                    <h3>组织结构</h3>
                </div>
                <div class="tissue-list">
                    <Tree :data="baseData" :render="renderContent" 
                    @on-select-change="getNode" class="demo-tree-render"></Tree>
                </div>
            </div>
            <div class="tissue-right">
                <div class="tissue-title">
                    <h3>组织信息</h3> 
                    <span v-if="appear">
                        <Button type="primary" @click="saveHandle()">保存</Button>
                        <Button @click="cancel()">取消</Button>
                    </span>
                </div>
                <div class="tissue-content">
                    <Form :model="tissueList" label-position="right" :label-width="80" autocomplete="off">
                        <div class="form-li">
                            <h4>组织名称</h4>
                            <FormItem :label-width="0" v-if="appear">
                                <Input v-model="tissueList.name"></Input>
                            </FormItem>
                            <FormItem :label-width="0" v-if="appearOther">
                                <span>{{ name }}</span>
                            </FormItem>
                        </div>
                        <div class="form-li">
                            <h4>组织类别</h4>
                            <FormItem :label-width="0" v-if="appear">
                                <RadioGroup v-model="tissueList.type" @on-change="radioChange">
                                    <Radio label="1" :disabled="editDisable">公司</Radio>
                                    <Radio label="2" :disabled="editDisable">工厂</Radio>
                                    <Radio label="3" :disabled="editDisable">部门</Radio>
                                    <Radio label="4" :disabled="editDisable">班组</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem :label-width="0" v-if="appearOther">
                                <span>{{ tissueList.typeName }}</span>
                            </FormItem>
                        </div>
                        <div class="form-box" v-if="appear && treeType == '1'">
                            <div class="form-title">公司信息</div>
                            <FormItem label="公司全称：">
                                <Input v-model="tissueList.fullName"></Input>
                            </FormItem>
                            <FormItem label="负责人：">
                                <Input v-model="tissueList.leader"></Input>
                            </FormItem>
                            <FormItem label="手机：">
                                <Input v-model="tissueList.tel"></Input>
                            </FormItem>

                            <FormItem label="地址：">
                                <Input v-model="tissueList.address"></Input>
                            </FormItem>
                            <FormItem label="附属信息：">
                                <Input v-model="tissueList.remarks"></Input>
                            </FormItem>
                        </div>
                        <div class="form-box form-other" v-if="appearOther && treeType == '1'">
                            <div class="form-title">公司信息</div>
                            <div class="other-li">
                                <span>公司全称：</span>
                                <span>{{ fullName }}</span>
                            </div> 
                            <div class="other-li">
                                <span>负责人：</span>
                                <span>{{ leader }}</span>
                            </div>
                            <div class="other-li">
                                <span>手机：</span>
                                <span>{{ tel }}</span>
                            </div>
                            <div class="other-li">
                                <span>地址：</span>
                                <span>{{ address }}</span>
                            </div>
                            <div class="other-li">
                                <span>附属信息：</span>
                                <span>{{ remarks }}</span>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
        <Modal
            v-model="cancelModal"
            width="260"
            :closable="false"
            @on-ok="cancelOk"
            @on-cancel="cancelClose">
            <p style="text-align:left">
                <Icon type="ios-information-circle" style="color:#f60;margin"></Icon>
                <span>你确定要删除吗？</span>
            </p>
        </Modal>
    </div>
</template>
<script>
import { getAllOrg, cancelOrg, appendOrg, editOrg } from '@/api/basic/org'
import createTree from '@/libs/public-util'

export default {
    name: 'tissueInfor',
    data () {
        return {
            identify: '',
            ifGet: true,
            baseData: [],
            buttonProps: {
                type: 'default',
                size: 'small'
            },
            tissueList: {
                name: '',
                type: '',
                fullName: '',
                leader: '',
                tel: '',
                address: '',
                remarks: ''
            },
            name: '',
            appear: false,
            appearOther: false,
            height: '',
            cancelModal: false,
            treeId: '',
            parentId: '',
            treeType: '',
            fullName: '',
            leader: '',
            tel: '',
            address: '',
            remarks: '',
            editDisable: false
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.allOrg()
    },
    methods: {
        allOrg () {
            let ifGet = this.ifGet
            getAllOrg(ifGet).then(res => {
                // console.log(JSON.stringify(res.data))
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].expand = true
                    treeItem.push(trees[i])
                }
                this.baseData = createTree(treeItem,0)
                // console.log(this.baseData)
            }).catch(err => {
                // 异常情况
            })
        },
        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%'
                },
                on: {
                    //鼠标进入
                    mouseover: () => {
                        this.$set(data,'is_show', true)
                    },
                    //鼠标离开
                    mouseout: () => {
                        this.$set(data,'is_show', false)
                    }
                }
            }, [
                h('span', [
                    h('span', data.title)
                ]),
                h('span', [
                    (data.parentId != 0) && h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size: 'small'
                        }),
                        style: {
                            marginRight: '2px',
                            fontSize: '12px',
                            zIndex: '999',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            click: () => { this.edit(root, node, data) }
                        }
                    },'编辑'),
                    (data.parentId != 0) && h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size: 'small'
                        }),
                        style: {
                            marginRight: '2px',
                            fontSize: '12px',
                            zIndex: '999',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            click: () => { this.remove(root, node, data) }
                        }
                    },'删除'),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size: 'small'
                        }),
                        style: {
                            fontSize: '12px',
                            zIndex: '999',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            click: () => { this.append(root, node, data) }
                        }
                    },'新建')
                ])
            ]);
        },
        getNode(data) {
            // console.log(JSON.stringify(data[0]))
            this.parentId = data[0].id
            this.treeType = data[0].type.toString()
            this.fullName = data[0].fullName
            this.leader = data[0].leader
            this.tel = data[0].tel
            this.address = data[0].address
            this.remarks = data[0].remarks
            this.identify = data[0].type.toString()

            this.name = data[0].name
            this.tissueList.type = data[0].type
            if(data[0].type == 1) {
                this.tissueList.typeName = '公司'
            } else if (data[0].type == 2) {
                this.tissueList.typeName = '工厂'
            } else if (data[0].type == 3) {
                this.tissueList.typeName = '部门'
            } else if (data[0].type == 4) {
                this.tissueList.typeName = '班组'
            }

            if(data[0].parentId == 0) {
                this.appearOther = false
                this.appear = false
            } else {
                this.appearOther = true
                this.appear = false
            }
        },
        edit (root, node, data) {
            this.editDisable = true
            this.appearOther = false
            this.appear = true
            this.tissueList.name = data.name
            this.tissueList.type = data.type.toString()
            this.tissueList.address = data.address
            this.tissueList.fullName = data.fullName
            this.tissueList.leader = data.leader
            this.tissueList.remarks = data.remarks
            this.tissueList.tel = data.tel
        },
        append (root, node, data) {
            this.tissueList.type = data.type.toString()
            this.editDisable = false
            this.appear = true
            this.appearOther = false
            this.tissueList.name = ''
        },
        remove (root, node, data) {
            this.cancelModal = true
            this.treeId = data.id
        },
        cancelOk () {
            let treeId = this.treeId
            cancelOrg(treeId).then(res => {
                // console.log(JSON.stringify(res.data))
                this.success1(true)
                this.allOrg()
            }).catch(err => {
                // 异常情况
            })
        },
        cancelClose () {
            this.cancelModal = false
        },
        newFun() {
            this.appear = true
            this.tissueList.name = ''
        },
        cancel() {
            this.appear = false
            this.appearOther = true
            this.treeType = this.identify
            this.editDisable = false
        },
        saveHandle() {
            if(this.editDisable == true) {
                editOrg({
                    name: this.tissueList.name,
                    type: this.tissueList.type,
                    address: this.tissueList.address,
                    fullName: this.tissueList.fullName,
                    leader: this.tissueList.leader,
                    remarks: this.tissueList.remarks,
                    tel: this.tissueList.tel,
                    id: this.parentId
                }).then(res => {
                    // console.log(JSON.stringify(res.data))
                    this.success(true)
                    this.allOrg()
                    this.appear = false
                    this.appearOther = true
                }).catch(err => {
                    // 异常情况
                })
            } else {
                appendOrg({
                    name: this.tissueList.name,
                    parentId: this.parentId,
                    type: this.tissueList.type,
                    address: this.tissueList.address,
                    fullName: this.tissueList.fullName,
                    leader: this.tissueList.leader,
                    remarks: this.tissueList.remarks,
                    tel: this.tissueList.tel
                }).then(res => {
                    // console.log(JSON.stringify(res.data))
                    this.success2(true)
                    this.allOrg()
                    this.appear = false
                    this.appearOther = true
                }).catch(err => {
                    // 异常情况
                })
            }
        },
        radioChange(val) {
            this.treeType = val
        },
        success (nodesc) {
            this.$Notice.success({
                title: '编辑成功',
                desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
            });
        },
        success1 (nodesc) {
            this.$Notice.success({
                title: '删除成功',
                desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
            });
        },
        success2 (nodesc) {
            this.$Notice.success({
                title: '新建成功',
                desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
            });
        }
    }
}
</script>
<style lang="less" scoped>
.tissue-box {
    margin-top: 5px;
    .tissue-tree {
        display: flex;
        min-height: 100%;
        height: 100%;
        .tissue-title {
            border-bottom: 1px solid #f0f0f0;
            height: 40px;
            line-height: 40px;
            text-indent: 10px;
            color: #495060;
            h3 {
                display: inline;
                font-size: 14px;
            }
            span {
                display: inline;
                float: right;
            }
            .ivu-btn {
                height: 25px;
                font-size: 12px;
                padding: 0 20px;
            }
            .ivu-btn-primary {
                margin-right: 15px;
            }
        }
        .tissue-left {
            width: 350px;
            background: #FFF;
            height: 100%;
            .tissue-list {
                width: 100%;
                padding: 0 10px;
                /deep/.ivu-tree-title {
                    width: 96%;
                    padding: 0px;
                    // .tree-btn {
                    //     visibility: hidden;
                    // }
                }
                // /deep/.ivu-tree-title:hover {
                //     .tree-btn {
                //         visibility: visible;
                //     }
                // }
            }
        }
        .tissue-right {
            flex: 1;
            min-height: 100%;
            height: 100%;
            width: 100%;
            background: #FFF;
            border-left: 5px solid #f5f7f9;
            border-right: 5px solid #f5f7f9;
            .tissue-content {
                padding: 20px 50px;
                /deep/.ivu-input {
                    width: 300px;
                }
                /deep/.ivu-form .ivu-form-item-label {
                    padding-right: 0;
                }
                .form-li {
                    border-bottom: 1px dashed #f0f0f0;
                    h4 {
                        height: 30px;
                        margin-top: 10px;
                    }
                    /deep/.ivu-form-item {
                        margin-bottom: 14px;
                    }
                }
                .form-box {
                    .form-title {
                        background-color: #f4f4f4;
                        height: 30px;
                        line-height: 30px;
                        text-indent: 20px;
                        font-weight: 100;
                        font-size: 13px;
                        margin: 10px 0px;
                    }
                }
                .form-other {
                    .other-li {
                        display: flex;
                        font-size: 13px;
                        line-height: 30px;
                        span:nth-of-type(1) {
                            width: 70px;
                            text-align: right;
                        }
                    }
                }
            }
        }
    }
    /deep/.ivu-row {
        margin: 0!important;
        /deep/.ivu-col{
            background: #fff;
            padding: 0!important;
        }
        /deep/.ivu-col-span-xl-6 {
            width: 24%;
            margin-right: 1%;
        }
    }
}
/deep/.ivu-modal-footer {
    border-top: none;
    /deep/.ivu-btn {
        font-size: 13px;
        height: 24px;
        padding: 0 8px;
    }
}
</style>