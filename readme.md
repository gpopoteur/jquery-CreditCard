# jquery-CreditCard.js

Plugin to test an input for a valid credit card number. So far there's only one API to test if the number is valid.

## Usage

```
var CreditCard = $('#credit-card').CreditCard();

// Test for credit card validation
if(CreditCard.validate()){
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