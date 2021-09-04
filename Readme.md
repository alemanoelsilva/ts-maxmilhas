## MaxMilhas Test

### Requirements:

Must be created an endpoint to add a personal document (CPF in Brazil)
- The endpoint needs to accept a string with the document number, as 999.999.999-99
- The endpoint needs to return a succeeds message, or describing the error occurred

Must be created an endpoint to remove a person document (CPF in Brazil)
- The endpoint needs to accept a string with the document number, as 999.999.999-99
- The endpoint needs to return a succeeds message, or describing the error occurred

Must be created an endpoint to show the server info, as such: 
   1. uptime
   2. number of searching
   3. number of documents in the blacklist

### Stack:

Must be used the follows technologies: 
- TypeScript 
- Express
- MongoDB
- Docker
- Kubernetes

#### The structure will be split into layers:

- **Presentation:** it depends on Domain only, the layer accepts and return data
- **Domain:** it contains enterprise types and logic, there is no dependencies
- **Application:** it depends on only Domain layer, here is all application logic
- **Infrastructure:** it handles with all external services. This layer depends on Application only
- **Persistence or Data:** it handles with data, database, migrations

