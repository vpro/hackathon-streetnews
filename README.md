# hackathon-streetnews
Street News is a location and date based gatherer of cultural heritage and news. Entry for the Hacking Culture Bootcamp http://waag.org/nl/event/hacking-culture-bootcamp


## Install

Run `npm install && gulp install`. 
Copy `config.example.json`, rename it to `config.json` and enter API credentials where
needed.

To see the site run `gulp serve` and visit 

[http://localhost:4000/desktop.html](http://localhost:4000/desktop.html)

### Vendor dependencies
Any new vendor dependencies should be installed through NPM and copied to the
`vendor/` location by use of the Gulp install task.


## Todo

### Basic: Desktop version with (Google) Maps
Drop a marker on a map to determine the location, drag a timeline or datepicker to select
 a date and the app will look for Cultural Heritage content based on the available layers and provide a Pinterest / Flipboard like newspaper.
 
  
### Better: Mobile version with GPS  
GPS will determine the location and you can choose a date through a datepicker.
Shows a newspaper with filters (and search?)


### Best: VR Oculus version
Predefined location that we will have available in 3D to walk around in through your keyboard.
Data layers will provide content at specific locations in the 3D world, like photo's, architecture, articles.

3D Amsterdam content can be found through http://www.yeggi.com/q/dam+square/
For instance http://www.thingiverse.com/thing:59538/#files, and then use it in ThreeJS like so: http://stackoverflow.com/questions/14686627/how-do-i-convert-a-stl-to-js

As a fallback, what about Street View?


#### Add Leap Motion / Makey Makey / PS controls for selection
Use a Leap Motion and or Makey Makey to enhance the navigation through the 3D world.

http://luser.github.io/gamepadtest/ On Firefox with a Playstation Controller


## Layers
Layers provide the content and filtering for the newspaper. The only condition is that services should be able to deliver content based on a date/period and location (coordinates or region).

Which layers do we have.

Europeana: http://labs.europeana.eu/api/



## Technique
To transform GPS coordinates to regions you can use the google.maps.Geocoder API 