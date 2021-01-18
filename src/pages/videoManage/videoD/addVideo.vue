<template>
    <div class="add-wrap" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>视频添加</h3> 
            <div class="c-btns-right">
                <Button type="primary" @click="saveHandle('formValidate')">保存</Button>
                <Button type="primary" class="c-btn-back" @click="cancleHandle()">取消</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
                <div class="c-form-row-2">
                    <div class="c-form-item">
                        <FormItem label="区域位置：" prop="processid">
                            <TreeSelect 
                                v-model="formValidate.processid" 
                                :data="siteList" 
                                value=""
                                v-width="200" 
                            />
                        </FormItem>
                    </div>
                    <div class="c-form-item">
                        <FormItem label="视频名称：" prop="name">
                            <Input v-model="formValidate.name" placeholder="视频名称" style="width: 200px;"></Input>
                        </FormItem>
                    </div>
                </div>
                <div class="c-form-row">
                    <div class="c-form-item">
                        <FormItem label="URL地址：" prop="url">
                            <Input v-model="formValidate.url" placeholder="URL"></Input>
                        </FormItem>
                    </div>
                </div>
                <div class="c-form-row-2">
                    <div class="c-form-item">
                        <FormItem label="定时抓拍：">
                            <Switch v-model="formValidate.takeThumb" />
                        </FormItem>
                    </div>
                    <div class="c-form-item">
                        <FormItem label="定时抓拍周期：">
                            <Input v-model="formValidate.takeThumbCycle" style="width: 100px;" :disabled="!formValidate.takeThumb">
                                <span slot="append">分钟</span>
                            </Input>
                        </FormItem>
                    </div>
                </div>
                <div class="c-form-row-2">
                    <div class="c-form-item">
                        <FormItem label="触发报警：">
                            <span>{{ formValidate.alarmName }}</span>
                            <a href="javascript:;" class="c-btn-text" @click="modalShown = true">[选择]</a>
                            <a href="javascript:;" class="c-btn-text" @click="cleanAlarm">[清除]</a>
                        </FormItem>
                    </div>
                    <div class="c-form-item">
                        <FormItem label="触发间隔：">
                            <Input v-model="formValidate.alarmThumbInterval" style="width: 100px;">
                                <span slot="append">分钟</span>
                            </Input>
                        </FormItem>
                    </div>
                </div>
                <div class="c-form-row-2">
                    <div class="c-form-item">
                        <FormItem label="触发抓拍频率：">
                            <div class="item-content">
                                <div class="video-alarm-item">
                                    <span>抓拍</span>
                                    <Select v-model="formValidate.alarmThumbSec" size="small" style="width:70px">
                                        <Option v-for="(item,key) in secondCount" :value="item" :key="key">{{ item }}</Option>
                                    </Select>
                                    <span>张，每张间隔1秒钟</span>
                                </div>
                                <div class="video-alarm-item">
                                    <span>抓拍</span>
                                    <Select v-model="formValidate.alarmThumbMin" size="small" style="width:70px">
                                        <Option v-for="(item,key) in minCount" :value="item" :key="key">{{ item }}</Option>
                                    </Select>
                                    <span>张，每张间隔1分钟</span>
                                </div>
                                <div class="video-alarm-item">
                                    <span>抓拍</span>
                                    <Select v-model="formValidate.alarmThumbTenMin" size="small" style="width:70px">
                                        <Option v-for="(item,key) in tenMinCount" :value="item" :key="key">{{ item }}</Option>
                                    </Select>
                                    <span>张，每张间隔10分钟</span>
                                </div>
                            </div>
                        </FormItem>
                    </div>
                </div>
            </Form>
        </div>
        <Modal
            v-model="modalShown"
            width="610"
            title="选择报警定义">
            <div class="modal-body">
                <div class="body-header">
                    <div class="body-header-item">
                        <label>关键字：</label>
                        <Input v-model="queryName" placeholder="编号/报警名称" style="width: 150px" />
                    </div>
                    <div class="body-header-item">
                        <label>区域位置：</label>
                        <TreeSelect 
                            v-model="orgid" 
                            multiple 
                            :data="orgList" 
                            v-width="150" 
                        />
                    </div>
                    <div class="body-header-item body-header-btn">
                        <Button @click="getList">搜索</Button>
                        <Button class="reset" @click="resetModal">重置</Button>
                    </div>
                </div>
                <Table stripe :columns="modalColumns" :data="modalData"></Table>
                <Page 
                    :total="modalTotal" 
                    size="small" 
                    @on-change="pageChange"
                    show-elevator show-total 
                    style="text-align: right;margin-top: 10px;" />
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
import { orgMethod, orgMethod1, listMethod, saveMethod, editMethod, saveMethod1 } from '@/api/videoM/deploy'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'
import { mapState } from 'vuex'

