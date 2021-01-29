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
                    :render="renderContent"></Tree>
                </div>
            </div>
            <div class="area-right">
                <div class="area-title">
                    <h3>区域位置信息</h3> 
                    <span v-show="status != 'info'">
                        <Button type="primary" :loading="loading" @click="saveHandle()">保存</Button>
                        <Button @click="cancleHandle()">取消</Button>
                    </span>
                </div>
                <div class="area-form">
                    <Form ref="form" :model="params" :rules="ruleValidate" label-position="right" :label-width="120" autocomplete="off">
                        <FormItem label="区域位置名称" prop="name">
                            <Input v-model="params.name" style="width: 280px" v-if="(status == 'add' || status == 'edit')"></Input>
                            <span v-if="status == 'info'">{{ params.name }}</span>
                        </FormItem>
                        <FormItem label="备注">
                            <Input v-model="params.remarks" style="width: 280px" v-if="(status == 'add' || status == 'edit')"></Input>
                            <span v-if="status == 'info'">{{ params.remarks }}</span>
                        </FormItem>
                        <FormItem label="URL">
                            <Input v-model="params.url" style="width: 280px" placeholder="请输入以https://开头的链接" v-if="(status == 'add' || status == 'edit')"></Input>
                            <span v-if="status == 'info'">{{ params.url }}</span>
                        </FormItem>
                        <FormItem label="MR">
                            <span>真实世界、虚拟世界、数字化信息的实时互动与结合</span>
                            <Button class="area-form-upload" v-if="(status == 'add' || status == 'edit')">上传文件</Button>
                        </FormItem>
                        <FormItem label="位置类别" prop="type">
                            <RadioGroup v-model="params.type" v-if="(status == 'add' || status == 'edit')" >
                                <Radio :label="item.value" v-for="item in types" :key="item.value" :disabled = "disabledType">{{item.label}}</Radio>
                            </RadioGroup>
                            <span v-if="status == 'info'">{{typeText[params.type]}}</span>
                        </FormItem>
                        <FormItem label="站点定位：">
                            <span class="base-process-text" v-if="status == 'info'">{{ (params.latitude && params.longitude)?'有':'无'}}</span>
                            <RadioGroup v-model="show" v-if="(status == 'add' || status == 'edit')">
                                <Radio :label="0" :key="0">无</Radio>
                                <Radio :label="1" :key="1">有</Radio>
                            </RadioGroup>
                            <div class="loca-box" v-if="(status == 'edit' || show == 1)">
                                经纬度
                                <Input v-model="params.longitude" size="small" style="width: 100px;" />
                                <Input v-model="params.latitude" size="small" style="width: 100px;" />
                                <Button size="small" @click="locationBtn()">定位</Button>
                            </div>
                            <div v-if="status == 'info'" style="display:inline-block;margin-left: 300px;">经纬度：
                                <span>{{ params.longitude }},{{ params.latitude }}</span>
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
                                    <img :src="params.imageUrl">
                                </div>
                                <Button v-if="(status == 'add' || status == 'edit')">添加图片</Button>
                            </Upload>
                        </div>
                    </div>
                </div>
                <div class="area-map">
                    <div id="site-map"></div>
                    <div class="map-center-point" v-show="!!show"></div>
                    <div class="bdmap-search">
                        <Input prefix="ios-search" type="text" id="process-bdmap-search-key" class="bdmap-search-key" />
                    </div>
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
import { mapState } from 'vuex'
import mapUtil from '@/libs/map'
var map

