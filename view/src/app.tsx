import React from "react";
import MainPage from "./pages/main";
import About from "./pages/about";
import { NotFound } from "./pages/notfound";
/*
look i don't know why it's erroring but i don't think it's a problem
maybe
i don't even know what is wrong with this cursed package anymore
but it works
so it definitely isn't a problem, ignore it future me
*/
import { useRoutes } from "hookrouter";
/*
if you don't know what I'm talking about because there's no error, then good for you
you don't need to worry your little tiddums about it.
*/

export default function App(): JSX.Element {
  /*setup more pages here
  literally just copy paste lines
  don't even dare to put two jsx.elements together
  i'll clap you if you do
  */
  const routes = useRoutes({
    "/": () => <MainPage />,
    "/about": () => <About />,
  });

  //don't touch this or i'll hit you with a bat
  return routes || <NotFound />;
}
