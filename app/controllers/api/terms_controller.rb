class Api::TermsController < Api::ApiController
  before_action :set_term, only: [:update, :destroy, :show]

  def index
    render json: Term.with_def
  end

  def create
    term = Term.new(term_params)
    term.added_by = current_user.id
    if term.save
      render json: term
    else
      model_error(term)
    end
  end

  def update
    if @term.update(term_params)
      render json: @term
    else
      model_error(@term)
    end
  end

  def destroy
    @term.destroy
  end

  private
    def set_term
      @term = Term.find(params[:id])
    end

    def term_params
      params.require(:term).permit(:name)
    end

end
