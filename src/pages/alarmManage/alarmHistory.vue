<template>
    <div class="history-wrap" :style="{height: height+'px'}"></div>
</template>
<script>
export default {
    name: 'alarmHistory',
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
.history-wrap {
    margin: 5px;
    background: #fff;
}
</style>