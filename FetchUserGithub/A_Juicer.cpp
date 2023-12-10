#include<iostream>
using namespace std;
int main() {
    // file_i_o();
    long long int n, b, d, x, sum = 0, count = 0;
    cin >> n >> b >> d;
    for(int i=0;i<n;i++) {
        cin >> x;
        if (x <= b) {
            sum += x;
            if (sum > d) {
                count += 1;
                sum = 0;
            }
        }
    }
    if (sum > d) {
        count += 1;
    }
    cout << count << endl;
    return 0;
}
