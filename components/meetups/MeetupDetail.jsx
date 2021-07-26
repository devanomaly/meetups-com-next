import Image from 'next/image'

export default function MeetupDetail(props) {
  return (
    <section>
      <Image src={props.image} alt="Aqui deveria ter uma imagem..." />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section >
  )

}