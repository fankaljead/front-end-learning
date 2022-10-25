#include<iostream>
#include<deque>
#include<vector>
#include<unordered_map>
#include<queue>
#include<unordered_set>
#include<algorithm>
using namespace std;

unordered_map<int,int>memo;
int a, b;
int dfs(int n) {
	if (n == 1)
		return 0;
	if(memo.count(n))
		return memo[n];
	int ret = 2e9;
	for (int g = 2; g <= n; g++) {
		int k = n / g;
		if (n % g != 0) k++;
		ret = min(ret,dfs(k) + n * a + g * b);
	}
	memo[n] = ret;
	return ret;
}

int main() {
	int n = 22;
	a = 1;
	b = 3;
	cout << dfs(n);

	return 0;
}