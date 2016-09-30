// cssobj plugin replace
// map key/value into newValue, each array elem holds: [key, value, newValue]

function cssobj_plugin_replace (option) {
  option = option || {}

  var replaceMap = option.map || []

  return {
    value: function (value, key, node, result, propKey) {

      if(propKey!==undefined) return value

      // retVal hold all maps result
      var retVal = []

      // replace from prop+value, to mapped value
      for(var map, val, i = 0, len = replaceMap.length; i < len; i++) {

        map = replaceMap[i]
        val = map[2]

        // map[0] : prop, null as placeholder
        // map[1] : value, null as placeholder
        // map[2] : replacement, function(key, value){} || any
        if((map[0]===null || map[0]==key)
           && (map[1]===null || map[1]==value))

          retVal.push(
            typeof val=='function'
              ? val(key, value, node, result)
              : val
          )
      }

      // only accept replaced value, return original value as fallback
      return retVal.length ? retVal : value
    }
  }
}

export default cssobj_plugin_replace;