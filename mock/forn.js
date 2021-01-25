function form(method) {
  let res = null;
  switch (method) {
    case "Post":
      res = { message: "ok" };
      break;

    default:
      res = null;
  }
  return res;
}

// 模块化规范

module.exports = {
  form
};
