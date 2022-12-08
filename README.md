# Slick

[Live Site](https://slick-ngn1.onrender.com/)

Slick, a clone of the popular messaging app Slack, allows users from a workspace to live chat with each other through direct messages or through channels, and organizes these conversations.

---

## Technologies Used

 - JavaScript
 - React
 - Redux
 - Ruby On Rails
 - PostgreSQL, ActionCable (for WebSockets)
 - HTML5
 - SCSS

Slick's core application is built around the WebSocket Communication Protocol to provide to users live updates without refreshing the page. The back end is built using Ruby on Rails and the database using PostgreSQL. The front end is built using React.js, Redux for the global state management of the application, HTML5, and SCSS.

---

## Features

### Live Chat with WebSocket Communication Protocol

 - Logged in users that are subscribed to a specific room will receive live updates of the changes that occur in it without having to refresh the page
 - Users can also see in real time if a channel was edited or deleted, and if a new direct message conversation directed to them by another user was created 

### User Authentication: 

- Users can create an account and login/logout with their credentials.
- Users can choose to login with a Demo User account, which will provide them with access to all of the application’s features.
- Users cannot use the application without first logging in.
- User authentication uses Rails’ session object to store in the database a session token to authenticate users after logging in.

### Messages:

 - Users can communicate with other users in real time through messages
 - Users can create messages
 - Users can edit their messages
 - Users can delete their messages
 - Users can send emojis in their messages, thanks to the React Emoji Picker package

### Workspaces:

 - Users can create workspaces
 - Users can choose which workspace to work on
 - Users can invite other users to their workspaces and join other workspaces
 - Users can switch between the workspaces that they're members of

### Channels:

 - Only the owner of the workspace can create channels to have group conversations with other users from same workspace
 - Users can edit their owned channels
 - Users can delete their owned channels

### Direct Messages: 

 - Users can create new conversations with selected members from same workspace and chat with them

### Search:

 - When creating a new message, users can search to which user, channel, or existing conversation they want to send it
 - Users can search for users that are not members of the workspace they're currently signed in, and add them to it

---

## Code Snippets



