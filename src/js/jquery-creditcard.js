/*global jQuery*/

(function($) {
	'use strict';

	var element = {};

	var type;

	var cardTypes = [
		{
			type: 'visa',
			regex: /^4/,
			img: '' 
		}
	];

	var setCreditCartType = function () {
		
	};

	var removeCreditCardType = function () {
		
	};

	var getCardType = function () {

		if(type !== undefined){
			// Test for current type
			if(type.regex.test(element.val())){
				return;
			}

			// If doesn't match, find the type
			type = undefined;
			removeCreditCardType();
		}

		// Matchs array
		var result = [];

		for (var i = cardTypes.length - 1; i >= 0; i--) {
			var match = cardTypes[i].regex.test(element.val());
			if(match){
				result.push(cardTypes[i]);
			}
		}

		// If there's only one match
		// we have a winner
		if(result.length === 1){
			type = result[0];
			setCreditCartType();
		}
	};

	var CreditCardPlugin = function () {
		var self = this;
		element = $(this);

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
		return CreditCardPlugin.apply(this, Array.prototype.slice.call(arguments, 1));
	};

})(jQuery);