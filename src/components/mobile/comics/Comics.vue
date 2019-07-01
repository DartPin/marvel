<template>
  <div class="MobComics">
    <div class="NA-info" v-if="comics.length===0">
      <div class="NA__container">
        <div class="NA__Header">Sorry!!!</div>Unfortunately, we were unable to obtain information from "developer.marvel.com". But you can get acquainted with several popular characters. Let's not waste time !!!
        <div class="NA__footer" @click="showNAPage()">let's try!!!</div>
      </div>
    </div>

    <div v-if="comics.length>0">
      <div class="MobComics-box" v-for="item of comics" :key="item.resourceURI">
        <Router-link :to="{name: 'mobcomicsinfo', params: {id: item.id}}">
          <div class="hero-box">
            <div class="text-header">{{item.title}}</div>
            <img class="MobComics-img" :src="item.thumbnail.path + '/portrait_medium.jpg'" />
          </div>
        </Router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "comicsMain",
  data() {
    return {
      comics: []
    };
  },
  mounted() {
    //this.getComics();
  },
  methods: {
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
    getComics() {
      axios
        .get(
          "http://gateway.marvel.com/v1/public/comics?apikey=48730a361438aceeaa56fe5dcdadc0ee"
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
    }
  }
};
</script>

<style>
.MobComics {
  padding: 50px 10px 0 10px;
  overflow-y: auto;
  background: yellow;
  width: 100%;
  height: 100%;
}
.MobComics-box {
  position: relative;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  border: 1px solid black;
  margin-bottom: 10px;
  background: black;
  color: white;
  border-radius: 15px;
  text-align: center;
  padding-bottom: 10px;
}
.MobComics-img {
  width: 90%;
  border-radius: 15px;
  margin-bottom: 10px;
}
.NA-info {
  width: 100%;
  height: 100%;
  opacity: 0.9;
  padding: 10px;
  top: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
.NA-info::-webkit-scrollbar {
  display: none;
}
.NA__container {
  position: relative;
  width: 300px;
  left: 50%;
  margin: 40px 0 0 -150px;
  text-align: center;
  font-size: 20px;
  text-shadow: 1px 1px 1px black, 0 0 5px white;
}
.NA__Header,
.NA__footer {
  transform: skewY(-5deg);
  font-size: 40px;
  margin: 40px 0 40px 0;
}
.NA__footer:hover {
  cursor: pointer;
  color: red;
}
</style>
