#!/bin/sh
python3  /usr/local/lib/python3.9/site-packages/json_schema_for_humans/cli.py   ../json_schema/meta/prism-credentials.json
git checkout gh-pages
mv schema_doc.* generated
git commit -a -m "regenerate prism credential docs"
git push
git checkout main
