git remote add dokku dokku@178.128.55.250:glamour-ceph

git push dokku master

ssh dokku@178.128.55.250 domains:set glamour-ceph ceph.glamour.dental

ssh dokku@178.128.55.250 letsencrypt glamour-ceph

ssh dokku@178.128.55.250 proxy:ports glamour-ceph

ssh dokku@178.128.55.250 proxy:ports-remove glamour-ceph http:8080:8080

ssh dokku@178.128.55.250 proxy:ports-add glamour-ceph http:80:8080

--------------


git checkout -b master origin/master
nvm install 6.9.5
npm install -g yarn
yarn
yarn run dev