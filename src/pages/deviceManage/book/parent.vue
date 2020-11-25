<template>
    <div class="equ-parent">
        <!-- 上级设备 -->
        <div v-show="!!parentEquData.code" style="margin-top: 20px;">
            <div class="equ-edit-left">
                <div class="equ-edit-img">
                    <div v-if="parentEquData.imageUrl">
                        <img :src="parentEquData" width=100% height=100% />
                    </div>
                    <div v-if="!parentEquData.imageUrl">
                        <img src="../../../assets/images/default.png" width=100% height=100% />
                    </div>
                </div>
            </div>
            <div class="equ-edit-info">
                <div class="c-form-row-2col">
                    <div class="c-form-item">
                        <label>设备编号：</label>{{ parentEquData.code }}
                    </div>
                    <div class="c-form-item">
                        <label>状态：</label>
                        <span v-if="parentEquData.state == 1">启用</span>
                        <span v-if="parentEquData.state == 2">封存</span>
                        <span v-if="parentEquData.state == 3">报废</span>
                    </div>
                </div>
                <div class="c-form-row-2col">
                    <div class="c-form-item">
                        <label>设备名称：</label>{{ parentEquData.name }}
                    </div>
                    <div class="c-form-item">
                        <label>型号：</label>{{ parentEquData.model }}
                    </div>
                 </div>
                 <div class="c-form-row-2col">
                    <div class="c-form-item">
                        <label>设备类型：</label>{{ parentEquData.typeId }}
                   </div>
                    <div class="c-form-item">
                        <label>品牌：</label>{{ parentEquData.brand }}
                    </div>
                 </div>
                 <div class="c-form-row-2col">
                    <div class="c-form-item">
                        <label>区域位置：</label>{{ parentEquData.processName }}
                   </div>
                    <div class="c-form-item">
                        <label>规格：</label>
                        <span 
                            class="ell" 
                            style="vertical-align:middle;display:inline-block;width: 200px;" :title="parentEquData.specification"
                        >{{ parentEquData.specification }}</span>
                    </div>
                 </div>
                 <div class="c-form-row-1col">
                    <div class="c-form-item">
                       <label>保修期限(年)：</label>{{ parentEquData.warrantyPeriod }}
                    </div>
                 </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'parentEqu',
    props: {
        parentEquData: {
            type: Object
        },
        isEdit: {
            type: Boolean
        }
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="less" scoped>
.equ-parent {
    .equ-edit-left {
        float: left;
        width: 130px;
        position: relative;
    }
    .equ-edit-info {
        float: left;
        width: 800px;
        .c-form-row-2col {
            height: 40px;
            .c-form-item {
                width: 45%;
                display: inline-block;
                min-height: 33px;
                label {
                    display: inline-block;
                    width: 120px;
                    line-height: 35px;
                    text-align: right;
                }
            }
        }
        .c-form-row-1col {
            .c-form-item {
                width: 90%;
                display: inline-block;
                min-height: 33px;
                label {
                    display: inline-block;
                    width: 120px;
                    line-height: 35px;
                    text-align: right;
                }
            }
        }
    }
}
</style>