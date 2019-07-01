<template>
  <div class="MobHero">
    <div>
      <img :src="heroInfo.thumbnail.path + '/portrait_medium.jpg'" class="MobHero__img">
    </div>

    <div class="row">
      <div class="col">
        <h4>Name:</h4>
      </div>
      <div class="col">{{heroInfo.name}}</div>
    </div>
    <div class="row">
      <div class="col">
        <h4>description</h4>
      </div>
      <div class="col">{{heroInfo.description}}</div>
    </div>

    <div class="MobHero-info">
      <hr>
      <h2>This Hero's Comics</h2>
      <ul>
        <li v-for="el of heroInfo.comics.items" :key="el.id">
          <router-link
            :to="{name: 'mobcomicsinfo', params:{id:  el.resourceURI.substring(el.resourceURI.lastIndexOf('/') + 1)}}"
          >{{el.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MobHero",
  components: {},
  data() {
    return {
      heroInfo: null,
      heroId: "",
    };
  },
  created() {
    this.heroId = this.$route.params.id;
    this.getHeroInfo();
  },
  mounted() {
    
  },
  methods: {
    getHeroInfo() {
      if (Number(this.heroId) < 100) {
        axios
          .get(
            "src\\data\\heroes.json"
          )
          .then(result => {
            var test = result.data;
            this.heroInfo = result.data[Number(this.heroId-1)];
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        axios
          .get(
            "http://gateway.marvel.com/v1/public/characters/" +
              this.heroId +
              "?apikey=48730a361438aceeaa56fe5dcdadc0ee"
          )
          .then(result => {
            this.heroInfo = result.data.data.results[0];
            console.log(this.heroInfo);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style>
.MobHero {
  background: yellow;
  position: relative;
  top: 0;
  height: 100%;
  width: 100%;
  padding: 10px 0 0 0;
  overflow-y: auto;
  text-align: justify;
}
.MobHero__img {
  width: 90%;
  margin: 10px;
}
h2 {
  margin-left: 10px;
}
.row {
  padding: 0 10px 0 10px;
}
</style>