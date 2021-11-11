import Link from "next/link"

import Logo from "@/components/common/logo"
import Auth from "@/components/auth"

const Header = () => (
  <header>
    <div>
      <Logo />
      <div className="title">
        <h1>Carnets</h1>
        <p>Carnets de bord des produits @SocialGouv</p>
      </div>
      <nav>
        <Link href="/stat">
          <a>Statistiques</a>
        </Link>
        <Auth />
      </nav>
    </div>
  </header>
)

export default Header
