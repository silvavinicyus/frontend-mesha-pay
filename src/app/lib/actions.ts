"use server";

import { cookies } from "next/headers";

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {        
    const result = await fetch('http://localhost:3333/sessions', {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password')
      }),
      headers: {
        'Content-Type': 'application/json'
      } 
    })

    if(result.status === 401) {
      return {
        success: false,
        error: "Email or password incorrect!"
      }
    } 
    
    if (result.status === 200) {
      const data = await result.json()                

      cookies().set('currentUser', data['user'])
      cookies().set('token', data.token)

      return {
        success: true,
      }
    }
    
    throw new Error()
  } catch {    
    return {
      success: false,
      error: "Error in login, please try again later!"
    }
  }
}

export async function createAccount(_currentState: unknown, formData: FormData) {
  try {
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")
    const password_confirmation = formData.get("password_confirmation")

    if (password !== password_confirmation) {
      return {success: false, error: "Password and confirmation does not match!"}
    }
    
    const result = await fetch('http://localhost:3333/users/clients', {
      method: 'POST',
      body: JSON.stringify({
        name, 
        email, 
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      } 
    })    

    if (result.status === 201) {
      return { success: true }
    } else {
      throw new Error()        
    }
  } catch (err) {    
    console.log(err)
    return {success: false, error: "Error while creating account, try again later!"}
  }
}