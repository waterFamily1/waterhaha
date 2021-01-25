<template>
    <div class="user-box" :style="{height: height+'px'}">
        <div class="search-header">
             <h3>用户设置</h3>
            <div class="c-adv-search-btn">
                <button type="button" @click="save()">保存</button>
            </div>
        </div> 
        <div class="c-top-border-gray">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100"> 
                <div class="title">基本信息</div>
                <div style="display:inline-block;width:200px">
                    <div class="profile_icon">
                        <img :src="formValidate.img" alt="">
                    </div>
                    <div class="profile_btns">
                        <Button type="primary" style="background:#576374;font-size:12px;color:#fff;height:26px;line-height:26px;border-color:#576374;margin-right:5px">修改密码</Button>
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
                <div class="">
                    <Row>
                        <Col span="12">
                            <FormItem label="系统语言:" prop="language">
                                <Select v-model="formValidate.language" style="width:200px">
                                    <Option v-for="item in langList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="消息提醒方式:" prop="type">
                                 <Select v-model="formValidate.type" style="width:200px">
                                    <Option v-for="item in methodList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
import { uploadFun,userSetting,getUserCurrent } from '@api/header/userSet';
export default {
    name: 'userSet',
    data(){
        return {
            height:'',
            formValidate:{
                name:'',
                tissue:'',
                phone:'',
                email:'',
                terminal:'',
                language:'zh-cn',
                type:'WeChat',
                img:''
            },
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
                {label:'中文',value:"zh-cn"},
                {label:'English',value:"en-us"}
            ],
            methodList:[
                {label:'微信',value:"WeChat"},
                {label:'短信',value:"SMS"}
            ],
            userObj:{},
        }
    },
    mounted() {
        this.height = document.body.clientHeight-46
        this.getUserinfo()
    },
    methods:{
        getUserinfo(){
            getUserCurrent().then(async res => {
                console.log(res)
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
                title: '上传失败，请重新上传。',
                desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
            });
        },
        save(name){
            let data = {
                deviceNo: this.formValidate.terminal,
                email: this.formValidate.email,
                id: this.userObj.id,
                imageUrl: this.formValidate.img,
                langKey: this.formValidate.language,
                msgMode: this.formValidate.type,
                name: this.formValidate.name,
                orgId: this.userObj.orgId,
                orgName: this.userObj.orgName,
                tel: this.formValidate.phone,
                version: this.userObj.version,
            }
            userSetting(data).then(res=>{
                if(res.data.count){
                    this.$Message.success('用户设置成功');
                    this.getUserinfo()
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.user-box{
    margin: 5px;
    background: #fff;
    .search-header{
        background: #fff;
        padding: 5px;
        h3{
            display: inline-block;
        }
        .c-adv-search-btn{
            float: right;
            button{
                background: #4b7efe;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                border: 0;
                border-radius: 3px;
                margin: 0 5px;
            }
            .reset{
                background: #495566;
            }
        }
    }
    .c-top-border-gray{
        border-top: 5px solid #f0f0f0;
        margin-top: 5px;
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
</style>