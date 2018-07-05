import Vue from 'vue';
import Vuex from 'vuex';
import { getRandomId, local } from '@/shared/util';
import moment from 'moment';

Vue.use(Vuex);

function setLocalTodo(data) {
  local.setData('todo-data', data);
}

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
      const defaultData = [
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
          deadline: '',
          fileName: '',
          comment: 'NO!!',
        },
        {
          id: '3',
          message: 'Try to add a Task!',
          completed: false,
          favorite: true,
          deadline: '',
          fileName: '',
          comment: '',
        },
      ];

      let data = local.getData('todo-data', Object) || defaultData;

      data = data.map((item) => {
        const date = item.deadline ? moment.unix(item.deadline).format('YYYY-MM-DD') : '';
        const time =
          item.deadline &&
          moment.unix(item.deadline).get('hour') &&
          moment.unix(item.deadline).get('minutes') ? moment.unix(item.deadline).format('HH:mm') : '';
        return {
          ...item, date, time, status: 'closed',
        };
      });

      commit('setTodos', data);
    },

    addTodo({ commit, state }, data) {
      const deadline = (data.date || data.time) ? moment(`${data.date} ${data.time}`).unix() : '';
      const todo = {
        id: getRandomId(),
        message: data.message || data,
        completed: false,
        favorite: false,
        deadline,
        date: data.date || '',
        time: data.time || '',
        fileName: data.fileName || '',
        comment: data.comment || '',
        status: 'closed',
      };

      commit('unshiftTodo', todo);
      setLocalTodo(state.todos);
    },

    updateTodo({ commit, state }, { id, ...data }) {
      commit('updateTodo', { id, ...data });
      setLocalTodo(state.todos);
    },
    updateStatus({ commit, state }, [id, status]) {
      // 狀態有 'display'、'edited'、'closed'
      commit('updateTodo', { id, status });
      setLocalTodo(state.todos);
    },
    deleteTodo({ commit, state }, id) {
      commit('deleteTodo', id);
      setLocalTodo(state.todos);
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
