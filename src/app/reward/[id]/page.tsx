import Image from 'next/image'

export default function Home() {
  return (
    <main className="grid grid-cols-1 gap-20 font-mono mb-64">
      <div className="h-96 bg-black relative flex items-center justify-center place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <a
            className="z-50 pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
        <span className="absolute top-24 left-24 text-2xl text-white transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            &lt;-
        </span>
        </a>
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={180}
          priority
        />
        <h2 className="absolute text-6xl mb-3 text-white text-2xl font-semibold">
            Nagrada 1
            </h2>
      </div>

      <div className="mx-24">
        <p className="text-2xl tracking-wide leading-loose">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus eget nulla vitae fermentum. 
          Aliquam sagittis elit vel elementum lacinia. Suspendisse potenti. 
          Morbi vel nisi ac nisl luctus faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Fusce nec mauris eget ex viverra malesuada a nec tellus. Fusce fringilla est quis risus eleifend, vitae eleifend velit volutpat.
        </p>
      </div>

      <div className="mx-24">
        <p className="text-2xl tracking-wide leading-loose">
          Reward type: NFT
        </p>
      </div>
    </main>
  )
}
