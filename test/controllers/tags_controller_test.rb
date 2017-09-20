require 'test_helper'

class TagsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get tags_index_url
    assert_response :success
  end

  test "should get show" do
    get tags_show_url
    assert_response :success
  end

  test "should get new" do
    get tags_new_url
    assert_response :success
  end

  test "should get edit" do
    get tags_edit_url
    assert_response :success
  end

  test "should get delete" do
    get tags_delete_url
    assert_response :success
  end

end
