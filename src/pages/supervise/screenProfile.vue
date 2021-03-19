<template>
    <ht-editor type="2d"></ht-editor>
</template>

<script>
import { getSid } from '@/api/supervise/2d'
export default {
    name: 'process-view-monitor-setting-2d',
    components: {
        htEditor: r => require(['./components/ht-editor'], r)
    },
    mounted() {
        getSid().then(res=> {
            console.log(res)
            sessionStorage.setItem('htEditor.sid', res.data);
        })
    }
}
</script>