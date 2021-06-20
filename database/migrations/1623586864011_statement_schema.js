'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StatementSchema extends Schema {
  up () {
    this.create('statements', (table) => {
      table.increments()
      table.string('username').references('username').inTable('users')
      table.date('date')
      table.string('item')
      table.integer('send')
      table.integer('recive')
      table.integer('out')
      table.timestamps()
    })
  }

  down () {
    this.drop('statements')
  }
}

module.exports = StatementSchema

