// import { useEffect, useState } from 'react'; //useEffect and useState are not needed here to pass the updated DUMMY_MEETUPS!!
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
// FIXME: ver coisas babel para app em produção... (CSS TA FICANDO ZOADO!!! NAO ENTENDO AINDA)

function HomePage(props) {
  //useEffect and useState are not needed here to pass the updated DUMMY_MEETUPS!!
  // const [loadedMeetups, setLoadedMeetups] = useState([])

  // useEffect(() => {
  //   setLoadedMeetups(DUMMY_MEETUPS)
  // }, [])

  return (
    <MeetupList meetups={props.meetups} />
  )
}
// an export for pages' stuff
export async function getStaticProps() {
  // runs only after BUILD (but see "revalidate")
  // TODO: THIS IS REALLY IMPORTANT!! one of Next main features
  // inside here, we can fetch data from an API
  //is this called once "component did mount" ?
  const client = await MongoClient.connect("mongodb+srv://gesonel:5BRh4IFGC4TAsase@learning-atlas.saxwg.mongodb.net/meetups?retryWrites=true&w=majority")

  const db = client.db()

  const meetupsCollection = db.collection('meetups')

  const meetups = await meetupsCollection.find().toArray()

  // FIXME pensar => talvez nao seja legal ficar fechando a conexão aqui...
  client.close()

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString()
      })).reverse(),
    },
    //incremental SSG (in the foregoing example, it revalidates after every 100s)
    revalidate: 100
  }
}

// another export for pages' stuff, but this time it runs after every request
// export async function getServerSideProps(context) {
//   // NOT ALWAYS THE BEST WAY!!! ONLY USE IF MULTIPLE RELEVANT DATA IS CHANGING EVERY SECOND OR SO
//   const req = context.req
//   const res = context.res

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }


export default HomePage