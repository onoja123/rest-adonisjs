noun1 = float(input("Enter a noun: "))
noun2 = input("Enter another noun: ")
adjective = input("Enter an adjective: ")
verb = input("Enter a verb: ")

print(f"Once there lived a {noun1}.")
print(f"While walking on the road, he/she saw a {adjective} {noun2},")
print(f"but the {noun2} was not {adjective}, it {verb}ed on {noun1}")


length = float(input("Enter the length of object: "))
breadth = float(input("Enter the breadth of object: "))

sol = length * breadth

print(f"The area is: {sol} ")


item = input("Enter the item you wish to buy: ")
price = float(input("Enter the price of the item: "))
quantity = float(input("Enter the quantity of the item: "))

total = price * quantity

print(f"You have bought {quantity} x {item}/s")

print(f" Your total is: {total}")