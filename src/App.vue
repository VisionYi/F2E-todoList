<template>
  <div id="app">
    <navbar v-model="typeOfTask"></navbar>
    <main class="container main">
      <div
        class="add-task"
        :class="{'add-task--expanded': addPenalStatus === 'add'}"
        v-if="typeOfTask !== 'done'"
      >
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
          @click="switchAddPenal(addPenalStatus)"
          title="More Options"
        >
          <i class="fas fa-ellipsis-v icon"></i>
        </button>
      </div>
      <div
        class="add-task__expansion"
        v-slide-toggle="addPenalStatus"
        v-if="typeOfTask !== 'done'"
      >
        <penal
          :message="message"
          @save="message = ''"
        ></penal>
      </div>
      <div class="main__options">
        <div class="checkbox mr-b" role="checkbox">
          <input type="checkbox" id="sort" v-model="isSortBy">
          <label for="sort">Sort By Favorite</label>
        </div>
        <button
          class="btn btn--primary mr-b"
          v-if="typeOfTask !== 'all'"
          @click="changeAllCheck(mainTasks)"
          v-empty-add:disabled="mainTasks"
        >
          {{ typeOfTask === 'progress' ? 'Check' : 'Uncheck' }} All
        </button>
        <button
          class="btn btn--danger"
          @click="deleteAll(mainTasks)"
          v-empty-add:disabled="mainTasks"
        >
          Delete All
        </button>
      </div>
      <div class="main__tasks mb-s">
        <div
          v-for="item in mainTasks"
          :key="item.id"
          class="card"
          :class="{'card--expanded': item.status === 'display' || item.status === 'edited'}"
        >
          <div class="card__header" :class="{'spacial': item.favorite}">
            <div class="checkbox" role="checkbox" v-if="item.status !== 'edited'">
              <input
                type="checkbox"
                :id="`checkbox-${item.id}`"
                :checked="item.completed"
                @change="switchCheckStatus(item)"
              >
              <label :for="`checkbox-${item.id}`"></label>
            </div>
            <div class="card__content"
              :class="{'card__content--edited': item.status === 'edited'}"
            >
              <input type="text"
                class="card__title-input"
                v-model="editedMassage"
                v-if="item.status === 'edited'"
                v-focus
              >
              <h3
                class="card__title"
                :class="{'card__title--completed': item.completed}"
                @click="switchCheckStatus(item)"
                v-else
              >
                {{ item.message }}
              </h3>
              <ul
                class="card__prompt card__prompt--clickable"
                v-if="isDisplayPrompt(item)"
                @click="switchDisplay(item)"
              >
                <li class="card__prompt__item" v-if="item.date">
                  <i class="far fa-calendar-alt icon" :class="{'mr-s': innerWidth > 540}" title="Deadline"></i>
                  {{ innerWidth > 540 ? (item.date || '') : '' }}
                </li>
                <li class="card__prompt__item" v-if="item.fileName">
                  <i class="far fa-file icon" title="File"></i>
                </li>
                <li class="card__prompt__item" v-if="item.comment">
                  <i class="far fa-comment-dots icon" title="Comment"></i>
                </li>
              </ul>
            </div>
            <div class="card__end">
              <button
                class="btn btn--icon"
                :class="{'warning--text': item.favorite}"
                @click="switchFavorite(item)"
                title="Star Favorite"
              >
                <i class="fa-star icon" :class="[item.favorite? 'fas':'far']"></i>
              </button>
              <button
                class="btn btn--icon"
                :class="{'primary--text': item.status === 'edited'}"
                @click="switchEdited(item)"
                title="Edit"
              >
                <i class="far fa-edit icon"></i>
              </button>
              <button
                class="btn btn--icon"
                @click="deleteTodo(item.id)"
                v-if="item.status !== 'edited'"
                title="Delete"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
          </div>
          <div class="card__expansion" v-slide-toggle="item.status">
            <penal
              :message="editedMassage"
              :todoId="item.id"
            ></penal>
          </div>
        </div>
      </div>
      <div class="main__status">
        {{ typeOfTask === 'done' ? '' : `${progressCount} tasks in progress` }}
        <br v-if="typeOfTask === 'all'">
        {{ typeOfTask === 'progress' ? '' : `${doneCount} tasks in completed`}}
      </div>
    </main>
    <div class="author-footer">
      <i class="fas fa-pen-square author-footer-pen"></i>
      - Created by Visionyi
      <a class="author-footer-link" href="https://github.com/VisionYi/F2E-product-gallery">
        <i class="fas fa-code"></i>
      </a>
    </div>
  </div>
