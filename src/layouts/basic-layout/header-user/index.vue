<template>
    <span class="i-layout-header-trigger i-layout-header-trigger-min">
        <Dropdown :trigger="isMobile ? 'click' : 'hover'" class="i-layout-header-user" :class="{ 'i-layout-header-user-mobile': isMobile }" @on-click="handleClick">
            <span class="i-layout-header-user-name" v-if="!isMobile">
                <div>t</div>
            </span>
            <DropdownMenu slot="list">
                <i-link to="/userSet">
                    <DropdownItem>
                        <span>用户设置</span>
                    </DropdownItem>
                </i-link>
                <i-link to="/question">
                    <DropdownItem>
                        <span>问题反馈</span>
                    </DropdownItem>
                </i-link>
                <DropdownItem>
                    <span>APP下载</span>
                </DropdownItem>
                <DropdownItem divided name="logout">
                    <span>退出登录</span>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </span>
</template>
<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        name: 'iHeaderUser',
        computed: {
            ...mapState('admin/user', [
                'info'
            ]),
            ...mapState('admin/layout', [
                'isMobile',
                'logoutConfirm'
            ])
        },
        methods: {
            ...mapActions('admin/account', [
                'logout'
            ]),
            handleClick (name) {
                if (name === 'logout') {
                    this.logout({
                        confirm: this.logoutConfirm,
                        vm: this
                    });
                }
            }
        }
    }
</script>

<style scoped>
.i-layout-header-user-name div {
    display: block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    background: rgb(120, 197, 151);
    color: #fff;
    text-align: center;
    position: absolute;
    top: 15px;
}
</style>