const name = {
  methods: {
    login: function(a) {
      console.log(a + "登录了");
      localStorage["name"] = "wusaisai";
      console.log(localStorage["userName"]);
    }
  }
};
export default name;
