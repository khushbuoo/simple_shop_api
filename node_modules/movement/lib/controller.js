exports.authentication_required = function(req, res, next) {
  next(req, res);
}

exports.not_found = function(req, res, next) {
  res.status(404).send('Not found');
  next(req, res);
}


exports.resource_controller = function(resource) {
  var controller = {}
  controller['new_resource'] = function(req, res) {
    res.send('sending new '+resource.name)
  }
  controller['show_resource'] = function(req, res) {
    res.send('sending show '+resource.name)
  }
  controller['list_resources'] = function(req, res) {
    res.send('sending list '+resource.name)
  }
  controller['update_resource'] = function(req, res) {
    res.send('sending update '+resource.name)
  }
  controller['delete_resource'] = function(req, res) {
    res.send('sending delete '+resource.name)
  }
  controller['edit_resource'] = function(req, res) {
    res.send('sending edit '+resource.name)
  }
  controller['create_resource'] = function(req, res) {
    res.send('sending create '+resource.name)
  }
  return controller;
}

exports.session_controller = function(resource_name) {
  var controller = {}
  controller['new_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['show_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['delete_resource'] = function(req, res) {
    res.send(resource_name)
  }

  return controller;
}

exports.passwords_controller = function(resource_name) {
  var controller = {}
  controller['new_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['show_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['delete_resource'] = function(req, res) {
    res.send(resource_name)
  }

  return controller;
}

exports.registration_controller = function(resource_name) {

  console.log('creating '+resource_name)

  var controller = {}
  controller['new_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['show_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['list_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['update_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['delete_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['edit_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['create_resource'] = function(req, res) {
    res.send(resource_name)
  }
  return controller;
}

exports.email_verification_controller = function(resource_name) {

  console.log('creating '+resource_name)

  var controller = {}
  controller['new_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['show_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['list_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['update_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['delete_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['edit_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['create_resource'] = function(req, res) {
    res.send(resource_name)
  }
  return controller;
}

exports.sms_verification_controller = function(resource_name) {

  console.log('creating '+resource_name)

  var controller = {}
  controller['new_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['show_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['list_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['update_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['delete_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['edit_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['create_resource'] = function(req, res) {
    res.send(resource_name)
  }
  return controller;
}

exports.blog_controller = function(resource_name) {

  console.log('creating '+resource_name)

  var controller = {}
  controller['new_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['show_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['list_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['update_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['delete_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['edit_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['create_resource'] = function(req, res) {
    res.send(resource_name)
  }
  return controller;
}

exports.oauth_applications_controller = function(resource_name) {

  console.log('creating '+resource_name)

  var controller = {}
  controller['new_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['show_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['list_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['update_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['delete_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['edit_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['create_resource'] = function(req, res) {
    res.send(resource_name)
  }
  return controller;
}

exports.oauth2_controller = function(resource_name) {

  console.log('creating '+resource_name)

  var controller = {}
  controller['new_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['show_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['list_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['update_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['delete_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['edit_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['create_resource'] = function(req, res) {
    res.send(resource_name)
  }
  return controller;
}

exports.resource_api_controller = function(resource_name) {

  console.log('creating '+resource_name)

  var controller = {}
  controller['new_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['show_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['list_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['update_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['delete_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['edit_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['create_resource'] = function(req, res) {
    res.send(resource_name)
  }
  return controller;
}

exports.job_board_controller = function(resource_name) {

  console.log('creating '+resource_name)

  var controller = {}
  controller['new_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['show_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['list_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['update_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['delete_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['edit_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['create_resource'] = function(req, res) {
    res.send(resource_name)
  }
  return controller;
}

exports.cart_controller = function(resource_name) {

  console.log('creating '+resource_name)

  var controller = {}
  controller['new_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['show_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['list_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['update_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['delete_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['edit_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['create_resource'] = function(req, res) {
    res.send(resource_name)
  }
  return controller;
}

exports.checkout_controller = function(resource_name) {

  console.log('creating '+resource_name)

  var controller = {}
  controller['new_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['show_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['list_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['update_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['delete_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['edit_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['create_resource'] = function(req, res) {
    res.send(resource_name)
  }
  return controller;
}

exports.admin_controller = function(resource_name) {

  console.log('creating '+resource_name)

  var controller = {}
  controller['new_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['show_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['list_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['update_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['delete_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['edit_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['create_resource'] = function(req, res) {
    res.send(resource_name)
  }
  return controller;
}

exports.two_factor_authentication_controller = function(resource_name) {

  console.log('creating '+resource_name)

  var controller = {}
  controller['new_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['show_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['list_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['update_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['delete_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['edit_resource'] = function(req, res) {
    res.send(resource_name)
  }
  controller['create_resource'] = function(req, res) {
    res.send(resource_name)
  }
  return controller;
}