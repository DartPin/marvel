<template>
  <div class="nav">
      <div class="logo">MARVEL</div>
      <div class="nav">
        <div class="nav-item" @click="newName('Main')">главная</div>
        <div class="nav-item" @click="newName('Heroes')">герои</div>
        <div class="nav-item" @click="newName('Comics')">комиксы</div>
      </div>
  </div>
</template>

<script>
export default {
  name: "navig",
  data() {
    return {
      
    };
  },
  mounted() {
   
  },
  methods:{
      newName(value){
          this.$emit("componentName", value)
      }
  }
};
</script>

<style lang="scss">

.header{
  background: red;
  width: 100%;
  height: 100px;
  position: relative;
}
.logo{
  position: relative;
  background: red;
  color: white;
  font-size: 50px;
  font-weight: bold;
  letter-spacing: -4px;
  border: 1px solid white;
  width: 200px;
  margin: 10px;
  text-align: center;
  float: left;
}
.nav-item{
  color: white;
  font-size: 30px;
  font-weight: bold;
  margin: 30px 30px 0 30px;
  text-transform: uppercase;
}
</style>
