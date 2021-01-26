<template>
    <div class="c-main-border" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>
                设备详情
                <a href="javaScript:;" @click="takeAttention">{{ attention }}</a>
                <a href="javascript:;" v-if="!equipment.concerned" @click="takeAttention">添加关注</a>
                <a href="javascript:;" v-if="equipment.concerned"  @click="cancelAttention">取消关注</a>
            </h3>
            <div class="c-btns-right">
                <Button @click="goToEdit">编辑</Button>
                <Button class="cancel" @click="back">返回</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <div class="equ-edit-left">
                <div class="equ-edit-img">
                    <img :src="equipment.imageUrl" width="130" height="150" v-if="equipment.imageUrl"> 
                    <img src="http://chaoying.tjdeht.cn:8801/images/a6133ca5be7d6307c4ae35d9e4493f54.png" width="130" height="150" v-if="!equipment.imageUrl">
                </div>
            </div>
            <div class="equ-edit-info">
                <Row>
                    <Col span="12">
                        <div class="c-form-item">
                            <label>设备名称：</label>
                            <span>{{ equipment.name }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>设备编号：</label>
                            <span>{{ equipment.code }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>资产状态：</label>
                            <span v-if="equipment.state == 1">启用</span>
                            <span v-if="equipment.state == 2">封存</span>
                            <span v-if="equipment.state == 3">报废</span>
                        </div>
                        <div class="c-form-item">
                            <label>所属组织：</label>
                            <span>{{ equipment.orgName }}</span>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="c-form-item">
                            <label>设备类型：</label>
                            <span>{{ equipment.typeName }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>区域位置：</label>
                            <span>{{ equipment.processName }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>ABC类：</label>
                            <span v-if="equipment.abc == 1">A</span>
                            <span v-if="equipment.abc == 2">B</span>
                            <span v-if="equipment.abc == 3">C</span>
                        </div>
                        <div class="c-form-item">
                            <label>责任人：</label>
                            <span>{{ equipment.personResponsibleNames }}</span>
                        </div>
                    </Col>
                </Row>
            </div>
            <div class="equ-edit-right">
                <a href="javascript:;" title="查看AR图片" class="equ-add-icon-ar" @click="arUploadShown = true"></a>
            </div>
        </div>
        <div class="c-top-border-gray" style="clear: both;">
            <div class="equ-tab">
                <Tabs :animated="false" @on-click="tabClick" :value="activeTab">
                    <TabPane label="附属信息" name="info">
                        <attach-info v-bind="equipment"></attach-info>
                    </TabPane>
                    <TabPane label="原厂附件" name="attach">
                        <equ-attach :attachData="equAttachs" :isView="true"></equ-attach>
                    </TabPane>
                    <TabPane label="相关资料" name="file">
                        <equ-file :fileData="equFiles" :isView="true"></equ-file>
                    </TabPane>
                    <TabPane label="设备参数" name="params">
                        <equ-params :paramsData = "equParam"></equ-params>
                    </TabPane>
                    <TabPane label="上级设备" name="parent">
                        <parent-equ :parentEquData="parentEquData"></parent-equ>
                    </TabPane>
                    <TabPane label="相关测点" name="mpoint">
                        <equ-mpoint :pointsData= "equMpoints"></equ-mpoint>
                    </TabPane>
                </Tabs>
            </div>
        </div>

        <!-- AR -->
        <Modal v-model="arUploadShown" title="AR管理" width="400">
            <div class="equ-ar">
                <div class="equ-ar-left">
                    <div class="equ-ar-img">
                        <img :src="arUploadSrc" width="130" height="180" v-show="!!arUploadSrc" v-img>
                    </div>
                </div>
                <div class="equ-ar-right">
                    <div v-for="(arItem, index) in arUploadItems" class="equ-ar-img-item">
                        <span class="equ-ar-img-url ell" :title="arItem.name" @click="ArImageView(arItem)">{{arItem.name}}</span>
                    </div>
                    <div v-show="arUploadItems.length == 0" class="c-nodata-tip">暂无AR图片</div>
                </div>
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import { attentionMethod, attentionMethod1, detailMethod, parentMethod } from '@/api/deviceManage/equDetail'

import attachInfo from '../book/info.vue'
import equAttach from '../book/attach.vue'
import equFile from '../book/file.vue'
import equParams from '../book/params.vue'
import parentEqu from '../book/parent.vue'
import equMpoint from '../book/mpoint.vue'

export default {
    data(){
        return {
            height: '',
            concernId: 0,
            equipment: [],
            arUploadShown: false,
            arUploadItems: [],
            arUploadSrc: '',
            activeTab: 'info',
            equAttachs: [],
            isEdit: '',
            equFiles: [],
            equParam: {},
            parentEquData: {},
            equMpoints: [],
            attention: ''
        }
    },
    components: {
        attachInfo,
        equAttach,
        equFile,
        equParams,
        parentEqu,
        equMpoint
    },
    created () {
        this.isEdit = sessionStorage.getItem('isEdit')
    },
    mounted() {
        this.height = document.body.clientHeight - 50
        this.concernId = this.$route.query.ids
        this.getDetail()
    },
    methods: {
        back() {
            this.$router.back();
        },
        goToEdit() {
            this.$router.push({
                path: '/editDetail'
            });
        },
        getDetail() {
            let id =  this.concernId
            detailMethod(id).then(res=> { 
                console.log(res.data)
                // let equipment = res.data.equipment
                this.equipment = res.data.equipment
                this.arUploadItems = res.data.equArs || []
                this.equAttachs = res.data.equAttachs
                this.equFiles = res.data.equFiles
                this.equParam = res.data.equParam || {}
                this.equMpoints = res.data.equMpoints
                console.log(this.equMpoints)
            }).catch(err=> {

            })
            
            parentMethod(id).then(res=> { 
                console.log(res.data)
                this.parentEquData = res.data
            }).catch(err=> {

            })
        },
        takeAttention() {
            attentionMethod({
                concernId: this.concernId,
                type: 'equipment'
            }).then(res=> {
                if(res.status == 200) {
                    this.$Notice.success({
                        title: '关注成功！'
                    });
                    this.equipment.concerned = true;
                }
            }).catch(err=> {

            })
        },
        cancelAttention() {
            this.$Modal.confirm({
                title: '提示',
                content: '是否要取消关注此条数据？',
                onOk: () => {
                    let concernIds = this.concernId
                    attentionMethod1({
                        concernIds
                    }).then(res=> {
                        if(res.status == 200) {
                            this.$Notice.success({
                                title: '成功',
                                desc: '取消关注成功！'
                            });
                            this.equipment.concerned = false
                        }
                    }).catch(err=> {

                    })
                }
            });
        },
        ArImageView(data) {
            this.arUploadSrc = data.url;
        },
        tabClick(tab) {
            this.activeTab = tab;
        }
    }
}
</script>

<style lang="less" scoped>
.c-main-border {
    border: 5px solid #f0f0f0;
    background: #fff;
    overflow: auto;
    .c-left-border-blue {
        padding: 5px;
        h3 {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-indent: 10px;
            a {
                color: #4b7efe;
                margin-left: 20px;
                display: inline-block;
                font-size: 14px;
            }
        }
        .c-btns-right {
            float: right;
            margin-top: 2px;
            /deep/.ivu-btn {
                height: auto;
                background: #4b7efe;
                font-size: 12px;
                padding: 4px 0;
                min-width: 70px;
                text-align: center;
                color: #fff;
                border: 0;
                border-radius: 3px;
                margin: 0 5px;
            }
            .cancel {
                background: #c8c8c8;
            }
        }
    }
    .c-top-border-gray {
        border-top: 5px solid #f0f0f0;
        padding: 10px 14px;
        display: flex;
        position: relative;
        .equ-edit-left {
            width: 130px;
            position: relative;
        }
        .equ-edit-info {
            width: 800px;
            .c-form-item {
                display: inline-block;
                min-height: 33px;
                width: 100%;
                margin-bottom: 10px;
                label {
                    display: inline-block;
                    width: 100px;
                    line-height: 35px;
                    text-align: right;
                }
                span {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    max-width: 210px;
                    display: inline-block;
                    vertical-align: middle;
                }
            }
        }
        .equ-edit-right {
            position: absolute;
            right: 10px;
            .equ-add-icon-ar {
                display: block;
                width: 30px;
                height: 30px;
                background: url('../../../assets/images/AR.png') no-repeat 0 0;
                margin: 30px;
            }
        }
        .equ-tab {
            width: 100%;
        }
    }
}
.equ-ar {
    height: 220px;
    .equ-ar-left {
        float: left;
        width: 130px;
        .equ-ar-img {
            width: 130px;
            height: 180px;
            background-color: #F9F9F9;
        }
    }
    .equ-ar-right {
        overflow: hidden;
        margin-left: 150px;
        .c-nodata-tip {
            text-align: center;
            line-height: 50px;
        }
    }
}
</style>