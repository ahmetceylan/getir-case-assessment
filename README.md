# Getir Case Assessment

This application has a single endpoint to implement "getir case study" assessment.

https://getir-assessment.herokuapp.com/api/getRecords

### Setup Instructions

* Install NPM and NodeJS
* git clone https://github.com/ahmetceylan/getir-case-assessment.git
```jsx
cd getir-case-assessment
npm install
npm run start
```

## Tests

[Jest](https://jestjs.io/) framework has been used for testing
```jsx
npm run test
```

### API Endpoint Information - /getRecords
https://getir-assessment.herokuapp.com/api/getRecords

You need to use "post" as http method to get data from the api link above by providing the necessary parameters.

* “startDate” and “endDate” fields should contain the date in a “YYYY-MM-DD” format. You
can filter the data by using them
* “minCount” and “maxCount” are for filtering the data. Sum of the “count” array in the
documents will be between “minCount” and “maxCount”.

### Structure of Request Payload

| Parameters | Description |
| ------ | ----------- |
| startDate   | Date (YYYY-MM-DD) |
| endDate | Date (YYYY-MM-DD) |
| minCount    | number |
| maxCount    | number |

```jsx
POST /api/getRecords HTTP/1.1
Host: getir-assessment.herokuapp.com
Content-Type: application/json
{
  "startDate": "2016-01-26",
  "endDate": "2018-02-02",
  "minCount": 2700,
  "maxCount": 3000
}
```

### Structure of Response Payload
```jsx
{
  "code":0,
  "msg":"Success",
  "records":[
    {
    "key":"TAKwGc6Jr4i8Z487",
    "createdAt":"2017-01-28T01:22:14.398Z",
    "totalCount":2800
    },
    {
    "key":"NAeQ8eX7e5TEg7oH",
    "createdAt":"2017-01-27T08:19:14.135Z",
    "totalCount":2900
    }
  ]
}
```
## Return Types

#### Success Response Payload
| Status | Response |
| ------ | ----------- |
| 200 | `{ code : 0, msg : "success", records: [Data] }` |
 
#### Error Response Payload
| Status | Response |
| ------ | ----------- |
| 500 | `{ "code": -1, "msg": "internal server error, error is ; $errorMsg", "records": [] }` |
| 404 | `{ "code": 1, "msg": "Can not find any record with given parameters!", "records": [] }` |
| 400 | `{ "code": 2, "msg": "\"endDate\" is required", "records": [] }` |
| 400 | `{ "code": 3, "msg": "\"maxCount\" must be a number", "records": [] }` |
| 400 | `{ "code": 4, "msg": "Request body must be in valid JSON format. Error is ;Unexpected token } in JSON at position 103", "records": [] }` |
| 404 | `{ "code": 5, "msg": "Not Found" }` |
  


## Author

Ahmet Ceylan
