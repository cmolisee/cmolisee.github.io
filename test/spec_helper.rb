require 'rspec'
require 'yaml'

RSpec.configure do |config|
  config.before(:suite) do
    # Change to project root
    Dir.chdir(File.expand_path('..', __dir__))
  end
end
