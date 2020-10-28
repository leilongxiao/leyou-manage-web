<template>
  <v-card>
      <v-flex xs12 sm10>
        <v-tree url="/item/category/list"
                :isEdit="isEdit"
                @handleAdd="handleAdd"
                @handleEdit="handleEdit"
                @handleDelete="handleDelete"
                @handleClick="handleClick"
        />
        <!--统一管理template，而把data等放到了script中-->
      </v-flex>
  </v-card>
</template>

<script>
  export default {
    name: "category",
    data() {
      return {
        isEdit:true
      }
    },
    methods: {
      handleAdd(node) {
        this.$http({
          url: "item/category",
          method: "post",
          data: this.$qs.stringify(node)
        }).then(resp=>{
          this.reloadData(node.parentId)
          this.$message.info("添加成功!")
        }).catch(()=>{
          this.$message.error("添加失败!")
        })
      },
      handleEdit(id,name) {
        this.$http({
          url: "item/category",
          method: "put",
          data: "id="+id+"&name="+name
        }).catch(()=>{
          this.$message.error("修改失败!")
        })
      },
      handleDelete(id) {
        this.$http.delete("item/category",{
          params:{
            id:id
          }
        }).catch(()=>{
          this.$message.error("删除失败!")
        })
      },
      handleClick(node) {
        console.log(node)
      },
      reloadData(id){
        //操作完成后刷新数据
        console.log(id)
        // alert(id)
        this.$http.get("/item/category/list?pid="+id).then(resp=>{
          this.db = resp.data;
          this.db.forEach(n => n['path'] = [n.name])
          console.log(this.db)
        }).catch();
      }
    }
  };
</script>

<style scoped>
/*定义样式的地方*/
</style>
