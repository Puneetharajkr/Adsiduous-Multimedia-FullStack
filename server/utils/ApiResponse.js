class ApiResponse {
    constructor(success, data = null, message = '') {
      this.success = success;
      this.data = data;
      this.message = message;
    }
  }
  
  module.exports = ApiResponse;