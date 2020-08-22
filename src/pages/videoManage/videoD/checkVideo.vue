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
                    新寮门月地80吨站点
                </div>
                <div class="c-form-item">
                    <label>视频名称：</label>
                    
                </div>
            </div>
            <div class="c-form-row-2">
                <div class="c-form-item">
                    <label>定时抓拍：</label>

                </div>
                <div class="c-form-item">
                    <label>抓拍频率：</label>
                    
                </div>
            </div>
            <div class="c-form-row-2">
                <div class="c-form-item">
                    <label>触发报警：</label>

                </div>
                <div class="c-form-item">
                    <label>触发间隔：</label>
                    
                </div>
            </div>
            <div class="c-form-row">
                <div class="c-form-item">
                    <label>URL地址：</label>

                </div>
            </div>
            <div class="c-form-row">
                <div class="c-form-item">
                    <label>触发抓拍频率：</label>

                </div>
            </div> 
        </div>
    </div>
</template>
<script>
export default {
    name: 'checkVideo',
    data() {
        return {
            height: ''
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
}
</style>