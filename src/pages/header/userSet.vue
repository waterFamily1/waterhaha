<template>
    <div class="user-box" :style="{height: height+'px'}">
        <div class="search-header">
            <h3>用户设置</h3>
            <div class="c-adv-search-btn">
                <Button @click="save('formValidate')">保存</Button>
            </div>
        </div> 
        <div class="c-top-border-gray">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100"> 
                <div class="title">基本信息</div>
                <div style="display:inline-block;width:200px">
                    <div class="profile_icon">
                        <img :src="formValidate.img" />
                    </div>
                    <div class="profile_btns">
                        <Button type="primary" style="background:#576374;font-size:12px;color:#fff;height:26px;line-height:26px;border-color:#576374;margin-right:5px" @click="alertMsg">修改密码</Button>
                        <Upload 
                            action=""
                            :before-upload="handleUploadicon"
                            :on-format-error="uploadError"
                            accept="image/*"
                            ref="upload">
                            <Button style="background:#576374;font-size:12px;color:#fff;height:26px;line-height:26px;border-color:#576374;margin-right:5px">更改头像</Button>
                        </Upload>
                    </div>
                    
                </div>
                 <div style="display:inline-block;width:80%;margin-left:20px">
                    <Row>
                        <Col span="12">
                            <FormItem label="用户姓名:" prop="name">
                                <span>{{formValidate.name}}</span>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="组织结构:" prop="tissue">
                                <span>{{formValidate.tissue}}</span>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="手机号:" prop="phone">
                               <Input v-model="formValidate.phone" style="width:200px"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="邮箱地址:" prop="email">
                                 <Input v-model="formValidate.email" style="width:200px"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="智能终端:" prop="terminal">
                               <Input v-model="formValidate.terminal" style="width:200px"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div class="title" style="margin-top:23px">系统设置</div>
                <div>
                    <Row>
                        <Col span="12">
                            <FormItem label="系统语言:" prop="language">
                                <Select v-model="formValidate.language" style="width:200px">
                                    <Option v-for="item in langList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="画面触屏:">
                                <Switch size="large" v-model="touch">
                                    <span slot="open">开启</span>
                                    <span slot="close">关闭</span>
                                </Switch>
                                <Tooltip content="开启后只可以触屏使用大屏功能" placement="right">
                                    <Icon type="md-help-circle" style="font-size: 20px;color: rgb(173, 173, 173);margin-left: 5px"/>
                                </Tooltip>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="消息提醒方式:" porp="type">
                                 <Select v-model="formValidate.type" style="width:200px">
                                    <Option v-for="item in methodList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="开启音箱控制:">
                                <Switch size="large" v-model="remind">
                                    <span slot="open">开启</span>
                                    <span slot="close">关闭</span>
                                </Switch>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
        <Modal v-model="editPassword" title="修改密码" width="350">
            <Form ref="passwordForm" class="passwordForm" :model="password" :rules="ruleValidate2">
                <FormItem>
                    <span>手机号：</span>
                    {{ formValidate.phone }}
                </FormItem>
                <FormItem prop="verifycationCode">
                    <Input v-model="password.verifycationCode" placeholder="请输入验证码" style="width:200px" type="text"></Input>&nbsp;&nbsp;
                    <Button type='primary' style="width:100px" @click="sendCode" v-show="time==0">获取验证码</Button>
                    <span v-show="time>0">{{time}}秒后重新获取</span>
                </FormItem>
                <FormItem prop="newPassword" class="level-item">
                    <Input 
                        type="text" 
                        v-model="password.newPassword" 
                        placeholder="请输入新密码" 
                        style="width:310px"
                        @on-change="codeChange"></Input>
                    <div class="level-box">
                        <span :class="{'weak':level == 0}">弱</span>
                        <span :class="{'qualified':level == 1}">合格</span>
                        <span :class="{'strong':level == 2}">强</span>
                    </div>
                </FormItem>
                <FormItem prop="repeatPassword">
                    <Input type="text" v-model="password.repeatPassword" placeholder="请确认新密码" style="width:310px"></Input>
                </FormItem>
            </Form>
            <!-- 页脚 -->
            <div slot="footer">
                <div class="c-modal-footer-btns">
                    <Button type="primary" long @click="savePassword('passwordForm')">确定</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
