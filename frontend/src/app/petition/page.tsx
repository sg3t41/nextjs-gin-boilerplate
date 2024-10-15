import * as Petition from 'features/petition/index'

export default async function PetitionPage() {
	const { petitions } = await Petition.getAll()

	return (
		<>
			{petitions && <div>{petitions[0].Username}</div>}
			<Petition.Card />
		</>
	)
}
