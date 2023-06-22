# Full Stack Practice Apps

## Table of Contents

* [Full Stack Practice Apps](#full-stack-practice-apps)
  * [Table of Contents](#table-of-contents)
  * [Description](#description)
  * [Usage](#usage)
    * [Requirements](#requirements)
    * [Setup and Running](#setup-and-running)

## Description

This project is for Hack Reactor's "Practice Apps" assignment. The project contains two Full Stack applications located in the `1-glossary` and `2-checkout` directories respectively.

The `1-glossary` application is a Full Stack application (React, Express, TypeScript) that allows users to create a glossary of terms and definitions. Features include:

* Term/Definition creation
* Term/Definition deletion
* Term/Definition editing
* Term/Definition searching

The `2-checkout` application is a Full Stack application (React, React Redux, Express, TypeScript) that allows users to complete a checkout process for a mock e-commerce site. Features include:

* Form for Name/Email/Password
* Form for Shipping Address
* Form for Payment Information
* Form for Reviewing Order
* Form for Confirmation

## Usage

### Requirements

You will need the following dependencies to run this project:

* `node` / `npm`, to manage project dependencies ([download](https://nodejs.org/en/download))
* `git`, for cloning the project ([download](https://git-scm.com/downloads))

### Setup and Running

To run this project, please follow these steps:

1. Clone the repository to your local machine

   ```shell
   git clone https://github.com/afrodynamic/rfe2303-practice-apps.git
   ```

2. Navigate to the cloned repository directory

   ```shell
   cd rf2303-practice-apps
   ```

3. Change directories into the application you wish to run

   ```shell
   cd 1-glossary
   ```

   or

   ```shell
   cd 2-checkout
   ```

4. Install the project's dependencies using `npm install` in the root of the project directory

   ```shell
   npm install
   ```

5. Either run both the client/server together with `npm start`

   ```shell
   npm start
   ```

   or run the client/frontend using `npm run client-dev`

   ```shell
   npm run client-dev
   ```

   and run the server/backend using `npm run server-dev`

   ```shell
   npm run server-dev
   ```

6. Open a browser and navigate to <http://localhost:8080> to view the running project
