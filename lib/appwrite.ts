import { Account, Avatars, Client, Databases, OAuthProvider, Query } from 'react-native-appwrite'
import * as Linking from 'expo-linking'
import { openAuthSessionAsync } from 'expo-web-browser'


export const config = {
    platform: 'com.clone.realestate',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID
}

export const client = new Client()
client.setEndpoint(config.endpoint!).setProject(config.projectId!).setPlatform(config.platform!) // a exclamação é para confirmar que o endpoint esta no arquivo .env

export const avatar = new Avatars(client)
export const account = new Account(client)
export const databases = new Databases(client)

export const login = async () => {
    try {
        const redirectUri = Linking.createURL('/') //aponta para a home page.

        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri)

        if (!response) throw new Error('falha ao fazer login')

        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUri
        )
        console.log(browserResult.type)

        if (browserResult.type !== 'success') throw new Error('falha ao fazer login')

        const url = new URL(browserResult.url)

        const secret = url.searchParams.get('secret')?.toString()
        const userId = url.searchParams.get('userId')?.toString()

        if (!secret || !userId) throw new Error('falha ao fazer login')

        const session = await account.createSession(userId, secret)

        if (!session) throw new Error('falha ao fazer login')

        return true

    } catch (error) {
        console.log(error)
        return false
    }
}

export const logout = async () => {
    try {
        await account.deleteSession('current')
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await account.get()

        if (response.$id) {
            const userAvatar = avatar.getInitials(response.name)
            return {
                ...response,
                avatar: userAvatar.toString()
            }
        }


    } catch (error) {
        console.log(error)
        return null
    }
}

export const getLatestProperties = async () => {
    try {
        const response = await databases.listDocuments(
            config.databaseId!, //como esta vindo do .env, o '!' é para dizer q o dado está la.
            config.propertiesCollectionId!,
            [Query.orderAsc('$createdAt'), Query.limit(5)]
        )

        return response.documents
    } catch (error) {
        console.error(error)
        return []
    }
}

export const getProperies = async ({ filter, query, limit }: {
    filter: string;
    query: string;
    limit?: number;
}) => {
    try {
        const buildQuery = [Query.orderDesc('$createdAt')]

        if (filter && filter !== 'All') {
            buildQuery.push(Query.equal('type', filter))
        }

        if (query) {
            buildQuery.push(
                Query.or([
                    Query.search('name', query),
                    Query.search('address', query),
                    Query.search('type', query),
                ])
            )
        }

        if (limit) {
            buildQuery.push(Query.limit(limit))
        }

        const response = await databases.listDocuments(
            config.databaseId!, //como esta vindo do .env, o '!' é para dizer q o dado está la.
            config.propertiesCollectionId!,
            buildQuery
        )

        return response.documents

    } catch (error) {
        console.error(error)
        return []
    }
}

export const getPropertyById = async ({ id }: { id: string }) => {
    try {
        const result = await databases.getDocument(
            config.databaseId!,
            config.propertiesCollectionId!,
            id
        )
        return result
    } catch (error) {
        console.error(error)
        return null
    }

}



