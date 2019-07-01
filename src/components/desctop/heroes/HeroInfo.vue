<template>
  <div class="HeroInfo">
    <div class="backgr"></div>
    <div class="row">
      <div class="col-5">
        <img :src="heroInfo.thumbnail.path + '/portrait_medium.jpg'" class="img-block">
      </div>
      <div class="col-7">
        <div class="row">
          <div class="col-4">
            <h4>Name:</h4>
          </div>
          <div class="col-8">{{heroInfo.name}}</div>
        </div>
        <div class="row">
          <div class="col-4">
            <h4>Discription:</h4>
          </div>
          <div class="col-8 descr">{{heroInfo.description}}</div>
        </div>
        <div class="row">
          <div class="col">
            <h2>This Hero's Comics</h2>
            <ul>
              <li
                class="on"
                v-for="el of heroInfo.comics.items"
                :key="el.id"
                @click="showComics(el.resourceURI)"
              >
                <router-link
                  :to="{name: 'comicsinfo', params:{id:  el.resourceURI.substring(el.resourceURI.lastIndexOf('/') + 1)}}"
                >{{el.name}}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import heroId from "../comics/ComicsInfo.vue";

export default {
  name: "HeroInfo",
  data() {
    return {
      heroInfo: "",
      heroId: null
    };
  },
  created() {
    this.heroId = this.$route.params.id;
  },
  mounted() {
    this.getHeroInfo();
  },
  methods: {
    getHeroInfo() {
      if (Number(this.heroId) < 100) {
        axios
          .get(
            "src\\data\\heroes.json"
          )
          .then(result => {
            console.log(result.data)
            this.heroInfo = result.data[Number(this.heroId-1)];
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        axios
          .get(
            "https://gateway.marvel.com/v1/public/characters/" +
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
    },
    showComics(value) {
      this.$emit("componentName", "ComicsInfo");
      this.$emit("ComicsName", value);
      console.log(value);
    }
  }
};
</script>

<style>
.HeroInfo {
  position: absolute;
  top: 0;
  left: 20%;
  right: 10%;
  height: 100%;
  width: 70%;
  margin: 10px 0 0 0;
  text-shadow: 1px 1px 1px black, 0 0 5px white;
  padding: 5px;
}
.hero-info {
  background: rgba(255, 255, 255, 0.438);
  width: 70%;
  opacity: 0.9;
  padding: 10px;
}
.img-block {
  width: 95%;
  margin-left: 5px;
  border-radius: 15px;
  opacity: 1;
  z-index: 1;
}
.backgr {
  position: absolute;
  background: grey;
  width: 100%;
  height: 100%;
  opacity: 0.2;
  margin-left: 0px;
}
.descr {
  text-align: justify;
}
.on:hover {
  cursor: pointer;
  color: red;
}
</style>
