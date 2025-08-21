require "test_helper"

class EffectsControllerTest < ActionDispatch::IntegrationTest
  test "should get fade_in" do
    get effects_fade_in_url
    assert_response :success
  end
end
