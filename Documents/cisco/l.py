veritas_uni = {
    "name": "vertitas uni abuja",
    "date" : 2007,
    "faculties": ["nas", "social sci", "health sci", "law", "busi admin"],
    "students": 1000,
    "dept": {
        "nas": ["cit", "chem", "soft engr", "bio chem"],
        "social sci": ["pol sci", "eco", "peace & con", "mass comm"]
    }
}


print(veritas_uni)

z = veritas_uni["students"]
print(z)

for i in veritas_uni["faculties"]:
    if i == "nas":
        print("exits")
        print(i)
        
        
x = veritas_uni.keys()
print(x)

veritas_uni["name"] = "veritas university bwari abuja".lower()
print(veritas_uni)


def np():
    x = 2
    y = 3
    z =6
    
    return x * y * z
print(np())