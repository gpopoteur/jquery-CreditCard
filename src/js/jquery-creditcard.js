/*global jQuery*/

(function($) {
	'use strict';

	var getCardType = function (elem) {
		console.log(elem);
	};

	var CreditCardPlugin = function () {
		var self = this;

		self.on('change', getCardType);

		self.validate = function () {
			return $.CreditCard.validateCard(self.val());
		};

		return self;
	};

	if(!$.CreditCard){
		$.CreditCard = {};
	}

	// API
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

