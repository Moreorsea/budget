import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: {
      1: {
        type: "INCOME",
        value: 100,
        comment: "Some comment вывод из стора",
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
  },
  getters: {
    budgetList: ({list}) => {
      return list;
    },
  },
  mutations: {
    CHANGE_LIST(state, value) {
      Vue.set(state.list,Object.keys(state.list).length + 1, {
        ...value,
        value: value.type === 'OUTCOME' && value.value > 0 ? value.value * -1 : value.value,
        id: String(Math.random()),
        icon: value.type === 'INCOME' ? "el-icon-top" : "el-icon-bottom",
        classTitle: value.type === 'INCOME' ? "success" : "critical"
      })
    },
    DELETE_ITEM(state, id) {
      Vue.delete(state.list, id);
    },
    UPDATE_LIST(state, list) {
      console.log(state, list);
    },
    SET_BUDGET_LIST(state, list) {
      state.list = list;
    }
  },
  actions: {
    addNewBudgetItem({commit}, list) {
      commit('CHANGE_LIST', list);
    },
    deleteBudgetItem({commit}, id) {
      commit('DELETE_ITEM', id);
    },
    updateList({commit}, list) {
      commit('UPDATE_LIST', list);
    },
    setBudgetList({commit}, list) {
      commit('SET_BUDGET_LIST', list);
    }
  },
  modules: {

  },
});