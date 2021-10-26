#!/bin/bash
# This file is meant to be executed via systemd.
source /usr/local/rvm/scripts/rvm
source /etc/profile.d/rvm.sh
# export ruby_ver=$(rvm list default string)
export ruby_ver=3.0.0

export CONFIGURED=yes
export TIMEOUT=50
export APP_ROOT=/home/rails/torn-tracks
export RAILS_ENV="production"
export GEM_HOME="/home/rails/torn-tracks/vendor/bundle/ruby/${ruby_ver}"
export GEM_PATH="/home/rails/torn-tracks/vendor/bundle/ruby/${ruby_ver}:/usr/local/rvm/gems/${ruby_ver}:/usr/local/rvm/gems/${ruby_ver}@global"
export PATH="/home/rails/torn-tracks/vendor/bundle/ruby/${ruby_ver}/bin:/usr/local/rvm/gems/${ruby_ver}/bin:${PATH}"

# Passwords
export SECRET_KEY_BASE=10cc22eb5c6d6fc8c53c00faa5e7ad4acd4bc26b50397e3d9a9e109dd543618c6df00a53964e9e612fbbbb28e16093fcd9237c018d2bbee94cbe79356b0291cd
export APP_DATABASE_PASSWORD=b08304fc070caccf7fbfb34d2c361318

# Execute the unicorn process
/home/rails/torn-tracks/vendor/bundle/ruby/$ruby_ver/bin/unicorn \
        -c /etc/unicorn.conf -E production --debug
