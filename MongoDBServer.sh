
mkdir -p dbdir

if [ $(ps aux | grep mongod | wc -l) -lt 2 ]; then echo $(mongodb-linux-x86_64-3.6.0/bin/mongod --dbpath dbdir --fork --logpath dblog.txt); fi;

rm *.log; rm dblog.txt.*

node i*js

