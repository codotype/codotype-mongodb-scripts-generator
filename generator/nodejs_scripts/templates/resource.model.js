const mongoose = require('mongoose')

// // // //

const <%= schema.class_name %>Model = new mongoose.Schema({
  <%_ schema.attributes.forEach((attr) => { _%>
  <%_ if (attr.datatype === 'BOOL') { _%>
  <%= attr.identifier %>: {
    type: Boolean
  },
  <%_ } else if (attr.datatype === 'NUMBER') { _%>
  <%= attr.identifier %>: {
    type: Number,
    required: <%= attr.required %>,
    unique: <%= attr.unique %>
  },
  <%_ } else if (attr.datatype === 'DATETIME') { _%>
  <%= attr.identifier %>: {
    type: Date,
    required: <%= attr.required %>,
    unique: <%= attr.unique %>
  },
  <%_ } else if (attr.datatype === 'JSON') { _%>
  <%= attr.identifier %>: {
    type: mongoose.Schema.Types.Mixed,
    required: <%= attr.required %>,
    default: {}
  },
  <%_ } else if (attr.datatype === 'STRING_ARRAY'){ _%>
  <%= attr.identifier %>: {
    type: [String],
    required: <%= attr.required %>,
    unique: <%= attr.unique %>,
    default: []
  },
  <%_ } else { _%>
  <%= attr.identifier %>: {
    type: String,
    required: <%= attr.required %>,
    unique: <%= attr.unique %>
  },
  <%_ } _%>
  <%_ }) _%>
  <%_ schema.relations.forEach((rel) => { _%>
  <%_ if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
  <%= rel.alias.identifier + '_id' %>: {
    type: mongoose.Schema.Types.ObjectId,
    ref: '<%= rel.schema.class_name %>'
  },
  <%_ } else if (rel.type === 'HAS_MANY') { _%>
  <%= rel.alias.identifier + '_ids' %>: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: '<%= rel.schema.class_name %>'
  }],
  <%_ } _%>
  <%_ }) _%>
  },
  // Collection options
  {
    timestamps: {
      createdAt: 'createdOn',
      updatedAt: 'updatedOn'
  },
  versionKey: false
});

// // // //

module.exports = mongoose.model('<%= schema.class_name %>', <%= schema.class_name %>Model)
