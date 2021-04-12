var lengthField = document.getElementById("length");
var errorMessage = document.getElementById("error");
var emptyOptionsError = document.getElementById("emptyOptions");
var lowerCaseCheckbox = document.getElementById("lowercase");
var upperCaseCheckbox = document.getElementById("uppercase");
var numbersCheckbox = document.getElementById("numbers");
var symbolsCheckbox = document.getElementById("symbols");
var generateButton = document.getElementById("generate");
var textArea = document.getElementById("password");

// Validate the length of the password
function validateLength() {
    let length = lengthField.value;
    let min = Number(lengthField.getAttribute("min"));
    let max = Number(lengthField.getAttribute("max"))
    if (length < min || length > max) {
        errorMessage.innerText = "Please enter a number from 8 to 128"
        return false;
    } else {
        errorMessage.innerText = "";
        return true;
    }

}

// Validate the checkboxes selection
function validateOptions() {
    let includeLowercase = lowerCaseCheckbox.checked;
    let includeUpperCase = upperCaseCheckbox.checked;
    let includeNumbers = numbersCheckbox.checked;
    let includeSymbols = symbolsCheckbox.checked;
    if (!includeLowercase && !includeUpperCase && !includeNumbers && !includeSymbols) {
        emptyOptionsError.innerText = "Please select at least one option"
        return false;
    } else {
        emptyOptionsError.innerText = "";
        return true;
    }
}

// Disable or enable button based on user input
function updateButton() {
    generateButton.disabled = !validateOptions() || !validateLength();
}

// Fill array with values to generate a password
let arrayofValues = (start, end) => {
    const array = [];
    for (let i = start; i <= end; i++) {
        array.push(i);
    }
    return array;
};

// Create arrays with the respective char codes
const UPPERCASE = arrayofValues(65, 90);
const LOWERCASE = arrayofValues(97, 122);
const NUMBERS = arrayofValues(48, 57);
const SYMBOLS = arrayofValues(33, 47)
    .concat(arrayofValues(58, 64))
    .concat(arrayofValues(91, 96))
    .concat(arrayofValues(123, 126));


// Perform actions on Generate button click
function writePassword() {
    let length = lengthField.value;

    let includeLowercase = lowerCaseCheckbox.checked;
    let includeUpperCase = upperCaseCheckbox.checked;
    let includeNumbers = numbersCheckbox.checked;
    let includeSymbols = symbolsCheckbox.checked;

    const password = generatePassword(
        length,
        includeLowercase,
        includeUpperCase,
        includeNumbers,
        includeSymbols
    );

    textArea.value = password;
};

// Generate password
function generatePassword(length, includeLowerCase, includeUpperCase, includeNumbers, includeSymbols) {
    let charCodes = [];
    if (includeLowerCase) {
        charCodes = charCodes.concat(LOWERCASE);
    }

    if (includeUpperCase) {
        charCodes = charCodes.concat(UPPERCASE);
    }

    if (includeSymbols) {
        charCodes = charCodes.concat(SYMBOLS);
    }

    if (includeNumbers) {
        charCodes = charCodes.concat(NUMBERS);
    }

    const passwordCharacters = [];
    for (let i = 0; i < length; i++) {
        const characterCode =
            charCodes[Math.floor(Math.random() * charCodes.length)];
        passwordCharacters.push(String.fromCharCode(characterCode));
    }

    return passwordCharacters.join('');
}