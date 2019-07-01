<template>
  <div class="heroes">
      <div class="backgr"></div>

    <div class="NA-info" v-if="heroes.length===0">
      <div class="NA__container">
        <div class="NA__Header">Sorry!!!</div>Unfortunately, we were unable to obtain information from "developer.marvel.com". But you can get acquainted with several popular characters. Let's not waste time !!!
        <div class="NA__footer" @click="showNAPage()">let's try!!!</div>
      </div>
    </div>

    <div class="heroes__container" v-if="heroes.length>0">
      <div class="row">
        
        <div class="col-3" v-for="(item, index) of heroes" :key="item.name">
          <router-link :to="{name: 'heroinfo', params: {id: item.id}}">
          <div v-if="count<= index && index < count+8">
            <div class="hero-box" >
              <div class="text-header">{{item.name}}</div>
              <img :src="item.thumbnail.path + '/portrait_medium.jpg'" class="hero-img">
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
  name: "heroes",
  data() {
    return {
      count: 0,
      pages: [],
      heroes: []
    };
  },
  mounted() {
    this.getCharacters();
    //this.pageNumber();
  },
  methods: {
    getCharacters() {
      axios
        .get(
          "https://gateway.marvel.com/v1/public/characters?apikey=48730a361438aceeaa56fe5dcdadc0ee"
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
    },
    showNAPage(){
      
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
    pageNumber() {
      var i = Math.floor(this.heroes.length / 8) + 1;
      for (var n = 0; n < i; n++) {
        this.pages.push(n + 1);
      }
    }
  }
}
</script>

<style>
  .heroes {
  position: absolute;
  top: 0;
  left: 20%;
  right: 10%;
  height: 100%;
  width: 100%;
  margin: 10px 0 0 0;
  overflow: hidden;
}
.heroes__container {
  width: 70%;
  height: 100%;
  opacity: 0.9;
  padding: 10px;
  top: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
.heroes__container::-webkit-scrollbar {
  display: none;
}
.hero-box {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.438);
  position: relative;
  margin: 0 10px 0 10px;
  border: 1px solid black;
  border-radius: 10px;

  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  transition: all 1s ease;
}
.hero-box:hover {
  background: red;
  cursor: pointer;
}
.hero-img {
  width: 95%;
  margin-bottom: 5px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.text-header {
  background: red;
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 5px 5px 0 0;
  height: 60px;
  text-align: center;
}

.backgr {
  position: absolute;
  background: grey;
  width: 70%;
  height: 100%;
  opacity: 0.2;
  margin-left: 10px;
}
.row {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;

  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.col-3 {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.NA-info {
  width: 70%;
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
  width: 400px;
  left: 50%;
  margin: 50px 0 0 -200px;
  text-align: center;
  font-size: 25px;
  text-shadow: 1px 1px 1px black, 0 0 5px white;
}
.NA__Header,
.NA__footer {
  transform: skewY(-5deg);
  font-size: 50px;
  margin: 40px 0 40px 0;
}
.NA__footer:hover {
  cursor: pointer;
  color: red;
}
</style>
