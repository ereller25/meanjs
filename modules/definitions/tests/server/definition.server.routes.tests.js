'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Definition = mongoose.model('Definition'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, definition;

/**
 * Definition routes tests
 */
describe('Definition CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Definition
    user.save(function () {
      definition = {
        name: 'Definition name'
      };

      done();
    });
  });

  it('should be able to save a Definition if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Definition
        agent.post('/api/definitions')
          .send(definition)
          .expect(200)
          .end(function (definitionSaveErr, definitionSaveRes) {
            // Handle Definition save error
            if (definitionSaveErr) {
              return done(definitionSaveErr);
            }

            // Get a list of Definitions
            agent.get('/api/definitions')
              .end(function (definitionsGetErr, definitionsGetRes) {
                // Handle Definition save error
                if (definitionsGetErr) {
                  return done(definitionsGetErr);
                }

                // Get Definitions list
                var definitions = definitionsGetRes.body;

                // Set assertions
                (definitions[0].user._id).should.equal(userId);
                (definitions[0].name).should.match('Definition name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Definition if not logged in', function (done) {
    agent.post('/api/definitions')
      .send(definition)
      .expect(403)
      .end(function (definitionSaveErr, definitionSaveRes) {
        // Call the assertion callback
        done(definitionSaveErr);
      });
  });

  it('should not be able to save an Definition if no name is provided', function (done) {
    // Invalidate name field
    definition.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Definition
        agent.post('/api/definitions')
          .send(definition)
          .expect(400)
          .end(function (definitionSaveErr, definitionSaveRes) {
            // Set message assertion
            (definitionSaveRes.body.message).should.match('Please fill Definition name');

            // Handle Definition save error
            done(definitionSaveErr);
          });
      });
  });

  it('should be able to update an Definition if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Definition
        agent.post('/api/definitions')
          .send(definition)
          .expect(200)
          .end(function (definitionSaveErr, definitionSaveRes) {
            // Handle Definition save error
            if (definitionSaveErr) {
              return done(definitionSaveErr);
            }

            // Update Definition name
            definition.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Definition
            agent.put('/api/definitions/' + definitionSaveRes.body._id)
              .send(definition)
              .expect(200)
              .end(function (definitionUpdateErr, definitionUpdateRes) {
                // Handle Definition update error
                if (definitionUpdateErr) {
                  return done(definitionUpdateErr);
                }

                // Set assertions
                (definitionUpdateRes.body._id).should.equal(definitionSaveRes.body._id);
                (definitionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Definitions if not signed in', function (done) {
    // Create new Definition model instance
    var definitionObj = new Definition(definition);

    // Save the definition
    definitionObj.save(function () {
      // Request Definitions
      request(app).get('/api/definitions')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Definition if not signed in', function (done) {
    // Create new Definition model instance
    var definitionObj = new Definition(definition);

    // Save the Definition
    definitionObj.save(function () {
      request(app).get('/api/definitions/' + definitionObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', definition.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Definition with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/definitions/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Definition is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Definition which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Definition
    request(app).get('/api/definitions/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Definition with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Definition if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Definition
        agent.post('/api/definitions')
          .send(definition)
          .expect(200)
          .end(function (definitionSaveErr, definitionSaveRes) {
            // Handle Definition save error
            if (definitionSaveErr) {
              return done(definitionSaveErr);
            }

            // Delete an existing Definition
            agent.delete('/api/definitions/' + definitionSaveRes.body._id)
              .send(definition)
              .expect(200)
              .end(function (definitionDeleteErr, definitionDeleteRes) {
                // Handle definition error error
                if (definitionDeleteErr) {
                  return done(definitionDeleteErr);
                }

                // Set assertions
                (definitionDeleteRes.body._id).should.equal(definitionSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Definition if not signed in', function (done) {
    // Set Definition user
    definition.user = user;

    // Create new Definition model instance
    var definitionObj = new Definition(definition);

    // Save the Definition
    definitionObj.save(function () {
      // Try deleting Definition
      request(app).delete('/api/definitions/' + definitionObj._id)
        .expect(403)
        .end(function (definitionDeleteErr, definitionDeleteRes) {
          // Set message assertion
          (definitionDeleteRes.body.message).should.match('User is not authorized');

          // Handle Definition error error
          done(definitionDeleteErr);
        });

    });
  });

  it('should be able to get a single Definition that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Definition
          agent.post('/api/definitions')
            .send(definition)
            .expect(200)
            .end(function (definitionSaveErr, definitionSaveRes) {
              // Handle Definition save error
              if (definitionSaveErr) {
                return done(definitionSaveErr);
              }

              // Set assertions on new Definition
              (definitionSaveRes.body.name).should.equal(definition.name);
              should.exist(definitionSaveRes.body.user);
              should.equal(definitionSaveRes.body.user._id, orphanId);

              // force the Definition to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Definition
                    agent.get('/api/definitions/' + definitionSaveRes.body._id)
                      .expect(200)
                      .end(function (definitionInfoErr, definitionInfoRes) {
                        // Handle Definition error
                        if (definitionInfoErr) {
                          return done(definitionInfoErr);
                        }

                        // Set assertions
                        (definitionInfoRes.body._id).should.equal(definitionSaveRes.body._id);
                        (definitionInfoRes.body.name).should.equal(definition.name);
                        should.equal(definitionInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Definition.remove().exec(done);
    });
  });
});
