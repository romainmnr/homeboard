/******************************************
*             Homeboard Server
*          M-Dev - Romain Meunier
******************************************/
"use strict"; 

function getDevice (deviceId){
  return global._devices.find(e => e.id === deviceId) || {};
}


function evalDynValue (dynValue = {}){
  console.log('[EvalContext::evalDynValue]', dynValue);
  if(dynValue.type !== 'dynamicValue') return undefined
  if(!dynValue.script) return dynValue.default

  const devices = global._devices;
  let value = dynValue.default
  try {
    eval(dynValue.script)
  } catch (error) {
    console.error('[EvalContext::evalDynValue] Error', error);
    value = dynValue.default
  }
  return value
}

module.exports = {
  evalDynValue
}