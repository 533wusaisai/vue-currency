import Mock from "mockjs";

const mockData = {
  list: [
    {
      "id|1": 1,
      "user_title|1": "管理员",
      "user_name|1": "admin",
      "name|1": "wusaisai",
      "password|1": "",
      "token|1": "@date(T)"
    },
    {
      "id|1": "2",
      "user_title|1": "超级管理员",
      "name|1": "wusaisai",
      "user_name|1": "root",
      "password|1": "root",
      "token|1": "@date(T)"
    }
  ]
};

Mock.mock("http://localhost:8080/login", "get", mockData);
