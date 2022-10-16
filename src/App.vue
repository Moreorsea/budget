<template>
  <div id="app">
    <FormElement @submitForm="onSubmitForm" />
    <TotalBalance :total="totalBalance" />
    <SortableButton
      @sorted="onSortedList"
    />
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
      },
      3: {
        type: "OUTCOME",
        value: -5000,
        comment: "Корм котикам",
        id: 3,
        icon: "el-icon-bottom",
        classTitle: "critical"
      },
      4: {
        type: "INCOME",
        value: 3500,
        comment: "Подработка",
        id: 4,
        icon: "el-icon-top",
        classTitle: "success",
      },
      5: {
        type: "OUTCOME",
        value: -600,
        comment: "Торт",
        id: 5,
        icon: "el-icon-bottom",
        classTitle: "critical"
      },
      6: {
        type: "OUTCOME",
        value: -600,
        comment: "Посмотреть на зубров",
        id: 5,
        icon: "el-icon-bottom",
        classTitle: "critical"
      },
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
        value: value.type === 'OUTCOME' && value.value > 0 ? value.value * -1 : value.value,
        id: String(Math.random()),
        icon: value.type === 'INCOME' ? "el-icon-top" : "el-icon-bottom",
        classTitle: value.type === 'INCOME' ? "success" : "critical"
      })
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
        this.list = elements;
      } else {
        let sorted = {};
        for(let key in elements) {
          if(elements[key].type === rule) {
            sorted[key] = elements[key];
          }
        }
        this.list = sorted;
      }
    }
  },
  mounted() {
    sessionStorage.setItem('elements', JSON.stringify(this.list));
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
