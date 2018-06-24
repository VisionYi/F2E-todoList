<template>
  <header class="navbar">
    <div class="container navbar__container">
      <ul class="navbar__tabs">
        <li
          v-for="tab in navbarTabs"
          :key="tab.id"
          class="navbar__tabs__item"
          :class="{ 'is-active': _tabId === tab.id }"
          @click="selectTab(tab)"
        >
          {{ tab.text }}
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    tabId: [String, Number, null],
  },
  model: {
    event: 'changeTab',
    prop: 'tabId',
  },

  data() {
    return {
      navbarTabs: [
        {
          id: 'all',
          text: 'My Tasks',
        },
        {
          id: 'progress',
          text: 'In Progress',
        },
        {
          id: 'done',
          text: 'Completed',
        },
      ],
    };
  },
  computed: {
    _tabId: {
      get() {
        return this.tabId;
      },
      set(value) {
        this.$emit('changeTab', value);
      },
    },
  },

  methods: {
    selectTab(tab) {
      this._tabId = tab.id;
    },
  },
};
</script>

<style lang="scss">
.navbar {
  height: 4.75rem;
  background-color: $color-primary;

  @media (max-width: 540px) {
    height: 3.5rem;
  }

  &__container {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;

    @media (max-width: 540px) {
      padding: 0;
    }
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
      line-height: $line-height-l;
      font-weight: bold;
      text-align: center;
      cursor: pointer;
      border-bottom: 0.3rem solid transparent;

      &.is-active {
        border-color: $color-secondary;
        color: #fff;
        cursor: initial;
      }

      &:hover {
        color:#fff;
      }

      @media (max-width: 540px) {
        font-size: $font-size-m;
        line-height: $line-height-m;
      }
    }
  }
}
</style>
