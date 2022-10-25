#include <vector>
#include <iostream>
#include <algorithm>
#include <queue>
#include <unordered_map>
using namespace std;

class status
{
public:
  int cur;
  int t;
  int l;
  int src;

  status(int x1, int x2, int x3, int x4) : cur(x1), t(x2), l(x3), src(x4) {}

  bool operator<(const status &cmp) const
  {
    return l > cmp.l;
  }
};

int main()
{
  int n, start, target, max_ttl;
  cin >> n >> start >> target >> max_ttl;
  vector<unordered_map<int, int>> map(501);

  for (int i = 0; i < n; i++)
  {
    int p, q, v;
    cin >> p >> q >> v;
    map[p][q] = v;
    map[q][p] = v;
  }

  priority_queue<status, vector<status>> pq;
  pq.push({start, max_ttl, 0, 0});

  while (!pq.empty())
  {
    int cur = pq.top().cur;
    int t = pq.top().t;
    int l = pq.top().l;
    int src = pq.top().src;
    pq.pop();

    if (cur == target)
    {
      cout << l << " " << t;
      return 0;
    }
    if (t != 0)
      for (auto it : map[cur])
      {
        if (it.first != src)
        {
          pq.push({it.first, t - 1, l + it.second, cur});
        }
      }
  }

  cout << -1;
  return 0;
}
