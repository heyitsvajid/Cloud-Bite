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
Login API service is used to logout/login or check if user is logged in.

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

# Network Partition

Riak cluster has been created with 3 nodes. 

In our GO APIs we use channels to connect to the cluster. On every client request, the first response received on the channel from the go routine is cascaded to the client. This helps us maintain high availability of our system and makes it partition tolerant since in case any of the riak nodes stops responding, our system will still get a response from the other cloned nodes in the cluster.

# Creativity in the use and application of topics and tools discussed in class

We have deployed our front end user client and admin client on Heroku.
We have used kong as our microservice API gateway. We have leveraged kong in a way that when a new tenant is added to our system, a new frontend URL is generated dedicated to that particular tenant.
All our microservices are deployed using docker on AWS machines. Each API is running on 2 AWS machines behind load balancers.
All microservices run independently of each other and developed using GoLang.
At the database level, we are using a mongodb sharded cluster and a high-available riak cluster

# Areas of Contribution

### Vajid Kagdi
- 3 Tenant API Endpoints
- FrontEnd - Tenant Form
- Docker Deployment of all APIs to create multiple clones of same service to support X-axis scaling
- Schema Designing

### Murtaza Manasawala
- 2 Tenant API Endpoints + 1 User API Endpoint
- FrontEnd - Multi-tenant Menu, Multi-tenant Cart
- AWS Deployment with load balancer for X axis scaling
- Schema Designing

### Sricheta Ruj :
- User Session API - 3 Endpoints
- FrontEnd - Multi-tenant Login
- Heroku Deployment of saas-client and user-client to support continuous development
- Schema Designing

### Rohan Acharya
- User API - 5 Endpoints
- FrontEnd - Multi-tenant Sign-up
- Riak Cluster to support partition tolerance
- Schema Designing

### Drusti Thakkar:
- Cart API - 3 Endpoints
- FrontEnd - Admin Dashboard
- MongoDB sharded cluster for Z-axis scaling
- Schema Designing

# Team Avengers Meeting #1

Week 1 Meeting Details: 11/04/2018 - 11/10/2018
Location - SJSU Library, San Jose State University
Time: 4pm - 6pm
  
## Meeting Organizer:
- Vajid Kagdi
 
## Team Members:
* Vajid Kagdi
* Murtaza Manasawala
* Sricheta Ruj
* Rohan Acharya
* Drusti Thakkar

## Discussion Points:
- Met and discussed the different project examples like Uber, Starbucks, The Future of Clipper for the project as per the information shared by professor.
- Discussed the required Project Deliverables as per different idea.
- Finally agreed on a Counter Burger Online Orders-like web application supporting user authentication and order placement.
- Discussed on the possible business objects for this project.
- Discussed within the team to decide the databases to be used for storing different types of data.
- Discussed the basic architecture to be acheived.
- Discussed on how to maintain progress report and meeting details for every week.
  

## Action Items:
- Create the KanBan style task board in GitHub folder.
- Brainstorm and come up with challenges faced for the project to be discussed in next meeting.
- Research on the finalized database, API and infrastructure setup.
- Come up with the API and the database schema details for project.


## Challenges
- Finalising on the application to be replicated for this project.
- Considering a reasonable project scope, deciding the API schema and database schema.
- Deciding the database for different business objects based on the context.

# Team Avengers Meeting #2

Week 2 Meeting Details: 11/11/2018 - 11/17/2018
Location - SJSU Library, San Jose State University
Time: 12pm - 3pm
  
## Meeting Organizer:
- Murtaza Manasawala
 
## Team Members:
* Murtaza Manasawala
* Vajid Kagdi
* Sricheta Ruj
* Rohan Acharya
* Drusti Thakkar

## Discussion Points:
- Met and discussed different aspects of Burger Counter Application
- Wrote all the different API's required for the application
- Discussed about different deployment models and DB designs
- Finalised the Databases and discussed which data to be stored in which database according to the requirements of that data on the basis of availability or consistency
- Brainstorming on making the burger counter application a multitenent Saas application
- Discussed the shortcomings of the architecture and though of overcoming them
- Understanding Saas concepts and ways to implement in the project

## Action Items:
- Updated the KanBan style task board in GitHub folder.
- Brainstorm and come up with challenges faced for the API design and DB design
- Finalized database, API and infrastructure setup for the application
- Researched about various deployment models and Saas application behaviours


## Challenges
- Finalizing replication of microservices and 
- Deciding database design for mulitenant architecture
- Research on different Saas based applications and understanding their architecture

# Team Avengers Meeting #3

  Week 3 Meeting Details: 11/18/2018 - 11/24/2018
  Location - SJSU Library, San Jose State University
  Time: 12pm - 3pm

# Meeting Organizer:

  Drusti Thakkar

# Team Members:

  1. Murtaza Manasawala
  2. Vajid Kagdi
  3. Sricheta Ruj
  4. Rohan Acharya
  5. Drusti Thakkar

# Discussion Points:

  - Met and discussed about the working of all the APIs of Burger Counter Application
  - Finalised the deployment model
  - Executed the APIs and tested them using curl commands
  - Noted the bugs and issues with the APIs
  - Started with bug fixes
  - Started with frontend developement

# Action Items:

  - Updated the KanBan style task board in GitHub folder.
  - Complete API development and bug fixes
  - Develop a basic frontend application and integrate it with the backend
  - Enhance the frontend

# Challenges

  - Golang - learning phase for all team members

# Team Avengers Meeting #4

Week 4 Meeting Details: 11/25/2018 - 12/2/2018
Location - SJSU Library, San Jose State University
Time: 10am - 3pm

## Meeting Organizer:
Rohan Acharya

## Team Members:
1. Murtaza Manasawala
2. Vajid Kagdi
3. Sricheta Ruj
4. Rohan Acharya
5. Drusti Thakkar

## Discussion Points:
- Finalised the architecture diagram
- Discussed Multi-tenancy with Kong API
- Discussed last week challenges
- Discussed Sharding key selection for MongoDB
- Riak cluster partition steps

## Action Items:
- User/Tenant API Testing
- Integration of User & Tenant API with FrontEnd Application
- Executed MongoDB sharding and tested it
- Load Balancer additions for user & tenant instances
- Fixed errors with Cart APIs

## Challenges
- REST APIs in Golang - Debugging
- Sharded cluster - GO API connectivity

# Team Avengers Meeting #5

Week 5 Meeting Details: 11/2/2018 - 12/7/2018
Location - SJSU Library, San Jose State University
Time: 10am - 3pm

## Meeting Organizer:
Sricheta Ruj

## Team Members:
1. Murtaza Manasawala
2. Vajid Kagdi
3. Sricheta Ruj
4. Rohan Acharya
5. Drusti Thakkar

## Discussion Points:
- Discussed last week key challenges
- Discussed the Load balanced steps
- Discussed how to present the demo
- Discussed how to deploy the admin client

## Action Items:
- Integration Testing
- Load balancer setting
- Prepared Video for final demo
- Bud fixes
- Fixed errors with integration

## Challenges
- Debugging and bug fixing
- Intgeration with frontend
