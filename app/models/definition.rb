class Definition < ApplicationRecord
  belongs_to :term
  validates_presence_of :body, :added_by
  before_create :deactivate

  def deactivate
    old = Definition
            .where(term_id: self.term_id)
            .where(active: true)
            .where.not(id: self.id)
    old.update(active: false)
  end
end
