import '../App.css';
import {useState} from "react";
export default function RegisterPage(){
const [username, setUsername ] = useState('');
const [password, setPassword ] = useState(''); 

async function register(event){
    event.preventDefault();
        const response  = await fetch('http://34.130.156.109:4000/register', { //async func so we need await
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type' : 'application/json'}, });
    
        if(response.status == 200){ //checking if the request was actually made and if the content is put in database
            alert('Registration was Successful');
            
        }
        else{
            alert('Registration Failed. Try a different username.')
            

        }

   

}
    return(
        <form className ="register" onSubmit = {register}>
            <h1>Register</h1>
            <input type = "text" 
            placeholder ="username" 
            value = {username} 
            onChange = {ev => setUsername(ev.target.value)}/>
            <input type = "password" 
            placeholder ="password" 
            value = {password} 
            onChange = {ev => setPassword(ev.target.value)}/>
            <button> Register</button>
            </form>
    );
}