<template>
    <div class="allot-wrap" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>保养计划分配</h3> 
            <div class="c-btns-right">
                <Button type="primary" @click="saveHandle()">保存</Button>
                <Button type="primary" class="c-btn-back" @click="goBack()">取消</Button>
            </div>
        </div>
        <div class="c-top-border-gray"></div>
        <div class="c-top-border-gray"></div>
    </div>
</template>
<script>
export default {
    name: 'planAllot',
    data() {
        return {
            height: ''
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
}
</script>
<style lang="less" scoped>
.allot-wrap {
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
        border-top: 5px solid #f0f0f0;
        padding: 10px;
    }
}
</style>