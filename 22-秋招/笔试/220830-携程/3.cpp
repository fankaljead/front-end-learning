#include<iostream>
#include<string>	
#include<vector>
#include<algorithm>
#include<unordered_map>
#include<unordered_set>
#include<map>
#include<set>	

using namespace std;

class UF {
	int n;
	unordered_set<int>set;
	vector<int>f;
	vector<int>c;
public:
	UF(int nn,  vector<int>& cc) :n(nn){
		c = cc;
		f.resize(n);
		for (int i = 0; i < n; i++) {
			f[i] = i;
			set.insert(i);
		}
	}
	int find(int p) {
		if (p != f[p])
			f[p] = find(f[p]);
		return f[p];
	}

	void merge(int x, int y) {
		x = find(x);
		y = find(y);
		if (x == y)
			return;
		c[x] = c[x] | c[y];
		c[y] = 0;
		set.erase(y);
		f[y] = x;
	}
	bool judge() {
		for (int p : set) {
			if (c[p] != 7)
				return false;
		}
		return true;
	}
};

int main() {
	int n;
	cin >> n;
	string str;
	getline(cin, str);
	getline(cin, str);
	vector<int>color(n);
	for (int i = 0; i < n; i++) {
		if (str[i] == 'r')
			color[i] = 4;
		else if (str[i] == 'g')
			color[i] = 2;
		else
			color[i] = 1;
	}
	vector<pair<int, int>>input;
	int ans = 0;
	for (int i = 0; i < n - 1; i++) {
		int u, v;
		cin >> u >> v;
		input.push_back({ u-1,v-1 });
	}
	for (int i = 0; i < n - 1; i++) {
		UF uf(n, color);
		for (int j = 0; j < n - 1; j++) {
			if (i == j) continue;
			uf.merge(input[j].first, input[j].second);
		}
		if (uf.judge())
			ans++;
	}
	cout << ans << endl;
	return 0;
}