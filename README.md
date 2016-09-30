# cssobj-plugin-replace

[![Build Status](https://travis-ci.org/cssobj/cssobj-plugin-replace.svg?branch=master)](https://travis-ci.org/cssobj/cssobj-plugin-replace)

[cssobj](https://github.com/cssobj/cssobj) plugin to replace object key/value pair with new value (Object, Array, Function etc.)

## Install

- npm

```shell
npm i cssobj-plugin-replace
```

Then

```javascript
var cssobj = require('cssobj')
var cssobj_plugin_replace = require('cssobj-plugin-replace')

cssobj(
  { p: {color: 'red'} },
  {
    plugins: [
      cssobj_plugin_replace({
        map:[
          // replace red with blue
          ['color', 'red', 'blue']
        ]
      })
    ]
  }
)

// result:
p { color: blue; }
```

## Quick Start

### **Replace simple value:**

Replace color `red` with `blue`

```javascript
cssobj_plugin_replace({
  map:[
    ['color', 'red', 'blue']
  ]
})

// { p:{color:'red'} } => p {color: blue;}
```

### **Replace value with array:**

```javascript
cssobj_plugin_replace({
  map:[
    ['font', '123', [1, 2, 3]]
  ]
})

// { p:{font:123} } => p { font:1; font:2; font:3; }
```

### **Replace value with object:**

```javascript
cssobj_plugin_replace({
  map:[
    ['font', 'heading', {fontFamily: 'Arial', fontSize: '24px', fontWeight: 'bold'}]
  ]
})

// { p:{font:'heading'} } => p { font-family: Arial; font-size: 24px; font-weight: bold; }
```

### **Replace value with array of object:**

```javascript
cssobj_plugin_replace({
  map:[
    ['display', 'flex', [{display:'-webkit-flex'}, {display:'flex'}]]
  ]
})

// { p:{display:'flex'} } => p { display: -webkit-flex; display: flex; }
```

### **Replace any key/value:**

Use **null** as placeholder for any key/value matched.

**null as value to match any value**

```javascript
cssobj_plugin_replace({
  map:[
    ['display', null, [{display:'-webkit-flex'}, {display:'flex'}]]
  ]
})

// { p:{display:1} } => p { display: -webkit-flex; display: flex; }
```

**null as key to match any key**
```javascript
cssobj_plugin_replace({
  map:[
    [null, 'red', [{display:'-webkit-flex'}, {display:'flex'}]]
  ]
})

// { p:{color:'red'} } => p { display: -webkit-flex; display: flex; }
```

### **Replace with function**

**newValue** can be function to dynamic calc the replacement.

```javascript
cssobj_plugin_replace({
  map:[
    [null, null, function(key, value){return value>0 ? {[key]: value+'px'} : {[key]:value} }]
  ]
})

// { p:{padding:1, margin:0} } => p { padding: 1px; margin:0; }
```

## Requirement

**cssobj version >= 0.5.2**

## License

MIT

