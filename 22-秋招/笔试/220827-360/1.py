n, m = list(map(lambda x:int(x), input().split(" ")))
nums = []
for i in range(n):
    nums.append(list(map(lambda x:int(x), input().split(" "))))

def solution(n, m, nums):
    cur = []
    all = 0
    sum = [0] * m
    for i in range(n):
        if i >= 7:
            cur.pop(0)
            for j in range(m):
                sum[j] = sum[j] - nums[i - 7][j]
        for j in range(m):
            sum[j] = sum[j] + nums[i][j]
        v = max(sum)
        s = sum(cur)
        if s < v:
            all += (v - s + 1)
            cur.append(v - s + 1)
        else:
            cur.append(0)

res = solution(n, m, nums)
print(res)