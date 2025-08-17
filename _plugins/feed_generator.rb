module Jekyll
  class FeedPage < Page
    def initialize(site, base, dir, type, name)
      @site = site
      @base = base

      if type == 'tag'
        @dir = 'feed/topics'
        @name = "#{name}.xml"
      else
        @dir = 'feed'
        @name = "#{name}.xml"
      end

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'feed.xml')
      
      self.data['feed_type'] = type
      self.data['feed_name'] = name
      self.data['title'] = "#{site.config['title']} | #{format_name(name)}"
      self.data['description'] = "#{format_description(type, name)} by #{site.config['title']}."
    end

    private

    def format_name(name)
      name.gsub('-', ' ')
    end

    def format_description(type, name)
      case type
      when 'category'
        "A feed of #{format_name(name)}"
      when 'tag'
        "A feed of posts about #{format_name(name)}"
      end
    end
  end

  class FeedGenerator < Generator
    safe true
    priority :low

    def generate(site)
      # Generate category feeds
      categories = site.posts.docs.map { |post| post.data['category'] }.compact.uniq
      
      categories.each do |category|
        next if category.nil? || category.empty?
        site.pages << FeedPage.new(site, site.source, '', 'category', category)
      end

      # Generate tag feeds  
      tags = site.posts.docs.flat_map { |post| post.data['tags'] }.compact.uniq
      
      tags.each do |tag|
        next if tag.nil? || tag.empty?
        site.pages << FeedPage.new(site, site.source, '', 'tag', tag)
      end
    end
  end
end
