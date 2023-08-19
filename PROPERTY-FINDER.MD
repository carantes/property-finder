# Property Finder Educational Side Project

## Summary

This is an educational side project where I am trying to replicate a real world marketplace app, like Blocket, Realtor and PropertyFinder, where users can buy and sell used apartments. The idea is to create a very simple initial version of it and iterate over the time adding new features, documentating the process and enabling discussions about scalability, availability and performance.

### Requirements

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

### TBD

- Database schema
- API Design
- Frontend
