# Reverie Sound Review

<p align="center">
  <img src="./src/images/Reverie_Sound_Review_Logo-removebg-preview.png">  
</p>

News forum for classical music that allows for searching, posting, liking, and commenting.

### A live version of Reverie Sound Review is deployed with netlify and running here:

[Live Version](https://reverie-sound-review.netlify.app/)

*Note: Any features that use the NewsAPI are not available on the hosted version*


## Features

#### Searching

Reverie Sound Review has two different searching features. Firstly, you can search for classical music articles and news. We use the NewsAPI to make this happen. It suppors full pagination and allows easy navigation. Secondly, you can search for user posts that are stored in our JSON-Server mock database. Again, this search supports full pagination and allows easy navigation.

#### Posting

Reverie Sound Review allows users to post their own articles with a handy form. Once posted, the article can be searched and accessed by other users. This feature is fully persisting using JSON-Server.

#### Commenting

Reverie Sound Review supports full commenting functionality. Users can comment on both news articles and user posts by using an easily accessible form at the bottom of each article/post. This feature is also fully persisted using JSON-Server.

#### Liking

Reverie Sound Review also allows users to like other comments. Full liking logic is used so there wont be any mishaps (ie. liking & disliking simultaneously, messing up like/dislike amount, etc.). Liking/Disliking is also user-specific, meaning that each user has their own persisting like data. So users wont have to worry about their like disappearing upon refresh.

#### Updating User Settings

Reverie Sound Review supports full user account cusomization. Once logged in, a user can navigate to their setting and update their profile image, username, or password. These updates take effect immediately and also persist using JSON-Server.

## Installation

**1. Clone the repository to your local maching**

**2. Navigate into the root folder and run the build command**
  
  To install all node packages:
  ```
  $ npm install
  ```

**3. Add the necessary environment variables**

  Reverie Sound Review makes use of development and production variables for fetching.
  
  First navigate to the root directory and create `env.development`
  
  Navigate to this file and add the following:
  
  ```javascript
      REACT_APP_API_URL=http://localhost:8000
  ```
  
  This setup will only work if you run JSON-Server on port 8000. If you're running it on a different port, then update the `REACT_APP_API_URL` variable to match.

  **5. Start up the servers**
  
  Run this to start up the JSON-Server backend:
  ```
  $ json-server --watch src/data/db.json --port 8000
  ```
  
  Then, in another terminal, run this to start up the React frontend:
  ```
  $ npm start
  ```

## Contributing

Forking and cloning is welcome, but please provide attribution to the authors.
