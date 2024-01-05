# install pm2
# npm --verbose --registry https://registry.npm.taobao.org install pm2@latest -g

# pm2 execute command and in name demo: npm start
pm2 start -n demo npm -- start

# pm2 list
# pm2 stop [id]
# pm2 delete [id]
# pm2 restart [id]

# display the process log
# pm2 logs --raw