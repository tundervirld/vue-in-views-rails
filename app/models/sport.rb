class Sport < ApplicationRecord
    before_create :default_values
    def default_values
        self.state ||= 1
    end
end
