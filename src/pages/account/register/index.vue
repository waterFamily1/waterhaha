<template>
    <div class="page-account">
        <div v-if="showI18n" class="page-account-header">
            <i-header-i18n />
        </div>
        <div class="page-account-container">
            <div class="page-login">
                <div v-if="!whichForm">
                    <Form ref="password" :model="password" :rules="userRules">
                        <div class="login-form">
                            <h3>验证手机号</h3>
                            <FormItem lable="tel" prop="tel">
                                <Input v-model="password.tel" size="large" placeholder="请输入手机号" type="text" clearable>
                                    <Icon type="md-phone-portrait" slot="prefix"/>
                                </Input>
                            </FormItem>
                            <FormItem style="margin:20px 0;">
                                <Button class="login-button" size="large" long type="primary" @click="sumit('password')">下一步</Button>
                            </FormItem>
                            <FormItem style="text-align:right;">
                                <a href="javascript:;" style="color:#0bb2df" @click="returnLogin()">返回登录页</a>
                            </FormItem>
                        </div>        
                    </Form>
                </div>
                <div v-if="whichForm">
                    <Form class="pwd-form" ref="pwdForms" :model="pwdForms" :rules="pwdRuleValidate">
                        <div class="login-form">
                            <div class="phone-div">手机号：{{ mobilePhone }}</div>
                            <FormItem prop="authCode">
                                <Input v-model="pwdForms.authCode" placeholder="请输入验证码" type="password" 
                                style="width: 50%;float: left;">
                                </Input>
                                <Button type="primary" style="padding: 0 25px;" 
                                @click="sendCode()" v-show="codeBtn">获取验证码</Button>
                                
                                <Button style="padding: 0 25px;" disabled="disabled" 
                                v-show="!codeBtn">{{ time }}秒后重新获取</Button>
                            </FormItem>
                            <FormItem prop="password" class="level-item">
                                <Input v-model="pwdForms.password" placeholder="请输入新密码" 
                                type="password"
                                @on-change="codeChange"></Input>
                                <div class="level-box">
                                    <span :class="{'weak':level == 0}">弱</span>
                                    <span :class="{'qualified':level == 1}">合格</span>
                                    <span :class="{'strong':level == 2}">强</span>
                                </div>
                            </FormItem>
                            <FormItem prop="againPsw">
                                <Input v-model="pwdForms.againPsw" placeholder="请确认新密码" type="password"></Input>
                            </FormItem>
                            <FormItem style="margin:20px 0;">
                                <Button class="login-button" size="large" long type="primary" 
                                @click="changeSubmit('pwdForms')">确认</Button>
                            </FormItem>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
        <div class="login-foot">

        </div>

    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    import mixins from '../mixins'
    import { verifyPhone, sendAuthCode, verifyCodeRule, alterCode } from '@/api/account'

    export default {
        mixins: [ mixins ],
        data () {
            const validatePassCheck = (rule, value, callback) => {
                if (value !== this.$refs.form.pwdForms.password) {
                    callback(new Error('两次输入的密码不匹配！'));
                } else {
                    callback();
                }
            };

            return {
                notSupport: false,
                H: '640px',
                timer:null,//验证码定时器
                time:0,//验证码计时
                password: {
                    tel: ''
                },
                userRules: {
                    tel: [
                        {required: true,message: '请输入手机号',trigger: 'blur'},
                        {
                            validator(rule, value, callback) {
                                var pattern = /^1[34578]\d{9}$/;
                                if (pattern.test(value)) {
                                    callback();
                                } else {
                                    callback(new Error('请正确输入有效的手机号'));
                                }
                            },
                            trigger: "blur"
                        }
                    ]
                },
                mobilePhone: '',
                whichForm: false,
                codeBtn: true,
                firstPwdModal: false,
                submitLoading: false,
                pwdForms: {
                    authCode: '',
                    password: '',
                    againPsw: ''
                },
                pwdRuleValidate: {
                    authCode: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ],
                    password: [
                        { 
                            required: true, message: '6-20个字符', trigger: 'blur'
                        },
                        { 
                            min: 6, max: 20, message: '至少包含大小写字母+数字', trigger: 'blue' 
                        }, 
                        {
                            validator(rule, value, callback, source, options) {
                                let errors = []
                                if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(value)) {
                                    callback('至少包含大小写字母+数字')
                                }
                                callback(errors)
                            }
                        }                    
                    ],
                    againPsw: [
                        {
                            required: true, message: '确认密码不能为空！', trigger: 'blur'
                        },
                        { validator: validatePassCheck, trigger: 'blur' }
                    ]
                },
                level: ''
            }
        },
        mounted() {
            const H = document.documentElement.clientHeight;
            this.H = H+'px';
        },
        methods: {
            ...mapActions('admin/account', [
                'register',
                'login'
            ]),
            //验证码
            sendCode() {
                sendAuthCode({
                    tel: this.mobilePhone
                }).then(res => {
                    this.codeBtn = false
                    this.time = 60
                    this.timer = setInterval(()=>{
                        //倒计时
                        if(this.time <= 0) {
                            this.codeBtn = true
                            this.time = 0;
                            clearInterval(this.timer);
                        } else {
                            this.time -= 1;
                        }
                    },1000);
                }).catch(err => {
                    // 异常情况
                })
            },
            sumit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let tel = this.password.tel
                        verifyPhone(tel).then(res => {
                            if(res.data == false) {
                                this.$Message.error('手机号验证失败');
                            } else if(res.data == true) {
                                this.mobilePhone = this.password.tel
                                this.whichForm = true
                            }
                            console.log(res)
                        }).catch(err => {
                            // 异常情况
                        })
                    }
                })
            },
            returnLogin() {
                this.$router.push({path: '/login'})
            },
            changeSubmit() {
                this.$refs[name].validate((valid) => {
                    if(valid) {
                        if(this.pwdForms.password === this.pwdForms.againPsw){
                            this.submitLoading = true;
                            alterCode({
                                newPassword: this.pwdForms.password,
                                tel: this.mobilePhone,
                                verifyCode: this.pwdForms.authCode
                            }).then(res=>{
                                // this.firstPwdModal = false;
                                this.$Message.success('密码修改成功');
                                // this.returnLogin();
                            })
                            .catch(() => {
                                this.submitLoading = false;
                            })
                        }else{
                            this.$Message.error('两次密码不一致，请重新输入');
                        }
                    }
                })
            },
            // 验证密码强弱
            codeChange(e) {
                let code = this.pwdForms.password
                this.level = 0
                if(code.length >= 6) {
                    verifyCodeRule(code).then(res=>{
                        // console.log(JSON.stringify(res))
                        this.level = res.data.level
                    })
                    .catch(() => {
                        // this.submitLoading = false;
                    })
                } else {
                    this.level = 0
                }
            }
        }
    };
