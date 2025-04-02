'use client'
import { redirect } from 'next/navigation'

export default function Nav() {
 
  const logout = async () => {
    const reponse = await fetch('/api/auth/logout')
    if (reponse.ok) {
      redirect('/')
    }}
   
  return (
    <div className="navbar px-4">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li><a href="/espace-client">Mon compte</a></li>
          <li><a href="/espace-client/prendre-rdv">Prendre RDV</a></li>
          <li><a href='/espace-client/mes-rdv'>Mes RDV</a></li>
        </ul>
      </div>
      {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li><a href='/espace-client'>Mon compte</a></li>
        <li><a href='/espace-client/prendre-rdv'>Prendre RDV</a></li>
        <li><a href='/espace-client/mes-rdv'>Mes RDV</a></li>
      </ul>
    </div>
    <div className="navbar-end">
      <a className="btn" onClick={logout}>Déconnexion</a>
    </div>
  </div>
  )
}
