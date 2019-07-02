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
    }
  }
};