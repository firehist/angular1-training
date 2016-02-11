angular.module('awesomeApp.user')
  .service('userService', function($http) {
    // Store the real collection
    var data = {
      users: []
    }
    // Store the users promise
    var usersPromise = null

    /**
     *
     * @returns {HttpPromise}
     */
    this.getUsersFromServer = function() {
      return usersPromise = $http.get('http://api.randomuser.me/?results=10')
        .then(function(res) {
          return res.data.results
        })
        .then(function(res) {
          return res.map(function (i) { return i.user })
        })
        .then(function(res) {
          return data.users = res
        })
    }

    /**
     * Return the user collection (and be sure we retrieve info from server once
     * @returns {*}
     */
    this.getUsers = function() {
      return data.users
    }

    /**
     * Get a user by index
     * @param {number} index
     * @returns {Promise}
     */
    this.getUser = function(index) {
      return this.getUsers().filter(function(v) {
        return v.salt === index
      })[0]
    }

    this.addUser = function(user) {
      return this.getUsers().push(user)
    }

    this.removeUser = function() {
      console.log('Here we send a request to the server and delete the resource!!')
    }

  })
