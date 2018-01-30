class Api::ApiController < ApplicationController
  before_action :authenticate_user!

  def model_error(model)
    render json: { errors: model.errors.full_messages }, status: 422
  end
end
