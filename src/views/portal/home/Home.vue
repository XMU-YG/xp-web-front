<template>
  <portalTemplate>
    <div class="top">
      <a-carousel autoplay>
        <div>
          <h3>111111111111111</h3>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        <div>
          <h3>222222222222222</h3>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        <div>
          <h3>33333333333333333333</h3>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        <div>
          <h3>444444444444444444</h3>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </a-carousel>
    </div>
    <div class="bottom">
      <h2>推荐文章</h2>
      <div class="card">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  </portalTemplate>
</template>

<script>
import { reactive, toRefs } from 'vue'
import portalTemplate from '@/components/mainTemplate/portal/portalTemplate'
import Card from './components/Card'
export default {
  components: {
    portalTemplate,
    Card
  },
  setup() {
    const state = reactive({})

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .slick-slide {
  background: #3d82d7;
}
.bottom {
  h2 {
    font-weight: bolder;
  }
  margin-top: 20px;
}
</style>
