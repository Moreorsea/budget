<template>
  <div id="app">
    <FormElement @submitForm="onSubmitForm" />
    <TotalBalance :total="totalBalance" />
    <BudgetList
      :list="list"
      @deleteIItem="onDeleteItem"
      @toggle-dialog-visible="onToggleDialogVisibleFlug"
    />
    <DialogComponent
      @toggle-dialog-visible="onToggleDialogVisibleFlug"
      :visible="dialogVisible"
      @deleteIItem="onDeleteItem"
    />
  </div>
</template>

<script>
import BudgetList from '@/components/BudgetList';
import TotalBalance from '@/components/TotalBalance';
import FormElement from '@/components/FormElement';
import DialogComponent from '@/components/DialogComponent';

export default {
  name: 'App',
  components: {
    BudgetList,
    TotalBalance,
    FormElement,
    DialogComponent,
  },
  data: () => ({
    list: {
      1: {
        type: "INCOME",
        value: 100,
        comment: "Some comment",
        id: 1,
        icon: "el-icon-top",
        classTitle: "success",
      },
      2: {
        type: "OUTCOME",
        value: -50,
        comment: "Some outcome comment",
        id: 2,
        icon: "el-icon-bottom",
        classTitle: "critical"
      }
    },
    dialogVisible: false,
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
      this.onToggleDialogVisibleFlug();
    },
    onSubmitForm(value) {
      this.$set(this.list,Object.keys(this.list).length + 1, {
        ...value,
        id: String(Math.random()),
        icon: value.type === 'INCOME' ? "el-icon-top" : "el-icon-bottom",
        classTitle: value.type === 'INCOME' ? "success" : "critical"
      })
    },
    onToggleDialogVisibleFlug() {
      this.dialogVisible = !this.dialogVisible;
      if(!this.dialogVisible) {
        sessionStorage.removeItem('itemId');
      }
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
