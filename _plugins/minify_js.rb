require 'terser'

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
      # Terser configuration for modern syntax
      minified = Terser.new(
        compress: true,
        mangle:   true
      ).compile(content)

      # Write minified JS file
      File.write(minified_path, minified)
      # Log in console
      Jekyll.logger.info 'MinifyJs:', 'Generated assets/js/bundle.min.js'
    rescue StandardError => e
      Jekyll.logger.error 'MinifyJs:', "Failed to minify bundle.js: #{e.message}"
    end
  end
end