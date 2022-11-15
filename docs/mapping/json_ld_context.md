Mapping from prism-credentials to JSON-LD context:

1. Set top-level namespace as
   1. if top-level `contextUri` is defined - `contextUri`,
   2. otherwise - `resolver-uri/schemas/schemaId`
      Assuming that we have resolver for our schema subset at `resolver-uri`
2. For each field in properties::
   1. If field have `contextUri` attribute – use one.
   2. If not – use default, in accordance with default field mapping
   3. Default field mapping:
      1. Object or array: <path>/"fieldName" where defined uri-s for subobjects.
      2. String:
         "https://schema.org/Text&pattern=<pattern>"
      3. Numeric
         "https://schema.org/numeric" (TODO: add parameters)
      4. Boolean
         https://schema.org/boolean
      5. Timestamp:
         https://schema.org/Timestamp
