<template>
    <div class="area-box" :style="{height: height+'px'}">
        <div class="area-tree">
            <div class="area-left">
                <div class="area-title">
                    <h3>区域位置结构</h3>
                    <span class="area-title-btn-box">
                        <Button>导出二维码</Button>
                        <Button @click="uploadArea()">导入区域位置</Button>
                    </span>
                </div>
                <div class="area-list">
                    <Tree :data="baseData" class="demo-tree-render"></Tree>
                </div>
            </div>
            <div class="area-right">
                <div class="area-title">
                    <h3>区域位置信息</h3> 
                    <span>
                        <Button type="primary">保存</Button>
                        <Button>取消</Button>
                    </span>
                </div>
                <div class="area-form">
                    <Form ref="areaList" :model="areaList" :rules="ruleValidate" label-position="right" :label-width="120" autocomplete="off">
                        <FormItem label="区域位置名称" prop="areaName">
                            <Input v-model="areaList.areaName" style="width: 280px"></Input>
                        </FormItem>
                        <FormItem label="备注">
                            <Input v-model="areaList.other" style="width: 280px"></Input>
                        </FormItem>
                        <FormItem label="URL">
                            <Input v-model="areaList.url" style="width: 280px"></Input>
                        </FormItem>
                        <FormItem label="MR">
                            <span>真实世界、虚拟世界、数字化信息的实时互动与结合</span>
                            <Button class="area-form-upload">上传文件</Button>
                        </FormItem>
                        <FormItem label="位置类别" prop="areaKind">
                            <RadioGroup v-model="areaList.areaKind" style="width: 280px">
                                <Radio label="male">区域</Radio>
                                <Radio label="female">位置</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="站点定位">
                            <RadioGroup v-model="areaList.location">
                                <Radio label="no">无</Radio>
                                <Radio label="yes">有</Radio>
                            </RadioGroup>
                            <span>无</span>
                        </FormItem>
                    </Form>
                    <div class="upload-img">
                        <div class="img-box">
                            <img :src="uploadUrl">
                        </div>
                        <div class="img-btn">
                            <Upload action="//jsonplaceholder.typicode.com/posts/"
                                :format="['jpg','jpeg','png']"
                                ref="upload">
                                <Button>添加图片</Button>
                            </Upload>
                        </div>
                    </div>
                </div>
                <div class="area-map">
                    <baidu-map center="天津" :zoom="13" 
                        :scroll-wheel-zoom="true" :style="{height: mapHei+'px'}">
                        <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
                        <bm-view class="map"></bm-view>
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
    </div>
</template>
<script>
export default {
    name: 'areaSiteInfor',
    data () {
        return {
            height: '',
            mapHei: '',
            uploadUrl: '',
            baseData: [],
            areaList: {
                areaName: '',
                other: '',
                url: '',
                areaKind: '',
                location: ''
            },
            ruleValidate: {
                areaName: [
                    { required: true, message: '请输入区域位置名称', trigger: 'blur' }
                ],
                areaKind: [
                    { required: true, message: '位置类别', trigger: 'blur' }
                ]
            },
            postionMap:{  //地图坐标
                lng: 120.211486,
                lat: 30.256576
            },
            keyword: ''
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.mapHei = document.body.clientHeight-390
    },
    methods: {
        getPoint() {
           
        },
        uploadArea() {
            this.$router.push({
                path:'/other/areaUpload',
                query: {
                    uploadName: '区域位置导入'
                }
            })
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
}
</style>