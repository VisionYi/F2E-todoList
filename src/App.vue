<template>
  <div id="app">
    <navbar></navbar>
    <div class="container body">
      <div class="body__add-task mb-l">
        <i class="fas fa-plus icon"></i>
        <input type="text" class="input" placeholder="Add Task">
      </div>
      <ul class="body__tasks mb-s">
        <li class="card card--spacial">
          <div class="card__checkbox">
            <div class="checkbox" role="checkbox">
              <input type="checkbox" id="task-1">
              <label for="task-1"></label>
            </div>
          </div>
          <div class="card__content">
            <h3 class="card__title">Type Something Here…</h3>
            <ul class="card__prompt">
              <li class="card__prompt__item card__prompt__item--date">
                <i class="far fa-calendar-alt icon"></i>
                5/14
              </li>
              <li class="card__prompt__item"><i class="far fa-file icon"></i></li>
              <li class="card__prompt__item"><i class="far fa-comment-dots icon"></i></li>
            </ul>
          </div>
          <div class="card__end">
            <button class="card__favorite mr-l is-active">
              <i class="fas fa-star icon"></i>
            </button>
            <button class="card__edit">
              <i class="far fa-edit icon"></i>
            </button>
          </div>
        </li>
        <li class="card">
          <div class="card__checkbox">
            <div class="checkbox" role="checkbox">
              <input type="checkbox" id="task-2">
              <label for="task-2"></label>
            </div>
          </div>
          <div class="card__content">
            <h3 class="card__title">Type Something Here…</h3>
            <ul class="card__prompt">
              <li class="card__prompt__item card__prompt__item--date">
                <i class="far fa-calendar-alt icon"></i>
                2019/06/18
              </li>
            </ul>
          </div>
          <div class="card__end">
            <div class="card__favorite mr-l">
              <i class="far fa-star icon"></i>
            </div>
            <div class="card__edit is-active">
              <i class="fas fa-edit icon"></i>
            </div>
          </div>
        </li>
        <li class="card">
          <div class="card__checkbox">
            <div class="checkbox" role="checkbox">
              <input type="checkbox" id="task-3" checked>
              <label for="task-3"></label>
            </div>
          </div>
          <div class="card__content card__content--completed">
            <h3 class="card__title">Type Something Here…</h3>
            <ul class="card__prompt">
              <i class="far fa-file icon"></i>
            </ul>
          </div>
          <div class="card__end">
            <div class="card__favorite mr-l">
              <i class="far fa-star icon"></i>
            </div>
            <div class="card__edit">
              <i class="far fa-edit icon"></i>
            </div>
          </div>
        </li>
      </ul>
      <div class="body__status">3 tasks left</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
.body {
  margin-top: $spacing-l;
  margin-bottom: $spacing-xl;

  &__add-task {
    position: relative;
    width: 100%;
    height: 4rem;
    font-size: $font-size-l;

    .input {
      height: inherit;
      width: inherit;
      padding: 0 2rem 0 4.2rem;
      border-width: 2px;

      &::placeholder {
        color: $color-text-lighter;
        opacity: 1;
      }
    }

    .icon {
      position: absolute;
      left: $spacing-l;
      top: 1.2rem;
      color: $color-text-lighter;
    }
  }

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
  }
}

</style>
