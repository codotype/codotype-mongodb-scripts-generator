const Generator = require('@codotype/generator')
const sample = require('lodash/sample')

// // // //

const words = [
  'Alpha',
  'Bravo',
  'Charlie',
  'Delta',
  'Echo',
  'Foxtrot',
  'Golf',
  'Hotel',
  'India',
  'Juliette',
  'Kino',
  'Lima',
  'Mike',
  'November',
  'Oscar',
  'Papa',
  'Quebec',
  'Romeo',
  'Sierra',
  'Tango',
  'Uniform',
  'Victor',
  'Whiskey',
  'XRAY',
  'Yankee',
  'Zulu'
]

// // // //

module.exports = class MongoDBScriptsNodeJS extends Generator {

  async forEachSchema({ blueprint, configuration, schema }) {

    // Generates a random set of CSV separated
    function randomCsvDataRow (schema) {

      // Assembles each row
      // TODO - implement remaining datatypes
      const row = schema.attributes.map((attr) => {
        switch (attr.datatype) {
          case 'TEXT': return '"' + sample(words) + ' ' + sample(words) + '"'
          case 'NUMBER': return '"' + Math.floor(Math.random(999)) + '"'
          case 'BOOL': return '"TRUE"'
          default: return '""'
        }
      })

      // Joins the row and returns
      // console.log(row.join(','))
      return row.join(',')
    }

    // scripts/models/SCHEMA.model.js
    await this.copyTemplate(
      this.templatePath('resource.model.js'),
      this.destinationPath('models/' + schema.identifier + '.model.js'),
      { schema }
    )

    // CSV Import
    // scripts/import-SCHEMA-csv.js
    await this.copyTemplate(
      this.templatePath('resource.import-csv.js'),
      this.destinationPath('scripts/import-' + schema.identifier_plural + '-csv.js'),
      { schema }
    )

    // csv_data/SCHEMA.template.csv
    await this.copyTemplate(
      this.templatePath('resource.template.csv'),
      this.destinationPath('csv_data/' + schema.identifier + '.template.csv'),
      { schema, randomCsvDataRow }
    )

    // JSON Import
    // scripts/import-SCHEMA-json.js
    // await this.copyTemplate(
    //   this.templatePath('resource.import-json.js'),
    //   this.destinationPath('scripts/import-' + schema.identifier_plural + '-json.js'),
    //   { schema }
    // )

    // // json_data/SCHEMA.template.json
    // await this.copyTemplate(
    //   this.templatePath('resource.template.json'),
    //   this.destinationPath('json_data/' + schema.identifier + '.template.json'),
    //   { schema }
    // )

  }

}
