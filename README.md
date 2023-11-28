# mighTASK

This is a simple task/schedule manager built as a class project.

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