import { uploadFun, userSetting, getUserCurrent, codeMethod, pswMethod } from '@api/header/userSet'
import { verifyCodeRule } from '@/api/account'
export default {
    name: 'userSet',
    data(){
        return {
            height:'',
            formValidate: {
                name:'',
                tissue:'',
                phone:'',
                email:'',
                terminal:'',
                language: 'zh-cn',
                type: 'WeChat',
                img:''
            },
            touch: true,
            remind: true,
            ruleValidate:{
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                     {validator:(rule, value, callback)=>{
                        let reg=/^\d{11}$/
                        if(!reg.test(value)){
                            callback(new Error("请正确输入有效的手机号"));
                        }else{
                            callback()
                        }
                    }, trigger: 'blur'}
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    {validator:(rule, value, callback)=>{
                        let reg=/^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$/;
                        // !reg.test(value)
                        if(false){
                            callback(new Error("请正确输入有效的邮箱"));
                        }else{
                            callback()
                        }
                    }, trigger: 'blur'}
                ],
            },
            langList:[
                {label: '中文',value: 'zh-cn'},
                {label: 'English',value: 'en-us'}
            ],
            methodList:[
                {label: '微信',value: 'WeChat'},
                {label: '短信',value: 'SMS'}
            ],
            userObj: {},
            editPassword: false,
            password:{
                verifycationCode: '',
                verifycationCodeId: '',
                newPassword: '',
                tel: ''
            },
            ruleValidate2: {
                verifycationCode: [{ 
                    validator:(rule,value,callback)=> {
                        if(!value) 
                            callback(new Error('请输入验证码'));
                        else
                            callback();
                    },trigger: 'blur'
                }],
                newPassword: [
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
                repeatPassword: [
                    { trigger: 'blur',validator:(rule,value,callback)=> {
                        
                        if(value == this.password.newPassword) {
                            callback();
                        } else {
                            callback(new Error('确认密码和新密码不一致'));
                        }
                    }}
                ]
            },
            level: '',
            timer: null,//验证码定时器
            time: 0,//验证码计时
        }
    },
    mounted() {
        this.height = document.body.clientHeight-46
        this.getUserinfo()
    },
    methods:{
        getUserinfo(){
            getUserCurrent().then(async res => {
                // console.log(res)
                let userinfo = res.data
                this.userObj = userinfo
                this.formValidate={
                    name:userinfo.name,
                    tissue:userinfo.orgName,
                    phone:userinfo.tel,
                    email:userinfo.email,
                    terminal:userinfo.deviceNo,
                    language:userinfo.langKey,
                    type:userinfo.msgMode,
                    img:userinfo.imageUrl
                }
            })
        },
         handleUploadicon(file) {
            let formData = new FormData()
            formData.append('file', file)
            uploadFun(formData).then(res=> {
                console.log(res)
                this.formValidate.img = res.data.thumbFullPath
            }).catch(err => {
                // 异常情况
            })
        },
        uploadError(file) { 
            //上传失败
            this.$Notice.error({
                title: '上传失败，请重新上传。'
            });
        },
        save(name){
            this.$refs[name].validate((valid) => {
                if(valid) {
                    let data = {
                        deviceNo: this.formValidate.terminal,
                        email: this.formValidate.email,
                        id: Number(this.userObj.id),
                        imageUrl: this.formValidate.img,
                        langKey: this.formValidate.language,
                        msgMode: this.formValidate.type,
                        name: this.formValidate.name,
                        orgId: Number(this.userObj.orgId),
                        orgName: this.userObj.orgName,
                        tel: this.formValidate.phone,
                        version: Number(this.userObj.version),
                    }
                    userSetting(data).then(res=>{
                        if(res.data.count){
                            this.$Message.success('用户设置成功');
                            this.getUserinfo()
                        }
                    })
                }
            })
        },
        alertMsg() {
            this.editPassword = true
        },
        sendCode() {
            codeMethod({
                tel: this.formValidate.phone
            }).then(res=> {
                this.time = 60
                this.timer = setInterval(()=>{
                    //倒计时
                    if(this.time <= 0) {
                        this.time = 0
                        clearInterval(this.timer)
                    } else {
                        this.time -= 1
                    }
                },1000)
            }).catch(err=> {

            })
            return false
        },  
        // 验证密码强弱
        codeChange(e) {
            let code = this.password.newPassword
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
        },
        savePassword(name) {
            this.$refs[name].validate((valid) => {
                if(valid) {
                    pswMethod({
                        newPassword: this.password.newPassword,
                        tel: this.formValidate.phone,
                        verifyCode: this.password.verifycationCode
                    }).then(res=> {
                        if(res.data.count) {
                            this.$Notice.success({
                                title: '修改密码成功'
                            });
                        }
                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.user-box{
    border: 5px solid #f0f0f0;
    background: #fff;
    .search-header{
        background: #fff;
        padding: 5px;
        h3 {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-indent: 10px;
        }
        .c-adv-search-btn{
            float: right;
            .ivu-btn{
                height: auto;
                background: #4b7efe;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                border: 0;
                border-radius: 3px;
                margin: 0 5px;
            }
        }
    }
    .c-top-border-gray{
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .title{
            background-color: #f4f4f4;
            height: 30px;
            line-height: 30px;
            text-indent: 20px;
            font-weight: 100;
            font-size: 13px;
        }
        .profile_icon{
            display: flex;
            justify-content: center;
            align-items: Center;
            width: 120px;
            height: 140px;
            margin: 10px auto 0;
        }
        .profile_btns{
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        /deep/.ivu-upload-list{
            margin-top: 0;
        }
    }
}
/deep/.ivu-form-item{
    margin-bottom: 0;
    margin-top: 24px;
}
.passwordForm {
    /deep/.ivu-form-item {
        margin: 0 0 26px 0;
    }
}
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
</style>