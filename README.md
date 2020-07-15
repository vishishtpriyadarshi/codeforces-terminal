# cftool
A command line tool to bring complete functionalities of Codeforces to your terminal

## Overview
cftool(codeforces-terminal) is a NodeJS based CLI tool which allows users to completely access codeforces using your terminal. Currently it enables users to login to the website using terminal and make submissions. It also displays rating graphs of single as well as multiple users. 

Future versions will bring in the complete functionalities of the website to the terminal.
### Build Instructions
```
git clone https://github.com/vishishtpriyadarshi/codeforces-terminal.git
cd codeforces-terminal
npm init
npm install
sudo npm link
mkdir ~/.cftool
cd ~/.cftool
touch cookie.json
```

### Usage
![Introduction](demo/Introduction.gif)

### 1. Setting up Credentials

### a. Set handle
```
cftool cfuser set
```
![set_handle](demo/set_handle.gif)

### b. Check handle
```
cftool cfuser show
```
![show_handle](demo/show_handle.gif)

### c. Remove previously-set handle
```
cftool cfuser remove
```
![remove_handle](demo/remove_handle.gif)


### 2. Logging in
```
cftool login
```
![login](demo/login.gif)


### 3. Compiler Options
### a. Select compiler 
```
cftool compiler set
cftool compiler show
```
![compiler](demo/compiler.gif)

### b. Un-select compiler 
```
cftool compiler remove
```
![compiler_remove](demo/compiler_remove.gif)

### 4. Submit a problem
```
cftool submit
```
![sumit](demo/submit.gif)



### 5. Display rating graph
### a. Single user
```
cftool rating solo --handle=<handle_name>
```
![rating_solo](demo/rating_solo.gif)


### b. Compare two users
```
cftool rating compare --handle1=<handle_name1> --handle2=<handle_name2>
```
![rating_compare](demo/rating_compare.gif)

### 6. Logging out
```
cftool logout
```
![logout](demo/logout.gif)


### Features to be Added

- [X] Compare rating of users
- [ ] Dynamic verdict display
- [ ] Download accepted solutions
- [ ] Fetch problem statements with sample test cases
- [ ] Fetch users' details and blogs
- [ ] Display Contest Results
- [ ] Cross-platform support

### License
[MIT](https://choosealicense.com/licenses/mit/)

