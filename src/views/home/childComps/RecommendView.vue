<template>
    <div class="recommend">
      <div v-for="item in recommends" class="recommend-item">
        <a :href="item.link">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
        </a>
      </div>
    </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    font-size: 12px;
    text-align: center;
    border-bottom: 10px solid #eee
  }
  .recommend .recommend-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
  }

  .recommend .recommend-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>
