<template>
  <div id="app">
    <navbar></navbar>
    <div class="container main">
      <div class="add-task" :class="{'add-task--expanded': addPenalStatus === 'add'}">
        <span class="add-task__add"><i class="fas fa-plus icon"></i></span>
        <input
          type="text"
          class="input"
          placeholder="Add Task"
          v-model.trim="message"
          @keyup.enter="addTask(message)"
        >
        <button
          class="btn btn--icon add-task__more"
          :class="{'primary--text': addPenalStatus === 'add'}"
          @click="toggleOptions()"
        >
          <i class="fas fa-ellipsis-v icon"></i>
        </button>
      </div>
      <div class="add-task__expansion" id="more-options">
        <penal
          :message="message"
          :status="addPenalStatus"
          @save="penalSave()"
          @cancel="penalCancel()"
        ></penal>
      </div>
      <div class="main__tasks mb-s">
        <div
          v-for="item in todos"
          :key="item.id"
          class="card"
          :class="cardClass(item)"
        >
          <div class="card__header" :class="{'spacial': item.favorite}">
            <div class="checkbox" role="checkbox" v-if="taskPenalStatus(item) !== 'edit'">
              <input
                type="checkbox"
                :id="`checkbox-${item.id}`"
                :checked="item.completed"
                @change="changeCheckStatus(item)"
              >
              <label :for="`checkbox-${item.id}`"></label>
            </div>
            <div class="card__content"
              :class="{'card__content--edited': taskPenalStatus(item) === 'edit'}"
            >
              <input type="text"
                class="card__title-input"
                v-model="editedMassage"
                v-if="taskPenalStatus(item) === 'edit'"
                v-focus
              >
              <h3
                class="card__title"
                :class="{'card__title--completed': item.completed}"
                v-else
              >
                {{ item.message }}
              </h3>
              <ul
                class="card__prompt"
                v-if="isDisplayPrompt(item)"
              >
                <li class="card__prompt__item" v-if="item.date">
                  <i class="far fa-calendar-alt icon mr-s"></i>
                  {{ item.date }} {{ item.time }}
                </li>
                <li class="card__prompt__item" v-if="item.fileName">
                  <i class="far fa-file icon"></i>
                </li>
                <li class="card__prompt__item" v-if="item.comment">
                  <i class="far fa-comment-dots icon"></i>
                </li>
              </ul>
            </div>
            <div class="card__end">
              <button
                class="btn btn--icon"
                :class="{'warning--text': item.favorite}"
                @click="toggleFavorite(item)"
              >
                <i class="fas fa-star icon" v-if="item.favorite"></i>
                <i class="far fa-star icon" v-else></i>
              </button>
              <button
                class="btn btn--icon"
                :class="{'primary--text': editedId === item.id}"
                @click="toggleEdited(item)"
              >
                <i class="far fa-edit icon"></i>
              </button>
              <button
                class="btn btn--icon"
                @click="deleteTodo(item.id)"
                v-if="taskPenalStatus(item) !== 'edit'"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
          </div>
          <div class="card__expansion" :ref="`exp-${item.id}`">
            <penal
              :message="editedMassage"
              :status="taskPenalStatus(item)"
              :todoId="item.id"
              @save="toggleEdited(item)"
              @cancel="toggleEdited(item)"
            ></penal>
          </div>
        </div>
      </div>
      <div class="main__status">
        {{ progress.length ? `${progress.length} tasks in progress` : '' }}
        {{ progress.length && done.length ? ', ' : '' }}
        {{ done.length ? `${done.length} tasks in completed` : '' }}
      </div>
    </div>
  </div>
</template>

<script>
import { slideToggle } from '@/shared/util';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      message: '',
      addPenalStatus: 'close',
      editedId: null,
      editedMassage: '',
      displayId: null,
    };
  },
  computed: {
    ...mapGetters([
      'todos',
      'progress',
      'done',
    ]),
  },
  mounted() {
    this.initialData();
  },
  methods: {
    ...mapMutations([
      'updateTodo',
      'deleteTodo',
    ]),
    ...mapActions([
      'addTodo',
      'initialData',
    ]),

    addTask(message) {
      if (message === '' || this.addPenalStatus === 'add') return;
      this.addTodo(message);
      this.message = '';
    },

    toggleOptions() {
      const moreEl = document.querySelector('#more-options');

      // 準備展開動畫時
      if (!moreEl.classList.contains('is-expanded')) {
        this.addPenalStatus = 'add';
      }

      slideToggle(moreEl, 'is-expanded').then((height) => {
        // 摺疊動畫結束時
        if (height === 0) {
          this.addPenalStatus = 'close';
        }
      });
    },

    penalSave() {
      this.toggleOptions();
      this.message = '';
    },

    penalCancel() {
      this.toggleOptions();
    },

    isDisplayPrompt(item) {
      if (item.completed) return false;
      if (!item.date && !item.fileName && !item.comment) return false;
      if (this.taskPenalStatus(item) === 'display' || this.taskPenalStatus(item) === 'edit') return false;
      return true;
    },

    changeCheckStatus(item) {
      this.updateTodo({
        id: item.id,
        completed: !item.completed,
      });
    },

    toggleFavorite(item) {
      this.updateTodo({
        id: item.id,
        favorite: !item.favorite,
      });
    },

    toggleEdited(item) {
      const expEl = this.$refs[`exp-${item.id}`][0];

      // 準備展開動畫時
      if (!expEl.classList.contains('is-expanded')) {
        this.displayId = item.id;
        this.editedId = item.id;
        this.editedMassage = item.message;
      }

      slideToggle(expEl, 'is-expanded').then((height) => {
        // 摺疊動畫結束時
        if (height === 0) {
          this.displayId = null;
          this.editedId = null;
          this.editedMassage = '';
        }
      });
    },

    cardClass(item) {
      return {
        'card--expanded': this.taskPenalStatus(item) === 'display' || this.taskPenalStatus(item) === 'edit',
      };
    },

    taskPenalStatus(item) {
      if (this.editedId === item.id) return 'edit';
      if (this.displayId === item.id) return 'display';
      return 'close';
    },
  },

  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
};
</script>

<style lang="scss">
.main {
  margin-top: $spacing-l;
  margin-bottom: $spacing-xl;

  &__tasks {
    margin-top: $spacing-l;

    .card:not(:last-child) {
      margin-bottom: $spacing;
    }
  }

  &__status {
    padding-left: $spacing-l;
    font-size: $font-size-l;
    font-style: italic;
    line-height: $line-height-l;
    color: $color-text-lighter;
  }
}

</style>
