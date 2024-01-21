import React from "react"
import Link from "next/link"
import { FaGithub } from "react-icons/fa"
import { FaSquareXTwitter } from "react-icons/fa6"
import { FaDiscord } from "react-icons/fa"
import { CgWebsite } from "react-icons/cg"

const Sosmed = () => {
  return (
    <div className="flex gap-5 absolute -bottom-8 items-end right-5 md:right-20 z-40 transition md:bottom-[10%] lg:flex-col lg:bottom-[25%]">
      <Link
        href={"https://github.com/demigohu"}
        target="_blank"
        className="w-10 h-10 rounded-full overflow-hidden border shadow-md flex justify-center items-center p-2 cursor-pointer hover:bg-white hover:scale-110 transition"
      >
        <FaGithub className="w-full h-full" color="black" />
      </Link>
      <Link
        href={"https://twitter.com/tgraji_k"}
        target="_blank"
        className="w-10 h-10 rounded-full overflow-hidden border shadow-md flex justify-center items-center p-2 cursor-pointer hover:bg-white hover:scale-110 transition"
      >
        <FaSquareXTwitter className="w-full h-full" color="black" />
      </Link>
      <Link
        href={"https://discordapp.com/users/518467136788758539"}
        target="_blank"
        className="w-10 h-10 rounded-full overflow-hidden border shadow-md flex justify-center items-center p-2 cursor-pointer hover:bg-white hover:scale-110 transition"
      >
        <FaDiscord className="w-full h-full" color="black" />
      </Link>
      <Link
        href={"https://dgops.xyz/"}
        target="_blank"
        className="w-10 h-10 rounded-full overflow-hidden border shadow-md flex justify-center items-center p-2 cursor-pointer hover:bg-white hover:scale-110 transition"
      >
        <CgWebsite className="w-full h-full" color="black" />
      </Link>
    </div>
  )
}

export default Sosmed
