# codeforces-terminal
A command line tool to bring complete functionalities of Codeforces to your terminal
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

### Commands
```
root@VP:/workspace/codeforces-cli(master)# cftool

          __           _                     _
   ___   / _|         | |_    ___     ___   | |
  / __| | |_   _____  | __|  / _ \   / _ \  | |
 | (__  |  _| |_____| | |_  | (_) | | (_) | | |
  \___| |_|            \__|  \___/   \___/  |_|


cftool  v1.0.0 by Vishisht Priyadarshi
Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  cfuser          Setting up details of the user
  login           Log into the Codeforces Platform
  logout          Log out from the Codeforces Platform
  compiler        Manage compiler options
  submit          Submit solution
  rating          Show/compare rating of the specified user(s)
  help [command]  display help for command
```


### Features to be Added
* Download accepted solutions
* Fetch problem statements with sample test cases
* Codeforces tags distribution
* User rating with chart view/table view
* Fetch users' details and blogs
* Display Contest Results
* Manage Hacks during contests
* Cross-platform support

### License
[MIT](https://choosealicense.com/licenses/mit/)