import { VideoCollection } from '@/models/video';
import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

// Init your React Native SDK
const client = new Client();

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.alfredo.aora",
  projectID: "664cb7570032b36443bc",
  databaseID: "664cb85200210f750568",
  userCollectionID: "664cb8680009018697d5",
  videoCollectionID: "664cb8880009c55521a6",
  storageId: "664cbc2d0002cbfa852e"
}


client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectID) // Your project ID
  .setPlatform(config.platform) // Your application ID or bundle ID.
  ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email: string, password: string, username: string) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username)

    if (!newAccount) {
      throw new Error("Error creating user")
    }

    const avatarUrl = avatars.getInitials(username)
    await signIn(email, password)

    const newUser = await databases.createDocument(
      config.databaseID,
      config.userCollectionID,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    )

  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password)
    return session
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseID,
      config.userCollectionID,
      [Query.equal("accountId", currentAccount.$id)]
    )

    if (!currentUser) throw Error;

    return currentUser.documents[0]

  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const getAllPosts = async (): Promise<VideoCollection[]> => {
  try {
    const posts = await databases.listDocuments(
      config.databaseID,
      config.videoCollectionID,
    )

    const videoCollections: VideoCollection[] = posts.documents.map(post => {
      return {
        id: post.$id,
        title: post.title,
        thumbnail: post.thumbnail,
        prompt: post.prompt,
        video: post.video,
        createdAt: post.$createdAt,
        updatedAt: post.$updatedAt,
        creator: post.creator, // pastikan tipe data dari post.creator sesuai dengan UserCollection
      };
    });

    return videoCollections
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const getLastestPosts = async (): Promise<VideoCollection[]> => {
  try {
    const posts = await databases.listDocuments(
      config.databaseID,
      config.videoCollectionID,
      [Query.orderDesc('$createdAt',), Query.limit(2)]
    )

    const videoCollections: VideoCollection[] = posts.documents.map(post => {
      return {
        id: post.$id,
        title: post.title,
        thumbnail: post.thumbnail,
        prompt: post.prompt,
        video: post.video,
        createdAt: post.$createdAt,
        updatedAt: post.$updatedAt,
        creator: post.creator, // pastikan tipe data dari post.creator sesuai dengan UserCollection
      };
    });

    return videoCollections
  } catch (error) {
    console.log(error);
    return [];
  }
}
