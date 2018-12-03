# CMPE281 - Team Hackathon Project

## Team: Avengers

1. Drusti Thakkar
2. Murtaza Manasawala
3. Rohan Acharya
4. Sricheta Ruj
5. Vajid Kagdi

## Architecture Diagram

<p align="center">
<img align="center" src="https://github.com/nguyensjsu/fa18-281-avengers/blob/master/ArchitectureDiagram_finalVersion.png" width="500" height="700" />
</p>

## Description

### 1. Frontend - user

```Technology Stack:``` HTML, CSS, React, Redux
The frontend user client will be used by a user to log in to the application and the corresponding request will be cascaded to the appropriate API via Kong Gateway.

### 2. Frontend - admin

```Technology Stack:``` HTML, CSS, React, Redux
The frontend user client will be used by admin to register a new tenant in to the application and the corresponding request will be cascaded to the appropriate API via Kong Gateway.

### 3. Kong API Gateway

The ```Kong API Gateway``` is used to route the APIs to the corresponding elastic load balancer.

### 4. Load Balancers

There are 3 ```load balancers``` - each for the Go APIs to scale the application horizontally.

### 5. Go APIs
Tenant API service is used to add/update/delete a tenant from the datastore.
User API service is used to add/update/delete a user from the particular tenant.
Cart API service is used to add/update/delete items from a cart.

### 6.  Mongo DB Sharded cluster

The mongo db sharded cluster consists of a replica set of 2 config server nodes, 2 shard servers with 1 node each and 1 mongos instance as a query router. 

### 7. Riak Cluster

The riak cluster consists of 3 nodes.

# AKF Scale Cube

### X-axis Scaling: 
- Horizontal duplication or x-axis scaling is to create multiple instances or clones of your application on AWS behind a load balancer.

- This has been implemented by cloning our APIs and using a load balancer.

### Y-axis Scaling:
- Y axis scaling or functional decomposition is to separate services or dissimilar things.

- This has been implemented by dividing all the services independently.

### Z-axis Scaling:
- Z axis scaling is to decompose or splitting similar data into different chunks.

- This has been implemented by using a mongodb sharded cluster to store tenant and user data.
