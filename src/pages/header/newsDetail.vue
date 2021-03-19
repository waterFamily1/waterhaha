<template>
    <div class="message-box" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>消息详情</h3> 
            <Button @click="back">返回</Button>
        </div>
        <div class="c-top-border-gray">
            <div class="msg-detail-item">
                <label>消息类型:</label>{{ messageCategory }}
            </div>
            <div class="msg-detail-item">
                <label>主题:</label>{{ title }}
            </div>
            <div class="msg-detail-item">
                <label>发送时间:</label>{{ realSendTime }}
            </div>
            <div class="msg-detail-text" v-html="content"></div>
            <div>
                <Button type="text" @click="onOne">上一条</Button>
                <Button type="text" @click="nextOne">下一条</Button>
            </div>
        </div>
    </div>
</template>

<script>
import { getDetail, onDetail } from '@api/header/news'
import util from '@/libs/public_js'

export default {
    data() {
        return {
            height: '',
            id: '',
            pageTurn: '',
            messageCategory: '',
            title: '',
            realSendTime: '',
            content: ''
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        if(this.$route.query.id) {
            this.detail()
        }
    },
    methods: {
        detail() {
            getDetail(this.$route.query.id).then(res=> {
                console.log(res)
                if(res.data.messageCategory == '1') {
                    this.messageCategory = '任务消息'
                } else if(res.data.messageCategory == '2') {
                    this.messageCategory = '报警消息'
                } else if(res.data.messageCategory == '3') {
                    this.messageCategory = '系统消息'
                }
                this.title = res.data.title
                this.realSendTime = util.transDateFromServer(res.data.realSendTime, 'yyyy-MM-dd hh:mm')
                this.content = res.data.content
                this.id = res.data.id
            })
        },
        onOne() {
            this.pageTurn = 'previous'
            this.detail1()
        },
        nextOne() {
            this.pageTurn = 'next'
            this.detail1()
        },
        detail1() {
            let id = this.id
            let pageTurn = this.pageTurn
            onDetail({
                id,
                pageTurn
            }).then(res=> {
                if(res.data.messageCategory == '1') {
                    this.messageCategory = '任务消息'
                } else if(res.data.messageCategory == '2') {
                    this.messageCategory = '报警消息'
                } else if(res.data.messageCategory == '3') {
                    this.messageCategory = '系统消息'
                }
                this.title = res.data.title
                this.realSendTime = util.transDateFromServer(res.data.realSendTime, 'yyyy-MM-dd hh:mm')
                this.content = res.data.content
                this.id = res.data.id
            }).catch(err=> {
                this.$Message.error('当前是第一条消息');
            })
        },
        back() {
            this.$router.back()
        }
    }
}
</script>

<style lang="less" scoped>
.message-box {
    border: 5px solid #f0f0f0;
    background: #fff;
    .c-left-border-blue {
        border-radius: 3px;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        h3 {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-indent: 10px;
        }
        .ivu-btn {
            border: none;
            color: #fff;
            background: #c8c8c8;
            padding: 4px 12px;
            height: auto;
            font-size: 12px;
        }
    }
    .c-top-border-gray {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .msg-detail-item {
            line-height: 40px;
            font-size: 14px;
            label {
                display: inline-block;
                width: 100px;
                text-align: right;
                margin-right: 10px;
            }
        }
        .msg-detail-text {
            border-top: 1px solid #e6e6e6;
            padding-top: 20px;
            padding-bottom: 30px;
            font-size: 14px;
            padding-left: 112px;
        }
        .ivu-btn-text {
            border: none;
        }
    }
}
</style>