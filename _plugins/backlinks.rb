# _plugins/backlinks.rb
# frozen_string_literal: true

require 'jekyll/utils'
require 'cgi'

class BacklinkGenerator < Jekyll::Generator
  safe true
  priority :low

  def generate(site)
    posts = site.posts.docs

    slug_to_post = posts.each_with_object({}) do |post, hash|
      title = post.data['title']
      next unless title.is_a?(String)

      slug = Jekyll::Utils.slugify(title)
      hash[slug] = post
    end

    backlinks = Hash.new { |h, k| h[k] = [] }

    posts.each do |post|
      original_content = post.content.dup

      processed_content = original_content.gsub(/\[\[([^\|\]]+)\|([^\]]+)\]\]|\[\[([^\]]+)\]\]/) do
        raw_target = Regexp.last_match(1) || Regexp.last_match(3)
        label = Regexp.last_match(2) || raw_target

        target_slug = Jekyll::Utils.slugify(raw_target)
        target_post = slug_to_post[target_slug]

        if target_post
          backlinks[target_post] << post unless backlinks[target_post].include?(post)

          raw_excerpt = extract_excerpt(target_post)
          title_attr = escape_html(label)
          excerpt_attr = escape_html(sanitize_excerpt(raw_excerpt))

          puts "[preview] link=#{label.inspect}, preview-title=#{title_attr.inspect}, excerpt=#{excerpt_attr.inspect}"

          "<a href=\"#{target_post.url}\" class=\"internal-link\" data-preview-title=\"#{title_attr}\" data-preview-excerpt=\"#{excerpt_attr}\">#{label}</a>"
        else
          "<span class=\"invalid-link\" title=\"Post not found\">[[#{escape_html(raw_target)}]]</span>"
        end
      end

      post.data['processed_content'] = processed_content
    end

    posts.each do |post|
      post.data['backlinks'] = backlinks[post] || []
    end
  end

  def extract_excerpt(post)
    raw_source = File.read(post.path)
    content_without_front_matter = raw_source.sub(/\A---.*?---\s*/m, '')
    clean_lines = content_without_front_matter.lines.reject { |line| line.strip.start_with?('#') }
    raw = clean_lines.join.strip

    min_chars = 200
    slice = raw[0..800]
    sentence = slice.match(/(.{#{min_chars},}?[.!?])(\s|$)/m)
    sentence ? sentence[1].strip : slice.strip[0..min_chars]
  end

  def sanitize_excerpt(text)
    text.gsub(/\[\[([^\|\]]+)\|([^\]]+)\]\]/, '\2')     # [[slug|label]] → label
        .gsub(/\[\[([^\]]+)\]\]/, '\1')                 # [[slug]] → slug
        .gsub(/\[([^\]]+)\]\([^\)]+\)/, '\1')           # [label](url) → label
        .gsub(/[*_~`>#]/, '')                           # Remove markdown formatting
        .gsub(/\|/, '')                                 # Strip pipe chars
        .gsub(/\n+/, ' ')                               # Flatten newlines
        .strip
  end

  def escape_html(text)
    CGI.escape_html(text.to_s)
  end
end