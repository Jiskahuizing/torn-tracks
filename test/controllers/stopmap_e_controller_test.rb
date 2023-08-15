require "test_helper"

class StopmapEControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get stopmap_e_index_url
    assert_response :success
  end
end
