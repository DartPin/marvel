<template>
  <div class="comics">
    <div class="comics__block">
      <div class="backgr"></div>
      <div class="comics__row row">
        <div class="comics__col col-5">
          <img
            :src="comicsInfo.thumbnail.path+'/portrait_medium.jpg'"
            alt
            class="comics__name__img"
          >
        </div>
        <div class="comics__col col-7">
          <div class="comics__info">
            <h1 class="comics__text-header">{{comicsInfo.title}}</h1>
            {{comicsInfo.description}}
            <hr>Heroes in this comics:
            <h6
              class="comics__heroes on"
              v-for="item of comicsInfo.characters.items"
              :key="item"
              @click="HeroInfo(item.resourceURI)"
            >
            <router-link :to="{name: 'heroinfo', params:{id:  item.resourceURI.substring(item.resourceURI.lastIndexOf('/') + 1)}}">
                {{item.name}}
            </router-link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ComicsInfo",
  components: {},
  data() {
    return {
      comicsInfo: null,
      comicsId: ""
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
            "https://gateway.marvel.com/v1/public/comics/" +
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

<style src="./css/comicsInfo.css">

</style>
