#!/bin/bash
# ====================================================
#   Copyright (C) 2021  All rights reserved.
#
#   Author        : fankaljead
#   Email         : fankaljead@gmail.com
#   File Name     : remove.sh
#   Last Modified : 2021-11-17 12:14
#   Describe      : 
#
# ====================================================


for file in ./*
do
    if test -f $file
    then
        echo $file 是文件
    else
        echo $file 是目录
        cd $file
        echo "removing node_modules"
        rimraf node_modules
        cd -
    fi
done