function addMarker(data) {
    console.log(data)
    if(data.longitude && data.latitude)  {
        var P = new BMap.Point(data.longitude, data.latitude)
        var marker = new BMap.Marker(P, {icon: new BMap.Icon(point_icon, new BMap.Size(38, 38))})
        marker.setOffset(new BMap.Size(4,-19))
        map.addOverlay(marker)
        map.centerAndZoom(P, 15)
    } else {
        map.clearOverlays()
    }
}
function clearMapSearch() {
    document.querySelector('#process-bdmap-search-key').value = ''
}

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
                    { required: true, message: '位置类别', trigger: 'blur', type: 'number' }
                ],
                url: [
                    { pattern: /^(https):\/\/.+$/, message: '请输入以https://开头的链接', trigger: 'change' }
                ]
            },
            parentId: '',
            disabledType: false,
            show: 0,
            params: {
                id: '',
                parentId: '',
                name: '',
                type: '',
                imageUrl: ''
            },
            activeTreeId: '',
            location: {
                lng: '',
                lat: ''
            },
            locationTemp: {
                lng: '',
                lat: ''
            },
            status: 'info', // info, edit, add
            loading: false
        }
    },
    computed: mapState({
        types: state => state.map.process.type,
        typeText: state => state.map.process.typeText
    }),
    mounted() {
        this.height = document.body.clientHeight-80
        document.querySelector('#site-map').style.height = document.body.clientHeight-390 + 'px'
        mapUtil.create(()=> {
            map = new BMap.Map('site-map')
            map.enableScrollWheelZoom(true)
            mapUtil.setStyle(map)

            mapUtil.placePoint(map, (point)=>{
                console.log(point)
                this.location.lng = point.lng
                this.location.lat = point.lat
            });
            
            mapUtil.addSearch(map, 'process-bdmap-search-key', (po)=>{
                console.log(po)
                this.locationTemp.lng = po.lng
                this.locationTemp.lat = po.lat
            });
            map.addEventListener('dragend',  (e)=>{
                if(this.show == 1) {
                    let pos = map.getCenter()
                    this.locationTemp.lng = pos.lng
                    this.locationTemp.lat = pos.lat
                }
            });
        });

        this.getRegional()
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
                    h('span', {
                        on: {
                            click:() => {
                                this.getNode(data)
                            }
                        }
                    }, data.title)
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
                            click: () => { this.edit(data) }
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
                            click: () => { this.remove(data) }
                        }
                    },'删除'),
                    (data.children.length != 0) && h('Button', {
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
                            click: () => { this.append(data) }
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
        resetForm() {
            this.$refs["form"].resetFields();
        },
        getNode(data) {
            getlocationInfor(data.id).then(res=> {
                this.params = res.data
                this.activeTreeId = res.data.id
                if(this.params.latitude && this.params.longitude) {
                    map.setCenter(new BMap.Point(this.params.longitude, this.params.latitude))
                } else if(this.locationTemp.lng && this.locationTemp.lat) {
                    map.centerAndZoom(new BMap.Point(this.locationTemp.lng, this.locationTemp.lat), 15)
                } else if(this.location.lng && this.location.lat) {
                    map.centerAndZoom(new BMap.Point(this.location.lng, this.location.lat), 15)
                } else {
                    mapUtil.placePoint(map, (point)=>{
                        this.location.lng = point.lng
                        this.location.lat = point.lat
                    });
                }
            }).catch(err => {
                // 异常情况
            })
        },
        append(data) {
            this.resetForm()
            this.status = 'add'
            this.activeTreeId = data.id
            this.disabledType = false
            this.params = {
                name: '',
                type: '',
                parentId: data.id,
                latitude: null,
                longitude: null,
                imageUrl: ''
            }

            this.show = 0
            map.clearOverlays()
        },
        remove(data) {
            this.activeTreeId = data.id
            this.cancelModal = true
        },
        edit(data) {
            this.resetForm()
            this.status = 'edit'
            this.activeTreeId = data.id
            this.params = Object.assign({}, this.params, data)
            
            map.clearOverlays();
            if(data.longitude && data.latitude)  {
                this.show = 1
                this.locationTemp.lng = data.longitude
                this.locationTemp.lat = data.latitude
                map.setCenter(new BMap.Point(this.params.longitude, this.params.latitude))
            } else {
                this.show = 0
                map.setCenter(new BMap.Point(this.location.lng, this.location.lat))
            }
            if ((data.type == 1 && data.children.length > 0) || data.type==2)
                this.disabledType = true
            else this.disabledType = false


        },
        locationBtn() {
            if(this.params.latitude != '' && this.params.longitude != '') {
                map.clearOverlays()
                map.setCenter(new BMap.Point(this.params.longitude, this.params.latitude))
            }
        },
        saveHandle() {
            const status = this.status
            this.$refs["form"].validate(valid => {
                if (valid) {   
                    if(this.show == 0) {
                        this.params.longitude = ''
                        this.params.latitude = ''
                    } else {
                        this.params.longitude = this.locationTemp.lng
                        this.params.latitude = this.locationTemp.lat
                    }
                    if(status == 'add') {
                        let data = this.params
                        this.loading = true
                        appendLocation({
                            checked: 0,
                            imageUrl: this.params.imageUrl,
                            latitude: this.params.latitude,
                            longitude: this.params.longitude,
                            mrs: [],
                            name: this.params.name,
                            parentId: this.params.parentId,
                            remarks: this.params.remarks,
                            type: this.params.type
                        }).then(res=> {
                            if (res.data.id) {
                                this.status = 'info'
                                this.$Notice.success({
                                    title: "新建成功"
                                });
                                this.show = 0
                                addMarker(data)
                            }
                            this.loading = false
                        }).catch(err => {
                            this.loading = false
                        })
                    } else if(status == 'edit') {
                        let data = this.params
                        editLocation({
                            checked: 0,
                            id: this.activeTreeId,
                            idPath: this.params.idPath,
                            imageUrl: this.params.imageUrl,
                            latitude: this.params.latitude,
                            longitude: this.params.longitude,
                            location: this.params.location,
                            mrs: [],
                            name: this.params.name,
                            no: this.params.no,
                            parentId: this.params.parentId,
                            remarks: this.params.remarks,
                            seqOrder: this.params.seqOrder,
                            state: this.params.state,
                            tenantId: this.params.tenantId,
                            type: this.params.type,
                            url: this.params.url,
                            version: this.params.version
                        }).then(res => {
                            if(res.data.count) {
                                this.status = 'info'
                                this.$Notice.success({
                                    title: '编辑成功'
                                })
                                this.show = 0
                                addMarker(data)
                            }
                        }).catch(()=>{
                            this.loading = false
                        })
                    }
                }
            })
        },
        cancleHandle(name) {
            this.status = 'info'
            this.show = 0
            addMarker(this.params)
        },
        handleUploadicon(file) {
            let formData = new FormData()
            formData.append('file', file)
            uploadFun(formData).then(res=> {
                // console.log(res)
                this.params.imageUrl = res.data.fullPath
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
            let id = this.activeTreeId
            cancleLocation(id).then(res => {
                // console.log(JSON.stringify(res.data))
                this.success1(true)
                this.getRegional()
                this.status = 'info'
                this.params = {
                    name: '',
                    type: '',
                    parentId: 0,
                    latitude: null,
                    longitude: null,
                    imageUrl: ''
                };
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
                position: relative;
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
.map-center-point {
    width: 38px;
    height: 38px;
    background: url('../../images/map/point.png') no-repeat 0 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -15px;
    margin-top: -38px;
}
.bdmap-search {
    position: absolute;
    top: 17px;
    right: 20px;
}
</style>