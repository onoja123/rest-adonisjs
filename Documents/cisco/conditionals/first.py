age = int(input("Enter age: "))

if age < 18:
    print("You are under 18")
elif age >=120:
    print("you are under 120")
else:
    print("not allowed")
    
food = input("Would you like food Y/N? : ")

if food == "Y":
    print("You like food")
else: 
    print("you dont like food")
    
name = input("Enter you name : ")

if name == "":
    print("Enter your name")
else:
    print(f"welcome {name}")