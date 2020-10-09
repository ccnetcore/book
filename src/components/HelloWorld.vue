<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ list }}</h1>

<h3 v-for="(value,key) in list" :key="key">书名：{{value.bookname}}，价格：{{value.price}}</h3>
  </div>
</template>

<script>
import testApi from '@/api/test'
export default {
  data() {
    return {
      list:[]
    }
  },
  created(){
    this.fetchData();
  },
  methods: {
    fetchData(){
      const p= testApi.getList()
      p.then(resp=>{console.log(resp.data);this.list=resp.data})

      p.catch(err=>{console.log(err)})
    }
  },
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
