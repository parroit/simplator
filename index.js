var nargs = /\{([\s\w\(\)|\.,#\-%\[\]]+)\}/g;
var slice = Array.prototype.slice;

var filters = {};

//noinspection JSUnusedGlobalSymbols
var simplate = module.exports = {
    filter: function (name, it) {
        filters[name] = it;
    },
    compile: function (template) {
        template = template
            .replace(/"/g, "\\\"")
            .replace(/([\t])/g, "\\t")
            .replace(/([\r])/g, "\\r")
            .replace(/([\n])/g, "\\n");

        template = template.replace(nargs, function (match, arg, index) {


            if (template[index - 1] === "{" &&
                template[index + match.length] === "}") {
                return arg
            } else {
                var callIt;

                function objectCall(args) {
                    if (/^[\s*a-zA-Z]+/.test(args)) {
                        return "context." + args;
                    }

                    if (/^[\s*0-9]+/.test(args)) {
                        return  "context[" + args + "]";
                    }

                    throw new Error("Unknown argument " + args);


                }

                if (arg.indexOf("|") != -1) {
                    var parts = arg.split("|", 2).map(function (it) {
                            return it.trim()
                        }),

                        argument = parts[0],
                        filter = parts[1],

                        filterName,
                        filterArgument;


                    if (filter.indexOf("(") != -1){

                        filterName = filter.match(/^(\w*)\(/)[1];
                        filterArgument = "," + filter.match(/^\w*\((.*)\)/)[1] ;

                    } else {
                        filterName = filter;
                        filterArgument = "";
                    }


                    callIt = "filters." + filterName + "(" + objectCall(argument) + filterArgument + ")";
                    console.log(callIt)
                } else {
                    callIt = objectCall(arg);
                }

                return "\" , ((context && " + callIt + ") || \"\") , \"";


            }
        });
        var util = require('util');


        var code = "(function(){var context = simplate._getArgs(arguments); return [\"" + template + "\"].join(\"\");})";

        return eval(code);
    },
    _getArgs: function (args) {

        if (args.length === 1 && typeof args[0] === "object") {
            return  args[0];
        } else {
            return args;
        }

    }
};



