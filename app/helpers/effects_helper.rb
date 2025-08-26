module EffectsHelper
  def code_partial(effect_name, language)
    content_tag :pre, class: "code-example" do
      content_tag :code, class: "syntax-#{language}" do
        if language == "html.erb"
          html_escape(File.read(Rails.root.join("app", "views", "effects/_#{effect_name}.html.erb")))
        elsif language == "js"
          html_escape(File.read(Rails.root.join("app", "javascript", "controllers", "#{effect_name}_controller.js")))
        end
      end
    end
  end

  def example_layout_partial(title = "")
    content_tag :div, class: "py-4 my-4" do
      content = content_tag :h3, title, class: "font-bold text-4xl"
      content += content_tag :div, class: "flex flex-row flex-wrap items-start justify-between gap-4 h-full my-20 pb-20" do
        yield
      end
    end
  end
end
