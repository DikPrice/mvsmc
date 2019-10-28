class AddReadyForReviewColumnInSubmissions < ActiveRecord::Migration[5.2]
  def change
    add_column :submissions, :review, :boolean, default: false
  end
end
