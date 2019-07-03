import axios from "axios"

export default {
  name: "comicsMain",
  data() {
    return {
      count: 0,
      pages: [],
      comics: [],
      offset: 0
    };
  },
  mounted() {
    this.getComics(0);
    this.pageNumber();
  },
  methods: {
    getComics() {
      this.comics=[];
      axios
        .get(
          "https://gateway.marvel.com/v1/public/comics?apikey=48730a361438aceeaa56fe5dcdadc0ee&offset=0&limit=20"
        )
        .then(result => {
          result.data.data.results.forEach(element => {
            
            this.comics.push(element);
          });
          console.log(this.comics);
          console.log("sdjhgk");
        })
        .catch(error => {
          console.log(error);
        });
        
    },
    showComics(value){
      if (value === 'next'){
        this.offset +=200;
      } else {
        this.offset -=200;
      }
      this.comics=[];
      axios
        .get(
          "https://gateway.marvel.com/v1/public/comics?apikey=48730a361438aceeaa56fe5dcdadc0ee&offset="+this.offset+"&limit=20"
        )
        .then(result => {
          result.data.data.results.forEach(element => {
            
            this.comics.push(element);
          });
          console.log(this.comics);
          console.log("sdjhgk");
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