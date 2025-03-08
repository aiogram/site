require "rake"

desc "Build the site for production"
task :build do
  puts "Building site for production..."
  system "JEKYLL_ENV=production bundle exec jekyll build"
end

desc "Serve the site locally"
task :serve do
  puts "Starting local server..."
  system "bundle exec jekyll serve --livereload"
end

desc "Serve the site locally in production environment"
task :serve_prod do
  puts "Starting local server in production environment..."
  system "JEKYLL_ENV=production bundle exec jekyll serve --livereload"
end

desc "Clean build artifacts"
task :clean do
  puts "Cleaning up _site directory..."
  system "rm -rf _site"
end

task :default => [:serve] 