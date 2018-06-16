<template>
  <header class="navbar">
    <div class="container navbar__container">
      <ul class="navbar__tabs">
        <li class="navbar__tabs__item is-active">My Tasks</li>
        <li class="navbar__tabs__item">In Progress</li>
        <li class="navbar__tabs__item">Completed</li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style lang="scss">
.navbar {
  height: 4.75rem;
  background-color: $color-primary;

  &__container {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  &__tabs {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
    width: 100%;

    &__item {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 10rem;
      height: 100%;
      color: $color-secondary;
      font-size: $font-size-l;
      font-weight: bold;
      cursor: pointer;

      &.is-active {
        color: #fff;
        border-bottom: 0.3rem solid $color-secondary;
        cursor: initial;
      }

      &:hover {
        background-color: rgba($color: #fff, $alpha: 0.1);;
      }
    }
  }
}
</style>
