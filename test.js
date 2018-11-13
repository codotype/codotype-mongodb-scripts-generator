// TODO - this file should be moved into a test directory
const CodotypeRuntime = require('@codotype/runtime')
const buildConfiguration = require('@codotype/util/lib/buildConfiguration')

// Imports blueprint data
// const blueprint = require('@codotype/blueprints/lib/todo-list.json')
// const blueprint = require('@codotype/blueprints/lib/team-lists.json')
// const blueprint = require('@codotype/blueprints/lib/textbook-library.json')
const blueprint = require('./cloud_and_things_codotype.json')

// Defines build
const build = {
  blueprint: blueprint,
  stages: [{
    generator_id: require('./meta').id,
    configuration: buildConfiguration({ blueprint: blueprint, generator: require('./meta') })
  }]
}

// Invoke runtime directly with parameters
const runtime = new CodotypeRuntime()

// Registers this generator via relative path
runtime.registerGenerator({ relative_path: './' })

// Executes the build
runtime.execute({ build })
.then(() => {
  console.log('TEST SUCCESSFUL')
})
