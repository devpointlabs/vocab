class Api::DefinitionsController < Api::ApiController
  def create
    term = Term.find(params[:term_id]);
    def_params = params.require(:definition).permit(:body);
    definition = term.definitions.new(def_params)
    definition.added_by = current_user.id
    if definition.save
      render json: definition
    else
      model_error(definition)
    end
  end
end
