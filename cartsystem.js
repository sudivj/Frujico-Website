var drinks = [
    // Exotic products
    {name: "King Coconut Drink", price: 400},
    {name: "Karavila Drink", price: 400},
    {name: "Tamarind Drink", price: 400},
    {name: "Veralu Drink", price: 400},
    {name: "Palm Drink", price: 400},
    {name: "Sugar Cane Drink", price: 400},
    // Classics
    {name: "Apple Drink", price: 300},
    {name: "Mango Drink", price: 300},
    {name: "Orange Drink", price: 300},
    {name: "Mandarin Drink", price: 300},
    {name: "Guava Drink", price: 300},
    {name: "Papaya Drink", price: 300},
    {name: "Watermelon Drink", price: 300},
    {name: "Pine Apple Drink", price: 300},
    {name: "Grape Drink", price: 300},
    // Delights
    {name: "Black Current", price: 600},
    {name: "Pomegranate Drink", price: 600},
    {name: "Kiwi Drink", price: 600},
    {name: "Rambutan Drink", price: 600},
    {name: "Rasberry Drink", price: 600}
];

var cart = [];
var itemQuantity = [];
var added = [];
for (i in drinks)
{
    added[i] = "Add to cart";
    console.log(added[i]);
}

var minQuantity = 1;
var maxQuantity = 100;

var target;

/* Show And Hide OnClick */
var toggle = 0;
function showOrHide()
{
    var cardBodyID = document.getElementById('cardbody');
    if (cardBodyID.style.display === "none") {
        cardBodyID.style.display = "block";
    } else {
        cardBodyID.style.display = "none";
    }
}

/* Add Or Remove From Cart */
function addOrRemove(_Index)
{
    var _nameIndex = _Index - 1;

    target = document.getElementById(_nameIndex + 1).children;

    if (added[_nameIndex] === "Add to cart") {
        added[_nameIndex] = "Remove from cart";
        cart.push(drinks[_nameIndex].name);
        itemQuantity.push(checkValidity(target[1].value));
        target[0].innerText = added[_nameIndex];

        print();
    } else if (cart.includes(drinks[_nameIndex].name)) {
        added[_nameIndex] = "Add to cart";
        var delIndex = cart.indexOf(drinks[_nameIndex].name);
        cart.splice(delIndex, 1);
        itemQuantity.splice(delIndex, 1);
        target[0].innerText = added[_nameIndex];

        print();
    }
}

/* Quantity Validity */
function checkValidity(_quantity)
{
    if (_quantity > maxQuantity) {
        alert("We only provide maximum quantity of " + maxQuantity + ".");
        target[1].value = maxQuantity;

        return maxQuantity;
    } else if (_quantity < minQuantity) {
        alert("INVALID! A negative quantity.")
        target[1].value = minQuantity;

        return minQuantity;
    } else {

        return _quantity;
    }
}

/* Print The Data To The Cart */
function print()
{
    var textarea = document.getElementById('cart');
    var maxLeng = getMaxLength() + 2;

    textarea.innerText = "";

    for (i in cart)
    {
        var index = drinks.map(function(o) { return o.name; }).indexOf(cart[i]);
        var tmp_len = maxLeng - cart[i].length;
        var q = itemQuantity[i];
        var price = drinks[index].price * q;

        //Display               Item       |    *Text padding*                                                                            |Quantity|  *Text Padding*                                |Price  |Currency      |
        textarea.textContent += cart[i] + "|" + " ".repeat(tmp_len) +"q:" + " ".repeat(maxQuantity.toString().length - q.toString().length) + q + "|" +  " ".repeat(6 - (price.toString().length)) + price + " Rs/=" + "\n";
    }
}

/* Get Length Of Longest Name*/
function getMaxLength()
{
    var tmp_len = 0;
    
    for (i in cart)
    {
        if (tmp_len < cart[i].length) {
            tmp_len = cart[i].length;
        }
    }
    return tmp_len;
}

/* Clear The Cart */

function clearCart()
{
    cart = [];
    itemQuantity = [];
    for (i in drinks)
    {
        added[i] = "Add to cart";
        if (document.getElementById(i) != null) {
            var t = document.getElementById(i).children;
            t[0].innerText = added[i];
        }
    }
    print();
}