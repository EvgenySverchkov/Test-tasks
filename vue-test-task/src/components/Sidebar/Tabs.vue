<template>
  <article id="tabs_wrap">
    <header class="tabs">
      <ul>
        <li v-for="(tab, index) in tabs" :key="index">
          <div class="nav-item"
              :class="{ 'is-active': tab.isActive }"
              @click="selectTab(tab)">
            {{ tab.name.replace(/_/, " ") }}
          </div>
        </li>
      </ul>
    </header>
    <section class="tabs-details">
      <slot></slot>
    </section>
  </article>
</template>

<script>
  export default {
    data: () => {
      return {
        tabs: []
      }
    },
    methods: {
      selectTab(selectedTab) {
        this.tabs.forEach(tab => {
          tab.isActive = tab.name === selectedTab.name;
        });
      }
    },
    created() {
      this.tabs = this.$children;
    }
  }
</script>

<style scoped>
  li>.is-active{
    background-color: #f1f1f1;
  }
  ul {
    display: flex;
    list-style: none;
  }
  .nav-item{
    padding: 10px 20px;
    font-family: sans-serif;
    font-style: italic;
    font-weight: 600;
    cursor: pointer;
  }
</style>