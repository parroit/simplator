var nargs = /\{([0-9a-zA-Z]+)\}/g;
var slice = Array.prototype.slice;

//noinspection JSUnusedGlobalSymbols
var simplate = module.exports = {

    compile: function (template) {
        template = template
                .replace(/"/g,"\\\"")
                .replace(/([\t])/g,"\\t")
                .replace(/([\r])/g,"\\r")
                .replace(/([\n])/g,"\\n");

        template = template.replace(nargs, function (match, arg, index) {


            if (template[index - 1] === "{" &&
                template[index + match.length] === "}") {
                return arg
            } else {

                if (/[a-zA-Z]+/.test(arg))
                    return "\" , ((context && context."+ arg+") || \"\") , \"";
                else if (/[0-9]+/.test(arg))
                    return "\" , ((context && context["+ arg+"]) || \"\") , \"";
                else
                    throw new Error("Unknown argument "+arg);


            }
        });
        var util = require('util');


        var code = "(function(){var context = simplate._getArgs(arguments); return [\"" + template + "\"].join(\"\");})";

        return eval(code);
    },
    _getArgs: function (args){

        if (args.length === 1 && typeof args[0] === "object") {
            return  args[0];
        } else {
            return args;
        }

    },
    render: function (string) {
        var args;

        if (arguments.length === 2 && typeof arguments[1] === "object") {
            args = arguments[1]
        } else {
            args = slice.call(arguments, 1)
        }

        if (!args || !args.hasOwnProperty) {
            args = {}
        }

        return string.replace(nargs, function replaceArg(match, i, index) {
            var result;

            if (string[index - 1] === "{" &&
                string[index + match.length] === "}") {
                return i
            } else {
                result = args.hasOwnProperty(i) ? args[i] : null;
                if (result === null || result === undefined) {
                    return ""
                }

                return result
            }
        })
    }
};



