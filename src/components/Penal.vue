<template>
  <div class="penal">
    <ul class="penal__body">
      <li class="penal__item">
        <label class="penal__item__title">
          <i class="far fa-calendar-alt icon mr-s"></i>Deadline
        </label>
        <div class="penal__item__content">
          <input type="date" class="input mr-s" v-model="date">
          <input type="time" class="input" v-model="time">
        </div>
      </li>
      <li class="penal__item">
        <label class="penal__item__title">
          <i class="far fa-file icon mr-s"></i>File
        </label>
        <div class="penal__item__content">
          <div class="file" role="file">
            <span class="file__name file__name--left">{{ fileName }}</span>
            <label for="file-1"><i class="fas fa-plus icon"></i></label>
            <input type="file" id="file-1" @change="uploadFile($event)">
          </div>
        </div>
      </li>
      <li class="penal__item">
        <label class="penal__item__title">
          <i class="far fa-comment-dots icon mr-s"></i>Comment
        </label>
        <div class="penal__item__content">
          <textarea class="input" v-model="comment"></textarea>
        </div>
      </li>
    </ul>
    <div class="penal__footer">
      <button class="btn btn--danger" @click="cancel()">
        <i class="fas fa-times icon mr-b"></i>
        Cancel
      </button>
      <button class="btn btn--primary" @click="save(penalData)">
        <i class="fas fa-plus icon mr-b"></i>
        {{ status === 'add' ? 'Save' : 'Update' }}
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
    status: {
      type: String,
      default: 'close',
      required: true,
    },
  },
  data() {
    return {
      date: '',
      time: '',
      fileName: '',
      comment: '',
    };
  },
  computed: {
    ...mapGetters([
      'todos',
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
  },

  watch: {
    status(newValue) {
      if (newValue === 'close') {
        this.resetAll();
      }

      if (newValue === 'edit') {
        const todoData = this.todos.find(item => item.id === this.todoId);
        this.date = todoData.date || '';
        this.time = todoData.time || '';
        this.fileName = todoData.fileName || '';
        this.comment = todoData.comment || '';
      }
    },
  },

  methods: {
    ...mapMutations([
      'updateTodo',
    ]),
    ...mapActions([
      'addTodo',
    ]),

    uploadFile(event) {
      const filePath = event.target.value;
      const pathArray = filePath.split('\\');
      this.fileName = pathArray[pathArray.length - 1];
    },

    save(data) {
      if (data.message === '') {
        alert('請輸入 Task 訊息！');
        return;
      }
      if (this.status === 'add') this.addTodo(data);
      if (this.status === 'edit') this.updateTodo({ id: this.todoId, ...data });
      this.$emit('save');
    },

    cancel() {
      this.$emit('cancel');
    },

    resetAll() {
      this.date = '';
      this.time = '';
      this.fileName = '';
      this.comment = '';
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
