<p align="center">
   <img src="./web/src/assets/logo.svg" alt="Logo Next Level Week E-Sports" width="250px"/>
</p>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/yuriqpaiva/feedget?color=blue">

  <img alt="GitHub language count" src="https://img.shields.io/github/last-commit/yuriqpaiva/nlw-esports?color=blueviolet">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/yuriqpaiva/feedget?color=green">

  <img alt="GitHub" src="https://img.shields.io/github/license/yuriqpaiva/feedget?color=red">
</p>

<div align="center">
<img align="center" src="https://i.ibb.co/F6Ts2h4/Capa.png" />
</div>
<br>

## ๐ก Introduction

Full-stack application monorepo to find your duo at your favorite game.

1. Check all available games and it's Ads
2. Create an Ad for your favorite game and wait for a duo
3. View each game Ads and get your duo's discord ID

<br>

## ๐งช Technologies

Technologies that were used on this application:

- [React](https://reactjs.org)
- [TailwindCSS](https://tailwindcss.com)
- [Vite](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Express](https://expressjs.com/pt-br)
- [Prisma](https://www.prisma.io)
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)

<br>

## ๐ฅ Pre-requisites:

- NodeJS
- Expo
- Yarn
- Database compatible with [Prisma](https://www.prisma.io)

<br/>

## ๐ How to Run it?

From project's root file:

### Backend

Remember to keep it running while web/mobile application are being used

```sh
$ cd server
$ yarn

# Run migrations
$ npx prisma migrate dev
$ yarn dev

# Run prisma studio on another console
$ npx prisma studio
```

### Web application:

```sh
$ cd web
$ yarn install
$ yarn dev
```

### Mobile:

```sh
$ cd mobile
$ yarn install
$ npx expo start
```

<br/>

## ๐ Layout

Check Figma Layout of this project [here](https://www.figma.com/community/file/1150897317533332617)

<br>

## ๐ License

MIT License ยฉ Yuri Paiva. Check [LICENSE](LICENSE.md) for more details

<br>

Made with ๐ &nbsp;by Yuri Paiva
