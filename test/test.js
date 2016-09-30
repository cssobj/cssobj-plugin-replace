var core = require('../../cssobj-core')
var expect = require('chai').expect
var util = require('util')
var cssobj_plugin_gencss = require('../../cssobj-plugin-gencss')
var cssobj_plugin_replace = require('../dist/cssobj-plugin-replace.cjs.js')

function setup (obj, arr) {
  return core({
    plugins: [
      cssobj_plugin_replace({map: arr}),
      cssobj_plugin_gencss({indent: ''})
    ]
  })(obj)
}

describe('test cssobj-plugin-map', function () {
  it('should map single key/value pare', function () {
    var ret = setup(
      // obj
      {
        p: {
          font: '123',
          color: 'red',
          display: 'flex'
        }
      },
      // replacement array
      [
        [
          'font',
          '123',
          [{font: [1,2]}, 3]
        ],
        [
          'display',
          'flex',
          [
            {
              display: '-webkit-box'
            }, {
              display: '-moz-box'
            }, {
              display: '-ms-flexbox',
              '-ms-flex-preferred-size': 'initial' // IE10
            }, {
              display: '-webkit-flex'
            }, {
              display: 'flex'
            }
          ]
        ],
      ]
    )

    expect(ret.css).equal(
      `p {
font: 1;
font: 2;
font: 3;
color: red;
display: -webkit-box;
display: -moz-box;
display: -ms-flexbox;
display: -webkit-flex;
display: flex;
-ms-flex-preferred-size: initial;
}
`)
  })

  it('should match with null placeholder', function() {
    var ret = setup(
      {
        p:{color:1, font:2}
      },
      [
        [null, null, {zoom:1}]
      ]
    )

    expect(ret.css).equal(`p {
zoom: 1;
zoom: 1;
}
`)
  })

  it('should use function as newVal', function() {
    var ret = setup(
      {
        p:{color:1, font:2}
      },
      [
        // only add color, with zoom:1
        [null,null, function(key, value){return key=='color'? {[key]:value, zoom:1} : {[key]:value}}]
      ]
    )

    expect(ret.css).equal(`p {
color: 1;
zoom: 1;
font: 2;
}
`)
  })
})
