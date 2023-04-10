# This project is built for a friend that has a band.
### The point of the app is:
To allow the band owner (Admin) to create events, add songs repertoire with lyrics, start events, interact with guests and songs, etc.

## The Admin features include:
- adding events with time and description
- adding songs, together with lyrics so guests can sing along
- making an event live or ending it
### While event is live Admin can:
- mark song as next
- mark song as done
- re-add song from the done songs pool
- accept suggestion
- remove songs

## The Guests features include:
- get 3 vote points, and 1 suggestion point. Upcoming feature will be able to increase the points by interacting with Admin social media.
- voting for songs while event is live
- suggesting a song
- watching live as song is being done, or which song is currently playing, show lyrics of current song, or not, etc

# Upcoming planned features:
- Facebook login for Guests in order to like Admins page, maybe like a post or something, and get more vote points, and suggestion points
- About same for twitter, and other social media
- Add proper Admin authentication, so the password is not in the actual code.
- etc

# Collaborate
If someone wants to collaborate on the code, feel free to message me.
This is project for fun, that I've built from scratch, so please don't use the code for anything stupid. If you plan on earning on it, at least buy me a beer, or include would be nice. Cheers!

# Oh yeah... Instructions:
- Clone the code.
- Go to firebase and create realtime database
- Add .firebaseConfig.js to the root folder of your code with the following content:
```
export default {
  apiKey: "APIKEY",
  authDomain: "yourprojectlink.firebaseapp.com",
  databaseURL: "https://project-stuffs-default-rtdb.firebaseio.com",
  projectId: "PROJECTID",
  storageBucket: "appname.appspot.com",
  messagingSenderId: "SOMEID",
  appId: "APP ID"
};
```
BUT, I am sure you can probably get this whole object from firebase directly. Check their examples, and documentation.
- After that done, navigate to project folder and type:
```
npm install
npm run dev
```
- TA-DA !


# Disclaimer:
This is an old project that I haven't touched in a long time, I was quite noobish then, so for some weird spaghetti code and random comments, I appologize in advance.
Also, I would like to mention, that you need to probably update some packages, and maybe break the code, etc etc... so just keep that in mind.
Cheers!
