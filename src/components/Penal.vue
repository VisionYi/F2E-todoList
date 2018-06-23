<template>
  <div class="penal">
    <ul class="penal__body">
      <li class="penal__item" v-if="date !== null">
        <label class="penal__item__title">
          <i class="far fa-calendar-alt icon mr-s"></i>Deadline
        </label>
        <div class="penal__item__content">
          <p class="penal__item__display" v-if="isShowDisplay">{{ date }} {{ time || '' }}</p>
          <div v-if="isShowEdited">
            <input type="date" class="input mr-s mb-s" v-model="date">
            <input type="time" class="input" v-model="time">
          </div>
        </div>
      </li>
      <li class="penal__item" v-if="fileName !== null">
        <label class="penal__item__title">
          <i class="far fa-file icon mr-s"></i>File
        </label>
        <div class="penal__item__content">
          <p class="penal__item__display" v-if="isShowDisplay">{{ fileName }}</p>
          <div class="file" role="file" v-if="isShowEdited">
            <span class="file__name file__name--left">{{ fileName }}</span>
            <label :for="`file-${todoId}`"><i class="fas fa-plus icon"></i></label>
            <input type="file" :id="`file-${todoId}`" @change="uploadFile($event)">
          </div>
        </div>
      </li>
      <li class="penal__item" v-if="comment !== null">
        <label class="penal__item__title">
          <i class="far fa-comment-dots icon mr-s"></i>Comment
        </label>
        <div class="penal__item__content">
          <p class="penal__item__display" v-if="isShowDisplay">{{ comment }}</p>
          <textarea class="input" v-model="comment" v-if="isShowEdited"></textarea>
        </div>
      </li>
    </ul>
    <div class="penal__footer" v-if="status !== 'display'">
      <button class="btn btn--danger" @click="cancel()">
        <i class="fas fa-times icon mr-b"></i>
        Cancel
      </button>
      <button class="btn btn--primary" @click="save(penalData)">
        <i class="fas fa-plus icon mr-b"></i>
        {{ saveText }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Penal',
  props: {
    message: {
      type: String,
      default: '',
    },
    todoId: {
      type: [String, null],
      default: null,
    },
  },
  data() {
    return {
      date: '',
      time: '',
      fileName: '',
      comment: '',
      saveText: '',
      isShowDisplay: false,
      isShowEdited: false,
    };
  },
  computed: {
    ...mapGetters([
      'getTodoById',
      'getStatusById',
      'addPenalStatus',
    ]),
    penalData() {
      return {
        message: this.message,
        date: this.date,
        time: this.time,
        fileName: this.fileName,
        comment: this.comment,
      };
    },
    status() {
      // todo task status
      if (this.todoId) {
        return this.getStatusById(this.todoId);
      }
      // add task status
      return this.addPenalStatus;
    },
  },

  watch: {
    status(newValue) {
      if (newValue === 'add') {
        this.date = '';
        this.time = '';
        this.fileName = '';
        this.comment = '';
        this.saveText = 'Save';
        this.isShowEdited = true;
      }

      if (newValue === 'edited') {
        const todoData = this.getTodoById(this.todoId);
        this.date = todoData.date || '';
        this.time = todoData.time || '';
        this.fileName = todoData.fileName || '';
        this.comment = todoData.comment || '';
        this.saveText = 'Update';
        this.isShowDisplay = false;
        this.isShowEdited = true;
      }

      if (newValue === 'display') {
        const todoData = this.getTodoById(this.todoId);
        this.date = todoData.date || null;
        this.time = todoData.time || null;
        this.fileName = todoData.fileName || null;
        this.comment = todoData.comment || null;
        this.isShowDisplay = true;
        this.isShowEdited = false;
      }
    },
  },

  methods: {
    ...mapMutations([
      'setAddPenalStatus',
    ]),
    ...mapActions([
      'addTodo',
      'updateTodo',
      'updateStatus',
    ]),

    uploadFile(event) {
      const filePath = event.target.value;
      const pathArray = filePath.split('\\');
      this.fileName = pathArray[pathArray.length - 1];
    },

    save(data) {
      if (data.message === '') {
        // eslint-disable-next-line
        alert('請輸入 Task 訊息！');
        return;
      }

      if (this.todoId) {
        this.updateTodo({ id: this.todoId, ...data });
      } else {
        this.addTodo(data);
      }

      this.closePenal();
      this.$emit('save');
    },

    cancel() {
      this.closePenal();
      this.$emit('cancel');
    },

    closePenal() {
      if (this.todoId) {
        this.updateStatus([this.todoId, 'closed']);
      } else {
        this.setAddPenalStatus('closed');
      }
    },
  },
};
</script>

<style lang='scss'>
.penal {
  background-color: $color-bg-light;
  border-radius: inherit;

  &__body {
    padding: $spacing-m $spacing-xl;

    @media (max-width: 540px) {
      padding: $spacing $spacing-m;
    }
  }

  &__item {
    &:not(:last-child) {
      margin-bottom: $spacing-m;
    }

    &__title {
      display: block;
      margin-bottom: $spacing-s;
      font-size: $font-size-m;
      line-height: $line-height-m;
    }

    &__content {
      margin-left: $spacing-m;
    }

    .input {
      line-height: 1rem;
      padding: $spacing-s $spacing;
      border: 0;
    }

    textarea.input {
      width: 100%;
      height: 7.5rem;
      line-height: 1.5rem;
    }

    &__display {
      font-weight: bold;
    }
  }

  &__footer {
    display: flex;

    .btn {
      flex: 1 1 auto;
      font-size: $font-size-m;
      line-height: $line-height-m;
      padding-top: 1rem;
      padding-bottom: 1rem;
      border-radius: 0;
    }
  }
}
</style>
