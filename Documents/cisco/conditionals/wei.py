weight = float(input("Enter your weight : "))
unit = input("Kilogram or Pounds? (K / L ): " )

if unit == "K":
    weight = weight * 256
    unit = "lbs"
elif unit == "L":
    weight = weight * 334
    unit = "kgs"
else:
    print("Invalid unit")
    
print(f"your weight is {weight} {unit}")