#include<bits/stdc++.h>
using namespace std;
#define int long long
const int maxm=1e5+5;
vector<int>g[maxm];
int add[maxm];
int del[maxm];
int a[maxm];
int n;
void dfs(int x,int fa){
    for(int v:g[x]){
        if(v==fa)continue;
        dfs(v,x);
        add[x]=max(add[x],add[v]);
        del[x]=max(del[x],del[v]);
    }
    a[x]+=add[x];
    a[x]-=del[x];
    if(a[x]>0){
        del[x]+=a[x];
    }else{
        add[x]+=(-a[x]);
    }
}
signed main(){
    cin>>n;
    int j=2;
    for(int i=1;i<n;i++){
        int a,b;
        cin>>a;
        b=j++;
        g[a].push_back(b);
        g[b].push_back(a);
    }
    for(int i=1;i<=n;i++){
        cin>>a[i];
    }
    dfs(1,-1);
    cout<<add[1]+del[1]<<endl;
    return 0;
}