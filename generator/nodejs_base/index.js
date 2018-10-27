const Generator = require('@codotype/generator')

// // // //

module.exports = class MongoDBScriptsBase extends Generator {

  compileInPlace () {
    return [
      'package.json',
      '.env.example',
      'README.md'
    ]
  }

  // Ensures presence of destination directories
  async write () {
    await this.ensureDir('models')
    await this.ensureDir('scripts')
    await this.ensureDir('csv_data')
    // await this.ensureDir('json_data')
  }

}

