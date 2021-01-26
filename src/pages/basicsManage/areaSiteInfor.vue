<template>
    <div class="area-box" :style="{height: height+'px'}">
        <div class="area-tree">
            <div class="area-left">
                <div class="area-title">
                    <h3>区域位置结构</h3>
                    <span class="area-title-btn-box">
                        <Button @click="exportQRcode()">导出二维码</Button>
                        <Button @click="uploadArea()">导入区域位置</Button>
                    </span>
                </div>
                <div class="area-list">
                    <Tree :data="baseData" class="demo-tree-render" 
                    @on-select-change="getNode" :render="renderContent"></Tree>
                </div>
            </div>
            <div class="area-right">
                <div class="area-title">
                    <h3>区域位置信息</h3> 
                    <span v-if="appear">
                        <Button type="primary" @click="saveHandle()">保存</Button>
                        <Button @click="cancleHandle('areaList')">取消</Button>
                    </span>
                </div>
                <div class="area-form">
                    <Form ref="areaList" :model="areaList" :rules="ruleValidate" label-position="right" :label-width="120" autocomplete="off">
                        <FormItem label="区域位置名称" prop="name">
                            <Input v-model="areaList.name" style="width: 280px" v-if="appear"></Input>
                            <span v-if="appearOther">{{ name }}</span>
                        </FormItem>
                        <FormItem label="备注">
                            <Input v-model="areaList.remarks" style="width: 280px" v-if="appear"></Input>
                            <span v-if="appearOther">{{ remarks }}</span>
                        </FormItem>
                        <FormItem label="URL">
                            <Input v-model="areaList.url" style="width: 280px" placeholder="请输入以https://开头的链接" v-if="appear"></Input>
                            <span v-if="appearOther">{{ url }}</span>
                        </FormItem>
                        <FormItem label="MR">
                            <span>真实世界、虚拟世界、数字化信息的实时互动与结合</span>
                            <Button class="area-form-upload" v-if="appear">上传文件</Button>
                        </FormItem>
                        <FormItem label="位置类别" prop="type">
                            <RadioGroup v-model="areaList.type" style="width: 280px" v-if="appear">
                                <Radio label="2" :disabled="whichAppear == '3'">区域</Radio>
                                <Radio label="1" :disabled="whichAppear == '3'">位置</Radio>
                            </RadioGroup>
                            <span v-if="appearOther">{{ type }}</span>
                        </FormItem>
                        <FormItem label="站点定位">
                            <RadioGroup v-model="areaList.location" v-if="appear" @on-change="locationChange">
                                <Radio label="false">无</Radio>
                                <Radio label="true">有</Radio>
                            </RadioGroup>
                            <div class="loca-box" v-if="locationShow">
                                经纬度
                                <Input v-model="areaList.longitude" size="small" style="width: 100px;" />
                                <Input v-model="areaList.latitude" size="small" style="width: 100px;" />
                                <Button size="small" @click="locationBtn()">定位</Button>
                            </div>
                            <span v-if="appearOther">{{ location }}</span>
                            <div v-if="appearOther&&longitude != ''" style="display:inline-block;margin-left: 300px;">经纬度
                                <span>{{ longitude }},{{ latitude }}</span>
                            </div>
                        </FormItem>
                    </Form>
                    <div class="upload-img">
                        <div class="img-btn">
                            <Upload 
                                action=""
                                :format="['jpg','jpeg','png']"
                                :before-upload="handleUploadicon"
                                :on-format-error="uploadError"
                                accept=".jpg , .png, .jpeg"
                                ref="upload">
                                <div class="img-box">
                                    <img :src="areaList.imageUrl">
                                </div>
                                <Button v-if="appear">添加图片</Button>
                            </Upload>
                        </div>
                    </div>
                </div>
                <div class="area-map">
                    <baidu-map center="天津" :zoom="13" 
                        :scroll-wheel-zoom="true" :style="{height: mapHei+'px'}">
                        <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
                        <bm-view class="map" id="map"></bm-view>
                        <bm-control :offset="{width: '10px', height: '10px'}">
                            <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 1}">
                                <Input suffix="ios-search" placeholder="请输入地名关键字" style="width: auto" />
                            </bm-auto-complete>
                        </bm-control>
                        <bm-local-search :keyword="keyword" :auto-viewport="true" ></bm-local-search>
                    </baidu-map>
                </div>
            </div>
        </div>
        <Modal
            v-model="cancelModal"
            width="260"
            :closable="false"
            @on-ok="cancelOk"
            @on-cancel="cancelClose">
            <p style="text-align:left">
                <Icon type="ios-information-circle" style="color:#f60;margin"></Icon>
                <span>你确定要删除吗？</span>
            </p>
        </Modal>
    </div>
