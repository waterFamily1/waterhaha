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
                                <span v-if="isEdit == 'false'">{{ model }}</span>
                                <div v-if="isEdit == 'true'">
                                    <Input :value="model" @on-change="changeData('model',$event)" placeholder="" :maxlength="50"></Input>
                                </div>
                            </FormItem>
                        </div>
                        <div class="c-form-item">
                            <FormItem label="规格：">
                                <span v-if="isEdit == 'false'">{{ specification }}</span>
                                <div v-if="isEdit == 'true'">
                                    <Input :value="specification" @on-change="changeData('specification',$event)" placeholder=""  :maxlength="20"></Input>
                                </div>
                            </FormItem>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="c-form-item">
                            <FormItem label="品牌：">
                                <span v-if="isEdit == 'false'">{{ brand }}</span>
                                <div v-if="isEdit == 'true'">
                                    <Input :value="brand" @on-change="changeData('brand',$event)" placeholder="" :maxlength="50"></Input>
                                </div>
                            </FormItem>
                        </div>
                        <div class="c-form-item">
                            <FormItem label="安装位置：">
                                <span v-if="isEdit == 'false'">{{ installSite }}</span>
                                <div v-if="isEdit == 'true'">
                                    <Input :value="installSite" @on-change="changeData('installSite',$event)" placeholder="" :maxlength="50"></Input>
                                </div>
                            </FormItem>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <div class="c-form-item">
                            <FormItem label="安装日期：">
                                <span v-if="isEdit == 'false'">{{ installDate|transDateFromServer }}</span>
                                <div v-if="isEdit == 'true'">
                                    <DatePicker type="date" placeholder="安装日期" :value="installDate" :transfer = "true" @on-change="changeData('installDate',$event)" placement="top"></DatePicker >
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
                                <span v-if="isEdit == 'false'">{{ vendor }}</span>
                                <div v-if="isEdit == 'true'">
                                    <Input :value="vendor" @on-change="changeData('vendor',$event)" placeholder="" :maxlength="50"></Input>
                                </div>
                            </FormItem>
                        </div>
                        <div class="c-form-item">
                            <FormItem label="生产厂家：">
                                <span v-if="isEdit == 'false'">{{ manufacturer }}</span>
                                <div v-if="isEdit == 'true'">
                                    <Input :value="manufacturer" @on-change="changeData('manufacturer',$event)" placeholder="" :maxlength="50"></Input>
                                </div>
                            </FormItem>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="c-form-item">
                            <FormItem label="出厂日期：">
                                <span v-if="isEdit == 'false'">{{ manufactureDate|transDateFromServer }}</span>
                                <div v-if="isEdit == 'true'">
                                    <DatePicker type="date" placeholder="出厂日期" :value="manufactureDate" @on-change="changeData('manufactureDate',$event)" placement="top"></DatePicker>
                                </div>
                            </FormItem>
                        </div>
                        <div class="c-form-item">
                            <FormItem label="出厂编号：">
                                <span v-if="isEdit == 'false'">{{ serialNumber }}</span>
                                <div v-if="isEdit == 'true'">
                                    <Input :value="serialNumber" @on-change="changeData('serialNumber',$event)" placeholder="" :maxlength="50"></Input>
                                </div>
                            </FormItem>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <div class="c-form-item">
                            <FormItem label="保修期限(年)：">
                                <span v-if="isEdit == 'false'">{{ warrantyPeriod }}</span>
                                <div v-if="isEdit == 'true'">
                                    <Input :value="warrantyPeriod" @on-change="changeData('warrantyPeriod',$event)" placeholder="" :maxlength="10"></Input> 
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
        console.log(typeof(this.isEdit))
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