
module.exports = {
  name: 'MongoDB-Dataworker',
  async write () {
    await this.composeWith('./nodejs_base')
    await this.composeWith('./nodejs_scripts')
  }
}
