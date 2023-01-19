# making average a function and summing blist as defined in the avearge function name
def average(blist):
    return sum(blist) / len(blist)

# list of numnbers 
blist = [15, 9, 55, 41, 35, 20, 62, 49]

# setting the average to the list of numbers
average = average(blist)

#print the average of the values to the round of 2
print("Average of the list = ", round(average, 2) )
