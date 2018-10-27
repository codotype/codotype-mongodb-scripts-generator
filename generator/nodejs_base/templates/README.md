# MongoDB Datatworker

Quickly populate MongoDB with CSV or JSON files

## Setup

Install dependencies:

```
npm install
```

Run one of the following commands to populate the database from a CSV file:

```
<%_ blueprint.schemas.forEach((schema) => { _%>
npm run seed-<%= schema.identifier_plural %>-csv
<%_ }) _%>
```

Run one of the following commands to populate the database from a JSON file:

```
<%_ blueprint.schemas.forEach((schema) => { _%>
npm run seed-<%= schema.identifier_plural %>-json
<%_ }) _%>
```
