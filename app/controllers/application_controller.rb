class ApplicationController < ActionController::Base
    private
    def render_error(resource, status)
        render json: resource, status: status
    end
end
