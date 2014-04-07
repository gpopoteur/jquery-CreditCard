# jquery-CreditCard.js

Plugin to test an input for a valid credit card number. So far there's only one API to test if the number is valid.

## Instalation

Copy the folders that are inside the `build` folder, and include the CSS for  `jquery-creditcard.css` and JS `jquery-creditcard.min.js` tags inside your html.

## Usage

To use the plugin first call the method of the plugin `CreditCard` on a jQuery object, optionally you can pass two callbacks that will be called once the card is valid or not.

Note: before calling this callbacks some validations are made inside the plugin (check card length).

```
var $creditcard = $('#creditcard').CreditCard(onValidCard, onNotValidCard);

function onValidCard (cardType) {
    result.html('Credit Card Number seems to be <b>valid</b>! :)');
}

function onNotValidCard (cardType) {
    result.html('Credit Card Number seems to be <b>INVALID</b>! :(');
}
```

Anyway you could test the validity of the card calling the `validate` method of the object.

```
// Test for credit card validation
if($creditCard.validate()){
    // Is Valid :)
}else{
    // INVALID number :(
}
```

## API

```
$.CreditCard.validateCard(str)
```

The argument is the card number, returns true if valid, false is invalid. 

## License
MIT