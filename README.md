# mighTASK

This is a simple task/schedule manager built as a class project.

## Description

The app allows a user to create a to-do list, the tasks from which can be prioritized using optimal scheduling algorithms. To make the user's experience efficient, the app connects the tasks and optimal time for their completion with the user’s Google Calendar and sends desktop notifications. The application also allows users to track their progress in completing their tasks by providing easily comprehensible visual features. 


## Developer Setup

1. Run `npm install` to install dependencies
1. See the README files in the `server` and `client` directories for further
   instructions

## Contribution Guidelines

These are the guidelines that project members will adhere to when contributing
to the project.

### Database Modification

1. Exercise extreme caution when modifying the database directly because it is
   not backed up

### Version Control

1. Commits will not be made directly to the `main` branch
1. Branches will be based on features, not authors
1. Commit and push atomically (frequently commit small changes)
1. Commit messages should be descriptive and concise
1. Make a PR before merging into `main`
1. Each PR shall be reviewed by one other team member before merging
1. Code reviews will be conducted through the GitHub interface

### Testing

1. Unit tests will be written for each feature and key functions
1. Unit tests will be run before each commit
1. All tests must be passing before merging into main

### Coding Standards

1. Document code using appropriate comments and meaningful names
1. Coding style is enforced using `Prettier` -- This is done automatically by
   `husky` and `lint-staged` when committing
   - Styling can be applied to the entire project by running `npm run lint`

### Issue Tracking

1. Bugs and issues will be tracked using Jira

### Documentation

1. Maintain a README file for major directories with explanations and
   instructions for future contributions

### Features

1. Add a task
Tasks can be added using the plus button on the Task List View mode.

2. Edit a task
Tasks can be edited using the pen icon on the Task List View mode

3. Task List View
Tasks can be viewed as a list

4. Task Board View
Tasks can be viewed as a board from which the status of tasks can be tracked and changed

5. Generate a schedule
The app generates a schedule to maximize the tasks before their due date. 

7. Add an event to Calendar
An event with its name, start, and end times can be added to the Google calendar of a Google account, currently signed in on the brower

## Demo 
<a href="[http://www.youtube.com/watch?feature=player_embedded&v=VIDEO_ID](https://www.youtube.com/watch?v=eMNY3zI-TPM)
" target="_blank"><img src="[http://img.youtube.com/vi/VIDEO_ID/0.jpg](https://www.youtube.com/watch?v=eMNY3zI-TPM)" 
alt="Video Title" width="240" height="180" border="10" /></a>

## Credits
zxu4@cas.edu
jgg64@case.edu
jts212@case.edu
axg1328@case.edu
sxk1654@case.edu
