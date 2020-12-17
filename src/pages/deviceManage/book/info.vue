<template>
    <div class="equ-attach-info">
        <!-- 附属信息 -->
        <Form ref="equ-info-form" :model="equInfoFormModel" :label-width="120">
            <h3 class="c-gray-bg-h">设备信息</h3>
            <div class="padding20-0">
                <Row>
                    <Col span="12">
                        <div class="c-form-item">
                            <FormItem label="设备型号：">
                                <span v-if="!isEdit">{{ model }}</span>
                                <div v-if="isEdit">
                                    <Input 
                                        :value="model" 
                                        @on-change="changeData('model',$event)" 
                                        :maxlength="50"
                                        style="width: 200px"
                                    ></Input>
                                </div>
                            </FormItem>
                        </div>
                        <div class="c-form-item">
                            <FormItem label="品牌：">
                                <span v-if="!isEdit">{{ brand }}</span>
                                <div v-if="isEdit">
                                    <Input 
                                        :value="brand" 
                                        @on-change="changeData('brand',$event)" 
                                        style="width: 200px" 
                                        :maxlength="50"
                                    ></Input>
                                </div>
                            </FormItem>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="c-form-item">
                            <FormItem label="规格：">
                                <span v-if="!isEdit">{{ specification }}</span>
                                <div v-if="isEdit">
                                    <Input 
                                        value="" 
                                        @on-change="changeData('specification',$event)" 
                                        style="width: 200px"
                                        :maxlength="20"
                                    ></Input>
                                </div>
                            </FormItem>
                        </div>
                        <div class="c-form-item">
                            <FormItem label="安装位置：">
                                <span v-if="!isEdit">{{ installSite }}</span>
                                <div v-if="isEdit">
                                    <Input 
                                        :value="installSite" 
                                        @on-change="changeData('installSite',$event)" 
                                        style="width: 200px" 
                                        :maxlength="50"
                                    ></Input>
                                </div>
                            </FormItem>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <div class="c-form-item">
                            <FormItem label="安装日期：">
                                <span v-if="!isEdit">{{ installDate|transDateFromServer }}</span>
                                <div v-if="isEdit">
                                    <DatePicker 
                                        type="date" 
                                        placeholder="安装日期" 
                                        :value="installDate" 
                                        :transfer = "true" 
                                        @on-change="changeData('installDate',$event)" 
                                        placement="top" 
                                        style="width: 200px"
                                    ></DatePicker >
                                </div>
                            </FormItem>
                        </div>
                    </Col>
                </Row>
            </div>
            <h3 class="c-gray-bg-h">厂家信息</h3>
            <div class="padding20-0">
                <Row>
                    <Col span="12">
                        <div class="c-form-item">
                            <FormItem label="供应商名称：">
                                <span v-if="!isEdit">{{ vendor }}</span>
                                <div v-if="isEdit">
                                    <Input 
                                        :value="vendor" 
                                        @on-change="changeData('vendor',$event)" 
                                        style="width: 200px" 
                                        :maxlength="50"
                                    ></Input>
                                </div>
                            </FormItem>
                        </div>
                        <div class="c-form-item">
                            <FormItem label="出厂日期：">
                                <span v-if="!isEdit">{{ manufactureDate|transDateFromServer }}</span>
                                <div v-if="isEdit">
                                    <DatePicker 
                                        type="date" 
                                        placeholder="出厂日期" 
                                        :value="manufactureDate" 
                                        @on-change="changeData('manufactureDate',$event)" 
                                        placement="top"
                                        style="width: 200px"
                                    ></DatePicker>
                                </div>
                            </FormItem>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="c-form-item">
                            <FormItem label="生产厂家：">
                                <span v-if="!isEdit">{{ manufacturer }}</span>
                                <div v-if="isEdit">
                                    <Input 
                                        :value="manufacturer" 
                                        @on-change="changeData('manufacturer',$event)" 
                                        style="width: 200px" 
                                        :maxlength="50"
                                    ></Input>
                                </div>
                            </FormItem>
                        </div>
                        <div class="c-form-item">
                            <FormItem label="出厂编号：">
                                <span v-if="!isEdit">{{ serialNumber }}</span>
                                <div v-if="isEdit">
                                    <Input 
                                        :value="serialNumber" 
                                        @on-change="changeData('serialNumber',$event)" 
                                        style="width: 200px" 
                                        :maxlength="50"
                                    ></Input>
                                </div>
                            </FormItem>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <div class="c-form-item">
                            <FormItem label="保修期限(年)：">
                                <span v-if="!isEdit">{{ warrantyPeriod }}</span>
                                <div v-if="isEdit">
                                    <Input 
                                        :value="warrantyPeriod" 
                                        @on-change="changeData('warrantyPeriod',$event)" 
                                        style="width: 200px" 
                                        :maxlength="10"
                                    ></Input> 
                                </div>
                            </FormItem>
                        </div>
                    </Col>
                </Row>
            </div>
        </Form>
    </div>
</template>

<script>
import util from '@/libs/public_js'

export default {
    name: 'attachInfo',
    props: ['model','specification', 'brand' , 'installSite', 'vendor', 'manufacturer', 'installDate', 'serialNumber', 'manufactureDate', 'warrantyPeriod', 'isEdit'],
    filters:{
        transDateFromServer: util.transDateFromServer
    },
    data() {
        return {
            equInfoFormModel: {
                warrantyPeriod: ''
            }
        }
    },
    mounted () {
        // this.isEdit = sessionStorage.getItem('isEdit')
        // console.log(typeof(this.isEdit))
    },
    methods:{
        changeData (key,e) {
            var item = {};
            item[key] = (typeof e == 'string') ? util.transDateFromLocale(e) : e.target.value;
            this.$emit('infoDataChange', item);
            if(key == 'warrantyPeriod') {
                this.equInfoFormModel.warrantyPeriod = item[key]*1;
            }

        }
    }
}
</script>

<style lang="less" scoped>
.equ-attach-info {
    .c-gray-bg-h {
        background-color: #f4f4f4;
        height: 30px;
        line-height: 30px;
        text-indent: 20px;
        font-weight: 100;
        font-size: 13px;
    }
    .padding20-0 {
        padding: 20px 0;
    }
}
</style>