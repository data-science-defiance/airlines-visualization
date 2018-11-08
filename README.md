# Airlines Visualization
Interactive visualization of the Bureau of Transportation Statistics for Airlines and Airports

## Visualization Objectives
**Verify something:** *Story about Hawaii*

**Help discover something:** Going from our initial assumption, we shall investigate Hawaii in close detail and draw connections to the other airlines within the U.S.

**Help tell a story:** There's a similar visualization provided by the Guardian https://www.theguardian.com/world/ng-interactive/2014/aviation-100-years that we're drawing some inspiration from, it tells a story about the U.S. airlines industry developing and how we've come to our modern day approach. We'd like to show a subset of the story with attention to Hawaii and present the actual development in parallel to the rest of the U.S.



## Visualization Aspects

### General Exploration Tool

##### Visualization Aspects: (General Use Version)
- Points on the map are the Airports
  - Intention is to color points based on # of flights (Heatmap Scaling White to Red)
  - Depending on effectiveness, we'll try different point sizing methods using logarithmic scaling or square root scaling,
- Lines between points are # of people carried between airports. Based on preliminary mockups, we may need to modify opacity settings to reduce clutter
- Our dataset ranges from 1993 - 2017
  -  We'd like to make a timelapse (Play button) to go through the years with a settable rate
- We'd like to set aggregation methods to set points between airports and states to reduce the volume of data displayed for easier digestion
- We'd like to make basic search capabilities on the data from origin to destination, or focusing on a specific airport / state

![Hawaiian Airlines 2017](https://media.discordapp.net/attachments/494703825614274575/509856830571413524/hawaiian_routes.png)

![Mokulele Airlines 2017](https://media.discordapp.net/attachments/494703825614274575/509862276287823875/MokuleleAirlines.png)

##### Statistical Charts generated for it:
- Time Series of # of people and # of flights
- Bar Chart of # of people and # of flights to the different airports / states


##### Visualization Aspects (Storytelling)
- Same visual aspects, played out in a story sequence
- Going year by year / month by month and presenting specific info about major news pertaining to airlines focused on these aspects


## Frameworks

- We found the 3D frameworks unnecessary for our purposes (not enough usefulness of the added dimension)
- ECharts has decent map, but we find that there were problems with the # of polygons when zooming in which is a particular problem for Hawaii being so small
- Sticking with Leaflet for the overall Map Visualization
- We currently have an AWS RDS as our backend database system, but for the purposes of our project we'd like to simply filter on the JSON object at the frontend. The tool presented TaffyDB looks promising for our purposes and we're going to test in-memory JavaScript DBs for our project.
- Going with the TaffyDB route, we would like to use ECharts framework for statistical charts as we found them to be the most appealing with our layout. 
- We are also looking at DC.js as a backup since we can automatically compute the dimensions on the data by simply going through chart selection
