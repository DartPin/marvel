<template>
  <div class="comics">
    <div class="backgr"></div>
    <div class="NA-info" v-if="comics.length===0">
      <div class="NA__container">
        <div class="NA__Header">Sorry!!!</div>Unfortunately, we were unable to obtain information from "developer.marvel.com". But you can get acquainted with several popular characters. Let's not waste time !!!
        <div class="NA__footer" @click="showNAPage()">let's try!!!</div>
      </div>
    </div>

    <div class="comics__container" v-if="comics.length>0">
      <div class="row">
        <div class="col-3" v-for="(item, index) of comics" :key="item.resourceURI">
          <router-link :to="{name: 'comicsinfo', params: {id: item.id}}"> 
          <div v-if="count<= index && index < count+8">
            <div class="comics-box">
              <div class="text-header">{{item.title}}</div>
              <img :src="item.thumbnail.path + '/portrait_medium.jpg'" class="comics-img">
            </div>
          </div>
          </router-link>
        </div>
      </div>
      <div class="page-menu">
        <div
          class="btn btn-primary btn-page"
          v-for="(el, ind) of pages"
          :key="el"
          @click="count = 8*(ind)"
        >{{el}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "comicsMain",
  data() {
    return {
      count: 0,
      pages: [],
      comics: []
    };
  },
  mounted() {
    this.getComics();
    this.pageNumber();
  },
  methods: {
    getComics() {
      axios
        .get(
          "https://gateway.marvel.com/v1/public/comics?apikey=48730a361438aceeaa56fe5dcdadc0ee"
        )
        .then(result => {
          result.data.data.results.forEach(element => {
            console.log(element);
            this.comics.push(element);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    showNAPage() {
      axios
        .get(
          "src\\data\\comics.json"
        )
        .then(result => {
            this.comics = result.data ;
        })
        .catch(error => {
          console.log(error);
        });
    },
    pageNumber() {
      var i = Math.floor(this.comics.length / 8) + 1;
      for (var n = 0; n < i; n++) {
        this.pages.push(n + 1);
      }
    }
  }
};
</script>

<style src="./css/comics.css">

</style>
