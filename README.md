### Hi Legends 👋
# <p align="center">Tina.io – the Website for [TinaCMS](https://github.com/tinacms/tinacms)</p>
  
Source code for the tina.io website, including the TinaCMS documentation and blog.

Found a bug? Create a PBI and we'll look into it.


## 🧿 Vision

Make a wesbite to communicate the awesomeness of TinaCMS.

## 🛠️ Tech Stack

Static web application built with...

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

- and of course... [TinaCMS](https://github.com/tinacms/tinacms)! 🦙

Hosting and deployment...

- GitHub and [Vercel](https://vercel.com/)

<br>

## 🛠️ Dependency Installation + Setup

We're using [pnpm](https://pnpm.io/) as the package manager for node.
  
```bash
cp .env.example .env
pnpm i
```
<br>

## 🧑🏻‍💻 Running the Project
```bash
pnpm dev
```
This will spin up the react/Next project locally, running on [localhost:3000](http://localhost:3000) (react app) and [localhost:4001](http://localhost:4001/graphql) (playground for testing graphql against the Tina datalayer).

<br>

## 🏗️ Project Structure

📂 Components

📂 Content

📂 Data-api

📂 Indices

📂 Pages

📂 Public

📂 RSS

📂 Scripts

📂 Styles

📂 Tina

📂 Util

<br>

## 📜 Contribution Expectations

<br>

## 📚 Additional Info

### Testing Local TinaCMS 🦙 Changes

It's also possible to modify a local copy of TinaCMS and use that with the website instance. 

If you have the **tinacms** repository cloned locally you can use it when running **tina.io**:

```
TINA=../path/to/tinacms pnpm dev
```

You can also specify which packages you want to watch:

```
TINA=../path/to/tinacms TINA_WATCH=@tinacms/forms,react-tinacms-inline
```

> ### Warning
>
> This will only work for packages loaded by webpack. That means that environments which don't use
> webpack (i.e. SSR builds) will not use this alias

        
        


        
    
        

    