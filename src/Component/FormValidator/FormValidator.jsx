import passwordValidator from "password-validator"
var schema = new passwordValidator();
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                             // Must have uppercase letters
    .has().lowercase(1)                             // Must have lowercase letters
    .has().digits(1)                                // Must have at least 1 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

export default function FormValidator(event) {
    let { name, value } = event.target
    switch (name) {
        case "name":
        case "username":
        case "color":
        case "subject":
            if (value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 3 || value > 50)
                return name + " Length Must Be 3-50 Characters"
            else
                return ""

        case "subject":
            if (value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 3 || value > 200)
                return name + " Length Must Be 3-200 Characters"
            else
                return ""

        case "message":
            if (value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 10)
                return name + " Length Must Be More Then 10 Characters"
            else
                return ""

        case "email":
            if (value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 13 || value > 100)
                return name + " Length Must Be 13-100 Characters"
            else
                return ""

        case "password":
            if (value.length === 0)
                return name + " Field is Mendatory"
            else if (!(schema.validate(value)))
                return "Invalid Password. It Must Contains 8-100 character, atleast 1 digit, 1 upper case character, 1 lower case character"
            else
                return ""

        case "phone":
            if (value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length > 10 && value.length < 10)
                return name + " Length Must Be 10"
            else if (value.startsWith("6") || value.startsWith("7") || value.startsWith("8") || value.startsWith("9"))
                return ""
            else
                return "Invalid Phone Number"

        case "size":
            if (value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length > 10)
                return name + " Length Must Be Less Than 10 Characters"
            else
                return ""

        case "basePrice":
            if (value.length === 0)
                return name + " Field is Mendatory"
            else if (value < 1)
                return "Base Price Must be Greater than 0"
            else
                return ""

        case "discount":
            if (value.length === 0)
                return name + " Field is Mendatory"
            else if (value < 0 || value > 100)
                return "Discount Must Be 0-100"
            else
                return ""

        case "quantity":
            if (value.length === 0)
                return name + " Field is Mendatory"
            else if (value < 0)
                return "Base Price Must be Greater than or equal to 0"
            else
                return ""

        case "message":
            if (value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 50)
                return name + " Length Must Be Greater then or equal to 50 Characters"
            else
                return ""

        default:
            return ""
    }


}
