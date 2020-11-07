json.extract! patient, :id, :rut, :name, :email, :phone, :state, :created_at, :updated_at
json.url patient_url(patient, format: :json)
