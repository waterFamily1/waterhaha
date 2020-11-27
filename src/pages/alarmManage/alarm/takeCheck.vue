<template>
    <div class="check-wrap":style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>报警订阅</h3> 
            <div class="c-btns-right">
                <Button type="primary" class="c-btn-back" @click="goBack()">返回</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <div class="c-form-row-1col">
                <div class="c-form-item">
                    <label>报警名称：</label>
                    <span>{{ receiveObj.defineName }}</span>
                </div>
            </div>
            <div class="c-form-row-2col">
                <div class="c-form-item">
                    <label>区域位置：</label>
                    <span>{{ receiveObj.siteName }}</span>
                </div>
                <div class="c-form-item">
                    <label>推送方式：</label>
                    <span>{{ pushWay}}</span>
                </div>
            </div>
            <div class="c-form-row-2col">
                <div class="c-form-item">
                    <label>推送频率：</label>
                    <span>{{ pushFre}}</span>
                </div>
                <div class="c-form-item">
                    <label>延迟推送时间：</label>
                    <span>{{ delayTime }}</span>
                </div>
            </div>
        </div>
        <div class="c-top-border-gray" style="padding: 10px;">
            <div class="c-plain-bg-h">
                <h3>接收对象</h3>
                <Checkbox v-model="single" disabled>同步接收报警确认消息</Checkbox>
            </div>
            <div class="c-form-row-1col">
                <div class="c-form-item" style="padding: 20px;">
                    <label style="font-weight: 400;">已选接收对象：</label>
                    <Tag checkable color="primary">{{ subscribeList.userName }}</Tag>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {subDetail } from '@/api/alarm/subscribe'
export default {
    name: 'takeCheck',
    data() {
        return {
            height: '',
            receiveObj:{},
            freList:['5分钟','10分钟','15分钟','30分钟','1小时','2小时','12小时','24小时','仅推送1次'],
            timeList :['5分钟','10分钟','15分钟','30分钟','1小时','2小时','12小时','24小时','立即推送','不推送'],
            subscribeList:{},
            pushWay:'',
            pushFre:'',
            delayTime:'',
            single:false
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        console.log()
        subDetail(this.$route.query.params).then(res=>{
            console.log(res)
            this.receiveObj = res.data
            let temp = res.data.subscribeList[0]
            this.subscribeList = temp
            this.pushWay = temp.subscribeMode == 'SMS'?'短信':'在线消息'
            this.pushFre = this.freList[Number(temp.pushFrequency)-1]
            this.delayTime = this.timeList[Number(temp.delayPushTime)-1]
            console.log(temp.pushReleaseMessage)
            this.single = temp.pushReleaseMessage=='Y'?true:false
        })
    },
    methods: {
        goBack() {
            this.$router.go(-1)
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
        padding: 20px 0 20px 40px;
        border-top: 5px solid #f0f0f0;
        .c-form-item {
            display: inline-block;
            width: 45%;
            height: 40px;
            line-height: 40px;
            label {
                font-weight: 700;
            }
        }
        .c-plain-bg-h {
            border-bottom: 1px solid #f0f0f0;
            height: 40px;
            padding: 10px 0 10px 10px;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>