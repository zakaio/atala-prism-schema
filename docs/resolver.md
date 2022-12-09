

# Schema resolver.


Schema resolver is a tool, which used for hosting of schema definitions somewhere on the web.

When some program process json-ld schema, json-ld contexts are retrieved from internet or cached set of files with help of
  the documentLoader interface.  In case of the retrieving schemas from the internet,  this is our resolver.

When we transfrom proofspace prism credential into the json-ld form, we pass parameter '--schema-resolver-base' in the command line
and contexyt-uri-s in the 

1.  If we publish our credential as json-ld document,  context uri should be an url, which point to the resolver.
1.  We should be able to submit new json-ld schema to the resolver.
1.  json-ld checker should use our resolver to verify that our documents are correct.

The most simple possible resolver is aweb server, which hosts:
- context for json-ld schemas
- schema definition
which can be located on the file systems according to some published conventions. 


Configuration of the resolver:
   - path to the collection of prism schemas (schemas-dir)
   - external prefix on which resolver root is available on internet (url-prefix)
   - host and port of internal  

Functionality:
   - retrieve json-ld for proofspace prism scheme with url, where first part is external prefix (url-prefix),  second part is the layout of appropriate file in the suoplied (schemas-dir).  `<url-prefix>/json-ld-contexts/<location of schema in (schema-dir)>...`
   - retrieve prism-schema in the same way, where url for prism-schema are `<url-prefix>/proofspace-prism-schemas/<location of schema in (schema-dir)`
   - retrieve json-schema in the same way, where url for prism-schema are `<url-prefix>/json-schemas/<location>` of schema in 

We can embedd server in our cli tool,  adding command --serve there.
