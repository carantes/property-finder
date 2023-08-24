# Property Finder Educational Side Project

## Summary

This is an educational side project where I am trying to replicate a real world marketplace app, like Blocket, Realtor or PropertyFinder, where users can buy and sell used apartments. The idea is to create a very simple initial version of it and iterate over the time adding new features and use cases, documentating the process and enabling discussions about scalability, availability and performance.

### Functional Requirements

- Sellers can add new apartments to the listing
- Buyers can search for existing apartments using plain text or keywords
- Buyers should be able to create monitors to specific search keywords
- Buyers should be notified about new properties every 24hs and should never be notified twice about the same property.

### Non-Functional

- Low latency on search results
- Eventual consistency of new apartments on search results
- General High availability and scalability

### System Design

![Alt text](system-design.png)

Building blocks:

- Web Server: Nginx web server responsible about host and delivery the client React web app, it will also cache requests, and apply rate limits to prevent DDoS attacks.
- App Server: Backend-for-frontend (BFF) entrypoint for all backend services. It will be responsible about handling user authentication, maintain session and proxy authenticathed api calls to internal services.
- User Service: gRPC service used to maintain authenticated users.
- Property Service: gRPC service used to maintain user properties.
- Search Service: gRPC service used to search by properties in the Elasticsearch index.
- Keywords Service: gRPC service used to maintain active search keywords monitors.
- Search-Indexer Consumer: AMQP service used to consume "new property" events from Kafka and update the search index.
- Notification Consumer: AMQP service used to consume "new property" events from Kafka and insert pending notification into a Redis datastore with a TTL.
- Notification Service: This service will read the list of pending notifications from Redis and send batches of email notifications.

### API Design

| Method | Endpoint                                | Description                                  | Return                                 |
| ------ | --------------------------------------- | -------------------------------------------- | -------------------------------------- |
| POST   | /api/v1/auth/login                      | Authenticate the user and return a JWT token | 200 (success), 401 (unauthorized)      |
| GET    | /api/v1/auth/profile                    | Get authenticated user profile               | 200 (Success)                          |
| POST   | /api/v1/auth/profile                    | Update user profile                          | 200 (Sucess), 4xx (Validation error)   |
| POST   | /api/v1/accounts/register               | Register a new user to the app               | 200 (success), 4xx (Validation error)  |
| POST   | /api/v1/accounts/forgot-password        | Reset user password                          | 200 (success), 4xx (Validation error)  |
| GET    | /api/v1/properties                      | List all of properties from the current user | 200 (Success)                          |
| GET    | /api/v1/properties/`<id>`               | Return details from a single property        | 200 (Success), 404 (Not found)         |
| POST   | /api/v1/properties                      | Create a new property                        | 201 (Inserted), 4xx (Validation error) |
| PUT    | /api/v1/properties/`<id>`               | Update one existing property                 | 200 (Success), 404 (Not found)         |
| DELETE | /api/v1/properties/`<id>`               | Delete one existing property                 | 200 (Success), 404 (Not found)         |
| GET    | /api/v1/properties/search?q=`<keyword>` | Full-text search on indexed properties       | 200 (Success)                          |

### Communication Patterns

- HTTP Rest: Standard client x Server communication
- TCP/gRPC: Synchronous communication from Gateway to internal services
- AMQP: Asynchronous communication used by queue producers/consumers

### Database Schema

TBD

### Frontend

TBD

## Local Development

### Configure the local environment

- Create a new `.env` file in the root folder.

```
# Server config

## Http server port
BFF_PORT=3000
USER_SERVICE_PORT=3001

## TCP server host/port
USER_SERVICE_TCP_HOST=users # localhost or container name from docker
USER_SERVICE_TCP_PORT=3101
PROPERTY_SERVICE_PORT=3002
PROPERTY_SERVICE_TCP_HOST=properties # localhost or container name from docker
PROPERTY_SERVICE_TCP_PORT=3102

DEFAULT_TIMEOUT=5000

# Database
MONGODB_URI=mongodb://root:root123@mongodb:27017/

```

### Start the app

To start the development server run `nx serve bff`. Open your browser and navigate to http://localhost:4200/. Happy coding!

### Generate code

Run `nx list` to get a list of available plugins and whether they have generators. Then run `nx list <plugin-name>` to see what generators are available.

### Running tasks

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

### Ready to deploy?

Just run `nx build demoapp` to build the application. The build artifacts will be stored in the `dist/` directory, ready to be deployed.

### Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/core-features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/core-features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)
