/*global jQuery*/

(function($) {
	'use strict';

	// Credit Card Input
	var $element = {};

	// onValid & onNotValid Callbacks
	var cbValid,
	cbNotValid;

	// Sting and String Length
	var str = "";
	var str_length = 0;

	var type;

	var cardTypes = [
	{
		type: 'amex',
		regex: [
		/^3[47][0-9]+$/
		],
		lengths: [15]
	},
	{
		type: 'visa',
		regex: [
		/^4[0-9]+/
		],
		lengths: [16]
	},
	{
		type: 'mastercard',
		regex: [
		/^5[1-5][0-9]+$/
		],
		lengths: [16]
	},
	];

	var setCreditCardType = function () {
		$element.addClass(type.type);

		if(cbValid !== undefined){
			if($.inArray(str_length, type.lengths) !== -1 && $.CreditCard.validateCard(str)){
				cbValid();
			}
		}
	};

	var removeCreditCardType = function () {
		$element.removeClass(type.type);

		if(cbNotValid !== undefined){
			cbNotValid();
		}
	};

	var getCardType = function () {

		// Get Input String
		str = $element.val();
		str_length = str.length;

		// Var definition
		var test_regex;

		if(type !== undefined){
			// Test for current type
			for (var k = 0; k < type.regex.length; k++) {
				test_regex = type.regex[k];
				if(test_regex.test(str)){
					return;
				}
			}

			// If doesn't match, find the type
			removeCreditCardType();
			type = undefined;
		}

		// Matchs array
		var result = [];

		for (var i = cardTypes.length - 1; i >= 0; i--) {
			for (var j = 0; j < cardTypes[i].regex.length; j++) {
				test_regex = cardTypes[i].regex[j];
				var match = test_regex.test(str);
				if(match){
					result.push(cardTypes[i]);
				}
			}
		}

		// If there's only one match
		// we have a winner
		if(result.length === 1){
			type = result[0];
			setCreditCardType();
		}
	};

	var CreditCardPlugin = function (onValid, onNotValid) {
		var self = this;
		$element = $(this);

		cbValid = onValid;
		cbNotValid = onNotValid;

		// Set the credit card class
		$element.addClass('credit-card');
		
		self.on('keyup', getCardType);

		self.validate = function () {
			return $.CreditCard.validateCard(self.val());
		};

		return self;
	};

	// API
	if(!$.CreditCard){
		$.CreditCard = {};
	}

	$.CreditCard.validateCard = function (str) {
		// str cannot be blank
		if(str === undefined || str === ''){
			return false;
		}

		// Remove dashes (if any)
		var card = str.replace(/-/g, ''),
		total = 0,
		num = 0;

		// Double every other digit to the right
		for (var i = 0; i < card.length; i += 2) {
			num = Number(card[i]) * 2;

			// Add the numbers to a total Sum.

			// If the number has multiple digits,
			// the digits need to be added seperately
			if(num > 9){
				var numStr = num.toString();
				for (var j = 0; j < numStr.length; j++) {
					total += Number(numStr.charAt(j));
				}
			}else{
				total += num;
			}
		}

		// To the previous total add the rest of the
		// digits on the card to the same total
		for (var k = 1; k < card.length; k += 2) {
			num = Number(card[k]);
			total += num;
		}

		// If the total is divisible by 10
		// the number is valid
		return (total % 10 === 0);
	};

	// jQuery Definition of the plugin
	$.fn.CreditCard = function () {
		return CreditCardPlugin.apply(this, Array.prototype.slice.call(arguments, 0));
	};

})(jQuery);