function getUsers(user, context, callback) {
  if (context.stats.loginsCount === 1) {
    const ManagementClient = require('auth0@2.9.1').ManagementClient;
    const management = new ManagementClient({
      token: auth0.accessToken,
      domain: auth0.domain,
    });

    management.updateUser({
      user: user.id,
      app_metadata: {
        roles: 'Client'
      }
    }, function (err, user) {
      if (err) {
        callback(err);
      } else {
        callback(null, user, context);
      }
    });
  }

  callback(null, user, context);
}

module.exports = getUsers;