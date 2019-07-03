<template>
  <div class="comics">
    <div class="backgr"></div>
    <div class="NA-info" v-if="comics.length===0">
      <div class="NA__container">
        <div class="NA__Header">Sorry!!!</div>
        <div>Unfortunately, we were unable to obtain information from "developer.marvel.com". But you can get acquainted with several popular characters. Let's not waste time !!!</div>
        <div class="NA__footer" @click="showNAPage()">let's try!!!</div>
      </div>
    </div>

    <div class="comics__container" v-if="comics.length>0">
      <div class="row">
        <div class="col-3" v-for="item of comics" :key="item.resourceURI">
          <router-link :to="{name: 'comicsinfo', params: {id: item.id}}"> 
          
            <div class="comics-box">
              <div class="text-header">{{item.title}}</div>
              <img :src="item.thumbnail.path + '/portrait_uncanny.jpg'" class="comics-img">
            </div>
          
          </router-link>
        </div>
      </div>
      <div class="page-menu">
        <div
          class="btn btn-primary btn-page"
          @click="showComics('prev')"
        >prev</div>
        <div
          class="btn btn-primary btn-page"
          @click="showComics('next')"
        >next</div>
      </div>
    </div>
  </div>
</template>

<script src="./js/comics.js">

</script>

<style src="./css/comics.css">

</style>
