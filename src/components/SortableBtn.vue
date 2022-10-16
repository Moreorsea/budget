<template>
  <div class="sortable-wrapper">
    <ElButton
      type="primary"
      plain
      @click="$emit('sorted', 'INCOME')"
    >Show income</ElButton>
    <ElButton
      type="primary"
      plain
      @click="$emit('sorted', 'OUTCOME')"
    >Show outcome</ElButton>
    <ElButton
      type="primary"
      plain
      @click="$emit('sorted', 'ALL')"
    >Show all</ElButton>
  </div>
</template>

<script>
export default {
  name: "SortableButton",
}
</script>

<style>
.sortable-wrapper {
  width: 500px;
  margin: 20px auto;
}
</style>