</script>
<style lang="less" scoped>
/deep/.ivu-btn {
    padding: 0;
}
.broswer_support {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #f7eea1;
}
.broswer_support a {
    margin: 0 20px;
    text-decoration: underline;
}
.login-bg{
    height: 100%;
    width: 100%;
    background: url(../../../assets/images/login_bg.jpg) no-repeat center 0;
    min-height: 640px;
    position: relative;
    overflow: hidden;
}
.login-logo {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 320px;
    height: 90px;
    background: url(../../../assets/images/logo.png) no-repeat 0 0;
}
.login-title{
    position: relative;
    top: 120px;
    text-align: center;
}
.login-title h1{
    font-size: 36px;
    letter-spacing: 10px;
    color: #fff;
    font-weight: normal;
}
.login-title h6{
    font-size: 12px;
    font-weight: normal;
    letter-spacing: 3px;
    color: #fff;
    opacity: 0.6;
}
.login-form{
    width: 384px;
    height: auto;
    position: absolute;
    top: 200px;
    left: 50%;
    margin-left: -200px;
    background-color: #FFF;
    padding: 20px 20px 0 20px;
    border-radius: 5px;
    box-shadow: 1px 1px 15px #777;
    .level-item {
        position: relative;
        .level-box {
            position: absolute;
            bottom: -22px;
            right: 0;
            font-size: 12px;
            line-height: 14px;
            span {
                display: inline-block;
                background: rgb(234, 234, 234);
                color: #999;
                padding: 2px 15px;
                margin-left: 3px;
            }
            .weak {
                background: rgb(227, 31, 73);
                color: #fff;
            }
            .qualified {
                background: #57a3f3;
                color: #fff;
            }
            .strong {
                background: rgb(21, 202, 85);
                color: #fff;
            }
        }
    }
}
.login-form h3 {
    text-align: center;
    font-size: 18px;
    height: 90px;
}
.login-foot {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 150px;
    background: url(../../../assets/images/login_bg_foot.png) no-repeat center top;
    text-align: center;
}
.login-foot p{
    display: inline-block;
    text-align: center;
    line-height: 50px;
    font-size: 13px;
    color: #aaa;
    letter-spacing: 1px;
    margin-top: 100px;
}
.login-form .ivu-input {
    background-color: #f0f0f0;
    border-radius: 29px;
    padding-left: 40px;
}
.login-form .form-verifycationCode .ivu-input{
    padding-left: 15px;
}
.login-form .form-verifycationCode .ivu-input-wrapper{
    width: 220px;
    margin-right: 24px;
}
.login-form .form-verifycationCode a{
    color: #0bb2df;
    font-weight: bold;
}
.login-input-left {
    color: #666;
    font-size: 18px;
    position: absolute;
    top: 10px;
    left: 17px;
}
.remberForget {
    text-align: left;
}
.forget-pwd{
    color: #0bb2df;
}
.vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
}
.vertical-center-modal .ivu-modal{
    top: 0;
}
.pwd-form{ 
    padding: 0 30px; 
}
.pwd-form h3{
    margin: 20px 0;
}
.modal-first-login .ivu-modal-content{ 
    border-radius: 10px; 
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
.phone-div {
    margin: 10px 0 20px;
    text-align: left;
}
</style>