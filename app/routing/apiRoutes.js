const friendData = require ('../data/friends.js');

module.exports = function (app){

  app.get('/api/friends', function (req, res){
    res.json(friendData);
  });

 //Create and save new friends with POST
 app.post('/api/friends', function(req, res){
  var newFriend = req.body;        

  //here we find a match for our new friend profile, initializing with the first friend we have
  var bestMatch = friendData[0];
  var lowestRunningDifference = 41;

  //loop through profiles
  friendData.forEach(friend => {
      var tallyDifference = 0;
      //loop through each question score
      for(var i = 0; i < friend.scores.length; i++){
          tallyDifference += Math.abs(friend.scores[i] - newFriend.scores[i]);

          if(tallyDifference <= lowestRunningDifference){
              //we have a new lowest difference, this could be a match made in heaven
              lowestRunningDifference = tallyDifference;
              bestMatch = friend;
          }
      }

      
  });
  //api sends back the match
  res.send(bestMatch);
  //lastly add new user to friends array
  friendData.push(newFriend);
});

};