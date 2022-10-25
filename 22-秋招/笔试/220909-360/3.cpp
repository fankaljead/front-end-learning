#include <iostream>
#include <map>
using namespace std;

int main()
{
  //通用图数据存储
  int n, m;
  cin >> n;
  cin >> m;
  int u, v; //入边，出边
  vector<vector<int>> edge(n, vector<int>(n));
  for (int i = 0; i < m; ++i)
  {
    cin >> u >> v;
    cin >> edge[u][v]; //这是邻接矩阵
    edge[v][u] = edge[u][v];
  }
  unordered_map<int, int> mp; //存已经加入的边
  vector<int> vt;
  // prim开始
  mp[0] = 1;
  vt.push_back(0);
  int ans = 0;
  int minLen;
  int node;
  for (int i = 0; i < n - 1; ++i)
  {
    minLen = INT_MAX;
    node = -1;
    for (auto e1 : vt)
    { // for e1 in vt,离已选点最近的点加进来
      for (int k = 0; k < n; ++k)
      {
        if (mp[k])
          continue;
        else if (edge[e1][k] == 0)
          continue; //无边
        else
        {
          if (edge[e1][k] < minLen)
          {
            node = k;
            minLen = edge[e1][k];
          }
        }
      }
    }
    ans += minLen;
    mp[node] = 1;
    vt.push_back(node);
  }
  for (auto num : vt)
  {
    cout << num << endl;
  }
  cout << ans << endl;
}
