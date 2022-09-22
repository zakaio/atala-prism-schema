## Mapping from Prism Credentials to JSON Schema:

JSON schema is created from prism credentials with the help of the following rules:

1. A  top-level object has the form: 

```
    {
       '$schema': "https://json-schema.org/draft/2020-12/schema",
       'type': 'object',
       'properties': <transformed field properties>,  
        additionalProperties: <boolean>
       '$defs': <transformed definitions>
    }
```


2. Transformation of field properties and definitions:
    1. Check that field has defined a 'type' or 'ref' attribute.
    2. For 'type':
        1. If this is a top-level transformation, add the field:  
           { prismSchema:  { const:  <id-of-prisms-schem> } }
        2. If this field is 
            1. 'object'  - 
               1. apply this transformation recursively to the properties field.
               2. if additionalProperties is not set - set to true.
            2. 'array' - transform 'items' attribute.  If the attribute is missing,  raise the error.
            3. If 'string' or 'number' – leave it unchanged.
            4. If  'decimal' - transform to number 
            5. If  'integer' – transform to number
            6. If 'timestamp' – transform to
```
              {  type:  "string", pattern: <RFC3339 string pattern>  }
```
            7. If 'date' – transform to
```
              { type: "string", pattern:  <ISO8601 Data pattern>  }
```
            8. If 'binary' – transform to 
```
              {  type: "string", pattern:  <base64pattern>  }
```
    2. For 'ref':
      1. Check that ref looks like  "#/$defs/<path>/
      2. Check that path exists and leave one unchanged



