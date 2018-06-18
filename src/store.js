import Vue from 'vue';
import Vuex from 'vuex';
import { getRandomId } from '@/shared/util';
import moment from 'moment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
    sort: {
      favorite: [
        '2',
      ],
      normal: [
        '3',
        '1',
      ],
    },
  },

  getters: {
    todos: state => state.todos,
    progress: state => state.todos.filter(item => !item.completed),
    done: state => state.todos.filter(item => item.completed),
  },

  mutations: {
    setTodos(state, list) {
      state.todos = list;
    },
    pushTodo(state, item) {
      state.todos.push(item);
    },
    updateTodo(state, { id, ...data }) {
      const index = state.todos.findIndex(item => item.id === id);
      state.todos.splice(index, 1, { ...state.todos[index], ...data });
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id === id);
      state.todos.splice(index, 1);
    },
  },

  actions: {
    initialData({ commit }) {
      let data = [
        {
          id: '1',
          message: '新增第一筆資料',
          completed: false,
          favorite: true,
          deadline: 1528279999,
          fileName: 'ok.png',
          comment: '這有內容',
        },
        {
          id: '2',
          message: 'Test 2',
          completed: true,
          favorite: false,
          deadline: null,
          fileName: null,
          comment: 'NO!!',
        },
        {
          id: '3',
          message: 'Test 3',
          completed: false,
          favorite: false,
          deadline: 1528277505,
          fileName: 'ok.png',
          comment: null,
        },
        {
          id: '4',
          message: 'Test 4',
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
          ...item, date, time,
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
      };

      commit('pushTodo', todo);
    },
  },
});
