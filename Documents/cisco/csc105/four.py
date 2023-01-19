# creating a function nnamed lipo and defining dict into it

def lipo (dict):
    dict["math"] = [a+1 for a in dict["math"]]   
    dict["physics"] = [a+2 for a in dict["physics"]]   
    return dict 

# list of the dict of the various subjects
dict = {
    "math": [88, 89, 90],
    "physics": [92, 94, 89],
    "chemistry": [90, 87, 93]
} 


print("Original dict")

print(dict)

print("Update the list of the said dict")

print(lipo(dict))