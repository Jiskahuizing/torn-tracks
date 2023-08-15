require "test_helper"

class StopmapsVControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get stopmaps_v_index_url
    assert_response :success
  end
end
