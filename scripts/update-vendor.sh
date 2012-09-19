#!/usr/bin/env sh
current_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
project_dir="$current_dir/.."
vendor_dir="$project_dir/vendor"
test_dir="$project_dir/test/vendor"
source_dir="$HOME/src"

echo 'Pulling Ember'
cd "$source_dir/ember.js"
git pull

echo 'Compiling Ember'
rake

echo 'Copying files'
cp dist/ember.js "$test_dir"
cp lib/handlebars-1.0.rc.1.js "$test_dir"
cp lib/jquery-1.7.2.js "$test_dir"

cp lib/headless-ember.js "$vendor_dir"
cp lib/ember.js "$vendor_dir"

echo 'Done!'
