<template>
  <div id="app">
    <FormElement @submitForm="onSubmitForm" />
    <TotalBalance :total="totalBalance" />
    <SortableButton
      @sorted="onSortedList"
    />
    <BudgetList
      :list="budgetList"
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
import {mapGetters, mapActions} from 'vuex';

import BudgetList from '@/components/BudgetList';
import TotalBalance from '@/components/TotalBalance';
import FormElement from '@/components/FormElement';
import DialogComponent from '@/components/DialogComponent';
import SortableButton from '@/components/SortableBtn.vue';

export default {
  name: 'App',
  components: {
    BudgetList,
    TotalBalance,
    FormElement,
    DialogComponent,
    SortableButton,
  },
  data: () => ({
    dialogVisible: false,
  }),
  computed: {
    ...mapGetters(["budgetList"]),
    totalBalance() {
      const balance = Object.values(this.budgetList).reduce((acc, item) => acc + item.value, 0);
      return balance;
    },

  },
  methods: {
    ...mapActions(["addNewBudgetItem", "deleteBudgetItem", "setBudgetList"]),
    onDeleteItem(id) {
      this.deleteBudgetItem(id);
      this.onToggleDialogVisibleFlug();
    },
    onSubmitForm(value) {
      this.addNewBudgetItem(value);
      sessionStorage.setItem('elements', JSON.stringify(this.list));
    },
    onToggleDialogVisibleFlug() {
      this.dialogVisible = !this.dialogVisible;
      if(!this.dialogVisible) {
        sessionStorage.removeItem('itemId');
      }
    },
    onSortedList(rule) {
      const elements = JSON.parse(sessionStorage.getItem('elements'));

      if(rule === 'ALL') {
        this.setBudgetList(elements);
      } else {
        let sorted = {};
        for(let key in elements) {
          if(elements[key].type === rule) {
            sorted[key] = elements[key];
          }
        }
        this.setBudgetList(sorted);
      }
    }
  },
  mounted() {
    sessionStorage.setItem('elements', JSON.stringify(this.budgetList));
  },
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
