# priting the name of operation that will be performed
print("Class captain random")

# setting num_of_stud as the variable to get the input of students
num_of_stud = int(input("Enter the number of students "))

# storing the students name in an array
stud_nam = []

# a loop to check the range of students inputed
for x in range(num_of_stud):
    name = str(input("Enter your name "))
    stud_nam.append(name)
for y in stud_nam:
    print(y)

#print the final result with the index of 0 of the student name list array 
print(stud_nam[0], str("is the class captain "))