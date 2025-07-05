# KaushalPortfolio

[Not needed] Run `ng new <project-name>` to create a new angular project.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Generate any component

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Production server

Run `ng serve --configuration production` for a production server. Navigate to `http://localhost:4200/`.

## Build for Production

Run `ng build --configuration production --base-href` to build the project. The build artifacts will be stored in the `dist/` directory.

## Step to deploy Angular site to

1. Install github pages tool for angular use command `npm install -g angular-cli-ghpages`
2. Build the project using command `ng build --prod --base-href`
3. Run `angular-cli-ghpages -d docs --no-silent` to deploy your project. `-d` tag take the location for build stored, in dist file

Above command will create a new branch `gh-pages` in your repository and automatically push the dist build in that branch. Just navigate to `https://<username>.github.io/<reponame>/`
