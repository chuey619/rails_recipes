class UsersController < ApiController
    before_action :require_login, except: [:create]
    def create
        user = User.create(user_params)
        render json: {token: user.auth_token}
    end
    private
    def user_params
        params.require(:user).permit(:username, :password, :email)
    end
end
