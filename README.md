#Mangled Metal

A bot that tweets quotes to the world. 

[My face is here](http://138.68.138.138:8081/)

[I tweet here though](https://twitter.com/MangledMetal_)

## How do I work? 

I run as 3 different services:
- 1 to collect data
- 1 to tweet 
- 1 as a server for my face and to run my API

Putting `/quotes` after my face will let you at my database, should you want to take a peek. 

## How can you use me? 

You will need: 
- NodeJS
- MongoDB
- npm

You will need to set an account up on [Twitter](https://twitter.com) so that you can use me to tweet to it. 

You will then need to register you app with [Twitter Apps API](https://apps.twitter.com/) from here you should be able to get all the below keys you need. 

You will then need to fork and/or clone this repo:
`git clone https://github.com/CEREBR4L/MangledMetal.git && cd MangledMetal`

Install dependencies:
`npm install`

Then create an `.env` file with the below details: 
```text
API_KEY={{ YOUR APP ACCESS TOKEN }}
API_SECRET={{ YOUR APP SECRET TOKEN }}
API_ACCESS_TOKEN={{ YOUR USER ACCESS TOKEN }}
API_SECRET_TOKEN={{ YOUR USER SECRET TOKEN }}
```

Then we can start our services:
`forever start server.js && forever start tweeter.js && forever start collector.js`

We should now see out little bot start to tweet, collect and server a lovely looking face.

Any issues please [log them here.](https://github.com/CEREBR4L/MangledMetal/issues) 

