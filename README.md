# aiogram Website

This repository contains the source code for the [aiogram](https://github.com/aiogram/aiogram) framework's official website.

## About aiogram

aiogram is a modern and fully asynchronous framework for Telegram Bot API written in Python using asyncio and aiohttp. It's designed to be easy to use and focuses on modern Python features.

## Important Links

- **Documentation**: [docs.aiogram.dev](https://docs.aiogram.dev)
- **Blog/Updates**: [Telegram Channel @aiogram_live](https://telegram.me/s/aiogram_live)
- **GitHub Repository**: [github.com/aiogram/aiogram](https://github.com/aiogram/aiogram)
- **Community Chat**: [t.me/aiogram](https://t.me/aiogram)

## External Resources

The aiogram website integrates with several external resources:
- The **Documentation** is hosted separately at [docs.aiogram.dev](https://docs.aiogram.dev)
- The **Blog** content is provided via the Telegram channel [@aiogram_live](https://telegram.me/s/aiogram_live) rather than being part of the Jekyll site
- The site also links to the GitHub repository and other community resources

## Development

This website is built using [Jekyll](https://jekyllrb.com/), a static site generator.

### Running with Docker

The easiest way to run this site locally is using Docker:

1. Clone this repository:
   ```
   git clone https://github.com/aiogram/site.git
   cd site
   ```

2. Build and run using Docker Compose:
   ```
   docker-compose up
   ```

3. Visit `http://localhost:4000` in your browser to see the site.

### Running without Docker

If you prefer to run the site without Docker:

1. Install Ruby and Bundler
2. Clone this repository
3. Install dependencies:
   ```
   bundle install
   ```
4. Run the development server:
   ```
   bundle exec jekyll serve --livereload
   ```
5. Visit `http://localhost:4000` in your browser

### Alternative with Rake

You can also use Rake tasks for common operations:

```bash
# Serve locally
rake serve

# Build for production
rake build

# Serve with production environment
rake serve_prod

# Clean build artifacts
rake clean
```

## GitHub Pages Deployment

This site is configured to deploy automatically to GitHub Pages using GitHub Actions. Here's how it works:

1. When you push to the `main` branch, GitHub Actions will build and deploy the site
2. The workflow is defined in `.github/workflows/github-pages.yml`
3. The site is deployed to [aiogram.dev](https://aiogram.dev)

### Manual Deployment

If you need to deploy manually:

1. Build the site:
   ```
   JEKYLL_ENV=production bundle exec jekyll build
   ```

2. The built site will be in the `_site` directory

## Troubleshooting

### Missing theme error

If you get an error like `The minima theme could not be found`, make sure you have the minima gem installed in your Gemfile:

```ruby
gem "minima", "~> 2.5.1"
```

Then run `bundle install` before starting the server.

## Contributing

Contributions to improve the website are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 