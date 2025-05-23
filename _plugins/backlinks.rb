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

      post.data['processed_content'] = processed_content
    end

    posts.each do |post|
      post.data['backlinks'] = backlinks[post] || []
    end
  end

  def extract_excerpt(post)
    raw_source = File.read(post.path)
    body       = raw_source.sub(/\A---.*?---\s*/m, '')
    lines      = body.lines.reject { |l| l.strip.start_with?('#') }
    raw        = lines.join.strip               # full text without headings
  
    min_chars  = 250
    slice      = raw[0..800] || raw
  
    excerpt = if (m = slice.match(/(.{#{min_chars},}?[.!?])(\s|$)/m))
                m[1].strip                      # got a whole sentence
              else
                slice.strip                     # hard cut in mid-sentence
              end
    if raw.length > excerpt.length &&           # we DID truncate
       excerpt !~ /[.!?]["')\]]?\z/             # and didn’t end on . ! ? ) ] "
      excerpt << '…'
    end
  
    excerpt
  end  

  def sanitize_excerpt(text)
    cleaned = text
      .gsub(/\[\[([^\|\]]+)\|([^\]]+)\]\]/, '\2')      # [[target|label]]
      .gsub(/\[\[([^\]]+)\]\]/,        '\1')           # [[target]]
      .gsub(/\[([^\]]+)\]\([^)]+\)/,   '\1')           # [text](url)
      .gsub(/\{\:\s*[^}]+\}/,          '')             # ← new: {: .class data-attr="x"}
      .gsub(/[*_~`>#]/,                '')             # emphasis / code marks
      .gsub(/\|/,                      '')
      .gsub(/\n{3,}/,                  "\n\n")
      .gsub(/(?<!\n)\n(?!\n)/,         ' ')
      .strip
    cleaned.gsub("\n", '\\n')
  end  

  def escape_html(text)
    CGI.escape_html(text.to_s)
  end
end