class ApplicationController < ActionController::Base
  include Response
  before_action :authenticate_user!
end
