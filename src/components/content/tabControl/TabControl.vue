<template>
    <div class="tab-control">
      <div v-for="(item, index) in titles" class="tab-control-item" @click="itemClick(index)">
        <span :class="{active: currentIndex === index}">{{item}}</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    height: 44px;
    line-height: 44px;
    background-color: var(--color-background);

  }
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item span{
    padding: 0 3px 2px;

  }
  .active {
    border-bottom: 3px solid var(--color-high-text);
  }
</style>
