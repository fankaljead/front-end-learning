#!/usr/bin/bash

# 172.19.0.100 - - [20/Feb/2020:12:00:00 +0000] "GET /index HTTP/1.1" 200 1024 "-" "Mozilla/5.0 (compatible)" "172.19.0.1"
# 172.19.0.100 - - [20/Feb/2020:12:00:00 +0000] "GET /file/one HTTP/1.1" 500 1024 "-" "Mozilla/5.0 (compatible)" "172.19.0.1"
# 172.19.0.100 - - [20/Feb/2020:12:00:00 +0000] "GET /index HTTP/1.1" 200 1024 "-" "Mozilla/5.0 (compatible)" "172.19.0.1"

fiveH=500
sendEmail(){
  code=$( tail -n 1 http.log | grep 500 | cut -d ' ' -f 9 )
  file=$( tail -n 1 http.log | grep 500 | cut -d ' ' -f 7 )
  if [ $code -eq $fiveH ]
  then
    mail alert@project.com HTTP 500 on $file
  fi
}

# inotifywait -mrq --format '%e' --event create,delete,modify  $LOG_FILE | while read event

# 检测的文件
LOG_FILE="$1"

# 创建md5的函数
function creatmd5()
{
  echo $package_md5_new > $md5
}



while true
do
  # 记录 md5值的文件
  md5=package_md5
  # 创建新的md5信息
  package_md5_new=$(md5sum -b $package | awk '{print $1}'|sed 's/ //g')
  # 判断文件是否存在
  if [ ! -f $md5 ] ; then
    echo "md5file is not exsit,create md5file......."
    creatmd5
    exit
  fi

  # 读取旧的md5信息
  package_md5_old=$(cat $md5|sed 's/ //g')

  echo $package_md5_new
  echo $package_md5_old
  # 对象对比判断
  if [ "$package_md5_new" == "$package_md5_old" ];then
    echo "md5 is not changed"
  else
    echo "md5 is  changed"
    creatmd5
    sendEmail
  fi
done