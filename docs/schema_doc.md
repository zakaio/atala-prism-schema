# PRISM Credential Schema Definition

- [1. [Required] Property `PRISM Credential Schema Definition > name`](#name)
- [2. [Required] Property `PRISM Credential Schema Definition > version`](#version)
- [3. [Optional] Property `PRISM Credential Schema Definition > description`](#description)
- [4. [Required] Property `PRISM Credential Schema Definition > id`](#id)
- [5. [Required] Property `PRISM Credential Schema Definition > author`](#author)
- [6. [Required] Property `PRISM Credential Schema Definition > trustRegistry`](#trustRegistry)
  - [6.1. Property `PRISM Credential Schema Definition > trustRegistry > oneOf > item 0`](#trustRegistry_oneOf_i0)
    - [6.1.1. Property `PRISM Credential Schema Definition > trustRegistry > oneOf > item 0 > type`](#trustRegistry_oneOf_i0_type)
    - [6.1.2. Property `PRISM Credential Schema Definition > trustRegistry > oneOf > item 0 > issuer`](#trustRegistry_oneOf_i0_issuer)
  - [6.2. Property `PRISM Credential Schema Definition > trustRegistry > oneOf > item 1`](#trustRegistry_oneOf_i1)
    - [6.2.1. Property `PRISM Credential Schema Definition > trustRegistry > oneOf > item 1 > type`](#trustRegistry_oneOf_i1_type)
    - [6.2.2. Property `PRISM Credential Schema Definition > trustRegistry > oneOf > item 1 > token`](#trustRegistry_oneOf_i1_token)
  - [6.3. Property `PRISM Credential Schema Definition > trustRegistry > oneOf > item 2`](#trustRegistry_oneOf_i2)
    - [6.3.1. Property `PRISM Credential Schema Definition > trustRegistry > oneOf > item 2 > type`](#trustRegistry_oneOf_i2_type)
- [7. [Required] Property `PRISM Credential Schema Definition > properties`](#properties)
  - [7.1. [Optional] Property `PRISM Credential Schema Definition > properties > field`](#properties_additionalProperties)
    - [7.1.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 0`](#properties_additionalProperties_allOf_i0)
      - [7.1.1.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 0 > title`](#properties_additionalProperties_allOf_i0_title)
      - [7.1.1.2. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 0 > fieldName`](#properties_additionalProperties_allOf_i0_fieldName)
      - [7.1.1.3. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 0 > description`](#properties_additionalProperties_allOf_i0_description)
      - [7.1.1.4. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 0 > contextUri`](#properties_additionalProperties_allOf_i0_contextUri)
      - [7.1.1.5. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 0 > optional`](#properties_additionalProperties_allOf_i0_optional)
      - [7.1.1.6. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 0 > disclosable`](#properties_additionalProperties_allOf_i0_disclosable)
      - [7.1.1.7. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 0 > comparable`](#properties_additionalProperties_allOf_i0_comparable)
      - [7.1.1.8. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 0 > indexable`](#properties_additionalProperties_allOf_i0_indexable)
      - [7.1.1.9. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 0 > unique`](#properties_additionalProperties_allOf_i0_unique)
    - [7.1.2. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1`](#properties_additionalProperties_allOf_i1)
      - [7.1.2.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 0`](#properties_additionalProperties_allOf_i1_oneOf_i0)
        - [7.1.2.1.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 0 > type`](#properties_additionalProperties_allOf_i1_oneOf_i0_type)
        - [7.1.2.1.2. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 0 > pattern`](#properties_additionalProperties_allOf_i1_oneOf_i0_pattern)
        - [7.1.2.1.3. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 0 > minLength`](#properties_additionalProperties_allOf_i1_oneOf_i0_minLength)
        - [7.1.2.1.4. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 0 > maxLength`](#properties_additionalProperties_allOf_i1_oneOf_i0_maxLength)
        - [7.1.2.1.5. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 0 > multiline`](#properties_additionalProperties_allOf_i1_oneOf_i0_multiline)
        - [7.1.2.1.6. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 0 > keyboardHint`](#properties_additionalProperties_allOf_i1_oneOf_i0_keyboardHint)
      - [7.1.2.2. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 1`](#properties_additionalProperties_allOf_i1_oneOf_i1)
        - [7.1.2.2.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 1 > type`](#properties_additionalProperties_allOf_i1_oneOf_i1_type)
        - [7.1.2.2.2. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 1 > minimum`](#properties_additionalProperties_allOf_i1_oneOf_i1_minimum)
        - [7.1.2.2.3. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 1 > maximum`](#properties_additionalProperties_allOf_i1_oneOf_i1_maximum)
      - [7.1.2.3. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 2`](#properties_additionalProperties_allOf_i1_oneOf_i2)
        - [7.1.2.3.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 2 > type`](#properties_additionalProperties_allOf_i1_oneOf_i2_type)
      - [7.1.2.4. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 3`](#properties_additionalProperties_allOf_i1_oneOf_i3)
        - [7.1.2.4.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 3 > type`](#properties_additionalProperties_allOf_i1_oneOf_i3_type)
      - [7.1.2.5. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 4`](#properties_additionalProperties_allOf_i1_oneOf_i4)
        - [7.1.2.5.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 4 > type`](#properties_additionalProperties_allOf_i1_oneOf_i4_type)
      - [7.1.2.6. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 5`](#properties_additionalProperties_allOf_i1_oneOf_i5)
        - [7.1.2.6.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 5 > type`](#properties_additionalProperties_allOf_i1_oneOf_i5_type)
        - [7.1.2.6.2. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 5 > timeOf`](#properties_additionalProperties_allOf_i1_oneOf_i5_timeOf)
      - [7.1.2.7. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 6`](#properties_additionalProperties_allOf_i1_oneOf_i6)
        - [7.1.2.7.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 6 > type`](#properties_additionalProperties_allOf_i1_oneOf_i6_type)
      - [7.1.2.8. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 7`](#properties_additionalProperties_allOf_i1_oneOf_i7)
        - [7.1.2.8.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 7 > type`](#properties_additionalProperties_allOf_i1_oneOf_i7_type)
        - [7.1.2.8.2. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 7 > values`](#properties_additionalProperties_allOf_i1_oneOf_i7_values)
          - [7.1.2.8.2.1. PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 7 > values > values items](#autogenerated_heading_2)
      - [7.1.2.9. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 8`](#properties_additionalProperties_allOf_i1_oneOf_i8)
        - [7.1.2.9.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 8 > type`](#properties_additionalProperties_allOf_i1_oneOf_i8_type)
        - [7.1.2.9.2. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 8 > items`](#properties_additionalProperties_allOf_i1_oneOf_i8_items)
- [8. [Optional] Property `PRISM Credential Schema Definition > uniquiness`](#uniquiness)
  - [8.1. PRISM Credential Schema Definition > uniquiness > uniquiness items](#autogenerated_heading_3)
- [9. [Optional] Property `PRISM Credential Schema Definition > comment`](#comment)

**Title:** PRISM Credential Schema Definition

| Type                      | `object`                                                                  |
| ------------------------- | ------------------------------------------------------------------------- |
| **Additional properties** | [[Any type: allowed]](# "Additional Properties of any type are allowed.") |

| Property                           | Pattern | Type            | Deprecated | Definition               | Title/Description                                                                    |
| ---------------------------------- | ------- | --------------- | ---------- | ------------------------ | ------------------------------------------------------------------------------------ |
| + [name](#name )                   | No      | string          | No         | -                        | schema name                                                                          |
| + [version](#version )             | No      | string          | No         | -                        | -                                                                                    |
| - [description](#description )     | No      | string          | No         | -                        | -                                                                                    |
| + [id](#id )                       | No      | string          | No         | -                        | Unique schema id. Publishing tool should check uniquiness of id during submtting ... |
| + [author](#author )               | No      | string          | No         | In #/$defs/did           | decentralizes identifier (did) as specified in 'https://www.w3.org/TR/did-core'      |
| + [trustRegistry](#trustRegistry ) | No      | object          | No         | In #/$defs/trustRegistry | -                                                                                    |
| + [properties](#properties )       | No      | object          | No         | -                        | -                                                                                    |
| - [uniquiness](#uniquiness )       | No      | array of string | No         | -                        | -                                                                                    |
| - [comment](#comment )             | No      | string          | No         | -                        | -                                                                                    |

## <a name="name"></a>1. [Required] Property `PRISM Credential Schema Definition > name`

**Title:** schema name

| Type | `string` |
| ---- | -------- |

**Description:** schema name (arbitraty string)

| Restrictions   |     |
| -------------- | --- |
| **Min length** | 1   |
| **Max length** | 255 |

## <a name="version"></a>2. [Required] Property `PRISM Credential Schema Definition > version`

| Type | `string` |
| ---- | -------- |

## <a name="description"></a>3. [Optional] Property `PRISM Credential Schema Definition > description`

| Type | `string` |
| ---- | -------- |

## <a name="id"></a>4. [Required] Property `PRISM Credential Schema Definition > id`

| Type | `string` |
| ---- | -------- |

**Description:** Unique schema id. Publishing tool should check uniquiness of id during submtting schema to blockchain

## <a name="author"></a>5. [Required] Property `PRISM Credential Schema Definition > author`

| Type           | `string`    |
| -------------- | ----------- |
| **Defined in** | #/$defs/did |

**Description:** decentralizes identifier (did) as specified in 'https://www.w3.org/TR/did-core' 

## <a name="trustRegistry"></a>6. [Required] Property `PRISM Credential Schema Definition > trustRegistry`

| Type                      | `object`                                                                  |
| ------------------------- | ------------------------------------------------------------------------- |
| **Additional properties** | [[Any type: allowed]](# "Additional Properties of any type are allowed.") |
| **Defined in**            | #/$defs/trustRegistry                                                     |

| One of(Option)                    |
| --------------------------------- |
| [item 0](#trustRegistry_oneOf_i0) |
| [item 1](#trustRegistry_oneOf_i1) |
| [item 2](#trustRegistry_oneOf_i2) |

### <a name="trustRegistry_oneOf_i0"></a>6.1. Property `PRISM Credential Schema Definition > trustRegistry > oneOf > item 0`

| Type                      | `object`                                                                  |
| ------------------------- | ------------------------------------------------------------------------- |
| **Additional properties** | [[Any type: allowed]](# "Additional Properties of any type are allowed.") |

| Property                                    | Pattern | Type   | Deprecated | Definition                 | Title/Description                                                                |
| ------------------------------------------- | ------- | ------ | ---------- | -------------------------- | -------------------------------------------------------------------------------- |
| - [type](#trustRegistry_oneOf_i0_type )     | No      | const  | No         | -                          | -                                                                                |
| - [issuer](#trustRegistry_oneOf_i0_issuer ) | No      | string | No         | Same as [author](#author ) | decentralizes identifier (did) as specified in 'https://www.w3.org/TR/did-core'  |

#### <a name="trustRegistry_oneOf_i0_type"></a>6.1.1. Property `PRISM Credential Schema Definition > trustRegistry > oneOf > item 0 > type`

| Type | `const` |
| ---- | ------- |

Specific value: `"issuer"`

#### <a name="trustRegistry_oneOf_i0_issuer"></a>6.1.2. Property `PRISM Credential Schema Definition > trustRegistry > oneOf > item 0 > issuer`

| Type                   | `string`          |
| ---------------------- | ----------------- |
| **Same definition as** | [author](#author) |

**Description:** decentralizes identifier (did) as specified in 'https://www.w3.org/TR/did-core' 

### <a name="trustRegistry_oneOf_i1"></a>6.2. Property `PRISM Credential Schema Definition > trustRegistry > oneOf > item 1`

| Type                      | `object`                                                                  |
| ------------------------- | ------------------------------------------------------------------------- |
| **Additional properties** | [[Any type: allowed]](# "Additional Properties of any type are allowed.") |

| Property                                  | Pattern | Type   | Deprecated | Definition | Title/Description |
| ----------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------- |
| - [type](#trustRegistry_oneOf_i1_type )   | No      | const  | No         | -          | -                 |
| - [token](#trustRegistry_oneOf_i1_token ) | No      | string | No         | -          | -                 |

#### <a name="trustRegistry_oneOf_i1_type"></a>6.2.1. Property `PRISM Credential Schema Definition > trustRegistry > oneOf > item 1 > type`

| Type | `const` |
| ---- | ------- |

Specific value: `"token-registry"`

#### <a name="trustRegistry_oneOf_i1_token"></a>6.2.2. Property `PRISM Credential Schema Definition > trustRegistry > oneOf > item 1 > token`

| Type | `string` |
| ---- | -------- |

### <a name="trustRegistry_oneOf_i2"></a>6.3. Property `PRISM Credential Schema Definition > trustRegistry > oneOf > item 2`

| Type                      | `object`                                                                  |
| ------------------------- | ------------------------------------------------------------------------- |
| **Additional properties** | [[Any type: allowed]](# "Additional Properties of any type are allowed.") |

| Property                                | Pattern | Type  | Deprecated | Definition | Title/Description |
| --------------------------------------- | ------- | ----- | ---------- | ---------- | ----------------- |
| - [type](#trustRegistry_oneOf_i2_type ) | No      | const | No         | -          | -                 |

#### <a name="trustRegistry_oneOf_i2_type"></a>6.3.1. Property `PRISM Credential Schema Definition > trustRegistry > oneOf > item 2 > type`

| Type | `const` |
| ---- | ------- |

Specific value: `"permissionless"`

## <a name="properties"></a>7. [Required] Property `PRISM Credential Schema Definition > properties`

| Type                      | `object`                                                                                                             |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Additional properties** | [[Should-conform]](#properties_additionalProperties "Each additional property must conform to the following schema") |

| Property                                                    | Pattern | Type   | Deprecated | Definition       | Title/Description |
| ----------------------------------------------------------- | ------- | ------ | ---------- | ---------------- | ----------------- |
| - [additionalProperties](#properties_additionalProperties ) | No      | object | No         | In #/$defs/field | -                 |

### <a name="properties_additionalProperties"></a>7.1. [Optional] Property `PRISM Credential Schema Definition > properties > field`

| Type                      | `object`                                                                  |
| ------------------------- | ------------------------------------------------------------------------- |
| **Additional properties** | [[Any type: allowed]](# "Additional Properties of any type are allowed.") |
| **Defined in**            | #/$defs/field                                                             |

| All of(Requirement)                                 |
| --------------------------------------------------- |
| [item 0](#properties_additionalProperties_allOf_i0) |
| [item 1](#properties_additionalProperties_allOf_i1) |

#### <a name="properties_additionalProperties_allOf_i0"></a>7.1.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 0`

| Type                      | `object`                                                                  |
| ------------------------- | ------------------------------------------------------------------------- |
| **Additional properties** | [[Any type: allowed]](# "Additional Properties of any type are allowed.") |

| Property                                                                | Pattern | Type    | Deprecated | Definition | Title/Description |
| ----------------------------------------------------------------------- | ------- | ------- | ---------- | ---------- | ----------------- |
| - [title](#properties_additionalProperties_allOf_i0_title )             | No      | string  | No         | -          | -                 |
| - [fieldName](#properties_additionalProperties_allOf_i0_fieldName )     | No      | string  | No         | -          | -                 |
| - [description](#properties_additionalProperties_allOf_i0_description ) | No      | string  | No         | -          | -                 |
| - [contextUri](#properties_additionalProperties_allOf_i0_contextUri )   | No      | string  | No         | -          | -                 |
| - [optional](#properties_additionalProperties_allOf_i0_optional )       | No      | boolean | No         | -          | -                 |
| - [disclosable](#properties_additionalProperties_allOf_i0_disclosable ) | No      | boolean | No         | -          | -                 |
| - [comparable](#properties_additionalProperties_allOf_i0_comparable )   | No      | boolean | No         | -          | -                 |
| - [indexable](#properties_additionalProperties_allOf_i0_indexable )     | No      | boolean | No         | -          | -                 |
| - [unique](#properties_additionalProperties_allOf_i0_unique )           | No      | boolean | No         | -          | -                 |

##### <a name="properties_additionalProperties_allOf_i0_title"></a>7.1.1.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 0 > title`

| Type | `string` |
| ---- | -------- |

##### <a name="properties_additionalProperties_allOf_i0_fieldName"></a>7.1.1.2. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 0 > fieldName`

| Type | `string` |
| ---- | -------- |

##### <a name="properties_additionalProperties_allOf_i0_description"></a>7.1.1.3. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 0 > description`

| Type | `string` |
| ---- | -------- |

##### <a name="properties_additionalProperties_allOf_i0_contextUri"></a>7.1.1.4. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 0 > contextUri`

| Type | `string` |
| ---- | -------- |

##### <a name="properties_additionalProperties_allOf_i0_optional"></a>7.1.1.5. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 0 > optional`

| Type | `boolean` |
| ---- | --------- |

##### <a name="properties_additionalProperties_allOf_i0_disclosable"></a>7.1.1.6. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 0 > disclosable`

| Type | `boolean` |
| ---- | --------- |

##### <a name="properties_additionalProperties_allOf_i0_comparable"></a>7.1.1.7. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 0 > comparable`

| Type | `boolean` |
| ---- | --------- |

##### <a name="properties_additionalProperties_allOf_i0_indexable"></a>7.1.1.8. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 0 > indexable`

| Type | `boolean` |
| ---- | --------- |

##### <a name="properties_additionalProperties_allOf_i0_unique"></a>7.1.1.9. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 0 > unique`

| Type | `boolean` |
| ---- | --------- |

#### <a name="properties_additionalProperties_allOf_i1"></a>7.1.2. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1`

| Type                      | `combining`                                                               |
| ------------------------- | ------------------------------------------------------------------------- |
| **Additional properties** | [[Any type: allowed]](# "Additional Properties of any type are allowed.") |

| One of(Option)                                               |
| ------------------------------------------------------------ |
| [item 0](#properties_additionalProperties_allOf_i1_oneOf_i0) |
| [item 1](#properties_additionalProperties_allOf_i1_oneOf_i1) |
| [item 2](#properties_additionalProperties_allOf_i1_oneOf_i2) |
| [item 3](#properties_additionalProperties_allOf_i1_oneOf_i3) |
| [item 4](#properties_additionalProperties_allOf_i1_oneOf_i4) |
| [item 5](#properties_additionalProperties_allOf_i1_oneOf_i5) |
| [item 6](#properties_additionalProperties_allOf_i1_oneOf_i6) |
| [item 7](#properties_additionalProperties_allOf_i1_oneOf_i7) |
| [item 8](#properties_additionalProperties_allOf_i1_oneOf_i8) |

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i0"></a>7.1.2.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 0`

| Type                      | `object`                                                                  |
| ------------------------- | ------------------------------------------------------------------------- |
| **Additional properties** | [[Any type: allowed]](# "Additional Properties of any type are allowed.") |

| Property                                                                           | Pattern | Type    | Deprecated | Definition | Title/Description                       |
| ---------------------------------------------------------------------------------- | ------- | ------- | ---------- | ---------- | --------------------------------------- |
| - [type](#properties_additionalProperties_allOf_i1_oneOf_i0_type )                 | No      | const   | No         | -          | -                                       |
| - [pattern](#properties_additionalProperties_allOf_i1_oneOf_i0_pattern )           | No      | string  | No         | -          | -                                       |
| - [minLength](#properties_additionalProperties_allOf_i1_oneOf_i0_minLength )       | No      | integer | No         | -          | -                                       |
| - [maxLength](#properties_additionalProperties_allOf_i1_oneOf_i0_maxLength )       | No      | integer | No         | -          | -                                       |
| - [multiline](#properties_additionalProperties_allOf_i1_oneOf_i0_multiline )       | No      | boolean | No         | -          | should fields be displayed as multiline |
| - [keyboardHint](#properties_additionalProperties_allOf_i1_oneOf_i0_keyboardHint ) | No      | string  | No         | -          | -                                       |

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i0_type"></a>7.1.2.1.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 0 > type`

| Type | `const` |
| ---- | ------- |

Specific value: `"string"`

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i0_pattern"></a>7.1.2.1.2. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 0 > pattern`

| Type | `string` |
| ---- | -------- |

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i0_minLength"></a>7.1.2.1.3. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 0 > minLength`

| Type | `integer` |
| ---- | --------- |

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i0_maxLength"></a>7.1.2.1.4. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 0 > maxLength`

| Type | `integer` |
| ---- | --------- |

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i0_multiline"></a>7.1.2.1.5. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 0 > multiline`

| Type | `boolean` |
| ---- | --------- |

**Description:** should fields be displayed as multiline

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i0_keyboardHint"></a>7.1.2.1.6. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 0 > keyboardHint`

| Type | `string` |
| ---- | -------- |

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i1"></a>7.1.2.2. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 1`

| Type                      | `object`                                                                  |
| ------------------------- | ------------------------------------------------------------------------- |
| **Additional properties** | [[Any type: allowed]](# "Additional Properties of any type are allowed.") |

| Property                                                                 | Pattern | Type    | Deprecated | Definition | Title/Description |
| ------------------------------------------------------------------------ | ------- | ------- | ---------- | ---------- | ----------------- |
| - [type](#properties_additionalProperties_allOf_i1_oneOf_i1_type )       | No      | const   | No         | -          | -                 |
| - [minimum](#properties_additionalProperties_allOf_i1_oneOf_i1_minimum ) | No      | integer | No         | -          | -                 |
| - [maximum](#properties_additionalProperties_allOf_i1_oneOf_i1_maximum ) | No      | integer | No         | -          | -                 |

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i1_type"></a>7.1.2.2.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 1 > type`

| Type | `const` |
| ---- | ------- |

Specific value: `"integer"`

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i1_minimum"></a>7.1.2.2.2. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 1 > minimum`

| Type | `integer` |
| ---- | --------- |

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i1_maximum"></a>7.1.2.2.3. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 1 > maximum`

| Type | `integer` |
| ---- | --------- |

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i2"></a>7.1.2.3. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 2`

| Type                      | `object`                                                                  |
| ------------------------- | ------------------------------------------------------------------------- |
| **Additional properties** | [[Any type: allowed]](# "Additional Properties of any type are allowed.") |

| Property                                                           | Pattern | Type  | Deprecated | Definition | Title/Description |
| ------------------------------------------------------------------ | ------- | ----- | ---------- | ---------- | ----------------- |
| - [type](#properties_additionalProperties_allOf_i1_oneOf_i2_type ) | No      | const | No         | -          | -                 |

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i2_type"></a>7.1.2.3.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 2 > type`

| Type | `const` |
| ---- | ------- |

Specific value: `"number"`

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i3"></a>7.1.2.4. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 3`

| Type                      | `object`                                                                  |
| ------------------------- | ------------------------------------------------------------------------- |
| **Additional properties** | [[Any type: allowed]](# "Additional Properties of any type are allowed.") |

| Property                                                           | Pattern | Type  | Deprecated | Definition | Title/Description |
| ------------------------------------------------------------------ | ------- | ----- | ---------- | ---------- | ----------------- |
| - [type](#properties_additionalProperties_allOf_i1_oneOf_i3_type ) | No      | const | No         | -          | -                 |

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i3_type"></a>7.1.2.4.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 3 > type`

| Type | `const` |
| ---- | ------- |

Specific value: `"decimal"`

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i4"></a>7.1.2.5. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 4`

| Type                      | `object`                                                                  |
| ------------------------- | ------------------------------------------------------------------------- |
| **Additional properties** | [[Any type: allowed]](# "Additional Properties of any type are allowed.") |

| Property                                                           | Pattern | Type  | Deprecated | Definition | Title/Description |
| ------------------------------------------------------------------ | ------- | ----- | ---------- | ---------- | ----------------- |
| - [type](#properties_additionalProperties_allOf_i1_oneOf_i4_type ) | No      | const | No         | -          | -                 |

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i4_type"></a>7.1.2.5.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 4 > type`

| Type | `const` |
| ---- | ------- |

Specific value: `"boolean"`

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i5"></a>7.1.2.6. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 5`

| Type                      | `object`                                                                  |
| ------------------------- | ------------------------------------------------------------------------- |
| **Additional properties** | [[Any type: allowed]](# "Additional Properties of any type are allowed.") |

| Property                                                               | Pattern | Type             | Deprecated | Definition                | Title/Description |
| ---------------------------------------------------------------------- | ------- | ---------------- | ---------- | ------------------------- | ----------------- |
| - [type](#properties_additionalProperties_allOf_i1_oneOf_i5_type )     | No      | const            | No         | -                         | -                 |
| - [timeOf](#properties_additionalProperties_allOf_i1_oneOf_i5_timeOf ) | No      | enum (of string) | No         | In #/$defs/timestampEvent | -                 |

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i5_type"></a>7.1.2.6.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 5 > type`

| Type | `const` |
| ---- | ------- |

Specific value: `"timestamp"`

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i5_timeOf"></a>7.1.2.6.2. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 5 > timeOf`

| Type           | `enum (of string)`     |
| -------------- | ---------------------- |
| **Defined in** | #/$defs/timestampEvent |

Must be one of:
* "issuing"
* "expiration"

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i6"></a>7.1.2.7. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 6`

| Type                      | `object`                                                                  |
| ------------------------- | ------------------------------------------------------------------------- |
| **Additional properties** | [[Any type: allowed]](# "Additional Properties of any type are allowed.") |

| Property                                                           | Pattern | Type  | Deprecated | Definition | Title/Description |
| ------------------------------------------------------------------ | ------- | ----- | ---------- | ---------- | ----------------- |
| - [type](#properties_additionalProperties_allOf_i1_oneOf_i6_type ) | No      | const | No         | -          | -                 |

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i6_type"></a>7.1.2.7.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 6 > type`

| Type | `const` |
| ---- | ------- |

Specific value: `"date"`

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i7"></a>7.1.2.8. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 7`

| Type                      | `object`                                                                  |
| ------------------------- | ------------------------------------------------------------------------- |
| **Additional properties** | [[Any type: allowed]](# "Additional Properties of any type are allowed.") |

| Property                                                               | Pattern | Type            | Deprecated | Definition | Title/Description |
| ---------------------------------------------------------------------- | ------- | --------------- | ---------- | ---------- | ----------------- |
| - [type](#properties_additionalProperties_allOf_i1_oneOf_i7_type )     | No      | const           | No         | -          | -                 |
| - [values](#properties_additionalProperties_allOf_i1_oneOf_i7_values ) | No      | array of string | No         | -          | -                 |

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i7_type"></a>7.1.2.8.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 7 > type`

| Type | `const` |
| ---- | ------- |

Specific value: `"enum"`

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i7_values"></a>7.1.2.8.2. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 7 > values`

| Type | `array of string` |
| ---- | ----------------- |

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be                                                 | Description |
| ------------------------------------------------------------------------------- | ----------- |
| [values items](#properties_additionalProperties_allOf_i1_oneOf_i7_values_items) | -           |

##### <a name="autogenerated_heading_2"></a>7.1.2.8.2.1. PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 7 > values > values items

| Type | `string` |
| ---- | -------- |

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i8"></a>7.1.2.9. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 8`

| Type                      | `object`                                                                  |
| ------------------------- | ------------------------------------------------------------------------- |
| **Additional properties** | [[Any type: allowed]](# "Additional Properties of any type are allowed.") |

| Property                                                             | Pattern | Type   | Deprecated | Definition                                                    | Title/Description |
| -------------------------------------------------------------------- | ------- | ------ | ---------- | ------------------------------------------------------------- | ----------------- |
| - [type](#properties_additionalProperties_allOf_i1_oneOf_i8_type )   | No      | const  | No         | -                                                             | -                 |
| - [items](#properties_additionalProperties_allOf_i1_oneOf_i8_items ) | No      | object | No         | Same as [credential field](#properties_additionalProperties ) | -                 |

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i8_type"></a>7.1.2.9.1. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 8 > type`

| Type | `const` |
| ---- | ------- |

Specific value: `"array"`

##### <a name="properties_additionalProperties_allOf_i1_oneOf_i8_items"></a>7.1.2.9.2. Property `PRISM Credential Schema Definition > properties > credential field > allOf > item 1 > oneOf > item 8 > items`

| Type                      | `object`                                                                  |
| ------------------------- | ------------------------------------------------------------------------- |
| **Additional properties** | [[Any type: allowed]](# "Additional Properties of any type are allowed.") |
| **Same definition as**    | [credential field](#properties_additionalProperties)                      |

## <a name="uniquiness"></a>8. [Optional] Property `PRISM Credential Schema Definition > uniquiness`

| Type | `array of string` |
| ---- | ----------------- |

|                      | Array restrictions |
| -------------------- | ------------------ |
| **Min items**        | N/A                |
| **Max items**        | N/A                |
| **Items unicity**    | False              |
| **Additional items** | False              |
| **Tuple validation** | See below          |

| Each item of this array must be       | Description |
| ------------------------------------- | ----------- |
| [uniquiness items](#uniquiness_items) | -           |

### <a name="autogenerated_heading_3"></a>8.1. PRISM Credential Schema Definition > uniquiness > uniquiness items

| Type | `string` |
| ---- | -------- |

## <a name="comment"></a>9. [Optional] Property `PRISM Credential Schema Definition > comment`

| Type | `string` |
| ---- | -------- |

----------------------------------------------------------------------------------------------------------------------------
Generated using [json-schema-for-humans](https://github.com/coveooss/json-schema-for-humans) on 2022-07-14 at 08:49:03 +0300