</template>

<script>
import { slideToggle, isEmpty } from '@/shared/util';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      message: '',
      editedMassage: '',
      typeOfTask: 'all', // 類型有 'all' & 'progress' & 'done'
      isSortBy: false,
      innerWidth: window.innerWidth,
    };
  },
  computed: {
    ...mapGetters([
      'todos',
      'progress',
      'done',
      'progressCount',
      'doneCount',
      'addPenalStatus',
    ]),

    mainTasks() {
      let tasks = [];

      if (this.typeOfTask === 'progress') {
        tasks = this.progress;
      }
      if (this.typeOfTask === 'done') {
        tasks = this.done;
      }
      if (this.typeOfTask === 'all') {
        tasks = this.todos;
      }

      // 降冪排序
      if (this.isSortBy) {
        tasks = [...tasks].sort((a, b) => a.favorite < b.favorite);
      }
      return tasks;
    },
  },
  mounted() {
    this.initialData();
  },
  watch: {
    typeOfTask() {
      this.findTaskToClosePenal();

      if (this.addPenalStatus !== 'closed') {
        this.setAddPenalStatus('closed');
      }
    },
  },

  methods: {
    ...mapMutations([
      'setAddPenalStatus',
    ]),
    ...mapActions([
      'initialData',
      'addTodo',
      'updateTodo',
      'updateStatus',
      'deleteTodo',
    ]),

    addTask(message) {
      if (message === '' || this.addPenalStatus === 'add') return;
      this.addTodo(message);
      this.message = '';
    },

    switchAddPenal(status) {
      if (status === 'closed') {
        this.setAddPenalStatus('add');
      } else {
        this.setAddPenalStatus('closed');
      }
    },

    isDisplayPrompt(item) {
      if (item.completed) return false;
      if (!item.date && !item.fileName && !item.comment) return false;
      if (item.status === 'edited') return false;
      return true;
    },

    switchCheckStatus(item) {
      this.updateTodo({
        id: item.id,
        completed: !item.completed,
      });

      if (item.status === 'display') {
        this.updateStatus([item.id, 'closed']);
      }
    },

    switchFavorite(item) {
      this.updateTodo({
        id: item.id,
        favorite: !item.favorite,
      });
    },

    switchEdited(item) {
      if (item.status === 'closed' || item.status === 'display') {
        this.findTaskToClosePenal();
        this.editedMassage = item.message;
        this.updateStatus([item.id, 'edited']);
      } else {
        this.updateStatus([item.id, 'closed']);
      }
    },

    switchDisplay(item) {
      if (item.status === 'closed') {
        this.findTaskToClosePenal();
        this.updateStatus([item.id, 'display']);
      } else {
        this.updateStatus([item.id, 'closed']);
      }
    },

    changeAllCheck(tasks) {
      tasks.forEach((item) => {
        this.switchCheckStatus(item);
      });
    },

    deleteAll(tasks) {
      tasks.forEach((item) => {
        this.deleteTodo(item.id);
      });
    },

    findTaskToClosePenal() {
      const task = this.mainTasks.find(item => item.status !== 'closed');
      if (task) {
        this.updateStatus([task.id, 'closed']);
      }
    },
  },

  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
    slideToggle: {
      update(el, binding) {
        if (binding.value === binding.oldValue) return;
        if (binding.value === 'edited' && binding.oldValue === 'display') return;

        slideToggle(el, 'is-expanded');
      },
    },
    emptyAdd(el, binding) {
      if (!binding.value || isEmpty(binding.value)) {
        el.setAttribute(binding.arg, '');
      } else {
        el.removeAttribute(binding.arg);
      }
    },
  },
};
</script>

<style lang="scss">
.main {
  margin-top: $spacing-l;
  margin-bottom: $spacing-xl;

  &__tasks {
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

    @media (max-width: 540px) {
      padding-left: $spacing-m;
    }
  }

  &__options {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: $spacing;
    margin-bottom: $spacing;

    .icon.fa-sort {
      margin-left: $spacing-s;
    }
    .checkbox {
      font-size: $font-size-m;
    }
  }

  &__sort-tag {
    margin-bottom: $spacing;
    margin-left: $spacing-l;
    color: $color-text-light;
    font-weight: bold;
  }
}

</style>
