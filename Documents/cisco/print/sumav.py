# priting the name of the operation that will be performed
print("Input some numbers to calculate their sum and average ")

# setting count as a variable of 0
count = 0

# setting num_sum as a variable of 0.0
num_sum = 0.0

# setting num as a variable of 1
num = 1

# checking if num is not equal to o
while num != 0:
    num = int(input("please enter students scores: "))
    num_sum = num_sum + num_sum
    count +=1

# checking if count equal to 0
if count == 0:
    print("input a number")
else: 
    print("average and sum of the above numbers are: ", num_sum / (count - 1), num_sum)