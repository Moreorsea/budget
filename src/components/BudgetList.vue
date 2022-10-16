<template>
  <div class="buget-list-wrap">
    <ElCard :header="header">
      <template v-if="!isEmpty">
        <div class="list-item" v-for="(item, prop) in list" :key="prop">
          <i :class="item.icon"></i>
          <span class="budget-comment" :class="item.classTitle">{{item.comment}}</span>
          <span class="budget-value">{{item.value}}</span>
          <ElButton type="danger" size="mini" @click="deleteItem(item.id)">Delete</ElButton>
        </div>
      </template>
      <template v-else>
        <ElAlert type="info" :title="title" :closable="false" />
      </template>
    </ElCard>
  </div>
</template>

<script>
export default {
  name: "BudgetList",
  props: {
    list: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    header: "Budget List",
    title: "Empty list"
  }),
  computed: {
    isEmpty() {
      return !Object.keys(this.list).length;
    }
  },
  methods: {
    deleteItem(id) {
      this.$emit('toggle-dialog-visible');
      sessionStorage.setItem('itemId', id);
    }
  }
}
</script>

<style scoped>
  .buget-list-wrap{
    max-width: 500px;
    margin: auto;
  }

  .list-item {
    display: flex;
    align-items: center;
    padding: 10px 15px;
  }

  .budget-value {
    font-weight: bold;
    margin-left: auto;
    margin-right: 20px;
  }

  .critical {
    color: #ff0000;
  }

  .success {
    color: #0dbd13;
  }
</style>
