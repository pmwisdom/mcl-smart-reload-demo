var idleStates = ['Active', 'Idle', 'Inactive'];
  // counter starts at 0
  Session.setDefault('counter', 0);

    SmartReload.configure({
        reload: {
            firstStart: false,
            router: true,
            idle: true
        }
    });
    SmartReload.routes = {
        noUpdate : true
    };

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    },
      'click #no-update-page': function() {
          Router.go('noUpdate');
      }
  });
Template.noUpdate.events({
    'click #update-page': function() {
        Router.go('/');
    }
});

Template.layout.helpers({
    userStatus: function () {
        var status = IdleWatcher.getStatus();
        return status ? idleStates[status] : 'Active';
    },
    templateReload: function () {
        var status = SmartReload.getReloadTemplateStatus();
        return status || 'false';
    },
    hasRetry: function () {
        var status = SmartReload.getRetryStatus();
        return status || 'false';
    }
});
