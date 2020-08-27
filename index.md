### Written and maintained by William Giittinger.

email: gkwillg@gmail.com ----- [LinkedIn Profile](https://www.linkedin.com/in/will-giittinger/)

# ePortfolio description and notes...

This page contains a professional relection of myself and the work for my capstone project. The majority of the other projects I have worked on throughout my degree include "skeleton code" (empty methods, helper functions, etc.) that are the intellectual property of Sothern New Hampshire University. As such, they have asked that I don't explicitly link or showcase those projects here, in the interest of the academic integrity of future students. I would, however, be happy to discuss those projects and my other works in a private setting.


------------------------------------------------------------------------------


# An introduction to me and my capstone project...

## Reflection

Throughout my time in the Computer Science (CS) program at Southern New Hampshire University, I have worked from the ground up to build the skills and knowledge needed to be a professional web developer. At the beginning, it was learning the basics with mathematics and simple scripting with Python. By the end, I was creating full-stack websites, object-oriented programs in a variety of programming languages, and even reverse engineering basic programs to use the Assembly instructions to recreate the program in C. Today’s developers need to be adept in more than just making a functioning program. To that end, the CS program has exposed me to a variety of scenarios and taught me industry best practices to approach each challenge.


Early in the CS program, I had coursework in the software development lifecycle and collaborating in team projects. The scenarios I worked through and the development team simulations we worked through taught us many aspects of working in today’s software development fields. We covered many approaches to the software development lifecycle, from Waterfall to Prototyping. The primary focus of my studies was the Agile methodology. As a team we learned how to communicate and coordinate development efforts with ourselves, stakeholders, and clients. Learning to discuss with stakeholders about the design of a program and the needs of everyone involved before beginning development was a critical learning step for me that proved to be vital throughout the rest of my time in the CS program. I quickly grew to appreciate that asking for clarity and identifying specific needs and expectations as early as possible is one of the most surefire ways to avoid issues, mistakes, and wasted resources later.


After learning how to be an effective communicator and the preparatory steps for program development, much of the rest of my time in the CS program was spent covering a wide range of software topics. An entire course was dedicated to learning different data structures and algorithms, from which I learned the concepts necessary to work with more complex data structures. For example, it was this course that taught me how to develop and interact with binary trees which I have since implemented in my capstone project, a full-stack website created from the ground up. I also learned about a variety of databases. The first database I learned to use was a MySQL database, including how to implement CRUD (create, read, update, delete) functionality. This was expanded upon with more advanced concepts such as aggregation. In later courses, I was exposed to the document-oriented MongoDB which I also utilized as the database for my capstone project. I also learned about software security and the potential harms that can occur if it is not taken seriously. While reverse engineering, I learned a wide array of security issues that occur in program logic such as dangling pointers, stack smashing (buffer overflow), broken algorithms, and more. Furthering my security knowledge in practice, the website I created in my full-stack development course included full password encryption, session support using the node.js Passport module, and discussion on other attack vectors such as injection attacks.


------------------------------------------------------------------------------


## Capstone Project: _"Sample Zoo"_ Website

For my capstone course, I needed to address three main areas of expertise and showcase the skills and understanding I had of each. Specifically, the three focal points were software design and engineering, algorithms and data structures, and databases. Considering my desire to work as a web developer, instead of using three different programs or improving my previous programs, I decided to create a full-stack website from scratch and focus on those areas. Before starting development, I performed an informal code review of some of my previous work to identify specific ideas that I could use to demonstrate my capabilities. This review also focused on the strengths and weaknesses of those programs and how I could improve and mold the functions in them for my website. It also helped me identify a theme for my website, a website for a zoo where zookeepers could login and keep track of the zoo’s animals (e.g. add newly acquired animals, keep track of their status, etc.). 


In my full-stack development course, I had used the MEAN stack (MongoDB, Express.js, AngularJS, Node.js), and I decided that stack was appropriate for the website I was creating. I decided not to include AngularJS for this project as it was not a piece I identified as necessary for the three focus points, and development time constraints meant it was an unnecessary component. For the first development artifact targeting the software design category, I created a front-end login system which utilized Passport to authenticate users and for session support. Since the database artifact was not yet created, all user data was stored in text files. The passwords were not fully encrypted, but the bcrypt module was used to hash the passwords which is a strong first step for security. At the completion of the artifact, the zookeepers could register for the site with their name, email address, and password, and then use his/her email and password to login to the website. The server handled routing the user between pages, and once the user successfully logged in, a welcome page was displayed by a dedicated controller. This welcome page was inaccessible to anyone who was not authenticated, even with the correct route.


The goal of the second artifact was to implement a binary search tree which could be used for sorting, searching, adding, deleting, etc. animals to the tree. At some level, the creation of this binary search tree is redundant as much of the functionality is already supported by MongoDB. However, the goal was to showcase my capacity to create the data structure and properly implement the algorithms needed to use it. Again, at this point the database is not implemented and the animal data is stored on json files and imported / initialized as “Animal” class objects. In this artifact I also displayed my ability to work more extensively with HTML, CSS, and the EJS view-engine for Express.js. The website’s visual design was not a point of focus for the project, but drastically improves the usability of the website by moving from displaying plain text to stylized elements.


The final artifact was to implement the document-oriented MongoDB. Ideally this would have been implemented much earlier on, but the structure of the capstone course placed this artifact last. The database was created through MongoDB Atlas and is hosted by Amazon Web Services (AWS). As such, the database is stored in the cloud and can be accessed from any device connected to the internet, which is a fundamental requirement for a website of this kind. The structure of the MonoDB is not complex and was designed with two collections, one for the user (zookeeper) data and another for the animal data. Once the database was online and connected to the server (using hidden .env variables for authentication), large portions of the website were then refactored to utilize the data stored on the database rather than the text and json files. An unforeseen benefit of having to rework parts of the website was the demonstration of my ability to work with an existing code base and change it to meet changing requirements. For added benefit, the mongoose module was utilized for data modeling on the server side. This provided numerous benefits, but primarily allows the defining of schemas and data enforcement. With this artifact completed, and a few extra web design improvements, the full-stack website project was complete.


------------------------------------------------------------------------------


If you wish to see each artifact individually, here is a [link](https://github.com/WilliamGiittinger/ZooAuthenticationSite) to the "working" GitHub repo with branches for each feature.



## Informal Code Review
A video review of previous programs that I developed. The goal was to identify previous work that covered the three focus points for the capstone project.
- **Software Design and Engineering**
- **Data Structures and Algorithms**
- **Databases**

_Note: Some of the reviewed work is from when I first started learning to program._

Google Drive link to video file: [Code Review .mov](https://drive.google.com/file/d/1LRDlUXy0AMTRgDfzF4f9gSg9koGRhO70/view?usp=sharing)

------------------------------------------------------------------------------

# Development Narratives
The below development narratives are written desciptions of each program feature. The narratives include why I decided to develop that particular feature and how it demonstrates my capabilities as a software developer. Also included is a reflection of the development process and how it helped me improve as a developer.

## Artifact 1 Narrative
### Login and Authentication
MS Word document: [Login Artifact Narrative](https://github.com/WilliamGiittinger/WilliamGiittinger.github.io/blob/master/artifact1.docx)

Working GitHub repo branch: [Artifact 1](https://github.com/WilliamGiittinger/ZooAuthenticationSite/tree/artifact1)

------------------------------------------------------------------------------

## Artifact 2 Narrative
### Binary Tree Data Structure and Algorithms
MS Word document: [Data Structures and Algorithms Narrative](https://github.com/WilliamGiittinger/WilliamGiittinger.github.io/blob/master/artifact2.docx)

Working GitHub repo branch: [Artifact 2](https://github.com/WilliamGiittinger/ZooAuthenticationSite/tree/artifact2)

------------------------------------------------------------------------------

## Artifact 3 Narrative
### MongoDB Implementation
MS Word document: [MongoDB Narrative](https://github.com/WilliamGiittinger/WilliamGiittinger.github.io/blob/master/artifact3.docx)

Working GitHub repo branch: [Artifact 3](https://github.com/WilliamGiittinger/ZooAuthenticationSite/tree/artifact3)

------------------------------------------------------------------------------

# The future...

## Passion Project

Now that I have recently finished my schooling, I am planning on working on my first large scale passion project. This project will be something that I care about and want to create from scratch. It will include many new and interesting challenges. I plan on creating a data analytics website for an online game that I enjoy playing with friends. With this data I hope to use statistics and data mining to develop new insights into game specific outcomes. For example, determining variance in winning a game based upon which character is played, characters played against, items purchased, objectives obtained, etc. and the weight of each of those factors in determining each match's outcome. For this project I will be using the MERN stack (MongoDB, Express.js, React, Node.js). React is a framework that I have never previously used, although I have used the somewhat similar AngularJS. While I did enjoy working with AngularJS, I experienced some key functional issues that were extremely difficult to resolve. The most important of which was a CORS module interaction issue which wasn't correctly routing specific request types (mostly PUTS). In communication with my professor at the time, neither of us could determine the exact cause of the issue, but he suggested it may be a node module version incompatibility. To avoid having this same issue appear, and to challenge myself to learn a new technology, I will instead use the React framework.

There are a few other new challenges this project will present for me. This will be the first time that I extensively interact with an external API for a majority of the data I need to present information on my webpage. Considering this, I need to be precise with the setup and interaction of the API to ensure I'm using the correct data. I will need to make some key decisions on how the data is stored on my DB as the amount of data I could be working with is large. This project will also be the first time that I plan to develop and present visual graphs. This will have to be something that I do some research for, as I don't know of any tool in my past experience that supports visual graphing. I also plan on attempting to implement some level of multi-threading in this project. Again, this is something I've never personally worked with so it will be another learning curve for this project. In the end, I'm excited to see how this project pans out and all of the learning and challenges I am bound to run into during development. 
