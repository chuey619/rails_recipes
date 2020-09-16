class Recipe < ApplicationRecord
    validates :name, presence: true
    validates :ingredients, presence: true
    validates :instruction, presence: true
    belongs_to :user
end
