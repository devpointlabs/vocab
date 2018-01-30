class Term < ApplicationRecord
  has_many :definitions
  validates_presence_of :name, :added_by
  validates_uniqueness_of :name, case_sensitive: false


  def self.with_def
    select('terms.id, name, body, d.created_at')
    .joins('LEFT JOIN definitions d ON d.active IS TRUE AND d.term_id = terms.id')
    .order('LOWER(name)')
  end
end
