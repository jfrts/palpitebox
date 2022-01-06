import React from "react";
import Link from "next/link";

// Styles
const header = `bg-gray-900 text-center shadow-md`;
const logo = `w-52 mx-auto p-4`;
const nav = `flex gap-12 bg-gray-800 justify-center p-4 text-gray-50`;

const Header = () => {
  return (
    <header className={header}>
      <div className="mx-auto">
        <img src="/logo.png" alt="Pousada Villa Monte Verde" className={logo} />

        <nav>
          <ul className={nav}>
            <li>
              <Link href="/">
                <a>Início</a>
              </Link>
            </li>

            <li>
              <Link href="/opiniao">
                <a>Opinião</a>
              </Link>
            </li>

            <li>
              <Link href="/sobre">
                <a>Sobre</a>
              </Link>
            </li>

            <li>
              <Link href="/contato">
                <a>Contato</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;