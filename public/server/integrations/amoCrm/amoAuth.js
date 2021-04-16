const api = require("../../api");
const { AMO_USER_LOGIN, AMO_USER_HASH } = require("../../constants");

const amoAuth = async (next, req, res) => {

  try {
    const { data, status } = await api.post('/private/api/auth.php?type=json', {
      data: {
        USER_LOGIN: AMO_USER_LOGIN,
        // USER_HASH: AMO_USER_HASH,
      }
    });
    
    if (status === 200) {
      return res.status(200).json('');
    }

  } catch (e) {
    return res.status(401).json({ message: "Не авторизован!", code: 2300 });
  }

  // console.log('data', data)
  // axios({
  //   method: "post",
  //   url: '/private/api/auth.php?type=json',
  //   headers: { 'Content-Type': 'application/json' },
  // }).then({ data, status } => {
  //   if (status === 200) {
  //     return next();
  //   } else {
  //     return res.status(401).json({ message: "Не авторизован", code: 2300 });
  //   }
  // })


}

module.exports = amoAuth;
