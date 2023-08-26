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

## System Design

![Alt text](system-design.png)

- **Web Server**: Nginx web server responsible about host and delivery the client React web app, it will also cache requests, and apply rate limits to prevent DDoS attacks.
- **API Gateway**: REST API Gatweay to all internal micro services. It is responsible about handling user authentication, validate session and proxy authenticathed api calls to internal services.
- **Identity Service**: Internal service used to Register and Authenticate users.
- **Property Service**: Internal service used to maintain user properties.
- **Search Service**: Internal service used to search by properties in the Elasticsearch index.
- **Keywords Service**: Internal service used to maintain active search keywords monitors.
- **Search-Indexer** Consumer: AMQP service used to consume "new property" events from Kafka and update the search index.
- **Notification Consumer**: AMQP service used to consume "new property" events from Kafka and insert pending notification into a Redis datastore with a TTL.
- **Notification Service**: This service will read the list of pending notifications from Redis and send batches of email notifications.

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

### Database Schema

TBD

## Implementation details

### The Monorepo

### CI & CD

### Backend

![Alt text](nestjs-app-architecture.png)

### Frontend

TBD

### Testing strategy

TBD

### Deployment

TBD

## Local Development

### Start the app

You can run all services by starting the docker-compose

```
docker-compose up
```

### Lint and Tests

```
nx run-many -t lint test
```
