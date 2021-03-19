<template>
  <ht-editor type="3d"></ht-editor>
</template>

<script>
export default {
  name: 'process-view-monitor-setting-3d',
  components: {
    htEditor: r => require(['./components/ht-editor3'], r)
  }
}
</script>


