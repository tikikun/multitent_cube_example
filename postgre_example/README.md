# Multi-tenant in CUBE JS example

How to use the example.

1. Docker compose up

Docker compose up will run 3 containers
 - cubejs container 
 - tenant_1_1 -> the first postgredatabase, represent the first tenant
 - tenant_2-1 -> the second postgre database, represent the second tenant

component of the tenant name tenant_{appId}_{userId}. I will assum using default userId as 1 and have 2 appId.

The example is setting tenant_1_1 as the default database if user doesn't have any security context (authen fields for appId and userId)

the example data will have a table public.test_multi_cube.

Note: If you have more tenant you can always add for more tenant, this example cover the case of 2 tenant

2. Generate Data Model 

Go to this link after Docker compose up: http://localhost:4000/#/schema 

Then choose public -  test_multi_cube and then generate data model.

![Generate Data Model](images/image-gen-model.png)

1. Click on Playground building and build your first chart

Build your example chart by clicking the below button.

![Build your first chart](images/image_build_chart.png)


4. Add security context with the correct appId and userId.

Before you can use the security context, you need to add the appId and userId

![Security context](images/image_sec_context.png)

![Add app id and userid](images/image_appid.png)

And then please use the token