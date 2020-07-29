<template>
    <div class="page-account">
        <div v-if="showI18n" class="page-account-header">
            <i-header-i18n />
        </div>
        <div class="page-account-container">
            <div class="page-login">
                <div class="page-account-top">
                    <div class="page-account-top-desc">{{ loginTitle }}</div>
                    <div class="login-corner login-corner-normal" :class="{'isActive': active == false}" @click="toggle()"></div>
                    <a href="javascript:;" class="login-typ">{{ tipTitle }}</a>
                </div>
                <div v-if="active" style="height: 212px;">
                    <Login @on-submit="handleSubmit">
                        <UserName name="username" value="" />
                        <Password name="password" value="" />
                        <div class="page-account-auto-login">
                            <Checkbox v-model="rememberMe" name="rememberMe" size="large">一周内免登陆</Checkbox>
                            <a @click="forgetPwd()">{{ $t('page.login.forgot') }}</a>
                        </div>
                        <Submit>{{ $t('page.login.submit') }}</Submit>
                    </Login>
                </div>
                <div v-if="!active" style="height: 212px;">
                    扫码
                </div>
                <div class="page-account-other">
                    <span>{{ $t('page.login.other') }}</span>
                    <img src="@/assets/svg/icon-social-wechat.svg" alt="wechat">
                </div>
            </div>
        </div>
        <div class="login-foot">
            <span></span>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    import mixins from '../mixins';

    export default {
        mixins: [ mixins ],
        data () {
            return {
                loginTitle: '账户登录',
                rememberMe: true,
                tipTitle: '扫码登录',
                active: true,
                loginData: {
                    acct:'',
                    pass:''
                },
                ruleValidate: {
                    acct: [
                        { required: true, message: '账号不能为空', trigger: 'blur' },
                    ],
                    pass: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { type: 'string', min: 6, max: 20, message: '密码长度6-20个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            ...mapActions('admin/account', [
                'login'
            ]),
            toggle () {
                this.active = !this.active
                if(this.active == false) {
                    this.loginTitle = '扫码登录'
                    this.tipTitle = '账户登录'
                } else {
                    this.loginTitle = '账户登录'
                    this.tipTitle = '扫码登录'
                }
            },
            handleSubmit (valid, values) {
                this.$router.replace(this.$route.query.redirect || '/');
                // if (valid) {
                //     const { username, password, rememberMe } = values;
                //     this.login({
                //         username,
                //         password,
                //         rememberMe: this.rememberMe
                //     })
                //     .then((res) => {
                //         console.log(res)
                //         // 重定向对象不存在则返回顶层路径
                //         // this.$router.replace(this.$route.query.redirect || '/');
                //     });
                // }
            },
            forgetPwd() {
                this.$router.push({ path:'/forgetPwd'})
            }
        }
    };
</script>
<style lang="less" scoped>
/deep/.page-account-container {
    position: absolute;
    top: 140px;
    left: 50%;
    margin-left: -204px;
}
.page-login {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.3);
    .page-account-top {
        position: relative;
        overflow: hidden;
        padding: 20px 0;
        div {
            display: inline-block;
        }
        .page-account-top-desc {
            font-size: 18px;
            text-indent: 15px;
            color: #495060;
            font-weight: bold;
            float: left;
        }
        .login-corner {
            cursor: pointer;
            top: 15px;
            right: 10px;
            width: 46px;
            height: 46px;
            background: url('../../../assets/images/login3.png') no-repeat 0 0;
            transition: background-position .2s cubic-bezier(0.25,.5,.5,.9);
            float: right;
            margin-right: 15px;
        }
        .isActive {
            background-position: -46px -46px;
        }
        .login-typ {
            top: 20px;
            right: 46px;
            width: 83px;
            height: 28px;
            background: url('../../../assets/images/login3.png') no-repeat 0 -136px;
            line-height: 28px;
            color: #18B1E3;
            text-indent: -4px;
            display: inline-block;
            position: absolute;
            top: 25px;
            right: 54px;
        }
    }
    /deep/.ivu-input {
        width: 90%!important;
    }
    /deep/.ivu-input-prefix {
        left: 5%;
    }
    .page-account-auto-login {
        width: 90%;
        margin: 10px auto 20px;
    }
    /deep/.ivu-btn {
        width: 90%;
    }
    .page-account-other {
        height: 64px;
        background: #f9f9f9;
        border-top: 1px solid rgba(32,53,128,0.16);
        border-radius: 0 0 8px 8px;
        line-height: 64px;
        padding: 0 5%;
    }
}
.login-foot {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 140px;
    background: url('../../../assets/images/login2.png') no-repeat center top;
    text-align: center;
}
</style>
