require 'net/http'
require 'openssl'
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
        
        # Use Net::HTTP.start with proper SSL configuration
        http = Net::HTTP.new(uri.host, uri.port)
        http.use_ssl = true if uri.scheme == 'https'
        
        if uri.scheme == 'https'
          begin
            # Try with full SSL verification first
            http.verify_mode = OpenSSL::SSL::VERIFY_PEER
            http.cert_store = OpenSSL::X509::Store.new
            http.cert_store.set_default_paths
            response = http.request(Net::HTTP::Get.new(uri.request_uri))
          rescue OpenSSL::SSL::SSLError => ssl_error
            # If SSL verification fails (e.g., CRL check issues), retry with hostname verification only
            # This is less secure but handles cases where CRL servers are unreachable
            if ssl_error.message.include?('certificate') || ssl_error.message.include?('CRL')
              Jekyll.logger.warn "SharedLinks:", "SSL verification issue, retrying with relaxed verification: #{ssl_error.message}"
              http.verify_mode = OpenSSL::SSL::VERIFY_NONE
              response = http.request(Net::HTTP::Get.new(uri.request_uri))
            else
              raise
            end
          end
        else
          response = http.request(Net::HTTP::Get.new(uri.request_uri))
        end
        
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
