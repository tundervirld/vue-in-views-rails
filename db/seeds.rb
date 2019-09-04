# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
if Sport.count == 0
    Sport.create(name: "Tenis", description: "Deporte Tenis")
    Sport.create(name: "Natación", description: "Deporte Natación")
    Sport.create(name: "Triatlon", description: "Deporte Triatlon")
    Sport.create(name: "Running", description: "Deporte Running")
    Sport.create(name: "Maraton", description: "Deporte Maraton")
    Sport.create(name: "Ciclismo", description: "Deporte Ciclismo")
end