export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event)
	const auth = await serverSupabaseClient(event).auth

	return 'Done'
})
