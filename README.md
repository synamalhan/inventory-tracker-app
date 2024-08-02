# Inventory Tracker

## Project Overview

The Inventory Tracker is a web application designed to help users manage their inventory efficiently. Users can add, remove, update, search, and sort items based on tags and names. The application features a user-friendly interface with a collapsible information box to guide users on how to use the system.

## Features

- **Add Items**: Add new items to the inventory with optional tags.
- **Remove Items**: Remove items from the inventory or decrease their quantity.
- **Update Items**: Adjust item quantities and tags.
- **Search**: Search for items by name.
- **Filter by Tag**: Filter items based on assigned tags.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Material-UI**: React components for faster and easier web development.
- **Firebase**: Backend service for data storage and retrieval.

## Installation

To set up and run the Inventory Tracker on your local machine, follow these steps:

1. **Clone the repository**:
   '''bash
   git clone https://github.com/your-username/inventory-tracker.git
   cd inventory-tracker
   '''

2. **Install dependencies**:
   Make sure you have [Node.js](https://nodejs.org/) installed, then run:
   '''bash
   npm install
   '''

3. **Set up Firebase**:
   - Create a Firebase project if you haven't already.
   - Obtain your Firebase configuration and add it to a `firebase.js` file in the `src` directory.

4. **Run the application**:
   '''bash
   npm start
   '''
   This will start the development server, and you can access the application at `http://localhost:3000`.

## Usage

1. **Adding Items**:
   - Click the "Add New Item" button.
   - Enter the item name and tags.
   - Click "Add" to save the item to the inventory.

2. **Removing Items**:
   - Find the item in the list.
   - Click the "-" button to decrease its quantity or remove it if the quantity reaches zero.

3. **Updating Items**:
   - Items are updated automatically when quantities are adjusted.

4. **Searching and Filtering**:
   - Use the search bar to find items by name.
   - Use the filter dropdown to view items with specific tags.

5. **Expanding Information**:
   - Click the "Expand Info" button to view additional instructions on how to use the application. Click "Collapse Info" to hide it.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please fork the repository and create a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please reach out to me on [LinkedIn](https://linkedin.com/in/synamalhan) and [GitHub](https://github.com/synamalhan).
