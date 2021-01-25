function chart(method) {
  let res = null;
  switch (method) {
    case "Get":
      res = [10, 10, 10, 10, 10];
      break;

    default:
      res = null;
  }
  return res;
}

// 模块化规范

module.exports = {
  chart
};
