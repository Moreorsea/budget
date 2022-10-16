<template>
  <div class="list-item-wrapper">
    <span class="budget-comment">{{this.item.comment}}</span>
    <span class="budget-value">{{this.item.value}}</span>
    <ElButton type="danger" size="mini" @click="$emit('delete-item', this.item.id)">Delete</ElButton>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
  },
}
</script>

<style>
  .budget-value {
    font-weight: bold;
    margin-left: auto;
    margin-right: 20px;
  }
</style>