require 'net/http'
require 'rexml/document'
require 'uri'

module Jekyll
  class SharedLinksGenerator < Generator
    safe true
    priority :high

    def generate(site)
      # Only generate if not in safe mode (GitHub Pages compatible alternative below)
      return if site.safe

      feed_url = 'https://links.andrewstiefel.net/feeds/shared'
      
      begin
        # Fetch the RSS feed
        uri = URI(feed_url)
        response = Net::HTTP.get_response(uri)
        
        unless response.is_a?(Net::HTTPSuccess)
          Jekyll.logger.warn "SharedLinks:", "Failed to fetch feed: #{response.code}"
          return
        end

        # Parse the RSS XML
        doc = REXML::Document.new(response.body)
        links = []

        doc.elements.each('//item') do |item|
          title = item.elements['title']&.text
          link = item.elements['link']&.text
          description = item.elements['description']&.text
          pub_date = item.elements['pubDate']&.text
          category = item.elements['category']&.text

          if title && link
            links << {
              'title' => title,
              'url' => link,
              'description' => description,
              'date' => pub_date,
              'category' => category
            }
          end
        end

        # Store the links in site data
        site.data['shared_links'] = links
        Jekyll.logger.info "SharedLinks:", "Loaded #{links.length} shared links"

      rescue => e
        Jekyll.logger.warn "SharedLinks:", "Error fetching shared links: #{e.message}"
        site.data['shared_links'] = []
      end
    end
  end
end
