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
                    <span>{{ name }}</span>
                </div>
            </div>
            <div class="c-form-row-2col">
                <div class="c-form-item">
                    <label>区域位置：</label>
                    <span>{{ area }}</span>
                </div>
                <div class="c-form-item">
                    <label>推送方式：</label>
                    <span>{{ pushWay }}</span>
                </div>
            </div>
            <div class="c-form-row-2col">
                <div class="c-form-item">
                    <label>推送频率：</label>
                    <span>{{ pushFre }}</span>
                </div>
                <div class="c-form-item">
                    <label>延迟推送时间：</label>
                    <span>{{ pushTime }}</span>
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
                    <Tag checkable color="primary">{{ acceptObj }}</Tag>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'takeCheck',
    data() {
        return {
            height: '',
            name: '控制柜停机报警',
            area: '工艺间',
            pushWay: '在线消息',
            pushFre: '仅推送1次',
            pushTime: '立即推送',
            acceptObj: 'deth',
            single: true
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
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