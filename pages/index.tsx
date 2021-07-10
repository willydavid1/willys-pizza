// Components
import Welcome from 'components/welcome'
import Image from 'next/image'

const IndexPage = () => {
  return (
    <>
      <div className="bgWrap">
        <Image objectFit="cover" layout='fill' src='/mainImage.jpg' alt="" />
      </div>
      <div className="flex flex-col w-full h-screen items-center justify-center">
        <Welcome />
      </div>
    </>
  )
}

export default IndexPage
