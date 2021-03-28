# Mappy - make your community happy. 

> https://mappymap.netlify.app/

## Introduction + What is Mappy? 
The Windsor-Essex region is home to thousands of small businesses, including those in the agriculture and greenhouse industry. Many pass under the radar of residents due to the presence of large corporations. 

Mappy is a web application that focuses on informing the residents within the Windsor-Essex region of the many strong, capable local businesses all around them. Through the use of powerful tools such as Mapbox and Google Firebase, Mappy provides key information in a visually appealing format regarding these small businesses.

## The Team
Mappy was built by: [Haris Kamal](https://github.com/HarisK03), [Sam Assareymuriyil](https://github.com/SamAssareymuriyil), and [Neil Patel](https://github.com/Neil-25). 

**Haris Kamal** was the main front-end developer who focused on creating much of the UI including the landing page, the business sign-up page and popup in the map view that displays business details.

**Sam Assareymuriyil** was the primary back-end developer who was involved with creating the Firebase database and authorization. He also created the map view of Mappy through the use of Mapbox and GeoJSON.

**Neil Patel** was the secondary back-end developer who collected the data of the local businesses and assisted with the creation of the database.

## Mappy Tutorial 
### For Business Users
Local businesses can sign up for Mappy through Firebase authentication using their Google account. Clicking the **Sign-Up** button will open a pop-up window that will instruct the user to sign-up through their Google account.

![alt text](https://i.imgur.com/Y2P698y.png)

Once signed up, the Google account used to register with Mappy will be sent to the Firebase database. A specific ID will then be assigned to the business. Businesses will be able to create a profile that includes key information regarding their business which will be attached to their ID. 

![alt text](https://i.imgur.com/LV8mbzK.png)

Once the form is completed, the data will be stored in the Firebase Realtime Database. The map view will then refresh to include the new marker. 

### For Non-Business Users
Mappy's map view functions similarly to other web mapping services. Mappy allows users to view a map that contains markers that represent small businesses. Clicking these markers opens a pop-up that includes information about the business including:
* A Short Description
* Address and Postal code
* Contact Number
* Opening and Closing Hours
* An option for takeout or curbside pickup

![alt text](https://i.imgur.com/eR8gRK3.png)

Additionally, Mappy offers trip planning features that allow users to quickly find directions to any of the small businesses within the application.

![alt text](https://i.imgur.com/ppwkZrs.png)

## Key Features
Feature | Description
------------ | -------------
Firebase Authentication | Authentication through a Google account is provided by Firebase Authentication.
Firebase Realtime Database | All of the business data is kept up to date through the use of the Realtime Database. 
GeoJSON | GeoJSON is a format meant to store geographical data and other properties.
Mapbox | Mapbox is the foundation of Mappy and allows for the accurate placement of business markers.

## Inspiration
Due to the numerous lockdowns and restrictions imposed over the past year due to COVID-19, local businesses have found it especially difficult to remain open. Mappy was created to act as a tool that would create a sense of community spanning across the Windsor-Essex and Chatham-Kent regions. Mappy also aims to provide key information on the many greenhouses and agricultural businesses located in the region.

## Our Experience During WinHacks 2021
WinHacks2021 has been a memorable experience for our team. We were able to gain an understanding of tools such as Google Firebase, Mapbox and GeoJSON. Even though we were all working with fairly new tools that took some time to understand. We went through some hurdles but were able to walk away as more capable developers. WinHacks2021 also provided many interesting and exciting opportunities, so we hope to attend again next year!

## Relevant Links
* [Mappy]
* [GitHub Repository]
* [Devpost Submission]

## Languages, Tools and Libraries Used
* HTML, JavaScript, CSS
* GeoJSON
* Google Firebase
* Mapbox
* Visual Studio Code
* GitHub
* Bootstrap Studio

## Potential Updates
Mappy has the potential to be updated with robust features including:
* Integrated Chat
* Real-time Directions
* Reviews and Ratings

## Citations
* Images & icons used from [Undraw](https://undraw.co/) and [Freepik](https://www.freepik.com/)
