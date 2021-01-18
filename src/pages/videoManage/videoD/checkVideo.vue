<template>
    <div class="check-wrap" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>视频详情</h3> 
            <div class="c-btns-right">
                <Button type="primary" class="c-btn-back" @click="goBack()">返回</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <div class="c-form-row-2">
                <div class="c-form-item">
                    <label>区域位置：</label>
                    {{ video.processName }}
                </div>
                <div class="c-form-item">
                    <label>视频名称：</label>
                    {{ video.name }}
                </div>
            </div>
            <div class="c-form-row-2">
                <div class="c-form-item">
                    <label>定时抓拍：</label>
                    {{ video.takeThumb ? '是' : '否' }}
                </div>
                <div class="c-form-item">
                    <label>抓拍频率：</label>
                    <span v-if="video.takeThumb">{{ video.takeThumbCycle }}分钟</span><span v-else>无定时抓拍</span>
                </div>
            </div>
            <div class="c-form-row-2">
                <div class="c-form-item">
                    <label>触发报警：</label>
                    {{ video.alarmName }}
                </div>
                <div class="c-form-item">
                    <label>触发间隔：</label>
                    {{ video.alarmThumbInterval }}{{ video.alarmThumbInterval ? '分钟' : '' }}
                </div>
            </div>
            <div class="c-form-row">
                <div class="c-form-item">
                    <label>URL地址：</label>
                    {{ video.url }}
                </div>
            </div>
            <div class="c-form-row">
                <div class="c-form-item">
                    <label>触发抓拍频率：</label>
                    <div style="display: inline-block;vertical-align: text-top;">
                        <div class="video-alarm-item">
                            每一秒抓拍</span>{{video.alarmThumbSec}}张
                        </div>
                        <div class="video-alarm-item">
                            每一分抓拍</span>{{video.alarmThumbMin}}张
                        </div>
                        <div class="video-alarm-item">
                            每10分抓拍</span>{{video.alarmThumbTenMin}}张
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template>
<script>
import { detailMethod } from '@/api/videoM/deploy'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'

export default {
    name: 'checkVideo',
    data() {
        return {
            height: '',
            id: '',
            video: {}
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.id = this.$route.query.id
        this.getDetail()
    },
    methods: {
        getDetail() {
            detailMethod(this.$route.query.id).then(res=> {
                this.video = res.data
                this.video.takeThumb = res.data.takeThumb == 'Y' ? true : false
            })
        },
        goBack() {
            this.$router.back()
        }
    }
}
</script>
<style lang="less" scoped>
.check-wrap {
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
                padding: 4px 12px;
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
        padding: 20px;
        .c-form-row-2 {
            .c-form-item {
                width: 45%;
            }
        }
        .c-form-row {
            .c-form-item {
                width: 90%;
            }
        }
        label {
            font-weight: 600;
            display: inline-block;
            width: 100px;
            line-height: 35px;
            text-align: right;
        }
        .c-form-item {
            display: inline-block;
            min-height: 33px;
            line-height: 24px;
            vertical-align: top;
            padding-left: 20px;
            padding-top: 9px;
            position: relative;
        }
    }
    .video-alarm-item {
        height: 40px;
    }
}
</style>