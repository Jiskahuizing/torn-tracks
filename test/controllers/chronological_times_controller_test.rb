require 'test_helper'

class ChronologicalTimesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get chronological_times_index_url
    assert_response :success
  end

  test "should get show" do
    get chronological_times_show_url
    assert_response :success
  end

end
