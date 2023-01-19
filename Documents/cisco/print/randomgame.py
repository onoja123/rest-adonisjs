# importing the random library
import random

# setting one as the variable for the random numbers
one = random.randrange(1, 10)

# taking the input of the guess
guess = int(input("Enter a number"))

# checking if the random number genrated is not equal to the inputed guess
while one != guess:
    # checking if the inputed guess number is less than the random number genrated
    if guess < one:
        print("Too low")
        guess = int(input("Enter another number"))
    # checking if the inputed guess number is greater than the random number genrated
    elif guess > one:
        print("Too high")
        guess = int(input("Enter another number"))
    
    else:
        break
print("Your guess was right")