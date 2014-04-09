var fs = require("fs")
	, jsdom = require("jsdom").jsdom
	, assert = require("assert")
	, should = require('should');

describe('jQuery Credit Card', function() {
	describe('Plugin', function () {
		var $;

		before(function(done) {
			jsdom.env({
			  html: __dirname + "/demo/index.html",
			  scripts: [
			  	"http://code.jquery.com/jquery-1.10.2.min.js", 
			  	"./../src/js/jquery-creditcard.js"
			  ],
			  done: function(err, window) { 
			   	$ = window.$;
			    done();
			  }
			});
		});

		it('should check if the credit card number could be real',function () {
			assert.equal(false, $.CreditCard.validateCard("12345")); // Should be false
			assert.equal(true, $.CreditCard.validateCard("4539907084504115")); // Should be true
		});		

		it('should identify the issuer company', function () {

			var cardType = $.CreditCard.getCardType("4539907084504115");
			cardType[0].type.should.eql("visa");
		
			cardType = $.CreditCard.getCardType("349983867736651");
			cardType[0].type.should.eql("amex");
		
			cardType = $.CreditCard.getCardType("5576388465905539");
			cardType[0].type.should.eql("mastercard");

		});

		it.skip('should identify the major industry', function () {

		});

		it.skip('should get the icon of the card type', function() {

		});
	});
});