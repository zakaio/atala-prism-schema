#!/bin/sh
JSFH_HOME=/Users/rssh/packages/json-schema-for-humans/json-schema-for-humans/json_schema_for_humans
#JSFH_HOME=/usr/local/lib/python3.9/site-packages/json_schema_for_humans/
python3  $JSFH_HOME/cli.py   ../json_schema/meta/prism-credentials.json
git checkout gh-pages
mv schema_doc.* generated
git commit -a -m "regenerate prism credential docs"
git push
git checkout main
