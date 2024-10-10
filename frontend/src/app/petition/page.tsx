import * as Petition from 'features/petition/index'
import * as Atom from 'components/atoms/index'

export default async function PetitionPage() {
  const { petitions } = await Petition.getAll()

  return (
    <>
      {petitions && <div>{petitions[0].Username}</div>}
      <Atom.Button />
      <Petition.Card />
    </>
  )
}
