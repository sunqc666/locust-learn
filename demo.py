"""

======================

@author:sunqiucheng

@time:2023/3/28:10:39 上午

======================

"""
# !/usr/local/bin/python
# -*- coding:utf-8 -*-
from locust import TaskSet, HttpUser, task


from locust import HttpUser, TaskSet, task, between

class NoSlowQTaskSet(HttpUser):
    host = "http://www.baidu.com"
    @task
    def index_page(self):
        r = self.client.get("/")


