"use server";

import { cookies } from "next/headers"

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
    
    if (result.status === 200) {
      const data = await result.json()                

      cookies().set('currentUser', data['user'])
      cookies().set('token', data.token)    
    }
  } catch(err) {
    console.log(err)
    throw err
  }
}