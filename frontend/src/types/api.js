/**
 * Shared API response and entity shapes.
 * Extend these as backend models are finalized.
 */

/** @typedef {Object} ApiListResponse
 * @property {Array} data
 * @property {number} [total]
 * @property {number} [page]
 * @property {number} [limit]
 */

/** @typedef {Object} ApiEntityResponse
 * @property {*} data
 * @property {string} [message]
 */

/** @typedef {Object} User
 * @property {string} _id
 * @property {string} fullname
 * @property {string} email
 * @property {string} [avatar]
 * @property {string} [bio]
 * @property {boolean} [isAdmin]
 * @property {string} [createdAt]
 */

/** @typedef {Object} Category
 * @property {string} _id
 * @property {string} title
 * @property {string} [description]
 */

/** @typedef {Object} Post
 * @property {string} _id
 * @property {string} title
 * @property {string} slug
 * @property {string} content
 * @property {string} [excerpt]
 * @property {string} [image]
 * @property {Category|string} [category]
 * @property {User|string} [author]
 * @property {string[]} [tags]
 * @property {number} [views]
 * @property {number} [likes]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 */

/** @typedef {Object} Comment
 * @property {string} _id
 * @property {string} content
 * @property {Post|string} post
 * @property {User|string} user
 * @property {string} [createdAt]
 */

/** @typedef {Object} AuthCredentials
 * @property {string} email
 * @property {string} password
 */

/** @typedef {Object} RegisterPayload
 * @property {string} fullname
 * @property {string} email
 * @property {string} password
 */

/** @typedef {Object} ContactPayload
 * @property {string} name
 * @property {string} email
 * @property {string} message
 * @property {string} [subject]
 * @property {string} [type]
 */

export {};
