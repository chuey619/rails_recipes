class RecipesController < ApiController
  before_action :require_login, except: [:index, :show]
  def index
    recipe = Recipe.all.order(created_at: :desc)
    render json: recipe
  end

  def create
    recipe = Recipe.new(recipe_params)
    recipe.user = current_user
    if recipe.save
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  def show
    # recipe = Recipe.find(params[:id])
    if recipe
      render json: {recipe: recipe, user: recipe.user.username}
    else
      render json: recipe.errors
    end
  end

  def destroy
    recipe&.destroy
    render json: {message: 'Recipe deleted!'}
  end

  def update
    data = request.body.read
    p data
    recipe = Recipe.update(params[:id], recipe_params)
    render json: recipe
  end

  private

  def recipe_params
    params.permit(:name, :image, :ingredients, :instruction)
  end

  def recipe
    @recipe ||= Recipe.find(params[:id])
  end

end
