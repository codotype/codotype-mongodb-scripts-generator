require('dotenv').config()
const mongoose = require('mongoose')
const Promise = require('bluebird')
const csv = require('csvtojson')
mongoose.Promise = global.Promise // TODO - is this needed?

// // // //

// Imports the <%= schema.class_name %> Mongoose model
const <%= schema.class_name %>Model = require('../models/<%= schema.identifier %>.model');

// Defines the path to the CSV file
// NOTE - this filepath is relative to the
// parent directory where this script is run
const CSV_FILEPATH = './csv_data/<%= schema.identifier %>.template.csv'

// Instantiates new Mongoose connection
const db = mongoose.connection

// Handles Mongoose connection error
db.on('error', console.error)

// Open Mongoose connection
db.once('open', () => {

  // Logs connection status
  console.log('Connected to MongoDB...')

  // Opens CSV file
  csv().fromFile(CSV_FILEPATH)
  .then((collection)=>{

    // Iterates over each <%= schema.label %> in the CSV file
    Promise.each(collection, (<%= schema.identifier %>_row) => {

      // Saves <%= schema.label %> model to MongoDB
      return new Promise(async(resolve, reject) => {

        // Instantiates new <%= schema.class_name %>Model with data from the CSV row
        const instance = new <%= schema.class_name %>Model({
          <%_ schema.attributes.forEach(({ identifier, datatype }, attrIndex) => { _%>
          <%_ if (datatype === 'TEXT') { _%>
          <%= identifier %>: <%= schema.identifier %>_row['<%= identifier %>']<%= helpers.trailingComma(schema.attributes, attrIndex) %>
          <%_ } else if (datatype === 'NUMBER') { _%>
          <%= identifier %>: Number(<%= schema.identifier %>_row['<%= identifier %>'])<%= helpers.trailingComma(schema.attributes, attrIndex) %>
          <%_ } else if (datatype === 'BOOL') { _%>
          <%= identifier %>: (<%= schema.identifier %>_row['<%= identifier %>'] === 'TRUE')<%= helpers.trailingComma(schema.attributes, attrIndex) %> // Change this value
          <%_ }  _%>
          <%_ }) _%>
        })

        // Saves the model
        await instance.save().catch(err => reject(err))

        // Logs state
        console.log('Saved <%= schema.label %>: ' + instance._id);

        // Resolves promise
        return resolve()

      })
    })
    .then(() => {

      // Logs 'done' message
      console.log('Saved all <%= schema.label_plural %>')

      // Exits process
      process.exit()

    })
    .catch((err) => {

      // Logs 'done' message
      console.log('Error saving all <%= schema.label_plural %>')

      // Exits process
      process.exit()

    })

  })

})

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URI)