<template>
    <div class="action3-box">
        <Tabs :animated="false" @on-click="handleChangeData">
            <TabPane label="首页模板" name="index"></TabPane>
            <TabPane label="数据曲线模版" name="information"></TabPane>
        </Tabs>
        <div class="action3-tab">
            <div class="index-box" v-if="index">区域视角</div>
            <div class="information-box" v-if="information">仓库权限</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'actionThree',
    data() {
        return {
            index: true,
            information: false
        }
    },
    methods: {
        handleChangeData(name) {
            if(name == 'index') {
                this.index = true
                this.information = false
            } else if (name == 'information') {
                this.warehouse = true
                this.information = false
            }
        }
    }
}
</script>
<style lang="less" scoped>
.action3-box {
    border: 1px solid #e6e6e6;
    /deep/.ivu-tabs-nav-scroll {
        background: #F4F4F4;
        border-bottom: 1px solid #e6e6e6;
    }
}
</style>