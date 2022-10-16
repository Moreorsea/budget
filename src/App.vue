<template>
  <div id="app">
    <FormElement @submitForm="onSubmitForm" />
    <TotalBalance :total="totalBalance" />
    <BudgetList :list="list" @deleteIItem="onDeleteItem" />
  </div>
</template>

<script>
import BudgetList from '@/components/BudgetList';
import TotalBalance from '@/components/TotalBalance';
import FormElement from '@/components/FormElement';

export default {
  name: 'App',
  components: {
    BudgetList,
    TotalBalance,
    FormElement,
  },
  data: () => ({
    list: {
      1: {
        type: "INCOME",
        value: 100,
        comment: "Some comment",
        id: 1,
      },
      2: {
        type: "OUTCOME",
        value: -50,
        comment: "Some outcome comment",
        id: 2,
      }
    }
  }),
  computed: {
    totalBalance() {
      const balance = Object.values(this.list).reduce((acc, item) => acc + item.value, 0);
      return balance;
    }
  },
  methods: {
    onDeleteItem(id) {
      this.$delete(this.list, id);
    },
    onSubmitForm(value) {
      this.$set(this.list,Object.keys(this.list).length + 1, {
        ...value,
        id: String(Math.random())
      })
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
