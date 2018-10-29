require 'test_helper'

class StopMapControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get stop_map_index_url
    assert_response :success
  end

end
