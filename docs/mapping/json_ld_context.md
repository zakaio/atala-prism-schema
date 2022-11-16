# Mapping from prism-credentials to JSON-LD context:

## 1. Set top-level namespace as

- If provided `contextUri` in metainfo credential schema than return `contextUri`

```
// based on https://github.com/zakaio/atala-prism-schema/blob/main/examples/schemas/pos/PersonName.json
...
"properties": {
   "givenName": {
     "type": "string",
     "contextURI": "http://shema.org/Text"
   },
  "familyName": { "type": "string" }
}
...
```

- otherwise return `resolver-uri/json-ld-contenxt` fullpath to generated configuration file

## 2. Default field mapping:

- Object or array: <path>/"fieldName" where defined uri-s for sub-objects
- String:
  "https://schema.org/Text&pattern=<pattern>"
- Numeric
  "https://schema.org/Number" (TODO: add parameters)
- Boolean
  https://schema.org/Boolean
- Timestamp:
  https://schema.org/DateTime
