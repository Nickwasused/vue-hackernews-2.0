<template>
  <li class="news-item">
    <span class="mainscore">
      <span class="score">{{ item.score }}</span>
    </span>
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
          | <router-link :to="'/item/' + item.id">{{ item.descendants }} comments</router-link>
        </span>
      </span>
      <span class="label" v-if="item.type !== 'story'">{{ item.type }}</span>
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
  width 95%
  display inline-block

.mainscore
  width 5%
  display inline-block

.news-item
  background-color #343a40
  padding 1.5%
  border-bottom 1px solid #eee
  position relative
  line-height 20px
  a 
    color white
  .score
    color #ff6600
    font-size 1.1em
    font-weight 700
    text-align right
  .meta, .host
    font-size .85em
    color white
    a
      color #999999
      text-decoration underline
      &:hover
        color #ff6600

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
