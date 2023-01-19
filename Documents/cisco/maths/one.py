# friends = 0

# friends = friends + 1

# print(friends)


# y = 4
# x = 5
# z = 6
# #y = pow(y, 2)

# y = abs(y)

# result = max(x, y, z)
# result = min(x, y, z)

# print(result)
# print(y )

import math

# print(math.pi)

# e = 6.1
# tot = math.sqrt(e)
# tot = math.ceil(e)
# print(tot)


radius = float(input("enter radius : "))
tot = 2 * math.pi * radius
tot = math.ceil(tot)
print(f" your answer is {tot} ")

p =  float(input("enter p : "))
d =  float(input("enter d : "))

t = math.sqrt(pow(p, 2) + pow(d, 2))

print(f"Side C  = {t}")