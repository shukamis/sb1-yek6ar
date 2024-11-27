# Baserow API Reference Guide

## Base URL
```
https://api.baserow.io/api/database/rows/table/398767
```

## Authentication
All requests must include the Authorization header:
```
Authorization: Token YOUR_API_TOKEN
```

## Common Parameters
- `user_field_names`: Set to `true` to use field names instead of IDs in requests/responses

## Endpoints

### 1. Create Row
Creates a new row in the table.

**Method:** POST  
**Endpoint:** `/?user_field_names=true`

#### Request Body
```json
{
  "field_name1": "value1",
  "field_name2": "value2"
}
```

#### Response
```json
{
  "id": 1,
  "field_name1": "value1",
  "field_name2": "value2",
  "created_on": "2024-02-27T10:00:00Z",
  "updated_on": "2024-02-27T10:00:00Z"
}
```

#### Example Usage
```typescript
async function createRow(data: Record<string, any>) {
  try {
    const response = await axios.post(
      'https://api.baserow.io/api/database/rows/table/398767/?user_field_names=true',
      data,
      {
        headers: {
          Authorization: `Token ${BASEROW_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to create row');
  }
}
```

### 2. Get Row
Retrieves a specific row by ID.

**Method:** GET  
**Endpoint:** `/{row_id}/?user_field_names=true`

#### Response
```json
{
  "id": 1,
  "field_name1": "value1",
  "field_name2": "value2",
  "created_on": "2024-02-27T10:00:00Z",
  "updated_on": "2024-02-27T10:00:00Z"
}
```

#### Example Usage
```typescript
async function getRow(rowId: number) {
  try {
    const response = await axios.get(
      `https://api.baserow.io/api/database/rows/table/398767/${rowId}/?user_field_names=true`,
      {
        headers: {
          Authorization: `Token ${BASEROW_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch row');
  }
}
```

### 3. Update Row
Updates an existing row's data.

**Method:** PATCH  
**Endpoint:** `/{row_id}/?user_field_names=true`

#### Request Body
```json
{
  "field_name1": "updated_value1",
  "field_name2": "updated_value2"
}
```

#### Response
```json
{
  "id": 1,
  "field_name1": "updated_value1",
  "field_name2": "updated_value2",
  "created_on": "2024-02-27T10:00:00Z",
  "updated_on": "2024-02-27T11:00:00Z"
}
```

#### Example Usage
```typescript
async function updateRow(rowId: number, data: Record<string, any>) {
  try {
    const response = await axios.patch(
      `https://api.baserow.io/api/database/rows/table/398767/${rowId}/?user_field_names=true`,
      data,
      {
        headers: {
          Authorization: `Token ${BASEROW_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to update row');
  }
}
```

### 4. Delete Row
Removes a specific row from the table.

**Method:** DELETE  
**Endpoint:** `/{row_id}/`

#### Example Usage
```typescript
async function deleteRow(rowId: number) {
  try {
    await axios.delete(
      `https://api.baserow.io/api/database/rows/table/398767/${rowId}/`,
      {
        headers: {
          Authorization: `Token ${BASEROW_TOKEN}`,
        },
      }
    );
    return true;
  } catch (error) {
    throw new Error('Failed to delete row');
  }
}
```

### 5. Move Row
Changes the position of a row within the table.

**Method:** PATCH  
**Endpoint:** `/{row_id}/move/`

#### Request Body
```json
{
  "before_id": null,  // Move to end
  "before_id": 5,     // Move before row 5
  "after_id": 3       // Move after row 3
}
```

#### Example Usage
```typescript
async function moveRow(rowId: number, beforeId?: number, afterId?: number) {
  try {
    const response = await axios.patch(
      `https://api.baserow.io/api/database/rows/table/398767/${rowId}/move/`,
      { before_id: beforeId, after_id: afterId },
      {
        headers: {
          Authorization: `Token ${BASEROW_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to move row');
  }
}
```

## Error Codes

| Code | Description | Solution |
|------|-------------|----------|
| 400  | Bad Request | Check request body format and required fields |
| 401  | Unauthorized | Verify API token is valid and included |
| 404  | Not Found | Confirm table and row IDs exist |
| 429  | Too Many Requests | Implement rate limiting in your application |

## Best Practices

1. **Error Handling**
   - Always implement proper error handling
   - Log errors for debugging
   - Return user-friendly error messages

2. **Rate Limiting**
   - Implement exponential backoff for retries
   - Cache frequently accessed data
   - Batch operations when possible

3. **Data Validation**
   - Validate data before sending to API
   - Check required fields
   - Sanitize user input

4. **Security**
   - Never expose API token in client-side code
   - Use HTTPS for all requests
   - Implement proper authentication

## Utility Functions

### Validate Row Data
```typescript
function validateRowData(data: Record<string, any>): boolean {
  const requiredFields = ['field1', 'field2'];
  return requiredFields.every(field => 
    data.hasOwnProperty(field) && data[field] !== null
  );
}
```

### Handle API Errors
```typescript
function handleBaserowError(error: any): string {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        return 'Invalid request data';
      case 401:
        return 'Authentication failed';
      case 404:
        return 'Resource not found';
      case 429:
        return 'Too many requests';
      default:
        return 'An unexpected error occurred';
    }
  }
  return 'Network error';
}
```