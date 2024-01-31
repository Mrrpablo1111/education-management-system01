import Image from "next/image";
import {
  getKindeServerSession,
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { title } from "process";
import Link from "next/link";

export default function Navbar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = getUser();
  const navigation = [
    {
      title: "About",
      href: "/",
    },
    {
      title: "Academic",
      href: "/academic",
    },
    {
      title: "Contact",
      href: "/contact",
    },
    {
      title: "Admissions",
      href: "/admissions",
    },
  ];

  return (
    <div className="w-full bg-white/70 shadow-md">
      <div className="max-w-screen-xl flex justify-between items-center py-6 font-bold  mx-auto bg-white ">
        <h1 className="text-3xl">Limkokwing</h1>

        <div className="flex gap-12 items-center">
          {!isAuthenticated() ? (
            <>
              <div className="flex gap-12 hidden md:inline-flex items-center gap-7 text-gray-900 hover:text-black duration-200">
                {navigation.map((item) => (
                  <Link key={item?.title} 
                        href={item?.href}
                        className="text-sm uppercase font-semibold relative group overflow-hidden"
                        >
                        {item?.title}
                        <span className="w-full h-[1px] bg-blue-700 absolute inline-block left-0 bottom-0 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-200"/>
                    
                  </Link>
                ))}
              </div>
              <LoginLink className="bg-black text-white px-4 py-2 rounded">
                Sign in
              </LoginLink>
            </>
          ) : (
            <div className="flex gap-4 font-normal">
              {user?.picture ? (
                <Image
                  className="rounded-full"
                  src={user?.picture}
                  width={55}
                  height={55}
                  alt="user profile avatar"
                />
              ) : (
                <div className="bg-black text-white rounded-full p-4">
                  {user?.given_name?.[0]}
                  {user?.family_name?.[0]}
                </div>
              )}
              <div>
                <p className="text-2xl">
                  {user?.given_name} {user?.family_name}
                </p>

                <LogoutLink className="text-black">Log out</LogoutLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
