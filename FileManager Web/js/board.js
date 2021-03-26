var Api = 'http://localhost:3051/';

new Vue({
  el: '#appBoard',
  created: function () {
    this.GetInfoUser();
    this.showError();
    this.getListFiles();
  },
  data: {
    fullName: '',
    listFiles: [],
    file: undefined
  },
  methods: {
    GetInfoUser: function () {
      let token = localStorage.getItem('token');
      axios
        .get(Api + 'user/info', {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.fullName = response.data.Data;
        });
    },
    CerrarSession: function () {
      localStorage.token = '';
      location.href = 'index.html';
    },
    showError: function () {
      if (!localStorage.token) {
        sweetAlert('Oops...', 'Debe iniciar sesion', 'error');
        location.href = 'index.html';
      }
    },
    getListFiles: function () {
      let token = localStorage.getItem('token');
      axios
        .get(Api + 'file/list', {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.listFiles = response.data.Data;
        });
    },
    uploadFile: function () {
      let token = localStorage.getItem('token');
      this.file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append('file', this.file);
      axios
        .post(Api + 'file/upload', formData, {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          swal('Exitoso!', 'Archivo subido exitosamente!', 'success');
          this.listFiles.push(response.data.Data);
        });
    }
  }
});
