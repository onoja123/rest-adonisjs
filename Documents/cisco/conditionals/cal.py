#Select the operation either + / _ *
operator = input("Enter what you want to do (+ - * /) ")

# Take in the users first input
num1 = int(input("Enter a number : "))

# Take in the users second input
num2 = int(input("Enter another number : "))

#checks if the operation is plus(+)
if operator == "+":
    result = num1 + num2
    print(result)
#checks if the operation is minus(-)
elif operator == "-":
    result = num1 - num2
    print(result)
#checks if the operation is multiply(*)
elif operator == "*":
    result = num1 * num2
    print(result)
#checks if the operation is divide(/)
elif operator == "/":
    result = num1 / num2
    print(result)
# if users input for operation isnt part of the list 
else:
    print("operator not supported")