module Jekyll
  class TagPageGenerator < Generator
    safe true

    def generate(site)
      tags = []
      
      # Get all unique tags from posts
      site.posts.docs.each do |post|
        if post.data['tags']
          tags.concat(post.data['tags'])
        end
      end
      tags.uniq!
      
      # Create a tag page for each tag
      tags.each do |tag|
        # Create directory if it doesn't exist
        tag_dir = File.join(site.source, 'blog', 'tag', tag)
        FileUtils.mkdir_p(tag_dir) unless Dir.exist?(tag_dir)
        
        # Create tag page file
        tag_file = File.join(tag_dir, 'index.html')
        
        # Only create the file if it doesn't already exist
        next if File.exist?(tag_file)
        
        # Create tag page with proper front matter
        File.open(tag_file, 'w') do |file|
          file.write(
<<-CONTENT
---
layout: tag
title: "Posts Tagged: #{tag.capitalize}"
tag: #{tag}
permalink: /blog/tag/#{tag}/
---
CONTENT
          )
        end
      end
    end
  end
end 