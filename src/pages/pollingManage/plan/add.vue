<template>
    <div class="plan-box" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>巡检计划</h3>
            <div class="map-type-icon"></div>
            <div class="c-btns-right">
                <button>保存</button>
                <button class="cancel">取消</button>
            </div>
        </div>
        <Form action="" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140" class="form-module">
            <div class="c-top-border-gray">
                <Row>
                    <Col span="12">
                        <FormItem label="巡检计划名称:" prop="name">
                            <Input v-model="formValidate.name"  style="width:300px" size="small"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="提前通知时间:" prop="time">
                            <Input v-model="formValidate.time"  style="width:50px" size="small"></Input>  分钟
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="所属组织:" prop="tissue">
                            <Select v-model="formValidate.tissue" placeholder="请选择" style="width:300px">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="开始时间:" prop="startTime">
                             <DatePicker type="date" :options="options3" 
                                placeholder="Select date" style="width: 200px" 
                                @on-change="getDate" :format="format"
                            >
                             </DatePicker>
                        </FormItem>
                    </Col>  
                </Row>
            </div>
        </Form>
    </div>
</template>
<script>
export default {
    name: 'add',
    data() {
        return {
            type: '',
            height:'',
            formValidate: {
                location:'',
                name:"",
                category:"",
                time:5
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                time: [
                     { required: true, message: '请输入数值', trigger: 'blur' }
                ],
                tissue: [
                    { required: true, message: '', trigger: 'change' }
                ],
            },
            options3: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            },
            format: ''
        }
    },
    created() {
        this.type = this.$route.query.type
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
    watch: {
        data(format) {
            console.log(format)
        }
    },
    methods: {
        getDate(date) {
            console.log(date)
            let week = this.$Date(date).day()
            console.log(week)
            let matter
            switch(week) {
                case 0 : 
                    matter = '星期日';
                    break;
                case 1 : 
                    matter = '星期一';
                    break;
                case 2 : 
                    matter = '星期二';
                    break;
                case 3 : 
                    matter = '星期三';
                    break;
                case 4 : 
                    matter = '星期四';
                    break;
                case 5 : 
                    matter = '星期五';
                    break;
                case 6 : 
                    matter = '星期六';
                    break;
            }
            console.log(this.$Date(date).format('YYYY-MM-DD'+ matter))
            this.format = this.$Date(date).format('YYYY-MM-DD'+  matter)
        }
    }
}
</script>
<style lang="less" scoped>
.plan-box{
    border: 5px solid #f0f0f0;
    min-height: 100%;
    width: 100%;
    background: #fff;
    overflow: auto;
    .c-left-border-blue{
        border-radius: 3px;
        padding: 5px;
        h3{
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-indent: 10px;
        }
        .map-type-icon{
            margin-left: 10px;
            vertical-align: top;
            display: inline-block;
            width: 64px;
            height: 25px;
            background: url('../../../assets/images/map.png') no-repeat 0 0;
        }
        .c-btns-right{
            float: right;
            margin-top: 2px;
            button{
                background: #4b7efe;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                border: 0;
                border-radius: 3px;
                margin: 0 5px;
                min-width: 70px;
            }
            .cancel{
                background: #c8c8c8;
            }
        }
    }
    .c-top-border-gray{
        border-top: 5px solid #f0f0f0;
        padding: 10px;
    }
}
</style>