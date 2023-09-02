# Simple Guide: Multi-Tenant Example in CUBE JS

## How to Run the Example

### Step 1: Start Docker Containers
Run the `Docker compose up` command. This will launch three containers:
- CubeJS application container
- Database for Tenant 1 (`tenant_1_1`)
- Database for Tenant 2 (`tenant_2_1`)

By default, if a user doesn't specify their tenant information, the system will use `tenant_1_1`.

### Step 2: Create a Data Model
1. Open your web browser and go to: [http://localhost:4000/#/schema](http://localhost:4000/#/schema)
2. Choose `public - test_multi_cube` to generate the data model.

![Generate Data Model](images/image-gen-model.png)

### Step 3: Build Your First Chart
Click on the button labeled 'Playground building' to create your example chart.

![Build your first chart](images/image_build_chart.png)

### Step 4: Set Up Security Context
Before using multi-tenancy, you must specify the `appId` and `userId` in the security context.

![Security context](images/image_sec_context.png)

![Add app id and userId](images/image_appid.png)

### Step 5: Generate and Use Tokens
Generate a token, then use it to make multi-tenant queries.

![Add token](images/image_token.png)

You can repeat this process for different `appId` and `userId` combinations. You can also try using a non-existent `appId` to see what happens (the system defaults to `tenant_1_1`).

## Testing with cURL Commands

### Query Data from Tenant 1
Run this cURL command to query data from `tenant_1_1`:

```zsh
curl -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTMzNTQxNjcsImV4cCI6MTY5MzQ0MDU2NywiYXBwSWQiOjEsInVzZXJJZCI6MX0.SrE6EIP0a3IuxzUVszmPQZuX7l3JZS7duI7RDqhbOzs" \
  -G \
  --data-urlencode 'query={
    "measures": [
      "test_multi_cube.count"
    ],
    "timeDimensions": [
      {
        "dimension": "test_multi_cube.order_date",
        "granularity": "day"
      }
    ],
    "order": {
      "test_multi_cube.order_date": "asc"
    }
  }' \
  http://localhost:4000/cubejs-api/v1/load

  -> return real data from db
```

### Query Data from Tenant 2
Run this cURL command to query data from `tenant_2_1`:

```zsh
curl -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTMzNTQxNjcsImV4cCI6MTY5MzQ0MDU2NywiYXBwSWQiOjIsInVzZXJJZCI6MX0.95j-WVsbLGneBKNNjJJewawZXt8TjOBhgcino-v46bs" \
  -G \
  --data-urlencode 'query={
    "measures": [
      "test_multi_cube.count"
    ],
    "timeDimensions": [
      {
        "dimension": "test_multi_cube.order_date",
        "granularity": "day"
      }
    ],
    "order": {
      "test_multi_cube.order_date": "asc"
    }
  }' \
  http://localhost:4000/cubejs-api/v1/load

  -> return real data from db
  ```

### Test with a Non-Existent Tenant
Run this cURL command to see what happens if you use a non-existent `appId`:

```zsh
curl -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTMzNTQxNjcsImV4cCI6MTY5MzQ0MDU2NywiYXBwSWQiOjIwLCJ1c2VySWQiOjF9.Jd5Ph-nQxOlvRECCl4YfrrbP6kGqCwBCqMSfcqthhUA" \
  -G \
  --data-urlencode 'query={
    "measures": [
      "test_multi_cube.count"
    ],
    "timeDimensions": [
      {
        "dimension": "test_multi_cube.order_date",
        "granularity": "day"
      }
    ],
    "order": {
      "test_multi_cube.order_date": "asc"
    }
  }' \
  http://localhost:4000/cubejs-api/v1/load
  -> return result for tenant_1_1
  ```

As you can see the above code is trying to access appId 20 which doesn't exist, therefore it will automatically return result for appId 1, which is the default value of cube that i set in cube.js file.

And there you have it! You've successfully tested multi-tenancy in CUBE JS.