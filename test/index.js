var assert = require("assert");
var expect = require("expect.js");



function baseTest(format){
    it("Named arguments are replaced", function () {
        var result = format("Hello {name}, how are you?", { name: "Mark" });
        expect(result).to.be.equal("Hello Mark, how are you?");

    });

    it("Named arguments at the start of strings are replaced",
        function () {
            var result = format("{likes} people have liked this", {
                likes: 123
            });

            expect(result).to.be.equal("123 people have liked this");

        });

    it("Named arguments at the end of string are replaced",
        function () {
            var result = format("Please respond by {date}", {
                date: "01/01/2015"
            });

            expect(result).to.be.equal("Please respond by 01/01/2015");

        });

    it("Multiple named arguments are replaced", function () {
        var result = format("Hello {name}, you have {emails} new messages", {
            name: "Anna",
            emails: 5
        });

        expect(result).to.be.equal("Hello Anna, you have 5 new messages");

    });

    it("Missing named arguments become 0 characters", function () {
        var result = format("Hello{name}, how are you?", {});
        expect(result).to.be.equal("Hello, how are you?");

    });

    it("Named arguments can be escaped", function () {
        var result = format("Hello {{name}}, how are you?", { name: "Mark" });
        expect(result).to.be.equal("Hello {name}, how are you?");

    });

    it("Array arguments are replaced", function () {
        var result = format("Hello {0}, how are you?", ["Mark"]);
        expect(result).to.be.equal("Hello Mark, how are you?");

    });

    it("Array arguments at the start of strings are replaced",
        function () {
            var result = format("{0} people have liked this", [123]);

            expect(result).to.be.equal("123 people have liked this");

        });

    it("Array arguments at the end of string are replaced",
        function () {
            var result = format("Please respond by {0}", ["01/01/2015"]);

            expect(result).to.be.equal("Please respond by 01/01/2015");

        });

    it("Multiple array arguments are replaced", function () {
        var result = format("Hello {0}, you have {1} new messages", [
            "Anna",
            5
        ]);

        expect(result).to.be.equal("Hello Anna, you have 5 new messages");

    });

    it("Missing array arguments become 0 characters", function () {
        var result = format("Hello{0}, how are you?", []);
        expect(result).to.be.equal("Hello, how are you?");

    });

    it("Array arguments can be escaped", function () {
        var result = format("Hello {{0}}, how are you?", ["Mark"]);
        expect(result).to.be.equal("Hello {0}, how are you?");

    });
/*
    it("Array keys are not accessible", function () {
        var result = format("Function{splice}", []);
        expect(result).to.be.equal("Function");

    });*/

    it("Listed arguments are replaced", function () {
        var result = format("Hello {0}, how are you?", "Mark");
        expect(result).to.be.equal("Hello Mark, how are you?");

    });

    it("Listed arguments at the start of strings are replaced",
        function () {
            var result = format("{0} people have liked this", 123);

            expect(result).to.be.equal("123 people have liked this");

        });

    it("Listed arguments at the end of string are replaced",
        function () {
            var result = format("Please respond by {0}", "01/01/2015");

            expect(result).to.be.equal("Please respond by 01/01/2015");

        });

    it("Multiple listed arguments are replaced", function () {
        var result = format("Hello {0}, you have {1} new messages",
            "Anna",
            5);

        expect(result).to.be.equal("Hello Anna, you have 5 new messages");

    });

    it("Missing listed arguments become 0 characters", function () {
        var result = format("Hello{1}, how are you?", "no");
        expect(result).to.be.equal("Hello, how are you?");

    });

    it("Listed arguments can be escaped", function () {
        var result = format("Hello {{0}}, how are you?", "Mark");
        expect(result).to.be.equal("Hello {0}, how are you?");

    });

    it("Allow null data", function () {
        var result = format("Hello{0}", null);
        expect(result).to.be.equal("Hello");

    });

    it("Allow undefined data", function () {
        var result1 = format("Hello{0}");
        var result2 = format("Hello{0}", undefined);
        expect(result1).to.be.equal( "Hello");
        expect(result2).to.be.equal( "Hello");

    });

    it("Null keys become 0 characters", function () {
        var result1 = format("Hello{name}", { name: null });
        var result2 = format("Hello{0}", [null]);
        var result3 = format("Hello{0}{1}{2}", null, null, null);
        expect(result1).to.be.equal( "Hello");
        expect(result2).to.be.equal( "Hello");
        expect(result3).to.be.equal( "Hello");

    });

    it("Undefined keys become 0 characters", function () {
        var result1 = format("Hello{firstName}{lastName}", { name: undefined });
        var result2 = format("Hello{0}{1}", [undefined]);
        var result3 = format("Hello{0}{1}{2}", undefined, undefined);
        expect(result1).to.be.equal( "Hello");
        expect(result2).to.be.equal( "Hello");
        expect(result3).to.be.equal( "Hello");

    });

    describe("filter",function(){
        it("could be registered", function () {
            simplate.filter("upper",function(value){return value.toUpperCase()});

        });



        it("is applied to argument", function () {
            var result = format("Hello {name | upper}", {name:"andrea"});
            expect(result).to.be.equal( "Hello ANDREA");
        });

        it("could be trimmed", function () {
            var result = format("Hello {name|upper}", {name:"andrea"});
            expect(result).to.be.equal( "Hello ANDREA");
        });

        it("accept argument", function () {
            simplate.filter("fix",function(value,digits){return value.toFixed(digits)});

            expect(format("Hello {age | fix(0)}", {age:12})).to.be.equal( "Hello 12");
            expect(format("Hello {age | fix(2)}", {age:12})).to.be.equal( "Hello 12.00");
        });

        it("accept multiple argument", function () {
            simplate.filter("curr",function(value,digits,curr){return (curr ? "$" : "")+value.toFixed(digits)});

            expect(format("Hello {age | curr(2,true)}", {age:12})).to.be.equal( "Hello $12.00");
            expect(format("Hello {age | curr(2,false)}", {age:12})).to.be.equal( "Hello 12.00");
        });

        it("accept all character", function () {
            simplate.filter("concat",function(value,concat){return value + concat});

            function checkChar(c){
                expect(format("Hello {v | concat('"+c+"')}", {v:"c"})).to.be.equal( "Hello c"+c);
            }

            checkChar("/");
            checkChar("\\");
            checkChar("\"");
            checkChar("$");
            checkChar("£");
            checkChar("1");
            checkChar("a");
            checkChar("(");
            checkChar(")");
            checkChar("=");
            checkChar("?");
            checkChar("^");
            checkChar("*");
            checkChar("+");
            checkChar("§");
            checkChar("@");
            checkChar("°");
            checkChar("#");
            checkChar("ç");
            checkChar(",");
            checkChar(".");
            checkChar(";");
            checkChar(":");
            checkChar("_");
            checkChar("-");
            checkChar("<");
            checkChar(">");
            checkChar("€");

        });
    });





}

