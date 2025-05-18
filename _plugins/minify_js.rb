require 'uglifier'

Jekyll::Hooks.register :site, :post_write do |site|
  # Run in production or staging
  if %w[production staging].include?(Jekyll.env)
    # Define the paths in your destination folder
    source_path = File.join(site.dest, "assets", "js", "bundle.js")
    minified_path = File.join(site.dest, "assets", "js", "bundle.min.js")

    unless File.exist?(source_path)
      Jekyll.logger.warn "MinifyJs:", "File not found: #{source_path}"
      next
    end

    begin
      # Read the generated bundle.js file
      content = File.read(source_path)
      # Minify using Uglifier with harmony mode enabled for ES6 syntax
      minified_content = Uglifier.new(harmony: true).compile(content)
      # Write the minified content to bundle.min.js
      File.open(minified_path, 'w') { |f| f.write(minified_content) }
      Jekyll.logger.info "MinifyJs:", "Generated minified file at assets/js/bundle.min.js"
    rescue StandardError => e
      Jekyll.logger.error "MinifyJs:", "Failed to minify bundle.js: #{e.message}"
    end
  end
end