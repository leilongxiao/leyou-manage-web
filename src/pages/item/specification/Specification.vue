<template>
  <v-card>
      <v-layout row>
        <!-- 商品分类,占3个格子 -->
        <v-flex xs3>
          <v-card>
            <v-card-title>选择分类，查看规格参数模板：</v-card-title>
            <v-divider/>
              <v-tree url="/item/category/list"
                  :isEdit="false"
                  @handleClick="handleClick"
          />
          </v-card>
        </v-flex>
        <!-- 规格参数，占9个格子，右边那块 -->
        <v-flex xs9 class="px-1">
          <!--v-show当前节点的id不为空才显示，再下面的v-if后的值类似-->
          <v-card class="elevation-0" v-show="currentNode.id">
              <v-card-title v-if="!currentNode.path">
                请先选择一个分类
              </v-card-title>
            <!--如果不为空，进入面包屑，0->1->2效果-->
            <v-breadcrumbs dense v-else>
                <v-icon slot="divider">chevron_right</v-icon>
              <!--没有items数据模型，所以找计算属性（他可以代替数据模型）-->
                <v-breadcrumbs-item
                    v-for="(item,i) in items"
                    :key="i"
                >
                    <span v-if="i === 2" @click="back">{{ item }}</span>
                    <span v-else>{{ item }}</span>
                </v-breadcrumbs-item>
            </v-breadcrumbs>
            <v-divider/>

            <v-card-text>
              <!--自定义的spec-group和spec-param，在下方components导入-->
              <spec-group :cid="currentNode.id" v-show="showGroup" @select="selectGroup"/>
              <spec-param :group="group" v-show="!showGroup" />
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
  </v-card>
</template>

<script>

export default {
  name: "v-spec",
  data() {
    return {
      currentNode: {}, // 当前被选中的商品分类节点
      group:{}, // 被选中的分组
      showGroup:true, // 是否展示分组
    };
  },
  methods: {
    // 分类点击后的弹窗，node为点击的节点
    handleClick(node) {
      // 判断点击的节点是否是父节点（只有点击到叶子节点才会展示规格）
      if (!node.isParent) {
        // 把当前点击的节点记录下来
        this.currentNode = node;
        // 显示规格组，不是父节点时展示
        this.showGroup = true;
        // 记录选中的规格组，默认为空
        this.group = {};
      }
    },
    selectGroup(group){
      // 记录选中的分组
      this.group = group;
      // 不再显示分组，而是显示规格参数
      this.showGroup = false;
    },
    back(){
        this.showGroup = true;
        this.group = {};
    }
  },
  components:{
      SpecGroup: () => import('./SpecGroup.vue'),
      SpecParam: () => import('./SpecParam.vue'),
  },
  computed:{
      items(){
          const items = this.currentNode.path;
          if(this.group.name){
              items[3] = this.group.name;
          }
          console.log(items);//自己写的，看看打印出的是什么东西
          return items;
      }
  }
};
</script>

<style scoped>
</style>
