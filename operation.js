/**
 * Created by behtarin on 3/30/15.
 */
var startOver = true;
var operator = "+";
var leftOperand=0, rightOperand=0;
var shouldTakeRightOperand = false;

var numClicked = function(button){
    if (startOver)
    {
        clearTextBox();
        startOver = false;
    }
    appendTextBox(button.innerHTML);
}
var changeButtonColor = function(button){
    var buttons = document.getElementsByTagName('button');
    for (var i = 0; i< buttons.length; i++)
    {
        buttons[i].className = "unclickedButton";
    }
    button.className = "clickedButton";
}
var operatorClicked = function(button){

    var textBoxString = getTextBoxString();

    if(isNaN(textBoxString))
    {
        if(shouldTakeRightOperand)
            rightOperand=0;
        else
            leftOperand=0;
    }
    else
    {
        if (shouldTakeRightOperand)
        {
            rightOperand = textBoxString;
            equalClicked();
            leftOperand = getTextBoxString();
        }

        else
        {
            leftOperand = textBoxString;
        }
    }

    changeButtonColor(button);


    operator = button.innerHTML;
    startOver = true;
    shouldTakeRightOperand = true;

}
var clearTextBox = function(){
    document.getElementById("textBox").value = "";
}
var appendTextBox = function(text){
    var textBoxString = document.getElementById("textBox").value;
    document.getElementById("textBox").value = textBoxString + text;
}

var operate = function(left,right){
    switch(operator){
        case "+": return left+ right;
        case "-": return left-right;
        case "*": return left* right;
        case "/": return left/right;
    }
}
function writeOnTextBox(textBoxString) {
    document.getElementById("textBox").value = textBoxString;
}
function containsDot(textBoxString) {
    return (textBoxString.indexOf(".") >= 0);
}
var dotClicked = function(){
    var textBoxString = getTextBoxString();
    if(startOver || textBoxString=="")
        textBoxString = "0.";
    else if (!containsDot(textBoxString))
        textBoxString=textBoxString+".";
    else
        return;

    writeOnTextBox(textBoxString);

    startOver= false;
};
function getTextBoxString() {
    var textBoxString = document.getElementById("textBox").value;
    return textBoxString;
}
var equalClicked = function(){
    var textBoxString = getTextBoxString();
    if(!isNaN(textBoxString))
    {
        if (shouldTakeRightOperand)
            rightOperand = textBoxString;
        else
             leftOperand = textBoxString;
    }
    else
        rightOperand =0;

    var result =0.0;
    result = operate(parseFloat(leftOperand),parseFloat(rightOperand));

    if(isNaN(result)){
        result = "Error!";
    }
    writeOnTextBox(result)
    startOver= true;
    leftOperand =0;
    shouldTakeRightOperand= false;
};
var cancelOperatorClicked = function(){

    writeOnTextBox("0");

    shouldTakeRightOperand= false;
    leftOperand= 0;
    rightOperand=0;

    startOver= true;
}
var zeroClicked = function(){

    var textBoxString = getTextBoxString();
    if(startOver || textBoxString=="")
    {
        textBoxString= "0";
        startOver= true;
    }
    else
        textBoxString= textBoxString+"0";

    writeOnTextBox(textBoxString);

};
var specialButtonClicked = function(button){
    var value = button.innerHTML;
    switch (value){
        case ".":
            //Special number
            dotClicked();
            break;
        case "=":
            equalClicked();
            changeButtonColor(button);
            break;
        case "C":
            cancelOperatorClicked();
            break;
        case "0":
            zeroClicked();
            break;
        case "+":
            operatorClicked(button);
            break;

    }
};