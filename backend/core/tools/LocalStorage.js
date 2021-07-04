/******************************************
*             Homeboard Server
*          M-Dev - Romain Meunier
******************************************/
"use strict"; 

const fs = require('fs')
const path = require('path')





/**
 * Create WLink folder
 */
function initFolder () {
  if (!fs.existsSync(LOCAL_FOLDER_PATH)) {
    fs.mkdirSync(LOCAL_FOLDER_PATH, {
      recursive: true
    })
  }
}


/**
 * Read and set persitent data from local file
 */
function readLocalStorage (done) {
  if (fs.existsSync(LOCAL_STORAGE_FILE)) {
    let buff
    try {
      buff = fs.readFileSync(LOCAL_STORAGE_FILE)
      global._persistentStorage = JSON.parse(buff)
      console.log('[LocalStorage::readLocalStorage] ok')
    } catch (error) {
      console.error(error)
    }
    done()

  }
}
/**
 * Write persistent data into local file
 */
const writeLocalFile = () => {
  try {
    fs.writeFileSync(LOCAL_STORAGE_FILE, JSON.stringify(global._persistentStorage, undefined, 2))
  } catch (error) {
    console.error('[LocalStorage::writeLocalFile]', error)
  }
}



/**
 * Get a persistent variable
 * @param {String} key - variable key
 */
const getPersistent = function (key) {
  return  global._persistentStorage[key]
}
/**
 * Set a persistent variable
 * @param {String} key - variable key
 * @param {*} value - variable value
 */
const setPersistent = function (key, value) {
  global._persistentStorage[key] = value
}







// -------------------------------------
// -- Initialization
// -------------------------------------
function init(done){

  global._persistentStorage = {}
  global.LOCAL_FOLDER_PATH = path.join(process.cwd(), 'localStorage')
  global.LOCAL_STORAGE_FILE = path.join(LOCAL_FOLDER_PATH, 'persistent.json')

  // init default folder
  initFolder()
  // read local file
  readLocalStorage(done)


}




module.exports = {
  init: init,
  get: getPersistent,
  set: setPersistent,
  read: readLocalStorage,
  store: writeLocalFile
}
