# simplator
[![Build Status](https://secure.travis-ci.org/parroit/simplator.png?branch=master)](http://travis-ci.org/parroit/simplator)  [![Npm module](https://badge.fury.io/js/simplator.png)](https://npmjs.org/package/simplator) [![Code Climate](https://codeclimate.com/github/parroit/simplator.png)](https://codeclimate.com/github/parroit/simplator)

Simple but powerful and fast template for node.js and browser.
Templates are compiled to javascript before execution.
Supports filters on rendered values.
See [simplator-subtemplates][] and [simplator-type-filters][] for filter examples.

[simplator-subtemplates]: https://github.com/parroit/simplator-subtemplates
[simplator-type-filters]: https://github.com/parroit/simplator-type-filters

## Getting Started
Install the module with: `npm install simplator --save`

```javascript

var fs =require("fs"),
    simplator = require("simplator"),

    template = simplator.compile("{first},{last}");

    results = template({
       first: "Andrea",
       last: "Parodi"
   });

```

Results will contains "Andrea,Parodi"


## Contributing
We welcome PR! We welcome issues, too.
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality.


## License
Copyright (c) 2013 parroit  
Licensed under the MIT license.
