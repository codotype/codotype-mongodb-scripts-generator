const Generator = require('@codotype/generator')

module.exports = class MongoDBScripts extends Generator {
  async write () {
    await this.composeWith('./nodejs_base')
    await this.composeWith('./nodejs_scripts')
  }
}
