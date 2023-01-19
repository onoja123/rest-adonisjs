# colleting the first input of the user
one = float(input("Input first number: "))

# colleting the second input of the user
two = float(input("Input second number: "))

# colleting the thrid input of the user
three = float(input("Input third number: "))

# checking if the first input is greater than the second input
if one > two:
    if one < three:
        median = one
    elif two > three:
        median = two
    else: 
        median = three

else: 
    if one < three:
        median = one
    elif two < three:
        median = two
    else: 
        median = three
    
# print the median of the median of the input    
print("The median is ", median)