var simplate = require("../index.js");


describe("compile and render",function(){
    baseTest(function(format){
        var tmplt=simplate.compile(format);
        //console.log(tmplt.toString());
        var args = [].slice.call(arguments, 1);

        return tmplt.apply(null, args);
    });
});

describe("run big",function(){
    var bigTemplate = [];
    var bigExpected = [];
    var ctx = { firstName: "Andrea", lastName: "Parodi"};
    var tmplt;

    before(function(){
        var tmpl = "Hello {firstName} {lastName}";
        var expected = "Hello Andrea Parodi";




        for (var i=0; i<100000; i++){
            bigTemplate.push(tmpl);
            bigExpected.push(expected);
        }

        bigExpected =  bigExpected.join("\n");
        bigTemplate =  bigTemplate.join("\n");

        tmplt=simplate.compile(bigTemplate);
    });

    it("compile and render", function () {



        expect(tmplt(ctx)).to.be.equal(bigExpected);


    });



});

it("compile and render run fast", function () {

    var tmplt=simplate.compile("Hello {firstName} {lastName}");
    var expected = "Hello Andrea Parodi";
    var ctx = { firstName: "Andrea", lastName: "Parodi"};



    for (var i=0; i<1000000; i++){
        if (tmplt(ctx) !== expected)
            expect(true).to.be.equal(false);

    }



});



describe("compiler",function(){
    function expectRenderedAs(template,result){
        expect(simplate.compile(template).toString()).to.be.equal('function (){var context = simplate._getArgs(arguments); return ["'+result+'"].join("");}');
    }
    var compiled = simplate.compile("ciao");
    it("return a function",function(){
        expect(compiled).to.be.a('function');
    });
    it("return a function returning template",function(){
        expect(compiled.toString()).to.be.equal('function (){var context = simplate._getArgs(arguments); return ["ciao"].join("");}');
    });
    it("quote string",function(){
        expectRenderedAs("ciao\"","ciao\\\"");

    });

    it("quote NL",function(){
        expectRenderedAs("ciao\n","ciao\\n");

    });
    it("quote CR",function(){
        expectRenderedAs("ciao\r","ciao\\r");

    });

    it("quote tab",function(){
        expectRenderedAs("ciao\r","ciao\\r");

    });

    it("quote multiple",function(){
        expectRenderedAs("ciao\n\r\tsalve","ciao\\n\\r\\tsalve");

    });


    it("replace named arguments",function(){
        expectRenderedAs("ciao {mondo}, salve","ciao \" , ((context && context.mondo) || \"\") , \", salve");

    });

    it("replace indexed arguments",function(){
        expectRenderedAs("ciao {0}, salve","ciao \" , ((context && context[0]) || \"\") , \", salve");

    });
});