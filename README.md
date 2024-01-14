# Tech Educators Bootcamp Week 06 Assignment

## Build a Cookie Clicker in React.js

### Task

Create a simple interactive game as a fun distraction for the visitors to a company website.

<br>
<br>

### User stories

- As a user, I want to be able to click the cookie and increment the counter
- As a user, I want to see the counter automatically increment using an interval timer
- As a user, I want to purchase items i can afford in the shop and increase the number of cookies every time the interval passes
<br>

### Requirements  

- Create state variables to store the current number of cookies and the cookies PerSecond value (useState)
- Set up a timer to increment the number of cookies by the cookiesPerSecond value (useEffect) : Be sure to handle clearing the timer using the useEffect return value.
- Set up an array of objects containing the items available for purchase in the store, their cost and their increment increase value - Map through these and create buttons for each.
- Create a function to handle the purchase of an item : This should check if the user has enough cookies to purchase the item, and if so, subtract the cost of the item from the number of cookies and add the increment value to the cookiesPerSecond value.

<br>

### Design notes, additions and changes

User stories were produced as a definition as to the scope of the project.

Uses local data storage to save and retrieve game data. It was found that only item totals, cookie count and cookies per click were necessary items to store in an object. Local storage of item totals were not required by the the design brief, but were added anyway to improve recommencing the game. 

When hovering the mouse over buttons , the cursor is set to a pointer and the colour of the background changes with a gradual transition.  

Animation was added to make the cookie move when clicked (using a React timer).

Uses CSS grid functionality to display the inventory of items and statistics.

The page design is responsive.

The colour scheme used is based on the colours of cookies.

The code is modularised in small blocks of code to make it easier to read and descriptive variables are used. 


### Requirements acheived

- State variables used to store the current number of cookies and the cookies PerSecond value (useState)
- Timer implemented to increment the number of cookies by the cookiesPerSecond value using useEffect() ; Timer clearss using the useEffect return value
- An array of objects is used to contain the items available for purchase in the store, their cost and their increment increase value - These are mapped through and buttons are created for each
- Functionality included to handle the purchase of an item ; This checks if the user has enough cookies to purchase the item, and if so, subtracts the cost of the item from the number of cookies and adds the increment value to the cookiesPerSecond value

### Stretch goals

The suggested stretch goal was implemented.

- Cookies, cookiesPerSecond and inventory data is stored as an object in localStorage and it persists between page refreshes

<br>


### Extra features

- Hand drawn images were created and scanned to use in the page
- Functionality added to add a yellow circle to the background of the image, where the user can afford to purchase the item.
- Numbers on screen are formatted with commas as thousand separators
- Instructions included at the bottom of the page
- Reset button added to clear the page data and the data saved in local storage
- Uses a data operations class to abstract away the statistics and operation of the user inventory and purchasing functionality ; This was done to separate concerns, make the code easier to read and reduce complexity
