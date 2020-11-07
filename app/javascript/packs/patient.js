
import Vue from 'vue/dist/vue.esm';
import TurbolinksAdapter from 'vue-turbolinks';
import axios from 'axios';

export default document.addEventListener('turbolinks:load', () => {
  axios.defaults.headers.common['X-CSRF-Token'] = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');
  const element = document.getElementById('patients-section');

  if (element !== null) {
    Vue.component('patient-component', {
      template: '#patient-template',
      mixin: [TurbolinksAdapter],
      props: {
        patito: Object
      },
      data: function () {
        return { 
          msg: 'hello',
          editionMode: false,
          mensajito: this.patito,
          errors: {},
        }
      },
      computed: {
        changeCasa: {
          get() {
            this.casa;
          },
          set(data) {
            console.log(data);
            this.casa = data;
          },
        },
      },
      methods: {
        // toggle the patient status which also updates
        // the  patient in the database
        togglePatientStatus() {
          this.patito.state = !this.patito.state;
          this.updatePatient();
        },

        // ajax call to update an patient
        updatePatient() {
          axios
            .put(`/patients/${this.patito.id}.json`, {
              patient: this.patito,
            })
            .then(response => {
              // Turbolinks.visit(`/patients`);
              this.errors = {};
              this.mensajito = response.data;
              this.editionMode = false;
            })
            .catch(error => {
              this.errors = error.response && error.response.data;
              console.log(this.errors);
            });
        },
        
        // ajax call to delete an patient
        deletePatient() {
          axios
            .delete(`/patients/${this.patito.id}.json`)
            .then(response => Turbolinks.visit(`/patients`))
            .catch(error => console.log(error));
        },
      }
    });

    const patients = new Vue({
      el: element,
      mixin: [TurbolinksAdapter],
      data() {
        return {
          message: "This is the View Patiens",
          patients: [],
          patient: {
            rut: '23859592-4',
            name: '',
            email: '',
            phone: '',
            state: true,
          },
          errors: {}
        };
      },
      //Method Trigger in the chargue of Page
      created() {
        axios
          .get('/patients.json')
          .then(response => {
            this.patients = response.data;
            // console.log(this.patients);
            })
          .catch(error => console.log(error));
      },
      methods: {
        hirePatient() {
          axios
            .post('/patients.json', {
              patient: this.patient,
            })
            .then(response => {
              this.errors = {};
              this.patients.push(response.data);
            })
            .catch(error => {
              this.errors = error.response.data;
            });
        },
      },
    });
  }
});