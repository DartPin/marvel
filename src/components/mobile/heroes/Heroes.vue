<template>
  <div class="MobHeroes">
    <div class="NA-info" v-if="heroes.length===0">
      <div class="NA__container">
        <div class="NA__Header">Sorry!!!</div>Unfortunately, we were unable to obtain information from "developer.marvel.com". But you can get acquainted with several popular characters. Let's not waste time !!!
        <div class="NA__footer" @click="showNAPage()">let's try!!!</div>
      </div>
    </div>

    <div v-if="heroes.length>0">
      <div
        class="MobHero-box"
        v-for="item of heroes"
        :key="item.name"
      >
        <Router-link :to="{name: 'mobheroinfo', params: {id: item.id}}">
          <div class="text-header">{{item.name}}</div>
          <img :src="item.thumbnail.path + '/portrait_medium.jpg'" class="MobHero-img">
        </Router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MobHeroes",
  data() {
    return {
      heroes: []
    };
  },
  mounted() {
    this.getCharacters();
  },
  methods: {
    showNAPage() {
      axios
          .get(
            "src\\data\\heroes.json"
          )
          .then(result => {
            this.heroes = result.data;
          })
          .catch(error => {
            console.log(error);
          });
    },
    getCharacters() {
      axios
        .get(
          "http://gateway.marvel.com/v1/public/characters?apikey=48730a361438aceeaa56fe5dcdadc0ee"
        )
        .then(result => {
          result.data.data.results.forEach(element => {
            console.log(element);
            this.heroes.push(element);
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
.MobHeroes {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: yellow;
  padding: 30px;
  text-align: justify;
}
.MobHero-box {
  position: relative;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  border: 1px solid black;
  margin-bottom: 10px;
  background: black;
  color: white;
  border-radius: 15px;
}
.MobHero-img {
  position: relative;
  width: 280px;
  left: 50%;
  margin-left: -140px;
  border-radius: 15px;
  margin-bottom: 10px;
}
.text-header {
  text-align: center;
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
