# Crear la aplicación rails con VueJS
```sh
#Levantar la instancia Docker con mi App Rails
docker run -it --rm \
-v $(pwd):/myrailsapp \
image-base-railsapp-ruby:2.6 \
rails new . --database=mysql --webpack=vue

#crear BD
rake db:create
rake db:migrate
```

#### Lenvatar una instancia Docker con mi aplicación
Despues del paso anterior, se creó un aplicación rails, este mismo procedimiento es para una aplicación pre-existente:
```sh
#Levantar la instancia Docker con mi App Rails
docker run -it --rm \
-p 3006:3000 \
--network docker-compose-base-dev_backennetwork \
--env-file .env.docker \
-v $(pwd):/myrailsapp \
--name docker-instance-${PWD##*/}-${RANDOM} image-base-railsapp-ruby:2.6

```

#### Step by Step
```sh
#Instalar Dependencias turbolinks, AXIOS -> AJAX
yarn add vue-turbolinks
yarn add axios

#Levantar la instancia Docker con mi App Rails
rails generate controller Main index


rails generate scaffold sport name:string description:text state:boolean
rake db:migrate
```

#### Generar Seed
```sh
#Creación de deposrtes semilla
#db/seeds.rb
if Sport.count == 0
    Sport.create(name: "Tenis", description: "Deporte Tenis")
    Sport.create(name: "Natación", description: "Deporte Natación")
    Sport.create(name: "Triatlon", description: "Deporte Triatlon")
    Sport.create(name: "Running", description: "Deporte Running")
    Sport.create(name: "Maraton", description: "Deporte Maraton")
    Sport.create(name: "Ciclismo", description: "Deporte Ciclismo")
end
```

Generar los registros en la BD
```sh
#En el terminal
rake db:seed
```

#### Cambios en la App
```sh
#Agregar todo el directorio app/javascript/packs a la aplicación.
#file: app/views/layouts/application.html.erb
#colocar debajo de body
  ...
  <body>
    <%= yield %>
  </body>
  <%= javascript_pack_tag 'application'  %>
  ...
```

#### Archvi JS para Sport
```sh
#Crear el archivos vue js Sport
#app/javascript/packs/sport.js
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
      .get(window.location.pathname + '.json',)
      .then(response => (that.sports = response))
      .catch(error => {
        console.log(error);
        that.errors = error.response.data;
      });
  }
})
```
#### Agregar la lectura de la respuesta a la vista de Sports
```sh
#app/views/sports/index.html.erb
div id="sports-section">
  <h1>{{message}}</h1>
  <span/>{{errors}}</span>
  <br>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>State</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="sport in sports.data">
        <td>{{ sport.id }}</td>
        <td>{{ sport.name }}</td>
        <td>
          <div v-if="sport.state==0" class="btn btn-sm btn-default"
                @click="publish(sport)">Publish
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

#### Agregar el archivo a la apliciación Ruby
```sh
#agregar el archivo para ser incorporado en la aplicación:
#file: app/javascript/packs/application.js
import Sport from './sport';
```

# Documentation:
- https://jdc.io/rails-migration-data-types-mysql-postgresql-sqlite
- https://gist.github.com/przbadu/084197ea821a98b0e177b266b41ba0a2