import Header from "./Header";
import './App.css';
import {Outlet} from "react-router-dom";
export default function Layout(){

    return(

        <main>
            <Header />
            <Outlet /> {/*whatever we want on the page goes here basically. */}
            {/*when looking at app.js we will see that it will do the header above and then it will render what ever the content is for the route where outlet is. */}
        </main>
    );
};