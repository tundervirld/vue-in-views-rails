class CreatePatients < ActiveRecord::Migration[5.2]
  def change
    create_table :patients do |t|
      t.string :rut
      t.string :name
      t.string :email
      t.string :phone
      t.boolean :state

      t.timestamps
    end
  end
end
