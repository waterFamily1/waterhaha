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
                                <Input v-model="password.tel" size="large" placeholder="请输入手机号" clearable>
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
                                <Input v-model="pwdForms.authCode" placeholder="请输入验证码" style="width: 50%;float: left;">
                                </Input>
                                <Button type="primary" style="padding: 0 25px;" 
                                @click="sendCode()" v-show="codeBtn">获取验证码</Button>
                                
                                <Button style="padding: 0 25px;" disabled="disabled" 
                                v-show="!codeBtn">{{ time }}秒后重新获取</Button>
                            </FormItem>
                            <FormItem prop="password">
                                <Input v-model="pwdForms.password" placeholder="请输入新密码" type="password"></Input>
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

        <!-- <Modal class="modal-first-login" v-model="firstPwdModal" 
            :mask-closable="false" width="380" height="295" :closable="false"
            class-name="vertical-center-modal">
            <Form class="pwd-form" ref="pwdForms" :model="pwdForms" :rules="pwdRuleValidate">
                <Row><h3>修改密码</h3></Row>
                <Row>
                    <Col span="24">
                        <FormItem prop="password1">
                            <Input v-model="pwdForms.password1" placeholder="请输入新密码" type="password"></Input>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem prop="password2">
                            <Input v-model="pwdForms.password2" placeholder="请确认新密码" type="password"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <div class="c-modal-footer-btns">
                    <Button type="default" shape="circle" size="large" @click="firstPwdModal=false">返回</Button>
                    <Button type="primary" shape="circle" size="large" :loading="submitLoading" @click="changeSubmit('pwdForms')">确认</Button>
                </div>
            </div>
        </Modal> -->

    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    import mixins from '../mixins'
    import api from './api'
    import { verifyPhone, sendAuthCode } from '@/api/account'

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
                        {required: true,message: "请输入手机号",trigger: "blur"},
                        {
                            validator(rule, value, callback) {
                                var pattern = /^1[34578]\d{9}$/;
                                if (pattern.test(value)) {
                                    callback();
                                } else {
                                    callback(new Error("请正确输入有效的手机号"));
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
                            required: true, message: '请输入新密码', trigger: 'change'
                        },
                        { 
                            min: 6, max: 20, message: '至少包含大小写字母+数字', trigger: 'change' 
                        }                    
                    ],
                    againPsw: [
                        {
                            required: true, message: '确认密码不能为空！', trigger: 'change'
                        },
                        { validator: validatePassCheck, trigger: 'change' }
                    ]
                }
            }
        },
        computed: {
            // 密码强度提示文案等
            passwordTip () {
                let strong = '强';
                let className = 'strong';
                let percent = this.passwordLen > 10 ? 10 : this.passwordLen;
                let color = '#19be6b';

                if (this.passwordLen < 6) {
                    strong = '太短';
                    className = 'low';
                    color = '#ed4014';
                } else if (this.passwordLen < 10) {
                    strong = '中';
                    className = 'medium';
                    color = '#ff9900';
                }

                return {
                    strong,
                    class: `page-account-register-tip-${className}`,
                    percent: percent * 10,
                    color
                }
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
                        if(this.pwdForms.password1 === this.pwdForms.password2){
                            this.submitLoading = true;
                            this.$http.put(api.forgetPassword,{tel: this.password.tel,verifyCode: this.password.verifycationCode,newPassword:this.pwdForms.password1})
                                .then(res=>{
                                    this.firstPwdModal = false;
                                    this.$Message.success('密码修改成功');
                                    this.login();
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
            login() {
                let user = {
                    username: this.password.tel,
                    password: this.pwdForms.password1
                }
                this.$http.post(api.login, user).then((loginRes) => {
                    if(loginRes && loginRes.access_token) {
                        this.$http.get(api.getUserAccount).then((res) => {
                            sessionStorage.setItem('__MANGO_U_', JSON.stringify(res));
                            this.submitLoading = false;
                            location.href = "/";
                        });
                    }
                })
            }

            // handleChangePassword (val) {
            //     this.passwordLen = val.length;
            // },
            // /**
            //  * @description 注册
            //  * 表单校验已有 iView Pro 自动完成，如有需要修改，请阅读 iView Pro 文档
            //  */
            // handleSubmit (valid, values) {
            //     if (valid) {
            //         if (valid) {
            //             const { mail, password, mobile, captcha } = values;
            //             this.register({
            //                 mail,
            //                 password,
            //                 mobile,
            //                 captcha
            //             })
            //             .then(() => {
            //                     this.$router.replace({ name: 'register-result' });
            //             });
            //         }
            //     }
            // },
            // /**
            //  * @description 获取验证码
            //  * */
            // handleGetCaptcha () {

            // }
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