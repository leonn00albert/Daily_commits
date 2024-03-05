#  There's a staircase with N steps, and you can climb 1 or 2 steps at a time.
# Given N, write a function that returns the number of unique ways you can climb the staircase. 
#The order of the steps matters.

# For example, if N is 4, then there are 5 unique ways:

#     1, 1, 1, 1
#     2, 1, 1
#     1, 2, 1
#     1, 1, 2
#     2, 2


def countSteps(n):
    if(n == 0 or n == 1):
        return 1
    if(n == 2):
        return 2
    ways = [0] * (n + 1)
    ways[0], ways[1], ways[2] = 1, 1, 2

    for i in range(3, n + 1):
        ways[i] = ways[i - 1] + ways[i - 2]
    
    return ways[n]


print(countSteps(1))
print(countSteps(2))
print(countSteps(3))