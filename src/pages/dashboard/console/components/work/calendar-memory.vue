<template>
    <div class="home-item calendar-item">
        <div class="item-title">
            <h3>日历</h3>
            <span>
                <a href="javascript:;" @click="replace" v-if="isEdit">替换</a>
                <a href="javascript:;" @click="del" v-if="isEdit">删除</a>
            </span>
        </div>
        <div>
            <mg-calendar :eventsData="eventsData" :anaounceDetail="anaounceDetail" :multi="true" :offset="1" @on-click="calendarClick"></mg-calendar>
        </div>
    </div>
</template>

<script>
import mgCalendar from '../mg-calendar'

export default {
    components: {
        mgCalendar
    },
    props: {
		isEdit: Boolean,
		itemData: Object,
		orgId: {
			type: [String, Number],
			default: -1
		}
	},
    data() {
        return {
            eventsData: [],
            anaounceDetail: {}
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        del() {
            this.$emit('on-delete', this.itemData)
        },
        replace() {
            this.$emit('on-replace', this.itemData)
        },
		getData() {
            let params = {
                type: 1,
                status: 1,
                currentPage: 0,
                pageSize: 0
            };
            this.$http.get(api.task, params).then(res => {
                res.items.forEach(item => {
                    item.date = util.transDateFromServer(item.showTime, 'yyyy-MM-dd');
                    item.event = item.name;
                })
                this.eventsData = res.items;
            })
            this.$http
                .get(messageApi.getAnnouncementList, {
                    pageSize: 1,
                    currentPage: 1
                })
                .then(res => {
                    if (res.items){this.anaounceDetail = res.items[0];}

                });

		},
		calendarClick(data) {
            this.$router.push({name: 'task-panel'});
        }
    }
}
</script>

<style lang="less" scoped>

</style>