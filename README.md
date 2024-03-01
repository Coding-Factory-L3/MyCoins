
# MyCoins
MyCoins is an application for follow Cryptocurrency and NFT, it is possible to have an account, add cryto or nft in a list of favorites and have a profile page.



## Stack Used

![](https://img.shields.io/badge/Firebase-FFA500?style=for-the-badge&logo=Firebase&logoColor=white)
![](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![](https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)
![](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

# Installation and Setup Instructions

### 1. Clone the repository

Clone this repository using the following command in your terminal :

```bash
    git clone https://github.com/justRunnz/Trippy-Node.git
```

## 2. Install the dependencies

To install the dependencies, run this command in the terminal in the root of the project, in this project we use yarn but you can use npm if you want :

```bash
    yarn install
    npm install
```

## 3. Environment Variables

Make sur when you clone the project to create a .env file and add the following variables and remove the < > :
```bash
COINGECKO_API_KEY = <Your key>

FIREBASE_API_KEY = <Your key>
FIREBASE_AUTH_DOMAIN = <Your domain>
FIREBASE_PROJECT_ID = <Your project ID>
FIREBASE_STORAGE_BUCKET = <Your storage bucket>
FIREBASE_MESSAGING_SENDER_ID = <Sender ID>
FIREBASE_APP_ID = <Your app ID>
FIREBASE_MEASUREMENT_ID = <ID>

GOOGLE_MAPS_API_KEY = <Your key>
```

## 4. Start the server

Once the dependencies are installed, you can start the back-end server using the command

```bash
    yarn start
    npm start
```
This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Step 5: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 6: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

## API Reference CoinGecko

#### Coins

```http
  GET /coin/list
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /coin/list/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### NFTS

```http
  GET /nfts/list
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /coin/nfts/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Documentation :

https://www.coingecko.com/api/documentation

## API Reference Google Maps 

#### Documentation : https://developers.google.com/maps/documentation?hl=fr
## Authors

- [justRunnz](https://github.com/justRunnz)
- [FlorianCohenJoly](https://github.com/FlorianCohenJoly)
- [VaheKri](https://github.com/VaheKri)
- [progresso85](https://github.com/VaheKri)

## Collaborators

<div style="display: flex; align-items: center; margin-bottom: 20px;gap: 20px">
    <img src="https://avatars.githubusercontent.com/u/84150426?v=4" alt="avatar" style="border-radius: 50px"     width="100" height="100"/>
    <img src="https://avatars.githubusercontent.com/u/91193629?v=4" alt="avatar" style="border-radius: 50px"     width="100" height="100"/>
    <img src="https://avatars.githubusercontent.com/u/71846489?v=4" alt="avatar" style="border-radius: 50px"     width="100" height="100"/>
    <img src="https://avatars.githubusercontent.com/u/91196072?v=4" alt="avatar" style="border-radius: 50px"     width="100" height="100" />
</div>
