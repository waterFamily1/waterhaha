<template>
    <div class="action1-box">
        <Tabs :animated="false" @on-click="handleChangeData">
            <TabPane label="区域视角" name="area"></TabPane>
            <TabPane label="仓库权限" name="warehouse"></TabPane>
        </Tabs>
        <div class="action1-tab">
            <div class="area-box" v-if="area">区域视角</div>
            <div class="warehouse-box" v-if="warehouse">仓库权限</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'actionOne',
    data() {
        return {
            area: true,
            warehouse: false
        }
    },
    methods: {
        handleChangeData(name) {
            if(name == 'area') {
                this.area = true
                this.warehouse = false
            } else if (name == 'warehouse') {
                this.warehouse = true
                this.area = false
            }
        }
    }
}
</script>
<style lang="less" scoped>
.action1-box {
    border: 1px solid #e6e6e6;
    /deep/.ivu-tabs-nav-scroll {
        background: #F4F4F4;
        border-bottom: 1px solid #e6e6e6;
    }
}
</style>