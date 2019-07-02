import axios from "axios";

export default {
  name: "comicsMain",
  data() {
    return {
      comics: []
    };
  },
  mounted() {
    this.getComics();
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
    }
  }
};