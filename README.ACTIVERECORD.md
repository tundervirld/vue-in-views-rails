# Crear la aplicación rails con VueJS

### Genrate Scaffold
```sh
rails generate scaffold patient rut:string name:string email:string phone:string state:boolean
rake db:migrate
```

### Delete a scaffol
```sh
rails destroy scaffold patient
```

###Add field state in a model existent Patient
```sh
rails generate migration AddStateToPatient state:boolean
rake db:migrate
```

###destroy a migration
```sh
rails destroy migration AddStateToPatient
```
