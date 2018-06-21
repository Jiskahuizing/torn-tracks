require 'test_helper'

class StopsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get stops_index_url
    assert_response :success
  end

  test "should get show" do
    get stops_show_url
    assert_response :success
  end

  test "should get new" do
    get stops_new_url
    assert_response :success
  end

  test "should get create" do
    get stops_create_url
    assert_response :success
  end

  test "should get edit" do
    get stops_edit_url
    assert_response :success
  end

  test "should get update" do
    get stops_update_url
    assert_response :success
  end

  test "should get delete" do
    get stops_delete_url
    assert_response :success
  end

  test "should get destroy" do
    get stops_destroy_url
    assert_response :success
  end

end
