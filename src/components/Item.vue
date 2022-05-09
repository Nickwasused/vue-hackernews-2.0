<template>
  <li class="news-item">
    <span class="mainscore">
      <span class="score">{{ item.score }}</span>
    </span>
    <span class="mainspacer"></span>
    <span class="mainitem">
      <span class="title">
        <template v-if="item.url">
          <router-link :to="'/item/' + item.id">{{ item.title }}</router-link>
          <span class="host"> ({{ item.url | host }})</span>
        </template>
        <template v-else>
          <router-link :to="'/item/' + item.id">{{ item.title }}</router-link>
        </template>
      </span>
      <br>
      <span class="meta">
        <span v-if="item.type !== 'job'" class="by">
          by <router-link :to="'/user/' + item.by">{{ item.by }}</router-link>
        </span>
        <span class="time">
          {{ item.time | timeAgo }} ago
        </span>
        <span v-if="item.type !== 'job'" class="comments-link">
          | {{ item.descendants }} comments
        </span>
      </span>
      <span class="label" v-if="item.type !== 'story' && item.type !== 'job'">{{ item.type }}</span>
      <span class="label" v-if="item.type == 'job'"><span class="job">{{ item.type }}</span></span>
    </span>
  </li>
</template>

<script>
import { timeAgo } from '../util/filters'

export default {
  name: 'news-item',
  props: ['item'],
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
  serverCacheKey: ({ item: { id, __lastUpdated, time }}) => {
    return `${id}::${__lastUpdated}::${timeAgo(time)}`
  }
}
</script>

<style lang="stylus">
.mainitem
  flex 96%
  display inline-block

.mainscore
  flex 3%
  display inline-block
  text-align right

.mainspacer
  flex 1%

.news-item
  display flex
  background-color #343a40
  padding 1.5%
  border-bottom 1px solid #eee
  position relative
  line-height 22px
  a 
    color white
  .score
    width 100%
    color #ff6600
    font-size 1.1em
    font-weight 700
  .meta, .host
    font-size .85em
    color white
    a
      color #999999
      text-decoration underline
      &:hover
        color #ff6600

.job {
  color white
  background-color #f60
  padding 0.1%
  margin 0.1%
}

@media (max-width 1400px)
  .mainitem
    width 93%

  .mainscore
    width 7%

@media (max-width 600px)
  .mainitem
    width 100%

  .mainscore
    width 0%
    visibility hidden
</style>
