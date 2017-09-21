require 'test_helper'

class PitchesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pitches_index_url
    assert_response :success
  end

end
