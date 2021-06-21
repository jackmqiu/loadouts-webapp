# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Deployment
npm run build
aws s3 sync build/ s3://loadouts.me
aws s3 sync build/ s3://www.loadouts.me

# Adding categories
add category to:
categoriesList
categoryByDomain
hashtagTable

add cseID to:
cseIDs

update discoverUI to make category discoverable
