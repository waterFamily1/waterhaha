<template>
    <div class="action2-box">
        <div class="action2-left">
            <h4 class="role-autho-h4">模块权限</h4>
            <div class="role-autho-tab">
                <Tabs :animated="false">
                    <TabPane label="平台">平台</TabPane>
                    <TabPane label="APP">APP</TabPane>
                </Tabs>
            </div>
        </div>
        <div class="action2-right">
            <h4 class="role-autho-h4">操作权限</h4>
        </div>
    </div>
</template>
<script>
export default {
    name: 'actionTwo'
}
</script>
<style lang="less" scoped>
.action2-box {
    .action2-left {
        float: left;
        width: 48%;
        border: 1px solid #e6e6e6;
    }
    .action2-right {
        float: right;
        width: 48%;
        border: 1px solid #e6e6e6;
    }
    .role-autho-h4 {
        height: 35px;
        line-height: 35px;
        border-bottom: 1px solid #e6e6e6;
        background-color: #F4F4F4;
        text-indent: 10px;
    }
}
</style>