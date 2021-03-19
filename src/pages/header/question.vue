<template>
    <div class="user-box" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>用户反馈</h3> 
            <div class="c-adv-search-btn">
                <Button @click="save('formItem')">保存</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <Form ref="formItem" :model="formItem" :rules="ruleItem">
                <FormItem>
                    <h4>意见类型:</h4>
                    <RadioGroup v-model="opinion">
                        <Radio label="0">业务需求</Radio>
                        <Radio label="1">系统问题</Radio>
                        <Radio label="2">其他意见</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem prop="content">
                    <h4>请将您的意见反馈给我们:</h4>
                    <Input type="textarea" v-model="formItem.content" :rows="3" placeholder="请输入"></Input>
                </FormItem>
                <FormItem>
                    <h4 style="display: inline-block">添加图片或视频（最多4张）:</h4>
                    <Upload
                        class="avatar-uploader"
                        action="/zuul/base/api/files/upload"
                        :show-upload-list="false"
                        :default-file-list="imgList"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :before-upload="beforeUpload"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :on-success="handleAvatarSuccess"
                        accept="image/*">
                        <Button>上传</Button>
                    </Upload>
                    <div class="img-box">
                        <ul>
                            <li v-for="(item, index) in imgList" :key="index">
                                {{ item.name }}
                                <a href="javascript:;" @click="handleRemove(index, item)">
                                    <Icon type="md-close" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </FormItem>
                <div class="c-form-row-2col">
                    <Row>
                        <Col span="12">
                            <FormItem label="您的名字:" prop="name">
                                <Input v-model="formItem.name" placeholder="请输入你的名字" style="width:200px"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="您的手机号:" prop="phone">
                                <Input v-model="formItem.phone" placeholder="请输入你的手机号" style="width:200px"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
        <Modal
            v-model="modal"
            title="意见提交成功"
            :closable="false"
            width="300">
            <div class="modal-title">
                <Icon type="md-checkmark-circle" />
                <span>感谢您提交意见，我们将尽快回复</span>
            </div>
            <div slot="footer">
                <Button type="primary" @click="modal = false" style="margin: 0 auto">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { getUserCurrent, feedbackMethod } from '@api/header/userSet'
export default {
    data() {
        return {
            height: '',
            opinion: '0',
            formItem: {
                content: '',
                name: '',
                phone: ''
            },
            ruleItem: {
                content: [
                    { required: true, message: '请输入你的反馈意见', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入你的名字', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入你的手机号', trigger: 'blur' }
                ]
            },
            imgList: [],
            modal: false
        }
    },
    mounted() {
        this.height = document.body.clientHeight-46
        this.getUserinfo()
    },
    methods: {
        getUserinfo(){
            getUserCurrent().then(async res => {
                this.formItem = {
                    name: res.data.name,
                    phone: res.data.tel
                }
                this.name = res.data.name
                this.phone = res.data.tel
            })
        },
        beforeUpload(file) {
            const check = this.imgList.length < 4;
            if(!check) {
                this.$Notice.warning({
                    title: '上传数量不能超过4张.'
                });
            }
            return check;
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件名：' + file.name + ' 格式不正确, 请选择 jpg 或者 png.'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '文件大小超过限制',
                desc: '文件大小不能超过2M.'
            });
        },
        handleAvatarSuccess(res, file) {
            let img = {
                name: res.name,
                url: res.path
            }
            this.imgList.push(img)
        },
        handleRemove(index, item) {
            this.imgList.splice(index, 1)
        },
        save(name) {
            this.$refs[name].validate((valid) => {
                if(valid) {
                    let attachments = []
                    this.imgList.map(item=> {
                        attachments.push(item.url)
                    })
                    feedbackMethod({
                        attachments: attachments,
                        content: this.formItem.content,
                        name: this.formItem.name,
                        phone: this.formItem.phone,
                        platform: "PC",
                        type: Number(this.opinion)
                    }).then(res=> {
                        if(res.data.id) {
                            this.modal = true
                            this.opinion = '0'
                            this.formItem = {
                                name: this.name,
                                phone: this.tel,
                                content: ''
                            }
                            this.imgList = []
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
    .c-left-border-blue{
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
        padding: 20px;
        h4 {
            height: 30px;
            margin-top: 20px;
        }
        .avatar-uploader {
            display: inline-block;
            .ivu-btn {
                background: #576374;
                color: #fff;
                padding: 4px 12px;
                font-size: 12px;
                height: auto;
                margin-left: 10px;
                border: none;
            }
        }
        .c-form-row-2col {
            margin-top: 25px;
            padding-top: 10px;
            border-top: 1px solid rgb(238, 238, 238);
        }
    }
    .ivu-form-item-error-tip {
        left: 100px;
    }
    .img-box {
        margin: 10px 0 0 20px;
        .ivu-icon {
            display: inline-block;
            margin-left: 30px;
            font-size: 16px;
            color: rgb(255, 80, 80);
            cursor: pointer;
        }
    }
}
.modal-title {
    text-align: center;
    .ivu-icon {
        color: #19be6b;
        font-size: 32px;
        margin-right: 10px;
    }
}
/deep/.ivu-modal-footer {
    margin-top: 10px;
    border: none;
    div {
        text-align: center;
    }
}
</style>