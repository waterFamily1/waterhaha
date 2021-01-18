<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="c-main-border">
            <div class="c-left-border-blue">
                <h3>库位导入</h3>
                <div class="c-btns-right">
                    <Button @click="back">关闭</Button>
                </div>
            </div>
            <div class="c-top-border-gray">
                <div class="equ-import-process">
                    <span class="active">数据上传</span>
                    <span class="">数据验证</span>
                    <span class="">完成</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            height: ''
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
    methods:{
        back() {
			this.$router.back()
        }
    }
}
</script>

<style lang="less" scoped>
.index-box {
    margin: 5px;
    background: #fff;
    .c-main-border {
        border: 5px solid #f0f0f0;
        min-height: 100%;
        width: 100%;
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
                height: 28px;
                min-width: 70px;
                margin: 0 5px;
                background-color: #c8c8c8;
                border: none;
                color: #fff;
                padding: 4px 12px;
                font-size: 13px;
            }
        }
        .c-top-border-gray {
            border-top: 5px solid #f0f0f0;
            padding: 20px 0;
            .equ-import-process {
                width: 620px;
                height: 110px;
                background: #FFF url('../../../assets/images/import/process-bg.png') repeat-x 0 -9px;
                margin: 0 auto 20px;
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                span {
                    font-size: 13px;
                    display: inline-block;
                    width: 74px;
                    height: 70px;
                    background: #fff url('../../../assets/images/import/process-point.png') no-repeat 15px -48px;
                    background-size: 60%;            
                    text-align: center;
                    color: #666;
                    padding-top: 65px;
                    &.active {
                        font-size: 16px;
                        color: #0bb1df;
                        font-weight: 700;
                        background: #fff url('../../../assets/images/import/process-point.png') no-repeat 10px 10px;
                        background-size: 70%;
                    }
                }
            }
        }
    }
}
</style>