class ApiController < ApplicationController
    
    def require_login
        authenticate_token || render_unauthorized('Access denied')
    end
    def current_user
        @current_user ||= authenticate_token
    end
    protected
    def render_unauthorized(message)
        errors = { errors: [ detail: message]}
        render json: errors, status: '500'
    end
    private 
    def authenticate_token
        authenticate_with_http_token do |token, options |
            user = User.find_by(auth_token: token)
            p user

        end
    end
end
