import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function PinnedSubheaderList() {
  return (
    <List
      sx={{
        width: '100%',
        maxHeight: "100%",
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {daysOfWeek.map((day, index) => (
        <li key={`section-${index}`}>
          <ul>
            <ListSubheader>{`${day}`}</ListSubheader>
            {[0, 1, 2].map((item) => (
              <ListItem key={`item-${index}-${item}`}>
                <ListItemText primary={`Item ${item}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}

export default PinnedSubheaderList;