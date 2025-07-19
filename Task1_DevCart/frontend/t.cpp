#include <iostream>
#include <vector>
using namespace std;

int main()
{
    vector<int> nums = {10, 11, 20, 1, 5, 20, 26, 17, 20, 2, 4, 20};
    int cnt = 0;

    for (int i = 0; i < nums.size(); i++)
    {
        if (nums[i] == 20)
            cnt++;
    }
    cout << cnt;
}