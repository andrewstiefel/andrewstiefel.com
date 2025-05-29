# _plugins/humanize_slug.rb
module Jekyll
    module HumanizeSlug
      # "positioning-messaging" → "Positioning Messaging"
      def humanize_slug(input)
        input.to_s.split('-').map { |w| w.capitalize }.join(' ')
      end
  
      # ["positioning-messaging", "go-to-market"] → "Positioning Messaging Go To Market"
      def humanize_slugs(arr)
        Array(arr).map { |s| humanize_slug(s) }.join(' ')
      end
    end
  end
  
  Liquid::Template.register_filter(Jekyll::HumanizeSlug)  