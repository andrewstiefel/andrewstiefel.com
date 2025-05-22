# _plugins/backlinks.rb
# frozen_string_literal: true

require 'jekyll/utils'
require 'cgi'

class BacklinkGenerator < Jekyll::Generator
  safe true
  priority :low

  def generate(site)
    posts = site.posts.docs

    # Map of slugified title => post
    slug_to_post = posts.each_with_object({}) do |post, hash|
      title = post.data['title']
      next unless title.is_a?(String)

      slug = Jekyll::Utils.slugify(title)
      hash[slug] = post
    end

    # Track backlinks
    backlinks = Hash.new { |h, k| h[k] = [] }

    posts.each do |post|
      content = post.content

      # Replace [[slug|label]] or [[slug]] with <a> tags
      content.gsub!(/\[\[([^\|\]]+)\|([^\]]+)\]\]|\[\[([^\]]+)\]\]/) do
        raw_target = Regexp.last_match(1) || Regexp.last_match(3)
        label = Regexp.last_match(2) || raw_target

        target_slug = Jekyll::Utils.slugify(raw_target)
        target_post = slug_to_post[target_slug]

        if target_post
          backlinks[target_post] << post unless backlinks[target_post].include?(post)

          # Handle excerpt safely (Jekyll::Excerpt or String)
          excerpt_field = target_post.data['excerpt']
raw_excerpt = if excerpt_field.is_a?(String) && !excerpt_field.strip.empty?
                excerpt_field
              else
                # Strip out any Markdown headers or frontmatter noise
                target_post.content
                  .lines
                  .reject { |line| line.strip.start_with?('#', '---') }
                  .join[0..200]
              end


          # Convert [[links]] inside the excerpt
          processed_excerpt = raw_excerpt.gsub(/\[\[([^\|\]]+)\|([^\]]+)\]\]|\[\[([^\]]+)\]\]/) do
            inner_raw_target = Regexp.last_match(1) || Regexp.last_match(3)
            inner_label = Regexp.last_match(2) || inner_raw_target

            inner_slug = Jekyll::Utils.slugify(inner_raw_target)
            resolved_post = slug_to_post[inner_slug]

            if resolved_post
              "<a href=\"#{resolved_post.url}\" class=\"internal-link\">#{escape_html(inner_label)}</a>"
            else
              escape_html(inner_label)
            end
          end

          title_attr = escape_html(target_post.data['title'])
          excerpt_attr = escape_html(processed_excerpt)

          "<a href=\"#{target_post.url}\" class=\"internal-link\" data-preview-title=\"#{title_attr}\" data-preview-excerpt=\"#{excerpt_attr}\">#{label}</a>"
        else
          "<span class=\"invalid-link\" title=\"Post not found\">[[#{raw_target}]]</span>"
        end
      end

      post.content = content
    end

    # Attach backlinks to each post
    posts.each do |post|
      post.data['backlinks'] = backlinks[post] || []
    end
  end

  # Escape HTML for safe embedding
  def escape_html(text)
    CGI.escape_html(text.to_s)
  end
end