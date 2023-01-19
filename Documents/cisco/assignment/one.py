# # # fst =dict()

# # # for k in range(1,20):
# # #     fst[k]=k **2
    
# # # print(fst)  

# # # colleting the first input of the user
# # first = float(input("Input first number: "))

# # # colleting the second input of the user
# # snd = float(input("Input second number: "))

# # # colleting the thrid input of the user
# # thrd = float(input("Input third number: "))

# # # checking if the first input is greater than the second input
# # if first > snd:
# #     if first < thrd:
# #         median = first
# #     elif snd > thrd:
# #         median = snd
# #     else: 
# #         median = thrd

# # else: 
# #     if first < thrd:
# #         median = first
# #     elif snd < thrd:
# #         median = snd
# #     else: 
# #         median = thrd
    
# # # print the median of the median of the input    
# # print("The median is ", median)









# # making average a function and summing list_all as defined in the avearge function name
# def average(list_all):
#     return sum(list_all) / len(list_all)

# # list of numnbers 
# list_all = [15, 9, 55, 41, 35, 20, 62, 49]

# # setting the average to the list of numbers
# average = average(list_all)

# #print the average of the values to the round of 2
# print("Average of the list = ", round(average, 2) )















# creating a function nnamed list_all and defining val into it

def list_all (val):
    val["math"] = [a+1 for a in val["math"]]   
    val["physics"] = [a+2 for a in val["physics"]]   
    return val 

# list of the val of the various subjects
val = {
    "math": [88, 89, 90],
    "physics": [92, 94, 89],
    "chemistry": [90, 87, 93]
} 


print("Original val")

print(val)

print("Update the list of the said val")

print(list_all(val))

















