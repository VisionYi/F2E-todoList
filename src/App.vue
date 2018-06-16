<template>
  <div id="app">
    <navbar></navbar>
    <div class="container main">
      <div class="add-task mb-l">
        <span class="add-task__add"><i class="fas fa-plus icon"></i></span>
        <input type="text" class="input" placeholder="Add Task">
        <button class="btn btn--icon add-task__more">
          <i class="fas fa-ellipsis-v icon"></i>
        </button>
      </div>
      <div class="add-task add-task--expanded">
        <span class="add-task__add"><i class="fas fa-plus icon"></i></span>
        <input type="text" class="input" placeholder="Add Task">
        <button class="btn btn--icon add-task__more primary--text">
          <i class="fas fa-ellipsis-v icon"></i>
        </button>
      </div>
      <div class="add-task__expansion">
        <expansion-penal></expansion-penal>
      </div>
      <div class="main__tasks mb-s">
        <div class="card card--spacial card--expanded">
          <div class="card__header">
            <div class="checkbox" role="checkbox">
              <input type="checkbox" id="task-0">
              <label for="task-0"></label>
            </div>
            <div class="card__content">
              <h3 class="card__title">Type Something Here…</h3>
              <ul class="card__prompt">
                <li class="card__prompt__item">
                  <i class="far fa-calendar-alt icon mr-s"></i>5/14
                </li>
                <li class="card__prompt__item"><i class="far fa-file icon"></i></li>
                <li class="card__prompt__item"><i class="far fa-comment-dots icon"></i></li>
              </ul>
            </div>
            <div class="card__end">
              <button class="btn btn--icon warning--text mr-l">
                <i class="fas fa-star icon"></i>
              </button>
              <button class="btn btn--icon primary--text">
                <i class="fas fa-edit icon"></i>
              </button>
            </div>
          </div>
          <div class="card__expansion">
            <expansion-penal></expansion-penal>
          </div>
        </div>
        <div class="card card--spacial">
          <div class="card__header">
            <div class="checkbox" role="checkbox">
              <input type="checkbox" id="task-1">
              <label for="task-1"></label>
            </div>
            <div class="card__content">
              <h3 class="card__title">Type Something Here…</h3>
              <ul class="card__prompt">
                <li class="card__prompt__item">
                  <i class="far fa-calendar-alt icon mr-s"></i>5/14
                </li>
                <li class="card__prompt__item"><i class="far fa-file icon"></i></li>
                <li class="card__prompt__item"><i class="far fa-comment-dots icon"></i></li>
              </ul>
            </div>
            <div class="card__end">
              <button class="btn btn--icon warning--text mr-l">
                <i class="fas fa-star icon"></i>
              </button>
              <button class="btn btn--icon">
                <i class="far fa-edit icon"></i>
              </button>
            </div>
          </div>
          <div class="card__expansion">
            <expansion-penal></expansion-penal>
          </div>
        </div>
        <div class="card">
          <div class="card__header">
            <div class="checkbox" role="checkbox">
              <input type="checkbox" id="task-2">
              <label for="task-2"></label>
            </div>
            <div class="card__content">
              <h3 class="card__title">Type Something Here…</h3>
              <ul class="card__prompt">
                <li class="card__prompt__item">
                  <i class="far fa-calendar-alt icon mr-s"></i>2019/06/18
                </li>
              </ul>
            </div>
            <div class="card__end">
              <button class="btn btn--icon mr-l">
                <i class="far fa-star icon "></i>
              </button>
              <button class="btn btn--icon primary--text">
                <i class="fas fa-edit icon"></i>
              </button>
            </div>
          </div>
          <div class="card__expansion">
            <expansion-penal></expansion-penal>
          </div>
        </div>
        <div class="card">
          <div class="card__header">
            <div class="checkbox" role="checkbox">
              <input type="checkbox" id="task-3" checked>
              <label for="task-3"></label>
            </div>
            <div class="card__content card__content--completed">
              <h3 class="card__title">Type Something Here…</h3>
              <ul class="card__prompt">
                <li class="card__prompt__item">
                  <i class="far fa-file icon"></i>
                </li>
              </ul>
            </div>
            <div class="card__end">
              <button class="btn btn--icon mr-l">
                <i class="far fa-star icon"></i>
              </button>
              <button class="btn btn--icon">
                <i class="far fa-edit icon"></i>
              </button>
            </div>
          </div>
          <div class="card__expansion">
            <expansion-penal></expansion-penal>
          </div>
        </div>
      </div>
      <div class="main__status">3 tasks left</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
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
