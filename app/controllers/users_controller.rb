class UsersController < ApplicationController
  before_action :authorize_user

  def index
    @users = User.all
  end

  protected

  def authorize_user
    if !user_signed_in? || current_user.role != 3
      raise ActionController::RoutingError.new("Must be an Admin")
    end
  end
end
