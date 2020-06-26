#include <bits/stdc++.h>
#include <ext/pb_ds/assoc_container.hpp>

using namespace __gnu_pbds;
using namespace std;

typedef unsigned long long int ull;
typedef long double ldb;
typedef long long int ll;
 
#define for01(k,n)  for (ll i=k; i<n; i++)
#define for02(k,n)  for (ll j=k; j<n; j++)
#define for03(k,n)  for (ll k=k; k<n; k++)
#define for11(k,n)  for (ll i=k; i<=n; i++)
#define for12(k,n)  for (ll j=k; j<=n; j++)
#define for13(k,n)  for (ll k=k; k<=n; k++)

#define pb push_back
#define mp make_pair

#define pf push_front
#define popf pop_front
#define popb pop_back

#define vll vector<ll>
#define vint vector<int>
#define mll map<ll,ll>
#define mint map<int,int>

#define mll_it map<ll,ll>::iterator
#define mint_it map<int,int>::iterator

#define f first
#define s second
#define pp pair <ll, ll>

#define lb lower_bound
#define ub upper_bound

#define emp empty()
#define beg begin()
#define en end()
#define si size()
#define bk back()

#define deci(n)  fixed<<setprecision(n)


#define p0(a) cout << a << " "
#define p1(a) cout << a << "\n"

#define mem(a,n) memset(a, n, sizeof(a)); // n = 0 OR -1 only

#define MAX LLONG_MAX
#define MIN LLONG_MIN
#define MOD 1000000007
#define MOD2 998244353

#define BOOST ios_base::sync_with_stdio(false); cin.tie(NULL)


int main()
{
    BOOST;
    ll q;
    cin >> q;
    
    while(q--)
    {
        ll k,n,a,b;
        cin >> k >> n >> a >> b;
        
        ll d = k - n*a;
        if(d > 0)
            p1(n);
        else
        {
            ll ans = (ll)ceil((1-d)/(ldb)(a-b));
            if(ans > n)
                p1(-1);
            else
                p1(n - ans);
        }
    }
    return 0;
}