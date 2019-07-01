<template>
  <div class="MobComicsInfo">
    <div class="comics__block">
      <div class="MobComicsInfo__imd-block">
        <img :src="comicsInfo.thumbnail.path+'/portrait_medium.jpg'" alt class="MobComicsInfo__img">
      </div>
      <div class="comics__col col">
        <div class="backgr"></div>
        <div class="comics__info">
          <h1 class="comics__text-header">{{comicsInfo.title}}</h1>
          {{comicsInfo.description}}
          <hr>Heroes in this comics:
          <h6
            class="comics__heroes"
            v-for="item of comicsInfo.characters.items"
            :key="item"
            @click="HeroInfo(item.resourceURI)"
          >
            <router-link
              :to="{name: 'mobheroinfo', params:{id:  item.resourceURI.substring(item.resourceURI.lastIndexOf('/') + 1)}}"
            >{{item.name}}</router-link>
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MobComicsInfo",
  components: {},
  data() {
    return {
      comicsInfo: null,
      comicsId: "",
      comics: []
    };
  },
  created() {
    this.comicsId = this.$route.params.id;
  },
  mounted() {
    this.getComicsInfo();
  },
  methods: {
    getComicsInfo() {
      if (Number(this.comicsId) < 100) {
        axios
          .get(
            "src\\data\\comics.json"
          )
          .then(result => {
            this.comicsInfo = result.data[Number(this.comicsId-1)];
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        axios
          .get(
            "http://gateway.marvel.com/v1/public/comics/" +
              this.comicsId +
              "?apikey=48730a361438aceeaa56fe5dcdadc0ee"
          )
          .then(result => {
            this.comicsInfo = result.data.data.results[0];
            console.log(this.comicsInfo);
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
.MobComicsInfo {
  width: 100%;
  height: 100%;
  background: yellow;
  padding: 50px 10px 0 10px;
  overflow-y: auto;
  text-align: justify;
}
.MobComicsInfo__imd-block {
  width: 100%;
  text-align: center;
}
</style>
