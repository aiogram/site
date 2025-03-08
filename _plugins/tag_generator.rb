module Jekyll
  class TagPageGenerator < Generator
    safe true

    def generate(site)
      # Create blog/tag directory if it doesn't exist
      FileUtils.mkdir_p(File.join(site.source, 'blog', 'tag')) unless Dir.exist?(File.join(site.source, 'blog', 'tag'))
      
      # Get all unique tags from posts
      all_tags = []
      site.posts.docs.each do |post|
        if post.data['tags']
          all_tags.concat(post.data['tags'])
        end
      end
      all_tags.uniq!

      # Create a tag page for each tag
      all_tags.each do |tag|
        # First, create file in _blog/tags for collection
        site.pages << TagPage.new(site, site.source, "_blog/tags", tag)
        
        # Then, create a file in the public blog/tag directory if it doesn't exist
        tag_dir = File.join(site.source, 'blog', 'tag', tag)
        tag_file = File.join(tag_dir, 'index.html')
        
        # Only create the directory and file if they don't exist
        unless File.exist?(tag_file)
          FileUtils.mkdir_p(tag_dir) unless Dir.exist?(tag_dir)
          File.open(tag_file, 'w') do |file|
            file.write("---\nlayout: tag_page\ntag: #{tag}\npermalink: /blog/tag/#{tag}/\n---\n")
          end
        end
      end
    end
  end

  class TagPage < Page
    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir = dir
      @name = "#{tag}.html"
      
      # Get tag data from data file
      tag_data = site.data.dig('blog', 'tags', tag) || {}
      
      # Use data from data file or default values
      title = tag_data['name'] ? "#{tag_data['name']} Posts" : "#{tag.capitalize} Posts"
      description = tag_data['description'] || "Posts related to #{tag} in the aiogram framework"
      
      process(@name)
      read_yaml(File.join(base, '_layouts'), 'tag_page.html')
      
      self.data['title'] = title
      self.data['description'] = description
      self.data['tag'] = tag
      self.data['permalink'] = "/blog/tag/#{tag}/"
    end
  end
end 