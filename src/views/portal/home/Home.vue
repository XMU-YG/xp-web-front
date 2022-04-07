<template>
  <portalTemplate>
    <div class="nav">首页</div>
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
    <div>
      小平教育基金会是一个在香港特别行政区正式注册的非牟利慈善机构。本基金会于二零零一年开始以「小平」的名义在各省援建学校和资助清华大学兴建教育扶贫远程教学站。于二零零六年正式成立及注册小平教育基金会。宗旨是为贫困山区小孩提供一个平等的教育机会，此亦是本基金会名字之由来，寓意小小的平等。我们无宗教或政治信仰，只欲尽微力，解决山区教育问题。本会是根据中国境外非政府组织境内活动管理法认可的境外非政府组织。
      我们相信知识能改变命运，故本基金会一直以来只专注于教育一范畴。通过援建，我们盼望能够为学生提供最基本的中小学教育，提升识字率和使孩子们不需再徒步三四小时上学。以及为他们建设一个不再拥挤，屋瓦随掉的学习环境，使他们能更专注和无需提心吊胆地学习。至于助学金则为了帮助许多因高中无义务教育而需辍学的学生，使他们能完成高中，对社会有更大的贡献。大学助学金更是如此。
      故此本基金会自二零零一年起，已在贵州、四川、甘肃、广西、广东、青海、云南、江西、陕西援建中小学校及教学楼超过四百所/栋。建校的同时，我们也关注教育周边的配套，如师资、课程等。所以本基金会亦有协助培训山区教师和建设远端教学站。其中包括资助清华大学于中国三十余省兴建教育扶贫远程教学站，并联同清华大学开展专为贫穷女性而设的「香港小平教育基金会—北京农家女职业技能培训项目」。
      随着中国大陆经济和生活水平日益提升，并达至全面脱贫迈进小康社会，
      本基金会踏入二零一零年代后将基金会大部份的资源投放在助学方面。我们展开的小平助学金计画，其至今已累计资助家庭经济困难的高中生多达二万名，大学生逾六百余名。
      展望未来，我们欲进一步改善助学金制度，使其更物尽其用，更好地援助学生。同时除钱财资助，我们亦欲开始对学生的其他范畴如心理等提供更多的资援。援建方面，我们将继续于偏远山区努力默默耕耘。
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
