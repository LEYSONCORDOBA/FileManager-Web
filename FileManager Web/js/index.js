var Api = 'http://localhost:3051/';

new Vue({
  el: '#appIndex',
  data: {
    username: '',
    password: ''
  },
  methods: {
    login: function () {
      axios
        .post(Api + 'user/login', {
          username: this.username,
          password: this.password
        })
        .then(function (response) {
          localStorage.token = response.data.token;
          location.href = 'board.html';
        })
        .catch(function (error) {
          sweetAlert('Oops...', 'Usuario o contraseña incorrectos', 'error');
        });
    }
  }
});