</template>
<script>
import { regionalCon, exportcode1, exportcode2, getlocationInfor, appendLocation, uploadFun, cancleLocation, editLocation } from '@/api/basic/process'
import createTree from '@/libs/public-util'
import axios from 'axios'
import util from '@/libs/public_js'

export default {
    name: 'areaSiteInfor',
    data () {
        return {
            cancelModal: false,
            height: '',
            mapHei: '',
            map: '',
            baseData: [
                {
                    title: '全部',
                    parentId: 'all',
                    expand: true,
                    render: (h, { root, node, data }) => {
                        return h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%'
                            },
                            on: {
                                //鼠标进入
                                mouseover: () => {
                                    this.$set(data,'is_show', true)
                                },
                                //鼠标离开
                                mouseout: () => {
                                    this.$set(data,'is_show', false)
                                }
                            }
                        }, [
                            h('span', [
                                h('span', data.title)
                            ]),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    float: 'right',
                                    marginRight: '32px'
                                }
                            }, [
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        type: 'primary',
                                        size: 'small'
                                    }),
                                    style: {
                                        marginRight: '2px',
                                        fontSize: '12px',
                                        zIndex: '999',
                                        display: data.is_show ? 'inline-block' : 'none'
                                    },
                                    on: {
                                        click: () => { this.append(data) }
                                    }
                                }, '新建')
                            ])
                        ]);
                    },
                    children: []
                }
            ],
            areaList: {
                name: '',
                remarks: '',
                url: '',
                type: '',
                location: '',
                longitude: '',
                latitude: '',
                imageUrl: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入区域位置名称', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '位置类别', trigger: 'blur' }
                ],
                url: [
                    { pattern: /^(https):\/\/.+$/, message: '请输入以https://开头的链接', trigger: 'change' }
                ]
            },
            postionMap:{  //地图坐标
                lng: '',
                lat: ''
            },
            keyword: '',
            id: '',
            seqOrder: '',
            name: '',
            type: '',
            imageUrl: '',
            url: '',
            longitude: '',
            latitude: '',
            location: '',
            remarks: '',
            parentId: '',
            appear: false,
            appearOther: false,
            locationShow: false,
            whichAppear: '4'
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.mapHei = document.body.clientHeight-390
        this.postionMap.lng = '120.211486'
        this.postionMap.lat = '30.256576'
        this.getRegional()
    },
    created() {
        
    },
    methods: {
        getRegional() {
            regionalCon().then(res => {
                // console.log(JOSN.stringify(res.data))
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].expand = false
                    treeItem.push(trees[i])
                }
                this.baseData[0].children = createTree(treeItem, 0)
            }).catch(err => {
                // 异常情况
            })
        },
        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%'
                },
                on: {
                    //鼠标进入
                    mouseover: () => {
                        this.$set(data,'is_show', true)
                    },
                    //鼠标离开
                    mouseout: () => {
                        this.$set(data,'is_show', false)
                    }
                }
            }, [
                h('span', [
                    h('span', data.title)
                ]),
                h('span', [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size: 'small'
                        }),
                        style: {
                            marginRight: '2px',
                            fontSize: '12px',
                            zIndex: '999',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            click: () => { this.edit(root, node, data) }
                        }
                    },'编辑'),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size: 'small'
                        }),
                        style: {
                            marginRight: '2px',
                            fontSize: '12px',
                            zIndex: '999',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            click: () => { this.remove(root, node, data) }
                        }
                    },'删除'),
                    (data.children) && h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size: 'small'
                        }),
                        style: {
                            fontSize: '12px',
                            zIndex: '999',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            click: () => { this.append(root, node, data) }
                        }
                    },'新建')
                ])
            ]);
        },
        exportQRcode() {
            exportcode1().then(res => {
                // console.log(res.data.key)
                let key = res.data.key
                this.export2(key)
            }).catch(err => {
                // 异常情况
            })
            // util.download('/uaa/api/process/qrcode-export')
        },
        export2(key) {
            exportcode2(key).then(res => {
                // console.log(JSON.stringify(res))
                let expQrcode = '/uaa/api/process/qrcode-export'
                util.download(expQrcode);
            }).catch(err => {
                // 异常情况
            })
        },
        getNode(data) {
            let id = data[0].id
            getlocationInfor(id).then(res=> {
                // console.log(JSON.stringify(res.data))
                this.id = res.data.id
                this.parentId = res.data.id
                this.name = res.data.name
                if(res.data.type == 2) {
                    this.type = '区域'
                } else if(res.data.type == 1) {
                    this.type = '位置'
                }
                if(res.data.location == false) {
                    this.location = '无'
                } else if(res.data.location == true) {
                    this.location = '有'
                }
                this.remarks = res.data.remarks
                this.url = res.data.url
                if(res.data.longitude == '') {
                    this.postionMap.lng = '120.211486'
                    this.postionMap.lat = '30.256576'
                } else {
                    this.postionMap.lng = res.data.longitude
                    this.postionMap.lat = res.data.latitude
                }
                this.areaList.imageUrl = res.data.imageUrl
            }).catch(err => {
                // 异常情况
            })
            if(data[0].parentId == 'all') {    
                this.appear = false
                this.appearOther = false
            } else {
                this.appear = false
                this.appearOther = true
            }
        },
        append(root, data, node) {
            this.whichAppear = '2'
            this.appear = true
            this.appearOther = false
            this.areaList.location = 'false'
            this.areaList.name = ''
            this.areaList.remarks = ''
            this.areaList.url = ''
            this.areaList.imageUrl = ''
            this.areaList.latitude = ''
            this.areaList.longitude = ''
            this.areaList.type = ''
        },
        remove(root, node, data) {
            this.cancelModal = true
        },
        edit(root, node, data) {
            this.appear = true
            this.appearOther = false
            this.whichAppear = '3'
            this.areaList.name = this.name
            this.areaList.remarks = this.remarks
            this.areaList.url = this.url
            this.areaList.imageUrl = this.imageUrl
            this.areaList.latitude = this.latitude
            this.areaList.longitude = this.longitude
            if(this.location == '有') {
                this.areaList.location = 'true'
            } else if(this.location == '无') {
                this.areaList.location = 'false'
            }
            if(this.type == '位置') {
                this.areaList.type = '1'
            } else if(this.type == '区域') {
                this.areaList.type = '2'
            }
        },
        locationChange(val) {
            if(val == 'yes') {
                this.locationShow = true
            } else {
                this.locationShow = false
            }
        },
        locationBtn() {
            this.map = new BMap.Map('map')
            if(this.areaList.latitude != '' && this.areaList.longitude != '') {
                map.clearOverlays(); 
                var new_point = new BMap.Point(this.areaList.longitude ,this.areaList.latitude)
                var marker = new BMap.Marker(new_point);  // 创建标注
                map.addOverlay(marker);              // 将标注添加到地图中
                map.panTo(new_point);
            }
        },
        saveHandle() {
            if(this.whichAppear == '2') {
                appendLocation({
                    checked: 0,
                    imageUrl: this.areaList.imageUrl,
                    latitude: this.areaList.latitude,
                    longitude: this.areaList.longitude,
                    mrs: [],
                    name: this.areaList.name,
                    parentId: this.parentId,
                    remarks: this.areaList.remarks,
                    type: this.areaList.type,
                    url: this.areaList.url
                }).then(res=> {
                    this.success2(true)
                    this.appearOther = true
                    this.appear = false
                    this.getRegional()
                    this.name = this.areaList.name
                    this.remarks = this.areaList.remarks
                    this.url = this.areaList.url
                    this.imageUrl = this.areaList.imageUrl
                    this.latitude = this.areaList.latitude
                    this.longitude = this.areaList.longitude
                    if( this.areaList.type == 0) {
                        this.type = '区域'
                    } else if( this.areaList.type == 1) {
                        this.type = '位置'
                    }
                    if( this.areaList.location == false) {
                        this.location = '无'
                    } else if( this.areaList.location == true) {
                        this.location = '有'
                    }
                    // this.locationBtn()
                }).catch(err => {
                    // 异常情况
                })
            } else if(this.whichAppear == '3') {
                editLocation({
                    checked: 0,
                    imageUrl: this.areaList.imageUrl,
                    latitude: this.areaList.latitude,
                    longitude: this.areaList.longitude,
                    mrs: [],
                    name: this.areaList.name,
                    parentId: this.parentId,
                    remarks: this.areaList.remarks,
                    type: this.areaList.type,
                    url: this.areaList.url
                }).then(res => {
                    this.appearOther = true
                    this.appear = false
                    this.getRegional()
                    this.name = this.areaList.name
                    this.remarks = this.areaList.remarks
                    this.url = this.areaList.url
                    this.imageUrl = this.areaList.imageUrl
                    this.latitude = this.areaList.latitude
                    this.longitude = this.areaList.longitude
                    if( this.areaList.type == 0) {
                        this.type = '区域'
                    } else if( this.areaList.type == 1) {
                        this.type = '位置'
                    }
                    if( this.areaList.location == false) {
                        this.location = '无'
                    } else if( this.areaList.location == true) {
                        this.location = '有'
                    }
                }).catch(err => {
                    // 异常情况
                })
            }
        },
        cancleHandle(name) {
            this.$refs[name].resetFields();
        },
        handleUploadicon(file) {
            let formData = new FormData()
            formData.append('file', file)
            uploadFun(formData).then(res=> {
                // console.log(res)
                this.areaList.imageUrl = res.data.fullPath
            }).catch(err => {
                // 异常情况
            })
        },
        uploadError(file) { 
            //上传失败
            this.$Notice.error({
                title: '图片上传失败，请重新上传。',
                desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
            });
        },
        uploadArea() {
            this.$router.push({
                path:'/other/areaUpload',
                query: {
                    uploadName: '区域位置导入'
                }
            })
        },
        cancelOk() {
            let id = this.id
            cancleLocation(id).then(res => {
                // console.log(JSON.stringify(res.data))
                this.success1(true)
                this.getRegional()
                this.appearOther = false
                this.appear = false
            }).catch(err => {
                // 异常情况
            })
        },
        cancelClose () {
            this.cancelModal = false
        },
        success1 (nodesc) {
            this.$Notice.success({
                title: '删除成功',
                desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
            });
        },
        success2 (nodesc) {
            this.$Notice.success({
                title: '新建成功',
                desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
            });
        }
    }
}
</script>
<style lang="less" scoped>
.area-box {
    margin-top: 5px;
    .area-tree {
        display: flex;
        min-height: 100%;
        height: 100%;
        .area-left {
            width: 350px;
            background: #FFF;
            height: 100%;
            .area-title {
                border-bottom: 1px solid #f0f0f0;
                height: 40px;
                line-height: 40px;
                text-indent: 10px;
                color: #495060;
                display: flex;
                justify-content: space-between;
                h3 {
                    font-size: 14px;
                }
                .area-title-btn-box {
                    margin-right: 5px;
                    /deep/.ivu-btn {
                        background: #576374;
                        padding: 3px 15px;
                        color: #fff;
                        font-size: 12px;
                        height: auto;
                    }
                    .ivu-btn:first-child {
                        margin-right: 10px;
                    }
                }
            }
            .area-list {
                width: 100%;
                padding: 0 10px;
                /deep/.ivu-tree-title {
                    width: 100%;
                }
                /deep/.ivu-tree-empty {
                    text-align: center;
                    margin: 30px 0;
                }
                /deep/.ivu-input-wrapper {
                    width: 280px;
                }
            }
        }
        .area-right {
            flex: 1;
            min-height: 100%;
            height: 100%;
            width: 100%;
            background: #FFF;
            border-left: 5px solid #f5f7f9;
            border-right: 5px solid #f5f7f9;
            .area-title {
                border-bottom: 1px solid #f0f0f0;
                height: 40px;
                line-height: 40px;
                text-indent: 10px;
                color: #495060;
                display: flex;
                justify-content: space-between;
                .ivu-btn {
                    height: 25px;
                    font-size: 12px;
                    padding: 0 20px;
                }
                .ivu-btn-primary {
                    margin-right: 15px;
                }
            }
            .area-form {
                margin-top: 10px;
                /deep/.ivu-form-item {
                    margin-bottom: 10px;
                    /deep/.ivu-form-item-label {
                        font-size: 13px;
                    }
                    span {
                        font-size: 13px;
                    }
                    /deep/.ivu-radio-wrapper,
                    /deep/.ivu-input {
                        font-size: 13px;
                    }
                    .area-form-upload {
                        background: #576374;
                        padding: 3px 10px;
                        color: #fff;
                        font-size: 12px;
                        height: auto;
                        margin-left: 10px;
                    }
                }
                .upload-img {
                    width: 200px;
                    position: absolute;
                    top: 50px;
                    right: 10px;
                    .img-box {
                        width: 200px;
                        height: 100px;
                        background: rgb(245, 245, 245);
                        img {
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                        margin-bottom: 10px;
                    }
                    .img-btn {
                        text-align: center;
                        padding-top: 5px;
                        /deep/.ivu-btn{
                            background: #576374;
                            padding: 3px 10px;
                            color: #fff;
                            font-size: 12px;
                            height: auto;
                            margin-left: 10px;
                        }
                    }
                }
            }
            .area-map {
                width: 100%;
                padding: 10px 10px 0 10px;
                .map {
                    width: 100%;
                    height: 300px;
                    /deep/.BMap_noprint {
                        right: 0!important;
                    }
                }
            }
        }
    }
    .loca-box {
        display: inline-block;
        margin-left: 300px;
        /deep/.ivu-input-wrapper:first-child {
            margin-left: 10px;
        }
        /deep/.ivu-input-wrapper {
            margin-right: 5px;
        }
        /deep/.ivu-btn-default {
            background-color: #c8c8c8;
            color: #FFF;
            border: none;
        }
    }
    /deep/.ivu-form-item-error-tip {
        top: 5px;
        left: 290px;
    }
}
</style>