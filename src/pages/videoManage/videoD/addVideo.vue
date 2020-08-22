<template>
    <div class="add-wrap" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>视频添加</h3> 
            <div class="c-btns-right">
                <Button type="primary" @click="saveHandle()">保存</Button>
                <Button type="primary" class="c-btn-back" @click="cancleHandle()">取消</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
                <div class="c-form-row-2">
                    <div class="c-form-item">
                        <FormItem label="区域位置：" prop="area">
                            <TreeSelect v-model="formValidate.area" multiple :data="areaData" v-width="200" />
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
                            <Switch v-model="formValidate.switch" @on-change="change" />
                        </FormItem>
                    </div>
                    <div class="c-form-item">
                        <FormItem label="定时抓拍周期：">
                            <Input v-model="formValidate.zhouqi" style="width: 100px;" :disabled="cycleDis">
                                <span slot="append">分钟</span>
                            </Input>
                        </FormItem>
                    </div>
                </div>
                <div class="c-form-row-2">
                    <div class="c-form-item">
                        <FormItem label="触发报警：">
                            <span>控制柜停机报警</span>
                            <a href="javascript:;" class="c-btn-text">[选择]</a>
                            <a href="javascript:;" class="c-btn-text">[清除]</a>
                        </FormItem>
                    </div>
                    <div class="c-form-item">
                        <FormItem label="触发间隔：">
                            <Input v-model="formValidate.jiange" style="width: 100px;">
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
                                    <Select v-model="formValidate.frequency1" size="small" style="width:70px">
                                        <Option v-for="item in frequency1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <span>张，每张间隔1秒钟</span>
                                </div>
                                <div class="video-alarm-item">
                                    <span>抓拍</span>
                                    <Select v-model="formValidate.frequency2" size="small" style="width:70px">
                                        <Option v-for="item in frequency2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <span>张，每张间隔1分钟</span>
                                </div>
                                <div class="video-alarm-item">
                                    <span>抓拍</span>
                                    <Select v-model="formValidate.frequency3" size="small" style="width:70px">
                                        <Option v-for="item in frequency3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <span>张，每张间隔10分钟</span>
                                </div>
                            </div>
                        </FormItem>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'addVideo',
    data() {
        return {
            height: '',
            areaData: [],
            formValidate: {
                area: [],
                name: '',
                url: '',
                switch: false,
                zhouqi: '60',
                jiange: '10',
                frequency1: '',
                frequency2: '',
                frequency3: ''
            },
            ruleValidate: {
                area: [
                    { required: true, message: '请选择区域位置', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入视频名称', trigger: 'blur' }
                ],
                url: [
                    { required: true, message: '请输入URL', trigger: 'blur' }
                ]
            },
            cycleDis: true,
            frequency1: [
                {
                    value: '3',
                    label: '3'
                }, {
                    value: '4',
                    label: '4'
                }, {
                    value: '5',
                    label: '5'
                }, {
                    value: '6',
                    label: '6'
                }, {
                    value: '7',
                    label: '7'
                }, {
                    value: '8',
                    label: '8'
                }, {
                    value: '9',
                    label: '9'
                }, {
                    value: '10',
                    label: '10'
                }
            ],
            frequency2: [
                {
                    value: '0',
                    label: '0'
                }, {
                    value: '1',
                    label: '1'
                }, {
                    value: '2',
                    label: '2'
                }, {
                    value: '3',
                    label: '3'
                }, {
                    value: '4',
                    label: '4'
                }, {
                    value: '5',
                    label: '5'
                }, {
                    value: '6',
                    label: '6'
                }, {
                    value: '7',
                    label: '7'
                }, {
                    value: '8',
                    label: '8'
                }, {
                    value: '9',
                    label: '9'
                }, {
                    value: '10',
                    label: '10'
                }
            ],
            frequency3: [
                {
                    value: '0',
                    label: '0'
                }, {
                    value: '1',
                    label: '1'
                }, {
                    value: '2',
                    label: '2'
                }, {
                    value: '3',
                    label: '3'
                }, {
                    value: '4',
                    label: '4'
                }, {
                    value: '5',
                    label: '5'
                }, {
                    value: '6',
                    label: '6'
                }
            ]
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
    methods: {
        change (status) {
            if(status == false) {
                this.cycleDis = true
            } else {
                this.cycleDis = false
            }
        },
        saveHandle() {

        },
        cancleHandle() {
            this.$router.go(-1)
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
            button {
                min-width: 70px;
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
</style>