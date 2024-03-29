source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 7.0.4'

# Use Puma as the app server
gem 'puma', '~> 5.6.8'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 6.0.0'
# Use Uglifier as compressor for JavaScript assets
# gem 'uglifier', '>= 4.2.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 5.0.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby
# gem 'terser', '~> 1.1.7'
# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
# gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

# Paperclip:
gem "mimemagic", "~> 0.3.10"
gem "kt-paperclip", "~> 6.4.1"

# Gem for charts
gem "chartkick"
gem "gnuplot"

# gem for html5 audio
gem 'plyr-rails'

gem 'd3-rails', '~> 7.0.0'
# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

gem "activestorage", '~> 7.0.5.1'
gem "activesupport", '~> 7.0.5.1'
gem "actionpack", '~> 7.0.5.1'
gem "actionview", '~> 7.0.5.1'

gem "nokogiri", '~> 1.16.2'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.0.5'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen'
  # Use mysql as the database for Active Record
  #gem 'mysql2', '>= 0.3.18', '< 0.5'
  gem 'sqlite3'
end

group :production do
  gem 'unicorn', '~> 6.0.0'
  gem 'sqlite3'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
