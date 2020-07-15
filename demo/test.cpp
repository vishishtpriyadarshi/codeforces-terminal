#include <bits/stdc++.h>
#include <ext/pb_ds/assoc_container.hpp>

using namespace __gnu_pbds;
using namespace std;

typedef unsigned long long int ull;
typedef long double ldb;
typedef long long int ll;
 
#define for01(k,n)  	for (ll i=k; i<n; i++)
#define for02(k,n)  	for (ll j=k; j<n; j++)
#define for03(k,n)  	for (ll k=k; k<n; k++)
#define for11(k,n)  	for (ll i=k; i<=n; i++)
#define for12(k,n)  	for (ll j=k; j<=n; j++)
#define for13(k,n)  	for (ll k=k; k<=n; k++)
#define forIT(c,it) 	for(typeof(c.begin()) it = c.begin(); it != c.end(); ++it)

// 2-Way iteration possible
#define rep(i, begin, end) for (__typeof(end) i = (begin) - ((begin) > (end)); i != (end) - ((begin) > (end)); i += 1 - 2 * ((begin) > (end)))


#define pb		push_back
#define mp 		make_pair

#define pf		push_front
#define popf		pop_front
#define popb		pop_back

#define vll		vector<ll>
#define vint		vector<int>
#define mll		map<ll,ll>
#define mint		map<int,int>

#define mll_it		map<ll,ll>::iterator
#define mint_it		map<int,int>::iterator

#define all(c)		c.begin(), c.end()

#define F		first
#define S		second
#define pp		pair <ll, ll>

#define lb		lower_bound
#define ub		upper_bound

#define emp		empty()
#define beg		begin()
#define en		end()
#define si		size()
#define bk		back()

#define present(c,el)	(c.find(el) != c.end())		// For containers with member function ‘find()’ (i.e. set/map, etc.)
#define cpresent(c,el)	(find(all(c),el) != c.end())	// For vectors

#define deci(n)		fixed<<setprecision(n)


#define p0(a)		cout << a << " "
#define p1(a)		cout << a << "\n"

#define mem(a,n)	memset(a, n, sizeof(a)); // n = 0 OR -1 only

#define MAX		LLONG_MAX
#define MIN		LLONG_MIN
#define MOD1		1000000007
#define MOD2		998244353

#define BOOST		ios_base::sync_with_stdio(false); cin.tie(NULL)

// BIT Manipulation
#define isOn(S, j)	(S & (1 << j))
#define setBit(S, j)	(S |= (1 << j))
#define clearBit(S, j)	(S &= ~(1 << j))
#define toggleBit(S, j)	(S ^= (1 << j))
#define lowBit(S)	(S & (-S))
#define setAll(S, n)	(S = (1 << n) - 1)
#define isPowerOfTwo(S)	(!(S & (S - 1)))
#define nearestPowerOfTwo(S) ((int)pow(2.0, (int)((log((double)S) / log(2.0)) + 0.5)))


// Debugging
#define what_is(x)	cerr << #x << " is " << x << endl;
#define error(args...) { string _s = #args; replace(_s.begin(), _s.end(), ',', ' '); stringstream _ss(_s); istream_iterator<string> _it(_ss); err(_it, args); }

void err(istream_iterator<string> it) {}
template<typename T, typename... Args>
void err(istream_iterator<string> it, T a, Args... args) {
	cerr << *it << " = " << a << endl;
	err(++it, args...);
}

/* int main() {
	int a = 4, b = 8, c = 9;
	error(a, b, c);
}
Output:

a = 4
b = 8
c = 9*/

// CUSTOM HASH FUNCTION - O(1)
struct custom_hash {
    static uint64_t splitmix64(uint64_t x) {
        // http://xorshift.di.unimi.it/splitmix64.c
        x += 0x9e3779b97f4a7c15;
        x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9;
        x = (x ^ (x >> 27)) * 0x94d049bb133111eb;
        return x ^ (x >> 31);
    }

    size_t operator()(uint64_t x) const {
        static const uint64_t FIXED_RANDOM = chrono::steady_clock::now().time_since_epoch().count();
        return splitmix64(x + FIXED_RANDOM);
    }
};


//gp_hash_table - Open Address Hash Table

//gp_hash_table<int, int> table;

const int RANDOM = chrono::high_resolution_clock::now().time_since_epoch().count();
struct chash {
    int operator()(int x) const { return x ^ RANDOM; }
};
//gp_hash_table<key, int, chash> table;


// Indexed Set
typedef tree<int,null_type,less<int>,rb_tree_tag,tree_order_statistics_node_update> indSet;

/* FUNCTIONS:
1. The function "find_by_order" returns an iterator to the element at a given position:
2. The function "order_of_key" returns the position of a given element
	-> If the element does not appear in the set, we get the position that the element
	   would have in the set
	-> O(log n)*/

/* 1.  __gcd(18, 27) = 9
   2. vector<int> v = {8, 2, 3, 1};
      for (auto &it: v)			//auto & allows to change the values 
      	it *= 2; 
   3. map<int, string> myMap{ { 1, "Gennady" }, { 2, "Petr" }, { 3, "Makoto" } };
      auto node = myMap.extract(2);
      node.key() = 42;
      myMap.insert(move(node));

     // myMap: {{1, "Gennady"}, {42, "Petr"}, {3, "Makoto"}};
     Note: Extract is the only way to change a key of a map element without reallocation
 
     Complexity:
     extract(key): O(log n)
     extract(iterator): O(1) amortized */
deque<ll> v;

void gen(ll n)
{
    v.pb(n*10+4);
    v.pb(n*10+7);
}

ll ans_next(ll n)
{
    ll ans = *lower_bound(all(v), n);
    gen(ans);
    return ans;
}


int main()
{
    BOOST;
    ll l,r;
    cin >> l >> r;
    ll ind = 0;
    ll ans = 0;
    gen(0);
    while(v[ind] < r)
        gen(v[ind++]);

    ll prev = l;
    for(int i = l; i<= r; i++)
    {
        ll nxt = ans_next(prev);
        prev = nxt+1;
        //p1(nxt);
        ans += (min(nxt,r) - i + 1)*nxt;
        i = min(nxt,r);
    }
    p1(ans);
    
    // for01(0, v.size())
    //     p0(v[i]);

    return 0;
}