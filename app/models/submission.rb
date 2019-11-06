class Submission < ApplicationRecord

  validates :name, presence: true
  validates :scale, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true


  def self.get_model_list(look_for, user)
    model_list = []
    unsorted_submissions = Submission.all
    if (look_for == "mymodels")
      model_list = Submission.where(first_name: user[:first_name], last_name: user[:last_name])
    elsif (look_for == "awaitingreview")
      model_list = Submission.where(review: true)
    elsif (look_for == "models")
      model_list = unsorted_submissions.sort_by{ |value| value[:name] }
    elsif (look_for == "modelers")
      model_list = unsorted_submissions.sort_by{ |value| value[:last_name] }
    elsif (look_for == "newestupdate")
      model_list = unsorted_submissions.sort_by{ |value| value[:updated_at] }
      model_list = model_list.reverse
    else
      model_list =unsorted_submissions
    end
    return model_list
  end

  def self.get_model_count(look_for, user)
      submissions=self.get_model_list("mymodels",user).length
      all_reviews=self.get_model_list("awaitingreview",user).length
      myreviews = Submission.where(first_name: user[:first_name], last_name: user[:last_name], review: true)
      model_count = {
        submissioncount: submissions,
        allreviewcount: all_reviews,
        myreviews: myreviews.length
      }
    return model_count
  end

end
