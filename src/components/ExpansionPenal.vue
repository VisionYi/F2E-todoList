<template>
  <div class="penal">
    <ul class="penal__body">
      <li class="penal__item">
        <label class="penal__item__title">
          <i class="far fa-calendar-alt icon mr-s"></i>Deadline
        </label>
        <div class="penal__item__content">
          <input type="date" class="input mr-s" value="2018-05-14">
          <input type="time" class="input" value="08:30">
        </div>
      </li>
      <li class="penal__item">
        <label class="penal__item__title">
          <i class="far fa-file icon mr-s"></i>File
        </label>
        <div class="penal__item__content">
          <div class="file file--name-left" role="file">
            <span class="file__name">file.name</span>
            <label for="file-1"><i class="fas fa-plus icon"></i></label>
            <input type="file" id="file-1">
          </div>
        </div>
      </li>
      <li class="penal__item">
        <label class="penal__item__title">
          <i class="far fa-comment-dots icon mr-s"></i>Comment
        </label>
        <div class="penal__item__content">
          <textarea class="input"></textarea>
        </div>
      </li>
    </ul>
    <div class="penal__footer">
      <button class="btn btn--danger">
        <i class="fas fa-times icon mr-b"></i>Cancel
      </button>
      <button class="btn btn--primary">
        <i class="fas fa-plus icon mr-b"></i>Save
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExpansionPenal',
  props: {
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
