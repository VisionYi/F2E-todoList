import Vue from 'vue';
import Vuex from 'vuex';
import { getRandomId } from '@/shared/util';
import moment from 'moment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
    addPenalStatus: 'closed', // 狀態有 'add' & 'closed'
  },

  getters: {
    // 使用拷貝的方式，可防止物件或陣列指向參考而變動自身
    todos: state => [...state.todos],
    progress: state => state.todos.filter(item => !item.completed),
    done: state => state.todos.filter(item => item.completed),
    progressCount: (state, getters) => getters.progress.length,
    doneCount: (state, getters) => getters.done.length,
    addPenalStatus: state => state.addPenalStatus,
    getTodoById: state => id => state.todos.find(item => item.id === id),
    getStatusById: (state, getters) => id => getters.getTodoById(id).status,
  },

  actions: {
    initialData({ commit }) {
      let data = [
        {
          id: '1',
          message: '新增第一筆 Task',
          completed: false,
          favorite: true,
          deadline: 1528270000,
          fileName: 'ok.png',
          comment: '這有內容',
        },
        {
          id: '2',
          message: '這是完成的 Task',
          completed: true,
          favorite: false,
          deadline: null,
          fileName: null,
          comment: 'NO!!',
        },
        {
          id: '3',
          message: 'Try to add a Task!',
          completed: false,
          favorite: true,
          deadline: null,
          fileName: null,
          comment: null,
        },
      ];

      data = data.map((item) => {
        const date = item.deadline ? moment.unix(item.deadline).format('YYYY-MM-DD') : null;
        const time =
          item.deadline &&
          moment.unix(item.deadline).get('hour') &&
          moment.unix(item.deadline).get('minutes') ? moment.unix(item.deadline).format('HH:mm') : null;
        return {
          ...item, date, time, status: 'closed',
        };
      });

      commit('setTodos', data);
    },

    addTodo({ commit }, data) {
      const todo = {
        id: getRandomId(),
        message: data.message || data,
        completed: false,
        favorite: false,
        date: data.date || null,
        time: data.time || null,
        fileName: data.fileName || null,
        comment: data.comment || null,
        status: 'closed',
      };

      commit('unshiftTodo', todo);
    },

    updateTodo({ commit }, { id, ...data }) {
      commit('updateTodo', { id, ...data });
    },
    updateStatus({ commit }, [id, status]) {
      // 狀態有 'display'、'edited'、'closed'
      commit('updateTodo', { id, status });
    },
    deleteTodo({ commit }, id) {
      commit('deleteTodo', id);
    },
  },

  mutations: {
    setTodos(state, list) {
      state.todos = list;
    },
    pushTodo(state, item) {
      state.todos.push(item);
    },
    unshiftTodo(state, item) {
      state.todos.unshift(item);
    },
    updateTodo(state, { id, ...data }) {
      const index = state.todos.findIndex(item => item.id === id);
      state.todos.splice(index, 1, { ...state.todos[index], ...data });
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id === id);
      state.todos.splice(index, 1);
    },
    setAddPenalStatus(state, status) {
      state.addPenalStatus = status;
    },
  },
});
