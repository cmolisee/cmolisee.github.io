require 'spec_helper'

RSpec.describe "Jekyll Site" do
  describe "Configuration" do
    it "has a valid config file" do
      expect(File.exist?('_config.yml')).to be true
    end

    it "config file is valid YAML" do
      require 'yaml'
      expect { YAML.load_file('_config.yml') }.not_to raise_error
    end
  end

  describe "Required Files" do
    it "has a Gemfile" do
      expect(File.exist?('Gemfile')).to be true
    end

    it "has a README" do
      expect(File.exist?('README.md')).to be true
    end

    it "has required layouts" do
      expect(File.exist?('_layouts/default.html')).to be true
      expect(File.exist?('_layouts/home.html')).to be true
      expect(File.exist?('_layouts/post.html')).to be true
    end
  end

  describe "Content Structure" do
    it "has a posts directory" do
      expect(Dir.exist?('_posts')).to be true
    end

    it "has at least one post" do
      posts = Dir.glob('_posts/*.md')
      expect(posts).not_to be_empty
    end
  end
end
