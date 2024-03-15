"use server";

import { revalidatePath } from "next/cache";
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

      cookies().set('currentUser', JSON.stringify(data['user']))
      cookies().set('token', data.token)

      return {
        success: true,
        currentUser: data['user'],
        token: data.token
      }
    }
    
    throw new Error()
  } catch(err) {    
    console.log(err)
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

export async function createTreatment(_currentState: unknown, formData: FormData) {
  const token = cookies().get('token')?.value

  try {
    const procedures = formData.get("procedures")?.toString().split(',').map((procedure) => +procedure)
        
    const result = await fetch('http://localhost:3333/treatments', {
      method: 'POST',
      body: JSON.stringify({
        procedures,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      } 
    })        

    if (result.status === 201) {
      return { success: true }
    } else {
      throw new Error()        
    }
  } catch (err) {    
    console.log(err)
    return {success: false, error: "Error while creating treatment, try again later!"}
  }
}

export async function logout() {
  try {
    cookies().delete('currentUser')
    cookies().delete('token')

    return {
      success: true
    }

  } catch(err) {
    return {success: false, error: "Error while performing logout, try again later!"}
  }
}

export async function updateTreatment(duration: number, uuid: string) {
  try {
    const token = cookies().get('token')?.value    

    const result = await fetch(`http://localhost:3333/treatments/close/${uuid}`, {
      method: 'PATCH',
      body: JSON.stringify({
        duration,
      }),
      headers: {        
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`        
      }
    })
                
    if(result.status !== 200) {
      throw new Error()
    }
    const data = await result.json()    

    return {
      success: true,
      updatedTreatment: data
    }
  } catch(err) {
    console.log(err)
    return {
      error: "failed to update treatment, try again!"
    }
  }
}