
const pageObject = {
  "id" : String,
  "name"    : String,
  "icon"    : String,
  "tiles"   : [tileObject],
};

const tileObject = {
  "id"              : String,
  "size"            : Number,// 1- 3

  "title"           : String|DynamicValue,
  "subtitle"        : String|DynamicValue,

  "iconType"        : String,// 'icon' or 'raw'
  "iconColor"       : String|DynamicValue,// 
  "iconContent"     : String|DynamicValue,// fa-home or a value,
  "isIconClickable" : Boolean,
  "iconAction"      : Action,

  "settingIcon"     : String,
  "settingPanelType": String, // Type ID of setting panel to open 

  "contentType"     : String, // controlValue, doubleTile, btnList, slider, controlNumber
  "contentConfig"   : controlValueConfig|btnList|slider|controlNumber|doubleTile
};

const controlValueConfig = {
  "values" : [
    {
      "value" : String|DynamicValue, 
      "unit"  : String|DynamicValue
    }
  ]
}
const btnList = {
  "compact" : Boolean, 
  "buttons" : [
    {
      "color"   : String|DynamicValue, 
      "icon"    : String|DynamicValue, 
      "label"   : String|DynamicValue, 
      "onClick" : Action
    }
  ]
}
const slider = {
  "value" : String|DynamicValue,
  "lazy": Boolean,
  "onChange" : Action
}
const controlNumber = {
  "value" : String|DynamicValue,
  "granularity": Number,
  "onChange" : Action
}
const doubleTile = {
  "title"           : String|DynamicValue,
  "subtitle"        : String|DynamicValue,
  "iconType"        : String,// 'icon' or 'raw'
  "iconColor"       : String|DynamicValue,// 
  "iconContent"     : String|DynamicValue,// fa-home or a value,
  "isIconClickable" : Boolean,
  "iconAction"      : Action,
  "settingIcon"     : String,
  "settingPanelType": String, // Type ID of setting panel to open   
}






const DynamicValue = {
  "type": 'dynamicValue',
  "default": String|Number|Boolean,
  "script"  : String, // JS script evaluate (variables: tile, page, devices) - expect return statement 
};

const actionObject = {
  'type': 'action',
  "script": String, // JS Script evaluate (variables: tile, page, devices)
};



// devices should extend to this type
// DeviceObject()
// uid     : String,// Unique ID
// name    : String,
// config  : Object,// { http:{protocol, host, port, headers}, free object}
// variables  : Object,// free object
// http: HttpAgent(config.http)
//-- getVar()
//-- setVar()
//-- getConfig([key])
//-- setConfig([key], value)
const device = {
  id: String,
  moduleName: String, // 
  config: Object



}