# _plugins/backlinks.rb
# frozen_string_literal: true

require 'jekyll/utils'
require 'cgi'

class BacklinkGenerator < Jekyll::Generator
  safe true
  priority :low   # runs after front-matter is read, before Markdown/Liquid render

  def generate(site)
    posts = site.posts.docs

    # Build lookup: filename slug first, title slug as fallback
    slug_to_post = posts.each_with_object({}) do |post, map|
      file_slug = Jekyll::Utils.slugify(post.basename_without_ext)
      map[file_slug] = post

      if (title = post.data['title']).is_a?(String)
        title_slug = Jekyll::Utils.slugify(title)
        map[title_slug] ||= post
      end
    end

    backlinks = Hash.new { |h, k| h[k] = [] }

    posts.each do |post|
      post.content = post.content.gsub(/\[\[([^\|\]]+)\|([^\]]+)\]\]|\[\[([^\]]+)\]\]/) do
        raw_target = Regexp.last_match(1) || Regexp.last_match(3)
        label      = Regexp.last_match(2) || raw_target

        target_slug = Jekyll::Utils.slugify(raw_target)
        target_post = slug_to_post[target_slug]

        if target_post
          backlinks[target_post] << post unless backlinks[target_post].include?(post)

          raw_excerpt   = extract_excerpt(target_post)
          preview_title = escape_html(target_post.data['title'] || label)
          label_attr    = escape_html(label)
          excerpt_attr  = escape_html(sanitize_excerpt(raw_excerpt))

          "<a href=\"#{target_post.url}\" class=\"internal-link\" "\
            "data-preview-title=\"#{preview_title}\" "\
            "data-preview-excerpt=\"#{excerpt_attr}\">#{label_attr}</a>"
        else
          "<span class=\"invalid-link\" title=\"Post not found\">[[#{escape_html(raw_target)}]]</span>"
        end
      end
    end

    # Make backlinks available in templates
    posts.each { |p| p.data['backlinks'] = backlinks[p] }
  end

  private

  def extract_excerpt(post)
    source = File.read(post.path)
    body   = source.sub(/\A---.*?---\s*/m, '')        # strip front-matter
    lines  = body.lines.reject { |l| l.strip.start_with?('#') }
    text   = lines.join.strip

    snippet = (text[0..800] || text)
    if (m = snippet.match(/(.{250,}?[.!?])(\s|$)/m))
      excerpt = m[1].strip
    else
      excerpt = snippet.strip
    end

    excerpt << '…' if text.length > excerpt.length && excerpt !~ /[.!?]["')\]]?\z/
    excerpt
  end

  def sanitize_excerpt(text)
    text
      .gsub(/\[\[([^\|\]]+)\|([^\]]+)\]\]/, '\2')   # [[target|label]]
      .gsub(/\[\[([^\]]+)\]\]/, '\1')              # [[target]]
      .gsub(/\[([^\]]+)\]\([^)]+\)/, '\1')         # [text](url)
      .gsub(/\{\:\s*[^}]+\}/, '')                  # attribute lists
      .gsub(/[*_~`>#]/, '')                        # markdown marks
      .gsub(/\|/, '')
      .gsub(/\n{3,}/, "\n\n")
      .gsub(/(?<!\n)\n(?!\n)/, ' ')
      .strip
      .gsub("\n", '\\n')
  end

  def escape_html(text)
    CGI.escape_html(text.to_s)
  end
end