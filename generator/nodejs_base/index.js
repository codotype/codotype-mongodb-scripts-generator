
module.exports = {
  name: 'NodeJS-Base',
  compileInPlace: [
    'package.json',
    '.env.example',
    'README.md'
  ],
  async write () {
    // Ensures presence of destination directories
    await this.ensureDir('models')
    await this.ensureDir('scripts')
    await this.ensureDir('csv_data')
    // await this.ensureDir('json_data')
  }
}
