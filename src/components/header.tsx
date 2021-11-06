import Link from "next/link"

import User from "@/components/user"
import Auth from "@/components/auth"

const Header = () => (
  <header>
    <div>
      <div className="logo">République Française</div>
      <div className="title">
        <h1>Carnets</h1>
        <p>Carnets de bord des produits @SocialGouv</p>
      </div>
      <nav>
        <Link href="/stat">
          <a>Statistiques</a>
        </Link>
        <Auth />
        <User />
      </nav>
    </div>
  </header>
)

export default Header
