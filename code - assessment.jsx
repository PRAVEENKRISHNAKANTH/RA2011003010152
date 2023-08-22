// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container, List, ListItem, ListItemText } from '@mui/material';

function App() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      const response = await axios.get('http://20.244.56.144/train/trains', {
        headers: {
          Authorization: 'Bearer YOUR_AUTH_TOKEN',
        },
      });
      setTrains(response.data);
    } catch (error) {
      console.error('Error fetching trains:', error);
    }
  };

  return (
    <Container>
      <h1>Train Schedule</h1>
      <List>
        {trains.map((train) => (
          <ListItem key={train.trainNumber}>
            <ListItemText primary={train.trainName} />
            <ListItemText primary={`Price: ${train.price.sleeper}`} />
            <ListItemText primary={`Seats Available: ${train.seatsAvailable.sleeper}`} />
            {/* ... other train details */}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

function TrainDetails() {
  // Similar to App component, fetch train details using trainNumber
  // Display details using Material-UI components
}

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/train/:trainNumber" component={TrainDetails} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
