<template>
    <div class="page-account">
        <div v-if="showI18n" class="page-account-header">
            <i-header-i18n />
        </div>
        <div class="page-account-container">
            <div class="page-login">
                <!-- <div class="page-account-top">
                    <h3>修改密码</h3>
                </div>
                <Login ref="form" @on-submit="handleSubmit">
                    <Poptip trigger="focus" placement="right" width="240">
                        <Password name="password" :rules="passwordRule" placeholder="至少6位密码，区分大小写" @on-change="handleChangePassword" />
                        <div slot="content" class="page-account-register-tip">
                            <div class="page-account-register-tip-title" :class="passwordTip.class">
                                强度：{{ passwordTip.strong }}
                            </div>
                            <Progress :percent="passwordTip.percent" hide-info :stroke-width="6" :stroke-color="passwordTip.color" />
                            <div class="page-account-register-tip-desc">
                                请至少输入 6 个字符。请不要使用容易被猜到的密码。
                            </div>
                        </div>
                    </Poptip>
                    <Password name="passwordConfirm" :rules="passwordConfirmRule" placeholder="确认密码" />
                    <Submit>{{ $t('page.register.submit') }}</Submit>
                </Login> -->
                <Form ref="loginForm" :model="password" :rules="userRules">
                    <div class="login-form">
                        <h3>手机验证登录</h3>
                        <FormItem lable="tel" prop="tel">
                            <Input v-model="password.tel" @on-enter="sumit('loginForm')" size="large" placeholder="请输入手机号" clearable></Input>
                            <Icon type="android-phone-portrait" class="login-input-left"></Icon>
                        </FormItem>
                        <FormItem prop="verifycationCode" class="form-verifycationCode">
                            <Input v-model="password.verifycationCode" @on-enter="sumit('loginForm')" size="large" placeholder="请确认验证码"></Input>
                            <Button :type="time?'default':'primary'" style="width:100px;float:right;height:36px;line-height:27px;" shape="circle" @click="sendCode" :disabled="time>0">{{time||'获取验证码'}}</Button>
                        </FormItem>
                        <!-- <FormItem lable="newPassword" prop="newPassword">
                            <Input v-model="password.newPassword" @on-enter="sumit('loginForm')" size="large" placeholder="请输入新密码" type="password" clearable></Input>
                            <Icon type="locked" class="login-input-left"></Icon>
                        </FormItem> -->
                        <FormItem style="margin:20px 0;">
                            <Button class="login-button" size="large" long type="primary" @click="sumit('loginForm')">确  认</Button>
                        </FormItem>
                        <FormItem style="text-align:right;">
                            <a href="javascript:;" style="color:#0bb2df" @click="returnLogin()">返回登录页</a>
                        </FormItem>
                    </div>        
                </Form>
            </div>
            <!-- <div class="page-account-to-login">
                <router-link :to="{ name: 'login' }">{{ $t('page.register.other') }}</router-link>
            </div> -->
        </div>
        <div class="login-foot">

        </div>

        <Modal class="modal-first-login" v-model="firstPwdModal" :mask-closable="false" width="380" height="295" :closable="false" class-name="vertical-center-modal">
            <Form class="pwd-form" ref="pwdForm" :model="pwdForms" :rules="pwdRuleValidate">
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
                    <Button type="primary" shape="circle" size="large" :loading="submitLoading" @click="changeSubmit">确认</Button>
                </div>
            </div>
        </Modal>

    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    import mixins from '../mixins'
    import api from './api'

    export default {
        mixins: [ mixins ],
        data () {
            // 二次校验密码
            // 因为 iView Pro 的表单控件省去了对数据的绑定，因此需要通过 ref 从 Login 组件中获取数据
            // 下面的 formValidate.password 中的 password，指的是给 <Password> 组件设置的 name="password"
            const validatePassCheck = (rule, value, callback) => {
                if (value !== this.$refs.form.formValidate.password) {
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
                    tel: '',
                    verifycationCode: ''
                },
                userRules: {
                    tel: [{required: true,message: "请输入手机号",trigger: "blur"},
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
                        }],
                    verifycationCode: [{ 
                        validator:(rule,value,callback)=>{
                            this.validatePhone(callback);
                        }
                    }]
                },

                firstPwdModal: false,
                submitLoading: false,
                pwdForms: {
                    password1: '',
                    password2: ''
                },
                pwdRuleValidate: {
                    password1: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                        {min:6,max:20, message: '请输入大于6位小于20位的密码', trigger: 'blur'}                    
                    ],
                    password2: [
                        { required: true, message: '请确认新密码', trigger: 'blur' },
                        { min:6,max:20, message: '请输入大于6位小于20位的密码', trigger: 'blur'} 
                    ]
                }
                // passwordRule: [
                //     {
                //         required: true, message: '密码不能为空！', trigger: 'change'
                //     },
                //     {
                //         min: 6, message: '密码不能少于6位！', trigger: 'change'
                //     }
                // ],
                // passwordConfirmRule: [
                //     {
                //         required: true, message: '确认密码不能为空！', trigger: 'change'
                //     },
                //     { validator: validatePassCheck, trigger: 'change' }
                // ],
                // // 密码长度，在密码强度提示时作为判断依据
                // passwordLen: 0
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
                if(this.password.tel) {
                    this.$http.get(api.verifycationCode, {tel:this.password.tel}).then(data => {
                        this.time = 60;
                        this.timer = setInterval(()=>{
                            //倒计时
                            if(this.time<=0) {
                                this.time = 0;
                                clearInterval(this.timer);
                            } else {
                                this.time-=1;
                            }
                            
                        },1000);
                    });
                    return false;
                } else {
                    this.$Message.error('手机号不能为空');
                }
            },
            validatePhone(callback) {
                if(this.password.verifycationCode.length<4)
                {
                    callback(new Error('请输入4位验证码'));
                    return;
                }
                let query = '&tel='+this.password.tel;
                query+= '&captchaValue='+this.password.verifycationCode;
                this.$http.get(api.verifyTelphone+'?'+ query).then((data) => {
                    this.password.verifycationCodeId = data.verifyResult;
                    callback();
                },()=>{
                    this.password.verifycationCodeId = '';
                    callback(new Error('验证码不正确'));
                });
            },
            sumit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid ) {
                        if(!this.password.verifycationCodeId) {
                            this.$Message.error('验证码不正确');
                            return ;
                        } else {
                            this.firstPwdModal = true;
                        }
                    }
                })
            },
            returnLogin() {
                this.$router.push({path: '/login'})
            },
            changeSubmit() {
                this.$refs["pwdForm"].validate((valid) => {
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
    height: 42px;
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
</style>