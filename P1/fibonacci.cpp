#include<iostream>
#include<cstdio>
using namespace std;
int main(){
	double f[102],a[100];
	f[0]=1;
	f[1]=1;
	cout<<"fibonacci sequence in 100 line is:"<<endl;
	for(int i=0;i<100;i++){
		f[i+2]=f[i]+f[i+1];
		cout<<"µÚ "<<i+1<<" ÐÐ: "<<f[i]<<endl;
	}
	return 0;
} 
