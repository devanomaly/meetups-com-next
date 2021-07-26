import MeetupDetail from '../components/meetups/MeetupDetail'
import { MongoClient, ObjectId } from 'mongodb'

// TODO: essa pagina esta mt pesada! precisamos de um fix...

function MeetupDetails(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  )

}

// if we use getStaticProps in dynamic paths pages, then getStaticPaths is also necessary

export async function getStaticPaths() {
  const client = await MongoClient.connect("mongodb+srv://gesonel:5BRh4IFGC4TAsase@learning-atlas.saxwg.mongodb.net/meetups?retryWrites=true&w=majority")

  const db = client.db()

  const meetupsCollection = db.collection('meetups')

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray()

  client.close()
  
  return {
    fallback: false,
    paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } }))
  }
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId

  const client = await MongoClient.connect("mongodb+srv://gesonel:5BRh4IFGC4TAsase@learning-atlas.saxwg.mongodb.net/meetups?retryWrites=true&w=majority")

  const db = client.db()

  const meetupsCollection = db.collection('meetups')

  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) })

  client.close()

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
        address: selectedMeetup.address
      },
    },
  }
}

export default MeetupDetails