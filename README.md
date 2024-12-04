## Usage

```bash
$ npm install # or pnpm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

Learn more about deploying your application with the [documentations](https://vitejs.dev/guide/static-deploy.html)

## netlify cloud functions

Need to have netlify cli installed globally.
Run `npm run dev-server` in a second terminal to start a server on port 9999 for local testing.

## To run without netlify

Comment out code in `checkForAISuggestedPosts` to remove all console errors but the app should continue to run
even if the netlify network requests fail.

## Notes to Self / Learning as I go

solid-transition-group:

-   The &lt;Transition> component will happily take multiple elements and destroy everything except for the first child
    without so much as a warning. Be sure to use &lt;TransitionGroup> if there is more than 1 child.
    Yes I know that sounds obvious, but it would be nice if it at least popped a warning saying
    'maybe you'd prefer TransitionGroup here, hmmm?' I wonder what is going on under the hood there? Why not just have 1
    component that could handle 1 or many children? Why not just use TransitionGroup all the time? I'm sure there is a
    good reason to have both, I'll have to look into it at some point.

SolidJS signal vs store:

-   Store (createStore()) has some excellent methods for working with a changing array.
    Definitely worth using over signals at times.

-   When running the project again a few months later I had to reinstall neltify cli globally in order to get it to work.
    I see lots of module type warnings but it runs fine otherwise.
