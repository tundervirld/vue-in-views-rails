import Vue from 'vue/dist/vue.esm';
import TurbolinksAdapter from 'vue-turbolinks';
import axios from 'axios';
var sport = new Vue({
  el: '#sports-section',
  data: {
      message: 'Same Secction but whit Vue.js!',
      sports: [],
      errors:""
  },
  mounted: function() {
    var that;
    that = this;
    axios
      .get(window.location.pathname+ '.json',)
      .then(response => (that.sports = response))
      .catch(error => {
        console.log(error);
        that.errors = error.response.data;
      });
  }
})