export default {
    name: 'addVideo',
    data() {
        return {
            height: '',
            id: '',
            areaData: [],
            formValidate: {
                id: null,
                processid: '',
                name: '',
                url: '',
                takeThumb: false,
                takeThumbCycle: 60,
                alarmid: null,
                alarmName: '',
                alarmThumbInterval: 10,
                alarmThumbSec: '3',
                alarmThumbMin: '2',
                alarmThumbTenMin: '1'
            },
            ruleValidate: {
                processid: [
                    { required: true, message: '请选择区域位置', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入视频名称', trigger: 'blur' },
                    { max: 20, message: '名称不能超过20个字符', trigger: 'change' }
                ],
                url: [
                    { required: true, message: '请输入URL', trigger: 'blur'},
                    { type: 'url', message: '请输入正确的URL格式' }
                ],
                takeThumbCycle:[
                    {message: '请输入数值',type: 'number',trigger: 'change'},
                    {
                        validator (rule, value, callback) {
                            if(value){
                                var pattern = /^[1-9]\d*$/;
                                if(pattern.test(value)) {
                                    callback();
                                } else {
                                    callback(new Error('请输入正整数'));
                                }
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                alarmThumbInterval:[
                    {message: '请输入数值',type: 'number',trigger: 'change'},
                    {
                        validator (rule, value, callback) {
                            if(value) {
                                var pattern = /^[1-9]\d*$/;
                                if(pattern.test(value)) {
                                    callback();
                                } else {
                                    callback(new Error('请输入正整数'));
                                }
                            } else {
                                callback();
                            }
                        }
                    }
                ]
            },
            siteList: [],
            modalShown: false,
            orgList: [],
            queryName: '',
            orgid: [],
            modalColumns: [
                { title: '报警名称编号', key: 'nameNumber', ellipsis: true },
                { title: '报警名称', key: 'alarmName', ellipsis: true },
                { title: '报警等级', key: 'alarmLevel',
                    render: (h, data) => {
                        return h("span", {
                            class: ['alarm-lev-'+data.row.alarmLevel]
                        }, data.row.alarmLevel+'级');
                    }
                },
                { title: '区域位置', key: 'siteName', ellipsis: true },
                {
                    title: '操作',
                    key: 'action',
                    width: 80,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: 'md-checkmark-circle-outline'
                                },
                                style: {
                                    fontSize: '22px',
                                    color: '#999'
                                },
                                on: {
                                    click: () => {
                                        this.closeModal(params.row)
                                    }
                                }
                            })
                        ]);
                    }
                }
            ],
            modalData: [],
            modalTotal: 0,
            modalPage: 1
        }
    },
    computed : mapState({
        secondCount: (state) => state.map.video.secondCount,
        minCount: (state) => state.map.video.minCount,
        tenMinCount: (state) => state.map.video.tenMinCount
    }),
    mounted() {
        this.height = document.body.clientHeight-80
        this.getOrg()
        this.getOrg1()
        this.getList()
        this.id = this.$route.query.id
        if(this.$route.query.id) {
            this.getEdit()
        }
    },
    methods: {
        getOrg() {
            orgMethod().then(res=> {
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id.toString()
                    treeItem.push(trees[i])
                }
                this.siteList = createTree(treeItem, 0)
            }).catch(err=> {

            })
        },
        getOrg1() {
            orgMethod1().then(res=> {
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.orgList = createTree(treeItem, 0)
            }).catch(err=> {

            })
        },
        getList() {
            let queryName = this.queryName
            let siteId = this.orgid
            let currentPage = this.modalPage
            listMethod({
                queryName,
                siteId,
                currentPage
            }).then(res=> {
                this.modalData = res.data.items
                this.modalTotal = res.data.total
            })
        },
        resetModal() {
            this.queryName = ''
            this.orgid = ''
            this.modalPage = 1
        },
        pageChange(index) {
            this.modalPage = index
            this.getList()
        },
        closeModal(param) {
            this.modalShown = false
            this.formValidate.alarmName = param.alarmName
            this.formValidate.alarmid = param.id
        },
        cleanAlarm() {
            this.formValidate.alarmid = null
            this.formValidate.alarmName = null
        },
        saveHandle(name) {
            let videoFormParams = JSON.parse(JSON.stringify(this.formValidate))
            videoFormParams.takeThumbCycle = videoFormParams.takeThumb ? videoFormParams.takeThumbCycle : ''
            videoFormParams.takeThumb = (videoFormParams.takeThumb ? 'Y' : 'N')
            videoFormParams.takeThumbCycle = (videoFormParams.takeThumbCycle == '' ? null : videoFormParams.takeThumbCycle)
            videoFormParams.alarmThumbInterval = (videoFormParams.alarmThumbInterval == '' ? null : videoFormParams.alarmThumbInterval)
            this.$refs[name].validate((valid) => {
                if(valid) {
                    if(this.id) {
                        saveMethod1(videoFormParams).then(res=> {
                            if(res.data.count) {
                                this.$Notice.success({
                                    title: '成功',
                                    desc: '数据保存成功',
                                    duration: 3
                                });
                                this.$router.push({
                                    path: '/video'
                                });
                            }
                        })
                    } else {
                        saveMethod(videoFormParams).then(res=> {
                            if(res.data.id) {
                                this.$Notice.success({
                                    title: '成功',
                                    desc: '数据保存成功',
                                    duration: 3
                                });
                                this.$router.push({
                                    path: '/video'
                                });
                            }
                        })
                    }
                }
            })
        },
        getEdit() {
            editMethod(this.$route.query.id).then(res=> {
                this.formValidate = res.data
                this.formValidate.processid = res.data.processid.toString()
                this.formValidate.takeThumb = res.data.takeThumb == 'Y' ? true : false
                this.formValidate.alarmThumbSec = res.data.alarmThumbSec.toString()
                this.formValidate.alarmThumbMin = res.data.alarmThumbMin.toString()
                this.formValidate.alarmThumbTenMin = res.data.alarmThumbTenMin.toString()
            })
        },
        cancleHandle() {
            this.$router.back()
        }
    }
}
</script>
<style lang="less" scoped>
.add-wrap {
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
            .ivu-btn {
                height: auto;
                min-width: 70px;
                padding: 3px 5px;
                margin: 0 5px;
                border: none;
            }
            .c-btn-back {
                background: #c8c8c8;
            }
        }
    }
    .c-top-border-gray {
        border-top: 5px solid #f0f0f0;
        padding: 20px 0;
        .c-form-row-2 {
            .c-form-item {
                width: 45%;
                display: inline-block;
                min-height: 33px;
                .c-btn-text {
                    margin-left: 15px;
                }
                .video-alarm-item {
                    height: 40px;
                    /deep/.ivu-select {
                        margin: 0 4px;
                    }
                }
            }
        }
        .c-form-row {
            .c-form-item {
                width: 90%;
                display: inline-block;
                min-height: 33px;
            }
        }
    }
}
.modal-body {
    .body-header {
        min-height: 40px;
        display: flex;
        .body-header-item {
            margin-right: 5px;
        }
        .body-header-btn {
            float: right;
            .ivu-btn {
                height: auto;
                margin-right: 5px;
                background-color: #838A95;
                border: none;
                padding: 6px 14px;
                font-size: 12px;
                color: #fff;
                border-radius: 1px;
            }
            .reset {
                background-color: #aaafb8;
            }
        }
    }
}
.alarm-lev-1,.alarm-lev-2,.alarm-lev-3 {
	display: block;
	width: 65px;
	height: 20px;
	border-radius: 10px;
	color: #FFF;
	text-align: center;
	line-height: 20px;
}
/deep/.alarm-lev-1 {
	color: #B32F2F;
}
/deep/.alarm-lev-2 {
    color: #fd7003;
}
/deep/.alarm-lev-3 {
	color: #e2b800;
}
/deep/.ivu-select-multiple {
    .ivu-tag span:not(.ivu-select-max-tag) {
        margin: 0;
    }
}
/deep/.ivu-select-multiple .ivu-tag i {
    display: none;
}
/deep/.ivu-select-multiple .ivu-select-selection > div {
    display: flex;
}
</style>